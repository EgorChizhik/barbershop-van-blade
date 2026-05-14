from django.contrib import admin
from .models import Appointment
from barbers.models import TimeSlot


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'barber', 'date', 'time_slot', 'total_price', 'status')
    list_filter = ('status', 'date')
    date_hierarchy = 'date'
    search_fields = ('client_name', 'phone')
    readonly_fields = ('created_at', 'total_price')
    fieldsets = (
        ('Клиент и мастер', {'fields': ('client_name', 'phone', 'barber')}),
        ('Услуги и стоимость', {'fields': ('services', 'total_price')}),
        ('Время и статус', {'fields': ('date', 'time_slot', 'status')}),
        ('Дополнительно', {'fields': ('comment', 'created_at')}),
    )

    def save_model(self, request, obj, form, change):
        if change:
            old = Appointment.objects.get(pk=obj.pk)

            if old.status != 'cancelled' and obj.status == 'cancelled':
                TimeSlot.objects.filter(
                    barber=obj.barber,
                    date=obj.date,
                    time=obj.time_slot,
                ).update(is_booked=False)

            if old.status == 'cancelled' and obj.status != 'cancelled':
                TimeSlot.objects.filter(
                    barber=obj.barber,
                    date=obj.date,
                    time=obj.time_slot,
                ).update(is_booked=True)

        super().save_model(request, obj, form, change)