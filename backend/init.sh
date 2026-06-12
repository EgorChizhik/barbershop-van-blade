#!/usr/bin/env bash

# 1. Применяем миграции к базе данных в облаке
python manage.py migrate --no-input

# 2. Наш чит-код: автоматическое создание админа (если его еще нет)
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'vanblade')"

# 3. Запускаем сервер (gunicorn или uwsgi — то, что у тебя использовалось)
# Если у тебя проект запускался через gunicorn, оставляем эту строку:
gunicorn core.wsgi:application --bind 0.0.0.0:8000