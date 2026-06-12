import io
from PIL import Image
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Work


class GalleryAPITestCase(TestCase):
    """Тесты для API галереи работ"""

    def setUp(self):
        self.client = APIClient()

        def create_test_image(name):
            bts = io.BytesIO()
            img = Image.new("RGB", (10, 10), color="white")
            img.save(bts, format="JPEG")
            bts.seek(0)
            return SimpleUploadedFile(
                name=name,
                content=bts.read(),
                content_type='image/jpeg'
            )
        
        Work.objects.create(
            image=create_test_image('square.jpg'),
            image_type='square',
            show_on_home=True,
            order=1
        )
        
        Work.objects.create(
            image=create_test_image('big.jpg'),
            image_type='big',
            show_on_home=True,
            order=2
        )

        Work.objects.create(
            image=create_test_image('horizontal.jpg'),
            image_type='horizontal',
            show_on_home=False,
            order=3
        )

    def test_get_all_works(self):
        """Тест получения всех работ из галереи"""
        response = self.client.get('/api/gallery/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_filter_works_for_homepage(self):
        """Тест фильтрации работ для отображения на главной странице"""
        response = self.client.get('/api/gallery/?on_home=true')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        
        for work in response.data:
            self.assertTrue(work['show_on_home'])