from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('client', 'barber', 'date', 'time_slot', 'total_price', 'status')
    list_filter = ('status', 'date')
    date_hierarchy = 'date' 
    search_fields = ('client__username', 'phone')