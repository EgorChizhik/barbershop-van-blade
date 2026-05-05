import os
from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from django.utils.safestring import mark_safe
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

def validate_image_size(value):
    max_size = 5 * 1024 * 1024
    if value.size > max_size:
        raise ValidationError("Размер изображения не должен превышать 5MB")
    return value

class Work(models.Model):
    IMAGE_TYPES = [
        ('square', 'Базовый квадрат (1x1)'),
        ('big', 'Большой квадрат (2x2)'),
        ('horizontal', 'Горизонтальный (2x1)'),
        ('vertical', 'Вертикальный (1x2)'),
        ('long', 'Длинный вертикальный (1x3)'),
    ]

    image = models.ImageField(
        upload_to="gallery/",
        verbose_name="Фотография",
        validators=[
            validate_image_size,
            FileExtensionValidator(["jpg", "jpeg", "png", "webp"]),
        ],
    )
    image_type = models.CharField(
        max_length=15,
        choices=IMAGE_TYPES,
        default="square",
        verbose_name="Тип формата",
        help_text="Определяет, как фото впишется в сетку на сайте",
    )
    show_on_home = models.BooleanField(
        default=False,
        verbose_name="Показывать на главной",
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Порядок сортировки",
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления")

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Работа мастера"
        verbose_name_plural = "Наши работы"

    def __str__(self):
        return f"Работа #{self.id} — {self.get_image_type_display()}"

    def preview(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="70" height="70" style="object-fit: cover; border-radius: 4px;" />')
        return "Нет фото"
    preview.short_description = "Миниатюра"

    def preview_large(self):
        if self.image:
            return mark_safe(f'<img src="{self.image.url}" width="300" style="border-radius: 8px;" />')
        return "Нет фото"
    preview_large.short_description = "Предпросмотр"

    def save(self, *args, **kwargs):
        if self.image:
            img = Image.open(self.image)
            if img.mode != 'RGB':
                img = img.convert('RGB')

            ratios = {
                'square': 1.0,
                'big': 1.0,
                'horizontal': 2.0,
                'vertical': 0.5, # 1:2
                'long': 0.333     # 1:3
            }
            
            target_ratio = ratios.get(self.image_type, 1.0)
            img_w, img_h = img.size
            current_ratio = img_w / img_h

            if abs(current_ratio - target_ratio) > 0.01:
                if current_ratio > target_ratio:
                    new_w = int(img_h * target_ratio)
                    left = (img_w - new_w) // 2
                    img = img.crop((left, 0, left + new_w, img_h))
                else:
                    new_h = int(img_w / target_ratio)
                    top = (img_h - new_h) // 2
                    img = img.crop((0, top, img_w, top + new_h))

                buffer = BytesIO()
                img.save(buffer, format='JPEG', quality=88)
                filename = os.path.basename(self.image.name)
                self.image.save(filename, ContentFile(buffer.getvalue()), save=False)

        super().save(*args, **kwargs)