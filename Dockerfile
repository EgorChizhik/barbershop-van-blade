# --- ЭТАП 1: Собираем фронтенд ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Копируем только файлы зависимостей фронта, чтобы ускорить сборку
COPY frontend/package*.json ./
RUN npm install

# Копируем весь исходный код фронтенда
COPY frontend/ ./
# Vite автоматически компилирует SCSS в CSS и собирает оптимизированный бандл в папку dist
RUN npm run build

# --- ЭТАП 2: Собираем бэкенд и объединяем проект ---
FROM python:3.13-slim
WORKDIR /app

# Устанавливаем системные библиотеки, необходимые для работы с PostgreSQL
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем зависимости Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Копируем все файлы проекта в контейнер
COPY . .

# Забираем из первого (нодового) этапа собранный React (папку dist) 
# и кладем её туда, где её ждет твой settings.py (в папку frontend_dist)
COPY --from=frontend-builder /app/frontend/dist ./frontend_dist

# Задаем временные переменные, чтобы Django разрешил выполнить collectstatic без реального подключения к БД
ENV SECRET_KEY=temporary_key_for_build_only
ENV DEBUG=False
ENV DATABASE_NAME=dummy
ENV DATABASE_USER=dummy
ENV DATABASE_PASSWORD=dummy
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432

# Собираем всю статику (и админку, и css, и файлы React) в одну папку staticfiles для WhiteNoise
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Запуск production-сервера
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]