from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView  # <-- Добавили импорт для отображения React
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
    path('', TemplateView.as_view(template_name='index.html'), name='index'),

    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/barbers/<int:barber_id>/slots/', BarberTimeSlotListView.as_view(), name='barber-slots'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.index_title = "Управление системой «Van Blade»"