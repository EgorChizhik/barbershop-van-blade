from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Category, Service
from .serializers import CategorySerializer, ServiceSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = (
        Service.objects.filter(is_active=True)
        .prefetch_related("variants")
        .select_related("category", "barber")
    )
    serializer_class = ServiceSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = self.queryset
        barber_level = self.request.query_params.get("barber_level", None)
        if barber_level:
            queryset = queryset.filter(variants__barber_level=barber_level)
        return queryset
