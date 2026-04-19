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
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer