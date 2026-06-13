# ЭТАП 1: Собираем фронтенд (React)

# Берем готовый образ с Node.js
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Сначала копируем только файлы со списком библиотек, чтобы ускорить сборку в следующий раз
COPY frontend/package*.json ./
RUN npm install

# Копируем весь остальной код фронтенда и собираем React-приложение в папку dist
COPY frontend/ ./
RUN npm run build


# ЭТАП 2: Собираем бэкенд (Django) и объединяем проект

# Берем чистый образ с Python
FROM python:3.13-slim
WORKDIR /app

# Устанавливаем в систему инструменты для работы с базой данных PostgreSQL
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем все библиотеки для Python (Django, Pillow, WhiteNoise и др.)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Копируем абсолютно все файлы нашего проекта в контейнер
COPY . .

# ЗАБИРАЕМ РЕЗУЛЬТАТ ИЗ ЭТАПА 1: берем собранный React (папку dist) 
# и переносим её в папку frontend_dist, которую ждет Django
COPY --from=frontend-builder /app/frontend/dist ./frontend_dist

# Задаем временные пароли-пустышки, чтобы Django разрешил запустить collectstatic без реального подключения к БД
ENV SECRET_KEY=temporary_key_for_build_only
ENV DEBUG=False
ENV ALLOWED_HOSTS=localhost,127.0.0.1,onrender.com
ENV DATABASE_NAME=dummy
ENV DATABASE_USER=dummy
ENV DATABASE_PASSWORD=dummy
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432

# Переходим в папку с бэкендом, где лежит файл manage.py
WORKDIR /app/backend
    
# Собираем всю статику (админку, стили и файлы React) в одну общую папку staticfiles
RUN python manage.py collectstatic --noinput

# Открываем порт 8000 для доступа к сайту
EXPOSE 8000

# 1. Применяем миграции к базе данных
# 2. Загружаем готовые данные из fixtures.json (услуги, барберы)
# 3. Через консоль проверяем: если админа нет, создаем суперпользователя (логин: admin, пароль: vanblade)
# 4. Запускаем production-сервер Gunicorn
CMD python manage.py migrate && \
    python manage.py loaddata fixtures.json && \
    python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'vanblade')" && \
    gunicorn core.wsgi:application --bind 0.0.0.0:8000