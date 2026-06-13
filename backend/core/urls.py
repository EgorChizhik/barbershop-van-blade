from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from rest_framework.routers import DefaultRouter
from services.views import CategoryViewSet, ServiceViewSet
from barbers.views import BarberViewSet, BarberTimeSlotListView
from bookings.views import AppointmentViewSet
from gallery.views import WorkViewSet
from django.conf import settings

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

    re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT / 'assets'}),
    re_path(r'^favicon\.svg$', serve, {'document_root': settings.STATIC_ROOT, 'path': 'favicon.svg'}),
    
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

urlpatterns += [
    re_path(r'^(?!api/|admin/|assets/|media/|favicon\.svg).*$', TemplateView.as_view(template_name='index.html')),
]

admin.site.index_title = "Управление системой «Van Blade»"