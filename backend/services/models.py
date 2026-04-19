from django.db import models

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
    """Конкретная услуга в рамках категории"""
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="services")
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    duration_minutes = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} ({self.price} ₽)"