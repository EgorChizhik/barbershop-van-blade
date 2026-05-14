from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from services.views import CategoryViewSet, ServiceViewSet
from barbers.views import BarberViewSet, BarberTimeSlotListView # <--- 1. ДОБАВЬ ИМПОРТ ТУТ
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
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/barbers/<int:barber_id>/slots/', BarberTimeSlotListView.as_view(), name='barber-slots'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)