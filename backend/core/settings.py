from pathlib import Path
from decouple import config
from django.templatetags.static import static

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ───────────────────────────────────────────────────────────────────────
# ENVIRONMENT CONFIGURATION (Очищено от дубликатов для защиты диплома)
# ───────────────────────────────────────────────────────────────────────
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')])

# ───────────────────────────────────────────────────────────────────────
# APPLICATION DEFINITION
# ───────────────────────────────────────────────────────────────────────
INSTALLED_APPS = [
    # Модернизация админки (Обязательно на самом верху, до django.contrib.admin)
    'unfold',
    
    # Стандартные приложения Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Сторонние библиотеки
    'corsheaders',
    'rest_framework',

    # Локальные приложения вашего барбершопа
    'users', 
    'services', 
    'barbers', 
    'bookings',
    'gallery',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # <-- Обязательно для раздачи статики на Render
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # Указываем Django искать главный index.html от React в папке frontend_dist
        'DIRS': [BASE_DIR / 'frontend_dist'] if (BASE_DIR / 'frontend_dist').exists() else [BASE_DIR / '../frontend_dist'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# ───────────────────────────────────────────────────────────────────────
# DATABASE SYSTEM (PostgreSQL Standard)
# ───────────────────────────────────────────────────────────────────────
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DATABASE_NAME'),
        'USER': config('DATABASE_USER'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'HOST': config('DATABASE_HOST'),
        'PORT': config('DATABASE_PORT', default=5432, cast=int),
    }
}

# PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# INTERNATIONALIZATION
LANGUAGE_CODE = 'ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ('ru', 'Русский'),
]

# ───────────────────────────────────────────────────────────────────────
# STATIC & MEDIA STORAGE (Production Ready)
# ───────────────────────────────────────────────────────────────────────
STATIC_URL = '/static/'

# Собираем в список все папки, где может лежать статика проекта и скомпилированный React
STATICFILES_DIRS = []
if (BASE_DIR / 'static').exists():
    STATICFILES_DIRS.append(BASE_DIR / 'static')

# Интегрируем собранные Vite ассеты фронтенда (CSS, JS, картинки) в статику Django
if (BASE_DIR / 'frontend_dist').exists():
    STATICFILES_DIRS.append(BASE_DIR / 'frontend_dist' / 'assets')
elif (BASE_DIR / '../frontend_dist').exists():
    STATICFILES_DIRS.append(BASE_DIR / '../frontend_dist' / 'assets')

# Главная директория сборки статики (РАСКОММЕНТИРОВАНО И НАСТРОЕНО)
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Поддержка эффективного сжатия WhiteNoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ADDITIONAL APPLICATION SETTINGS
AUTH_USER_MODEL = 'users.CustomUser'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny']
}

UNFOLD = {
    "COLORS": {
        "base": {
            "50":  "rgb(209, 207, 201)",
            "100": "rgb(189, 196, 212)", 
            "200": "rgb(155, 170, 190)",
            "300": "rgb(120, 140, 165)",
            "400": "rgb(100, 120, 148)",
            "500": "rgb(82, 103, 125)", 
            "600": "rgb(62, 82, 108)",
            "700": "rgb(45, 65, 92)",
            "800": "rgb(28, 46, 74)",
            "900": "rgb(20, 32, 55)",
            "950": "rgb(15, 26, 43)",
        },
        "primary": {
            "50":  "rgb(240, 242, 246)",
            "100": "rgb(220, 226, 236)",
            "200": "rgb(200, 210, 224)",
            "300": "rgb(189, 196, 212)",
            "400": "rgb(160, 173, 192)",
            "500": "rgb(130, 148, 168)",
            "600": "rgb(100, 120, 145)",
            "700": "rgb(82, 103, 125)",
            "800": "rgb(62, 82, 108)",
            "900": "rgb(40, 58, 84)",
            "950": "rgb(28, 46, 74)",
        },
    },
    "STYLES": [
        lambda request: static("css/admin_custom.css"),
    ],
}