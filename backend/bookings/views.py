from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Appointment
from .serializers import AppointmentSerializer
from barbers.models import TimeSlot


class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        appointment = serializer.save()

        TimeSlot.objects.filter(
            barber=appointment.barber,
            date=appointment.date,
            time=appointment.time_slot,
        ).update(is_booked=True)