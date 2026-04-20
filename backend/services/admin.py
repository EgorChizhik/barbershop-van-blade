from django.contrib import admin
from .models import Category, Service

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'barber', 'barber_level', 'price', 'duration_range', 'is_active')
    list_filter = ('barber_level', 'is_active', 'category')
    search_fields = ('name', 'subtitle', 'description')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Основное', {'fields': ('name', 'slug', 'category', 'barber', 'barber_level')}),
        ('Контент', {'fields': ('subtitle', 'description', 'image')}),
        ('Детали', {'fields': ('price', 'duration_range', 'is_active')}),
    )