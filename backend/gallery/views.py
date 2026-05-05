from rest_framework import viewsets
from .models import Work
from .serializers import WorkSerializer

class WorkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        on_home = self.request.query_params.get('on_home')
        if on_home == 'true':
            return queryset.filter(show_on_home=True)[:10]
        return queryset