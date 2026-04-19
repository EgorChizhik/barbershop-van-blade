from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Barber
from .serializers import BarberSerializer

class BarberViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  
    queryset = Barber.objects.all()  
    serializer_class = BarberSerializer  