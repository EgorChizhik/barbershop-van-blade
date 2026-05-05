# Инструкция по развертыванию проекта Van Blade

Данный документ содержит пошаговое руководство по установке и запуску
информационной системы управления записями для барбершопа Van Blade.

---

# Технологический стек

* Backend: Python 3.13, Django 4.2, Django REST Framework, PostgreSQL
* Frontend: React 18, Vite, SCSS
* Инструменты: Axios, TanStack Query, Git

---

# Требования к окружению

Перед началом установки убедитесь, что у вас установлено следующее ПО:

1. Python версии 3.11 или выше
2. Node.js версии 18 или выше
3. PostgreSQL
4. Git

Проверить версии можно командами:

```bash
python --version
node --version
git --version
```

---

# Быстрый старт

```bash
git clone https://github.com/ВАШ_НИК/ВАШ_РЕПОЗИТОРИЙ.git
cd ВАШ_РЕПОЗИТОРИЙ
```

Далее следуйте инструкции ниже.

---

# Шаг 1: Клонирование репозитория

Откройте терминал и выполните:

```bash
git clone https://github.com/ВАШ_НИК/ВАШ_РЕПОЗИТОРИЙ.git
cd ВАШ_РЕПОЗИТОРИЙ
```

---

# Шаг 2: Настройка PostgreSQL

## Важно

Проект использует PostgreSQL как основную базу данных.

Если PostgreSQL уже установлен:

* используйте существующего пользователя `postgres`
* используйте пароль, который вы указывали при установке PostgreSQL

Если PostgreSQL ещё не установлен:

* скачайте и установите его с официального сайта
* во время установки запомните пароль пользователя `postgres`

---

## Создание базы данных

Откройте pgAdmin или PostgreSQL Shell (psql) и выполните:

```sql
CREATE DATABASE vanblade_db;
```

Если необходимо создать пользователя:

```sql
CREATE USER postgres WITH PASSWORD 'ваш_пароль';
GRANT ALL PRIVILEGES ON DATABASE vanblade_db TO postgres;
```

---

## Порт PostgreSQL

По умолчанию PostgreSQL использует порт:

```text
5432
```

Если вы не меняли настройки при установке — используйте именно его.

---

# Шаг 3: Настройка Backend

Перейдите в папку backend:

```bash
cd backend
```

---

## 3.1 Создание виртуального окружения

```bash
python -m venv venv
```

---

## 3.2 Активация виртуального окружения

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Если команда не работает — убедитесь, что вы находитесь в папке `backend`.

---

## 3.3 Установка зависимостей Python

Файл `requirements.txt` находится в корне проекта.

Находясь в папке `backend`, выполните:

```bash
pip install -r ../requirements.txt
```

---

## 3.4 Создание файла .env

Файл `.env` хранит:

* настройки подключения к базе данных
* секретные ключи Django
* локальные настройки окружения

Файл `.env` не загружается в GitHub и создаётся вручную на каждом компьютере.

---

## Скопируйте шаблон

### macOS/Linux

```bash
cp .env.example .env
```

### Windows

```bash
copy .env.example .env
```

---

## Отредактируйте файл .env

Откройте `.env` и укажите свои данные:

```env
DEBUG=True

SECRET_KEY=change-me-in-production-xyz123

DATABASE_NAME=vanblade_db
DATABASE_USER=postgres
DATABASE_PASSWORD=ваш_пароль
DATABASE_HOST=localhost
DATABASE_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

ALLOWED_HOSTS=localhost,127.0.0.1
```

---

## Что означает DATABASE_PASSWORD

```env
DATABASE_PASSWORD=ваш_пароль
```

Это пароль пользователя PostgreSQL.

Используйте пароль, который вы задавали:

* при установке PostgreSQL
* либо при создании пользователя через SQL-команду

Пример:

```sql
CREATE USER postgres WITH PASSWORD '12345';
```

Тогда в `.env` нужно указать:

```env
DATABASE_PASSWORD=12345
```

---

## 3.5 Применение миграций

Выполните:

```bash
python manage.py migrate
```

---

## 3.6 Создание администратора (опционально)

Позволяет войти в Django Admin:

```bash
python manage.py createsuperuser
```

После создания администратора панель будет доступна по адресу:

```text
http://127.0.0.1:8000/admin/
```

---

# Шаг 4: Настройка Frontend

Откройте новое окно терминала и перейдите в папку frontend:

```bash
cd frontend
```

---

## 4.1 Установка зависимостей

```bash
npm install
```

---

# Шаг 5: Запуск проекта

Для работы приложения необходимо одновременно запустить:

* backend сервер Django
* frontend сервер Vite

Откройте два отдельных окна терминала.

---

## Окно №1 — Backend

Перейдите в папку `backend`.

Убедитесь, что виртуальное окружение активировано.

Запустите сервер:

```bash
python manage.py runserver
```

Backend будет доступен по адресу:

```text
http://127.0.0.1:8000/
```

API:

```text
http://127.0.0.1:8000/api/
```

---

## Окно №2 — Frontend

Перейдите в папку `frontend` и выполните:

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

---

# Проверка работы системы

После запуска:

* Frontend должен открываться в браузере
* Backend не должен выдавать ошибок в терминале
* API должно открываться по адресу:

```text
http://127.0.0.1:8000/api/
```

---

# Технические примечания

В репозиторий не входят следующие файлы:

```text
backend/.env
backend/venv/
frontend/node_modules/
__pycache__/
dist/
```

Они исключены через `.gitignore`.

---

# Типовые ошибки

## Ошибка подключения к PostgreSQL

Проверьте:

* PostgreSQL запущен
* DATABASE_NAME указан правильно
* DATABASE_PASSWORD указан правильно
* DATABASE_PORT совпадает с портом PostgreSQL

---

## ModuleNotFoundError

Убедитесь, что:

* активировано виртуальное окружение
* выполнена команда:

```bash
pip install -r ../requirements.txt
```

---

## Ошибка React/Vite модулей

Выполните в папке frontend:

```bash
npm install
```

---

# Полезные команды

## Создание новых миграций

```bash
python manage.py makemigrations
```

## Применение миграций

```bash
python manage.py migrate
```

## Запуск Django shell

```bash
python manage.py shell
```

---
