from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, FileExtensionValidator
from django.core.exceptions import ValidationError
from barbers.models import Barber


def validate_image_size(value):
    max_size = 5 * 1024 * 1024
    if value.size > max_size:
        raise ValidationError('Размер изображения не должен превышать 5MB')
    return value


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название категории")
    slug = models.SlugField(unique=True, verbose_name="URL-идентификатор")
    icon = models.CharField(max_length=50, blank=True, help_text="Идентификатор иконки", verbose_name="Иконка")

    class Meta:
        ordering = ['name']
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name


class Service(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='services', verbose_name="Категория")
    barber = models.ForeignKey(Barber, on_delete=models.SET_NULL, null=True, blank=True, related_name='services', verbose_name="Исполнитель")
    name = models.CharField(max_length=150, verbose_name="Название услуги")
    slug = models.SlugField(unique=True, verbose_name="URL-идентификатор")
    subtitle = models.CharField(max_length=120, blank=True, help_text="Креативный подзаголовок", verbose_name="Подзаголовок")
    description = models.TextField(max_length=600, help_text="Описание услуги", verbose_name="Описание")
    image = models.ImageField(
        upload_to='services/',
        blank=True,
        null=True,
        verbose_name="Фото услуги",
        validators=[validate_image_size, FileExtensionValidator(['jpg', 'jpeg', 'png', 'webp'])]
    )
    is_active = models.BooleanField(default=True, verbose_name="Активна")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        ordering = ['name']
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

    def __str__(self):
        return self.name


class ServiceVariant(models.Model):
    SERVICE_LEVELS = [
        ('Рейнджер', 'Рейнджер'),
        ('Шкипер', 'Шкипер'),
        ('Капитан', 'Капитан'),
    ]

    service = models.ForeignKey(
        'Service', 
        related_name='variants', 
        on_delete=models.CASCADE,
        verbose_name="Основная услуга"
    )
    barber_level = models.CharField(
        max_length=20, 
        choices=SERVICE_LEVELS,
        verbose_name="Квалификация барбера"
    )
    price = models.DecimalField(
        max_digits=7, 
        decimal_places=2, 
        validators=[MinValueValidator(0)],
        verbose_name="Стоимость"
    )
    duration_minutes = models.PositiveIntegerField(
        validators=[MaxValueValidator(120)],
        verbose_name="Длительность (мин.)"
    )
    description = models.TextField(
        max_length=550, 
        blank=True, 
        verbose_name="Описание для этого уровня",
        help_text="Расскажите, чем отличается услуга у этого мастера"
    )

    class Meta:
        unique_together = ('service', 'barber_level')
        verbose_name = "Вариант услуги"
        verbose_name_plural = "Варианты услуг"
        ordering = ['price'] 

    def __str__(self):
        return f"{self.service.name} — {self.barber_level}"