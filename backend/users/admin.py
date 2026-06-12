from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from unfold.admin import ModelAdmin

from .models import CustomUser  

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin, ModelAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'is_staff', 'is_barber')
    list_filter = ('is_staff', 'is_barber')
    
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительно', {'fields': ('phone', 'avatar', 'is_barber')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Дополнительно', {'fields': ('phone', 'avatar', 'is_barber')}),
    )