from django.contrib import admin
from django import forms
from .models import Category, Service, ServiceVariant


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class ServiceVariantInline(admin.TabularInline):
    model = ServiceVariant
    extra = 3
    fields = ('barber_level', 'price', 'duration_minutes')
    show_change_link = True


class ServiceAdminForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = '__all__'


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    list_display = ('name', 'category', 'is_active')
    list_filter = ('is_active', 'category')
    search_fields = ('name', 'subtitle', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ServiceVariantInline]
    fieldsets = (
        ('Основное', {
            'fields': ('name', 'slug', 'category', 'barber')
        }),
        ('Контент', {
            'fields': ('subtitle', 'description', 'image'),
        }),
        ('Детали', {
            'fields': ('is_active',),
        }),
    )
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)


@admin.register(ServiceVariant)
class ServiceVariantAdmin(admin.ModelAdmin):
    list_display = ('service', 'barber_level', 'price', 'duration_minutes')
    list_filter = ('barber_level', 'service')
    search_fields = ('service__name',)
    list_select_related = ('service',)
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('service')