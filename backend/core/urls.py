from django.contrib import admin
from django.urls import path, include, re_path  # <-- Добавили re_path
from django.views.generic import TemplateView
from django.views.static import serve  # <-- Добавили системный serve для продакшн-раздачи
from rest_framework.routers import DefaultRouter
from services.views import CategoryViewSet, ServiceViewSet
from barbers.views import BarberViewSet, BarberTimeSlotListView
from bookings.views import AppointmentViewSet
from gallery.views import WorkViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'barbers', BarberViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'gallery', WorkViewSet)

urlpatterns = [
    # Главная страница React
    path('', TemplateView.as_view(template_name='index.html'), name='index'),

    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/barbers/<int:barber_id>/slots/', BarberTimeSlotListView.as_view(), name='barber-slots'),

    # ПРИНУДИТЕЛЬНАЯ РАЗДАЧА СТАТИКИ ФРОНТЕНДА ДЛЯ PRODUCTION (Решает проблему MIME-типов и 404)
    re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT / 'assets'}),
    re_path(r'^favicon\.svg$', serve, {'document_root': settings.STATIC_ROOT, 'path': 'favicon.svg'}),
]

# Раздача медиа-файлов
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.index_title = "Управление системой «Van Blade»"