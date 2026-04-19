from django.db import models
from django.conf import settings
from services.models import Service
from barbers.models import Barber

class Appointment(models.Model):
    """Запись о бронировании клиента"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="appointments")
    barber = models.ForeignKey(Barber, on_delete=models.PROTECT, related_name="appointments")
    services = models.ManyToManyField(Service, related_name="appointments")
    date = models.DateField()
    time_slot = models.TimeField()
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    phone = models.CharField(max_length=20)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-time_slot']

    def __str__(self):
        return f"{self.client.username} -> {self.barber.display_name} ({self.date})"