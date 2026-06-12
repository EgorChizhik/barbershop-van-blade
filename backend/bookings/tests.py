from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Appointment
from barbers.models import Barber, TimeSlot
from services.models import Category, Service, ServiceVariant
from datetime import date, time


class BookingAPITestCase(TestCase):
    """Тесты для онлайн-записи"""

    def setUp(self):
        self.client = APIClient()
        
        # Создаем барбера
        self.barber = Barber.objects.create(
            display_name="Иван Петров",
            level="Матрос",
            is_available=True
        )
        
        # Создаем категорию и услугу
        self.category = Category.objects.create(
            name="Стрижки",
            slug="strizhki"
        )
        
        self.service = Service.objects.create(
            name="Мужская стрижка",
            slug="muzhskaya-strizhka",
            category=self.category,
            is_active=True
        )
        
        self.service_variant = ServiceVariant.objects.create(
            service=self.service,
            barber_level="Матрос",
            price=1500.00,
            duration_minutes=60
        )
        
        # Создаем свободный временной слот
        self.free_slot = TimeSlot.objects.create(
            barber=self.barber,
            date=date(2026, 6, 15),
            time=time(10, 0),
            is_booked=False
        )
        
        # Создаем уже занятый слот
        self.booked_slot = TimeSlot.objects.create(
            barber=self.barber,
            date=date(2026, 6, 15),
            time=time(14, 0),
            is_booked=True
        )

    def test_create_appointment_success(self):
        """Тест успешного создания записи на свободный слот"""
        appointment_data = {
            'client_name': 'Алексей Иванов',
            'barber': self.barber.id,
            'services': [self.service.id],
            'date': '2026-06-15',
            'time_slot': '10:00:00',
            'total_price': 1500.00,
            'phone': '+79001234567',
            'comment': 'Прошу записать меня'
        }
        
        response = self.client.post('/api/appointments/', appointment_data, format='json')
        
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            print("\n" + "="*50)
            print("ДЕТАЛИ ОШИБКИ В test_create_appointment_success:")
            print(response.data)
            print("="*50)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Appointment.objects.count(), 1)
        
        # Проверяем сохраненные данные
        appointment = Appointment.objects.first()
        self.assertEqual(appointment.client_name, 'Алексей Иванов')
        self.assertEqual(appointment.barber, self.barber)
        self.assertEqual(appointment.phone, '+79001234567')

    def test_timeslot_becomes_booked_after_appointment(self):
        """Тест блокировки слота после создания записи """
        self.assertFalse(self.free_slot.is_booked)
        
        appointment_data = {
            'client_name': 'Дмитрий Смирнов',
            'barber': self.barber.id,
            'services': [self.service.id],
            'date': '2026-06-15',
            'time_slot': '10:00:00',
            'total_price': 1500.00,
            'phone': '+79009876543'
        }
        
        response = self.client.post('/api/appointments/', appointment_data, format='json')
        
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            print("\n" + "="*50)
            print("ДЕТАЛИ ОШИБКИ В test_timeslot_becomes_booked_after_appointment:")
            print(response.data)
            print("="*50)
            
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        self.free_slot.refresh_from_db()
        self.assertTrue(self.free_slot.is_booked)

    def test_cannot_book_already_booked_slot(self):
        """Тест невозможности записи на уже занятый слот (валидация)"""
        appointment_data = {
            'client_name': 'Петр Сидоров',
            'barber': self.barber.id,
            'services': [self.service.id],
            'date': '2026-06-15',
            'time_slot': '14:00:00',
            'total_price': 1500.00,
            'phone': '+79005554433'
        }
        
        response = self.client.post('/api/appointments/', appointment_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Appointment.objects.count(), 0)

    def test_cannot_book_nonexistent_slot(self):
        """Тест невозможности записи на несуществующий слот"""
        appointment_data = {
            'client_name': 'Тест Тестов',
            'barber': self.barber.id,
            'services': [self.service.id], 
            'date': '2026-06-15',
            'time_slot': '23:00:00',
            'total_price': 1500.00,
            'phone': '+79001111111'
        }
        
        response = self.client.post('/api/appointments/', appointment_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_appointment_missing_required_fields(self):
        """Тест валидации обязательных полей при создании записи"""
        incomplete_data = {
            'client_name': 'Только Имя',
        }
        
        response = self.client.post('/api/appointments/', incomplete_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Appointment.objects.count(), 0)

    def test_get_appointments_list(self):
        """Тест получения списка всех записей"""
        appointment = Appointment.objects.create(
            client_name='Тестовый Клиент',
            barber=self.barber,
            date=date(2026, 6, 15),
            time_slot=time(10, 0),
            total_price=1500.00,
            phone='+79001234567'
        )
        appointment.services.add(self.service)
        
        response = self.client.get('/api/appointments/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)