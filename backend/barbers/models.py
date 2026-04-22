from django.db import models
from django.conf import settings

class Barber(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="barber_profile", verbose_name="Пользователь")
    display_name = models.CharField(max_length=100, verbose_name="Отображаемое имя")
    specialty = models.CharField(max_length=100, default="Master Barber", verbose_name="Специализация")
    bio = models.TextField(blank=True, verbose_name="О себе")
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.00, verbose_name="Рейтинг")
    avatar = models.ImageField(upload_to='barbers/', blank=True, null=True, verbose_name="Фотография")
    is_available = models.BooleanField(default=True, verbose_name="Доступен для записи")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления")

    class Meta:
        ordering = ['-rating']
        verbose_name = "Барбер"
        verbose_name_plural = "Барберы"

    def __str__(self):
        return self.display_name