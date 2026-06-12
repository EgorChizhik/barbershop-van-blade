from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, Service, ServiceVariant
from barbers.models import Barber


class ServiceAPITestCase(TestCase):
    """Тесты для API услуг"""

    def setUp(self):
        self.client = APIClient()
        
        # Создаем категорию
        self.category = Category.objects.create(
            name="Стрижки",
            slug="strizhki"
        )
        
        # Создаем барбера
        self.barber = Barber.objects.create(
            display_name="Иван Петров",
            level="Матрос"
        )
        
        # Создаем услугу
        self.service = Service.objects.create(
            name="Мужская стрижка",
            slug="muzhskaya-strizhka",
            category=self.category,
            description="Классическая мужская стрижка",
            is_active=True
        )
        
        # Создаем варианты услуги для разных рангов
        self.variant_matros = ServiceVariant.objects.create(
            service=self.service,
            barber_level="Матрос",
            price=1500.00,
            duration_minutes=60
        )
        
        self.variant_captain = ServiceVariant.objects.create(
            service=self.service,
            barber_level="Капитан",
            price=2500.00,
            duration_minutes=60
        )

    def test_get_services_list(self):
        """Тест получения списка всех активных услуг"""
        response = self.client.get('/api/services/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Мужская стрижка')
        
        # Проверяем, что варианты включены в ответ
        self.assertIn('variants', response.data[0])
        self.assertEqual(len(response.data[0]['variants']), 2)

    def test_filter_services_by_barber_level(self):
        """Тест фильтрации услуг по рангу барбера"""
        # Фильтрация по уровню "Матрос"
        response = self.client.get('/api/services/?barber_level=Матрос')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
        # Фильтрация по уровню "Шкипер" (нет таких вариантов)
        response = self.client.get('/api/services/?barber_level=Шкипер')
        self.assertEqual(len(response.data), 0)

    def test_get_service_by_slug(self):
        """Тест получения детальной информации об услуге по slug"""
        response = self.client.get('/api/services/muzhskaya-strizhka/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Мужская стрижка')
        self.assertEqual(response.data['slug'], 'muzhskaya-strizhka')

    def test_service_variant_unique_constraint(self):
        """Тест уникальности варианта (услуга + ранг барбера)"""
        # Попытка создать дубликат варианта должна вызвать ошибку
        with self.assertRaises(Exception):
            ServiceVariant.objects.create(
                service=self.service,
                barber_level="Матрос",
                price=1800.00,
                duration_minutes=60
            )