from django.contrib import admin
from .models import Barber, TimeSlot

@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'level', 'experience_months', 'is_available')
    list_filter = ('level', 'is_available')
    search_fields = ('display_name',)
    
    fieldsets = (
        ('Визуальное представление', {
            'fields': ('display_name', 'avatar', 'level', 'experience_months')
        }),
        ('Системные настройки', {
            'fields': ('user', 'is_available', 'bio'),
            'classes': ('collapse',),
        }),
    )

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('barber', 'date', 'time', 'is_booked')
    list_filter = ('date', 'barber', 'is_booked')
    list_editable = ('is_booked',) 
    date_hierarchy = 'date'