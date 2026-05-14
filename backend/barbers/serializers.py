from rest_framework import serializers
from .models import Barber
from .models import TimeSlot

class BarberSerializer(serializers.ModelSerializer):
    experience_display = serializers.ReadOnlyField()

    class Meta:
        model = Barber
        fields = [
            'id', 'display_name', 'level', 'experience_months', 
            'experience_display', 'avatar', 'bio', 'is_available'
        ]

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'date', 'time', 'is_booked']