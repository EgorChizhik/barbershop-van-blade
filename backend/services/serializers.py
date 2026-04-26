from rest_framework import serializers
from .models import Category, Service, ServiceVariant


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image', 'description']


class ServiceVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceVariant
        fields = ['id', 'barber_level', 'price', 'duration_minutes', 'description']


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    variants = ServiceVariantSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'slug', 'category', 'category_name', 'barber',
            'subtitle', 'description', 'image', 'is_active', 'created_at', 'variants'
        ]
        read_only_fields = ['slug', 'created_at']
