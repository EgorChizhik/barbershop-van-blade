from rest_framework import serializers
from .models import Category, Service


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon']


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'slug', 'category', 'category_name', 'barber',
            'subtitle', 'description', 'duration_minutes', 'price',
            'image', 'barber_level', 'is_active', 'created_at'
        ]
        read_only_fields = ['slug', 'created_at']
