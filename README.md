# Инструкция по развертыванию проекта Van Blade

Данный документ содержит пошаговое руководство по установке и запуску информационной системы управления записями для барбершопа Van Blade.

---

## Технологический стек
* Backend: Python 3.10+, Django 4.2, Django REST Framework, PostgreSQL
* Frontend: React 18, Vite, SCSS Modules
* Инструменты: Axios, TanStack Query, Git

---

## Требования к окружению
Перед началом установки необходимо убедиться в наличии следующего программного обеспечения:
1. Python версии 3.10 или выше.
2. Node.js версии 18 или выше.
3. Система управления базами данных PostgreSQL.
4. Распределенная система управления версиями Git.

---

## Шаг 1: Настройка базы данных (PostgreSQL)
Проект использует СУБД PostgreSQL. Необходимо создать базу данных и соответствующего пользователя. Выполните следующие SQL-команды в консоли PostgreSQL или через графический интерфейс (например, pgAdmin):

```sql
-- 1. Создание базы данных
CREATE DATABASE van_blade_db;

-- 2. Создание пользователя (при его отсутствии)
CREATE USER postgres WITH PASSWORD 'ваш_пароль';

-- 3. Назначение прав пользователю на базу данных
GRANT ALL PRIVILEGES ON DATABASE van_blade_db TO postgres;

-- 4. Настройка прав на схему public (актуально для PostgreSQL 15+)
\c van_blade_db
GRANT ALL ON SCHEMA public TO postgres;
```

---

## Шаг 2: Настройка серверной части (Backend)
Перейдите в директорию `backend` через терминал.

1. Создание виртуального окружения:

   python -m venv venv

2. Активация виртуального окружения:
   * Windows: `venv\Scripts\activate`
   * macOS/Linux: `source venv/bin/activate`

3. Установка зависимостей:
   pip install -r requirements.txt

4. Настройка переменных окружения (.env):
   Файл `.env` должен быть создан в корне папки `backend` на основе шаблона `.env.example`.
   Пример конфигурации файла `.env`:
   DEBUG=True
   SECRET_KEY=change-me-in-production-xyz123
   DATABASE_NAME=van_blade_db
   DATABASE_USER=postgres
   DATABASE_PASSWORD=ваш_пароль
   DATABASE_HOST=localhost
   DATABASE_PORT=5432


5. Выполнение миграций:

   python manage.py migrate


6. Создание учетной записи администратора (опционально):

   python manage.py createsuperuser


---

## Шаг 3: Настройка клиентской части (Frontend)
Перейдите в директорию `frontend` во втором окне терминала.

1. Установка программных библиотек:

   npm install


---

## Шаг 4: Запуск системы
Для корректного функционирования приложения требуется одновременная работа двух серверов.

Сервер Backend:

cd backend
python manage.py runserver

Доступ к API по адресу: http://127.0.0.1:8000/api/services/

Сервер Frontend:

cd frontend
npm run dev

Доступ к интерфейсу по адресу, указанному в консоли (по умолчанию http://localhost:5173).

---

## Технические примечания
Согласно правилам разработки, в репозитории отсутствуют следующие компоненты (включены в .gitignore):

1. backend/.env — файл с конфиденциальными данными доступа.
2. backend/venv/ — локальное виртуальное окружение.
3. frontend/node_modules/ — установленные зависимости Node.js.
4. __pycache__ и dist/ — временные файлы компиляции и сборки.

Типовые решения проблем:
* Ошибка импорта модулей (Python): повторно выполнить `pip install -r requirements.txt`.
* Ошибка модулей React: повторно выполнить `npm install` в папке frontend.
* Ошибка соединения с БД: проверить корректность учетных данных в файле `.env`.

