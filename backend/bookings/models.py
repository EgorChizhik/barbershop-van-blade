from django.db import models
from django.conf import settings
from services.models import Service
from barbers.models import Barber

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ожидает подтверждения'),
        ('confirmed', 'Подтверждена'),
        ('completed', 'Выполнена'),
        ('cancelled', 'Отменена'),
    ]
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="appointments", verbose_name="Клиент")
    barber = models.ForeignKey(Barber, on_delete=models.PROTECT, related_name="appointments", verbose_name="Барбер")
    services = models.ManyToManyField(Service, related_name="appointments", verbose_name="Услуги")
    date = models.DateField(verbose_name="Дата записи")
    time_slot = models.TimeField(verbose_name="Время начала")
    total_price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Итоговая сумма")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="Статус")
    phone = models.CharField(max_length=20, verbose_name="Телефон клиента")
    comment = models.TextField(blank=True, verbose_name="Комментарий")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        ordering = ['-date', '-time_slot']
        verbose_name = "Запись"
        verbose_name_plural = "Записи"

    def __str__(self):
        return f"{self.client.username} -> {self.barber.display_name} ({self.date})"