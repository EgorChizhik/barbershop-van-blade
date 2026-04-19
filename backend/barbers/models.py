from django.db import models
from django.conf import settings

class Barber(models.Model):
    """Профиль парикмахера"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="barber_profile")
    display_name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100, default="Master Barber")
    bio = models.TextField(blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.00)
    avatar = models.ImageField(upload_to='barbers/', blank=True, null=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-rating']

    def __str__(self):
        return self.display_name