from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, FileExtensionValidator
from django.core.exceptions import ValidationError
from barbers.models import Barber


def validate_image_size(value):
    """Проверка размера изображения (макс. 5MB)"""
    max_size = 5 * 1024 * 1024  # 5MB в байтах
    if value.size > max_size:
        raise ValidationError('Размер изображения не должен превышать 5MB')
    return value


class Category(models.Model):
    """Категория услуги"""
    name = models.CharField(max_length=100, verbose_name="Name")
    slug = models.SlugField(unique=True, verbose_name="Slug")
    icon = models.CharField(max_length=50, blank=True, help_text="Icon identifier")

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Service(models.Model):
    BARBER_LEVELS = [
        ('ranger', 'Рейнджер'),
        ('skipper', 'Шкипер'),
        ('captain', 'Капитан'),
    ]

    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='services', verbose_name="Категория")
    barber = models.ForeignKey(Barber, on_delete=models.SET_NULL, null=True, blank=True, related_name='services', verbose_name="Исполнитель (Барбер)")
    name = models.CharField(max_length=150, verbose_name="Название")
    slug = models.SlugField(unique=True, verbose_name="URL-идентификатор")
    subtitle = models.CharField(max_length=120, blank=True, help_text="Креативный подзаголовок (1-2 предложения)", verbose_name="Подзаголовок")
    description = models.TextField(max_length=600, help_text="Описание услуги (до 600 символов)", verbose_name="Описание")
    duration_minutes = models.PositiveIntegerField(
        default=30,
        validators=[MinValueValidator(15), MaxValueValidator(120)],
        verbose_name="Длительность (минуты)",
        help_text="От 15 до 120 минут"
    )
    price = models.DecimalField(max_digits=7, decimal_places=2, validators=[MinValueValidator(0)], verbose_name="Цена (₽)")
    image = models.ImageField(
        upload_to='services/',
        blank=True,
        null=True,
        verbose_name="Фото услуги",
        validators=[validate_image_size, FileExtensionValidator(['jpg', 'jpeg', 'png', 'webp'])]
    )
    barber_level = models.CharField(max_length=20, choices=BARBER_LEVELS, default='ranger', verbose_name="Уровень квалификации")
    is_active = models.BooleanField(default=True, verbose_name="Активна?")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['barber_level', 'name']
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

    def __str__(self):
        return f"{self.name} ({self.barber_level})"
