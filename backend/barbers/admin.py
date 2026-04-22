from django.contrib import admin
from .models import Barber

@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'specialty', 'rating', 'is_available')
    list_filter = ('is_available', 'rating')
    search_fields = ('display_name', 'specialty')
    fieldsets = (
        ('Основная информация', {'fields': ('user', 'display_name', 'specialty')}),
        ('Детали профиля', {'fields': ('bio', 'avatar', 'rating', 'is_available')}),
    )