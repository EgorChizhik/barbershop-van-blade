from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Barber, TimeSlot
from datetime import date, time


class BarberAPITestCase(TestCase):
    """Тесты для API барберов"""

    def setUp(self):
        self.client = APIClient()
        
        # Создаем тестовых барберов
        self.barber_matros = Barber.objects.create(
            display_name="Иван Петров",
            level="Матрос",
            experience_months=6,
            bio="Начинающий барбер",
            is_available=True
        )
        
        self.barber_captain = Barber.objects.create(
            display_name="Алексей Смирнов",
            level="Капитан",
            experience_months=36,
            bio="Опытный мастер",
            is_available=True
        )
        
        # Создаем свободные временные слоты для Матроса
        TimeSlot.objects.create(
            barber=self.barber_matros,
            date=date(2026, 6, 15),
            time=time(10, 0),
            is_booked=False
        )
        TimeSlot.objects.create(
            barber=self.barber_matros,
            date=date(2026, 6, 15),
            time=time(11, 0),
            is_booked=False
        )
        
        # Создаем занятый слот
        TimeSlot.objects.create(
            barber=self.barber_matros,
            date=date(2026, 6, 15),
            time=time(14, 0),
            is_booked=True
        )

    def test_get_barbers_list(self):
        """Тест получения списка всех барберов"""
        response = self.client.get('/api/barbers/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_barber(self):
        """Тест создания нового барбера"""
        barber_data = {
            'display_name': 'Дмитрий Иванов',
            'level': 'Шкипер',
            'experience_months': 18,
            'bio': 'Барбер среднего уровня',
            'is_available': True
        }
        
        response = self.client.post('/api/barbers/', barber_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Barber.objects.count(), 3)
        
        new_barber = Barber.objects.get(display_name='Дмитрий Иванов')
        self.assertEqual(new_barber.level, 'Шкипер')

    def test_get_available_time_slots(self):
        """Тест получения свободных слотов конкретного барбера"""
        response = self.client.get(f'/api/barbers/{self.barber_matros.id}/slots/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        
        # Проверяем, что занятый слот не возвращается
        for slot in response.data:
            self.assertFalse(slot['is_booked'])

    def test_experience_display_property(self):
        """Тест вычисляемого свойства experience_display"""
        # 6 месяцев
        self.assertEqual(self.barber_matros.experience_display, "6 месяцев")
        
        # 36 месяцев = 3 года
        self.assertEqual(self.barber_captain.experience_display, "3 года")
        
        # Создаем барбера с 1 годом и 2 месяцами
        barber_test = Barber.objects.create(
            display_name="Тест",
            level="Матрос",
            experience_months=14
        )
        self.assertEqual(barber_test.experience_display, "1 год 2 месяца")

    def test_timeslot_unique_constraint(self):
        """Тест уникальности слота (барбер + дата + время)"""
        with self.assertRaises(Exception):
            TimeSlot.objects.create(
                barber=self.barber_matros,
                date=date(2026, 6, 15),
                time=time(10, 0),
                is_booked=False
            )