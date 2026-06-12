from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Work

@admin.register(Work)
class WorkAdmin(ModelAdmin):
    list_display = ('preview', 'image_type', 'show_on_home', 'order', 'created_at')
    list_editable = ('image_type', 'show_on_home', 'order')
    list_filter = ('image_type', 'show_on_home')
    
    readonly_fields = ('preview_large', 'created_at')
    
    fieldsets = (
        (None, {
            'fields': ('image', 'preview_large')
        }),
        ('Настройки сетки', {
            'fields': ('image_type', 'show_on_home', 'order')
        }),
        ('Служебная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )