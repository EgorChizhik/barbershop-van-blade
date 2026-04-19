from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from services.views import CategoryViewSet, ServiceViewSet
from barbers.views import BarberViewSet
from bookings.views import AppointmentViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'barbers', BarberViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]