import { Link } from 'react-router-dom';
import React, { useMemo, useState } from "react";
import { useBooking } from "../../../context/BookingContext";
import {
  IoCalendarOutline,
  IoPencilSharp,
  IoCloseOutline,
  IoArrowBack,
} from "react-icons/io5";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import logo from "../../../assets/images/logo.png";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

const BookingStep4 = () => {
  const {
    selectedBarber,
    selectedServices,
    selectedDate,
    selectedTime,
    setCurrentStep,
    closeBooking,
  } = useBooking();

  const [isSuccess, setIsSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "+7 (",
    email: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});

  const handlePhoneInput = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.startsWith("7")) input = input.substring(1);
    if (input.length > 10) input = input.substring(0, 10);

    let result = "+7 (";
    if (input.length > 0) result += input.substring(0, 3);
    if (input.length >= 3) result += ") ";
    if (input.length > 3) result += input.substring(3, 6);
    if (input.length >= 6) result += "-";
    if (input.length > 6) result += input.substring(6, 8);
    if (input.length >= 8) result += "-";
    if (input.length > 8) result += input.substring(8, 10);

    setFormData((prev) => ({ ...prev, phone: result }));
  };

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value) error = "Введите имя";
      else if (!/^[а-яА-ЯёЁ\s-]+$/.test(value)) error = "Только кириллица";
      else if (value.length > 20) error = "Максимум 20 символов";
    }
    if (name === "email" && value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Некорректный email";
    }
    if (name === "phone") {
      if (value.replace(/\D/g, "").length < 11) error = "Введите полный номер";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const stats = useMemo(() => {
    const totalMinutes = selectedServices.reduce(
      (acc, s) =>
        acc +
        Number(s.duration_minutes || s.variants?.[0]?.duration_minutes || 0),
      0,
    );
    const totalPrice = selectedServices.reduce(
      (acc, s) => acc + Number(s.price || s.variants?.[0]?.price || 0),
      0,
    );

    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    const durationText = `${h > 0 ? h + " ч " : ""}${m > 0 ? m + " мин" : ""}`;

    let timeRange = selectedTime || "";
    if (selectedTime && totalMinutes > 0) {
      const [startH, startM] = selectedTime.split(":").map(Number);
      const endTotal = startH * 60 + startM + totalMinutes;
      const endH = String(Math.floor(endTotal / 60) % 24).padStart(2, "0");
      const endM = String(endTotal % 60).padStart(2, "0");
      timeRange = `${selectedTime.substring(0, 5)} – ${endH}:${endM}`;
    }

    return {
      durationText,
      totalPrice,
      timeRange,
      count: selectedServices.length,
    };
  }, [selectedServices, selectedTime]);

  const isFormValid =
    !errors.name &&
    !errors.phone &&
    formData.name.length > 1 &&
    formData.phone.replace(/\D/g, "").length === 11 &&
    agreed;

  const handleBooking = async () => {
    try {
      const response = await fetch(`${API_URL}/api/appointments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barber: selectedBarber.id,
          services: selectedServices.map((s) => s.id),
          date: format(selectedDate, "yyyy-MM-dd"),
          time_slot: selectedTime,
          client_name: formData.name,
          phone: formData.phone,
          comment: formData.comment,
          total_price: stats.totalPrice,
        }),
      });
      if (response.ok) setIsSuccess(true);
      else alert("Ошибка при сохранении записи");
    } catch {
      alert("Сервер недоступен");
    }
  };

  const handleReset = () => window.location.reload();

  if (isSuccess) {
    return (
      <div className="booking-success-overlay">
        <div className="success-modal">
          <button className="close-modal" onClick={handleReset}>
            <IoCloseOutline />
          </button>
          <h2>Вы успешно записались!</h2>
          <p>
            Барбер: <strong>{selectedBarber?.display_name}</strong>
          </p>
          <div className="success-details">
            <p>
              {selectedDate && format(selectedDate, "d MMMM", { locale: ru })} в{" "}
              {selectedTime}
            </p>
            <p>Сумма: {stats.totalPrice.toLocaleString()} ₽</p>
          </div>
          <button className="confirm-btn" onClick={handleReset}>
            Хорошо
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-details">
      {/* Шапка */}
      <div className="brand-header">
        <button className="header-back-btn" onClick={() => setCurrentStep(3)}>
          <IoArrowBack size={20} />
        </button>

        <Link>
          <img src={logo} alt="Van Blade" className="mini-logo" />
        </Link>
        <div className="contact-mini">
          ул. Рябикова, 61/37 | (8422) 41-22-14
        </div>
      </div>

      <h2 className="step-title">Детали записи</h2>

      <div className="step-content-scrollable">
        {/* Барбер */}
        <div className="review-card">
          <div className="card-main">
            <img
              src={selectedBarber?.avatar}
              alt=""
              className="barber-avatar"
            />
            <div className="barber-info">
              <span className="barber-name">
                {selectedBarber?.display_name}
              </span>
              <span className="barber-rank">{selectedBarber?.level}</span>
            </div>
            <button className="edit-icon" onClick={() => setCurrentStep(1)}>
              <IoPencilSharp />
            </button>
          </div>
        </div>

        {/* Дата */}
        <div className="review-card">
          <div className="card-main">
            <div className="icon-box">
              <IoCalendarOutline />
            </div>
            <div className="datetime-info">
              <span className="date-text">
                {selectedDate &&
                  format(selectedDate, "EEEE, d MMMM ", { locale: ru })}
                <span className="time-highlight">{stats.timeRange}</span>
              </span>
            </div>
            <button className="edit-icon" onClick={() => setCurrentStep(3)}>
              <IoPencilSharp />
            </button>
          </div>
        </div>

        {/* Услуги */}
        <div className="review-card services-review">
          <div className="card-header">
            <h3>
              Услуги ({stats.count}) <span>{stats.durationText}</span>
            </h3>
            <button className="edit-icon" onClick={() => setCurrentStep(2)}>
              <IoPencilSharp />
            </button>
          </div>
          <div className="services-list">
            {selectedServices.map((service) => {
              const displayPrice =
                service.price || service.variants?.[0]?.price || 0;
              return (
                <div key={service.id} className="service-item">
                  <span className="s-name">{service.name}</span>
                  <span className="s-dots" />
                  <span className="s-price">
                    {Number(displayPrice).toLocaleString()} ₽
                  </span>
                </div>
              );
            })}
          </div>
          <div className="total-row">
            <span>Итого</span>
            <span className="total-price">
              {stats.totalPrice.toLocaleString()} ₽
            </span>
          </div>
        </div>

        {/* Форма */}
        <div className="user-form">
          <h3>Ваши данные</h3>

          {[
            { field: "name", type: "text", placeholder: "Имя" },
            { field: "phone", type: "tel", placeholder: undefined },
            {
              field: "email",
              type: "email",
              placeholder: "E-mail (необязательно)",
            },
          ].map(({ field, type, placeholder }) => (
            <div
              key={field}
              className={`input-group ${errors[field] ? "has-error" : ""}`}
            >
              <input
                type={type}
                placeholder={placeholder}
                className="form-input"
                value={formData[field]}
                onChange={
                  field === "phone" ? handlePhoneInput : handleChange(field)
                }
                onBlur={(e) => validateField(field, e.target.value)}
              />
              {errors[field] && (
                <span className="error-text">{errors[field]}</span>
              )}
            </div>
          ))}

          <textarea
            placeholder="Комментарий к записи"
            className="form-input"
            rows="2"
            value={formData.comment}
            onChange={handleChange("comment")}
          />
        </div>

        <div className="final-actions">
          <label className="consent-label">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              Я даю согласие на{" "}
              <a href="/policy" target="_blank" rel="noreferrer">
                обработку персональных данных
              </a>
            </span>
          </label>

          <div className="final-sum">
            <span>Итого</span>
            <span>{stats.totalPrice.toLocaleString()} ₽</span>
          </div>

          <button
            className="booking-submit-btn"
            disabled={!isFormValid}
            onClick={handleBooking}
          >
            Записаться
          </button>

          <p className="legal-text">
            Нажимая на кнопку, я соглашаюсь с{" "}
            <a href="/terms" target="_blank" rel="noreferrer">
              Пользовательским соглашением
            </a>{" "}
            и{" "}
            <a href="/privacy" target="_blank" rel="noreferrer">
              Политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingStep4;
