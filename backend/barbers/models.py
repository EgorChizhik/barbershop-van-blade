from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator

class Barber(models.Model):
    LEVEL_CHOICES = [
        ("Матрос", "Матрос"),
        ("Шкипер", "Шкипер"),
        ("Капитан", "Капитан"),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="barber_profile",
        verbose_name="Аккаунт пользователя (необязательно)",
    )

    display_name = models.CharField(max_length=100, verbose_name="Имя барбера")
    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES,
        default="Матрос",
        verbose_name="Квалификация",
    )

    experience_months = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        verbose_name="Стаж работы (в месяцах)",
    )

    avatar = models.ImageField(
        upload_to="barbers/", null=True, blank=True, verbose_name="Фото"
    )

    bio = models.TextField(blank=True, verbose_name="О себе")
    is_available = models.BooleanField(default=True, verbose_name="Доступен для записи")

    @property
    def experience_display(self):
        years = self.experience_months // 12
        months = self.experience_months % 12
        parts = []

        if years > 0:
            if years % 10 == 1 and years % 100 != 11:
                parts.append(f"{years} год")
            elif 2 <= years % 10 <= 4 and (years % 100 < 10 or years % 100 >= 20):
                parts.append(f"{years} года")
            else:
                parts.append(f"{years} лет")

        if months > 0:
            if months % 10 == 1 and months % 100 != 11:
                parts.append(f"{months} месяц")
            elif 2 <= months % 10 <= 4 and (months % 100 < 10 or months % 100 >= 20):
                parts.append(f"{months} месяца")
            else:
                parts.append(f"{months} месяцев")

        return " ".join(parts) if parts else "1 месяц"

    class Meta:
        verbose_name = "Барбер"
        verbose_name_plural = "Барберы"

    def __str__(self):
        return f"{self.display_name} ({self.level})"


class TimeSlot(models.Model):
    barber = models.ForeignKey(
        Barber, 
        on_delete=models.CASCADE, 
        related_name='slots', 
        verbose_name="Барбер"
    )
    date = models.DateField(verbose_name="Дата")
    time = models.TimeField(verbose_name="Время")
    is_booked = models.BooleanField(default=False, verbose_name="Занято")

    class Meta:
        verbose_name = "Слот времени"
        verbose_name_plural = "Слоты времени"
        unique_together = ('barber', 'date', 'time')
        ordering = ['date', 'time']

    def __str__(self):
        status = "Занято" if self.is_booked else "Свободно"
        return f"{self.barber.display_name} | {self.date} {self.time} | {status}"