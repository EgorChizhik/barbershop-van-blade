from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Barber
from .serializers import BarberSerializer
from rest_framework import generics
from .models import TimeSlot
from .serializers import TimeSlotSerializer


class BarberViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Barber.objects.all()
    serializer_class = BarberSerializer


class BarberTimeSlotListView(generics.ListAPIView):
    serializer_class = TimeSlotSerializer

    def get_queryset(self):
        barber_id = self.kwargs.get("barber_id")

        return TimeSlot.objects.filter(barber_id=barber_id, is_booked=False).order_by(
            "date", "time"
        )
