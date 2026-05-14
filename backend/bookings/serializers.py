from rest_framework import serializers
from .models import Appointment
from barbers.models import TimeSlot


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

    def validate(self, data):
        barber    = data.get('barber')
        date      = data.get('date')
        time_slot = data.get('time_slot')

        slot_exists = TimeSlot.objects.filter(
            barber=barber,
            date=date,
            time=time_slot,
            is_booked=False,
        ).exists()

        if not slot_exists:
            raise serializers.ValidationError(
                "Этот слот уже занят или не существует. Пожалуйста, выберите другое время."
            )

        return data