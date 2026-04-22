from django.contrib import admin
from django import forms
from .models import Category, Service


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class ServiceAdminForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = '__all__'


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    list_display = ('name', 'category', 'barber_level', 'price', 'duration_minutes', 'is_active')
    list_filter = ('barber_level', 'is_active', 'category')
    search_fields = ('name', 'subtitle', 'description')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Основное', {
            'fields': ('name', 'slug', 'category', 'barber', 'barber_level')
        }),
        ('Контент', {
            'fields': ('subtitle', 'description', 'image'),
        }),
        ('Детали', {
            'fields': ('price', 'duration_minutes', 'is_active'),
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser and change:
            old_obj = Service.objects.get(pk=obj.pk)
            obj.barber_level = old_obj.barber_level
        super().save_model(request, obj, form, change)
