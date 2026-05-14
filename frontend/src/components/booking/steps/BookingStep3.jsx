import React, { useState, useMemo } from "react";
import { useBooking } from "../../../context/BookingContext";
import { useTimeSlots } from "../../../hooks/useTimeSlots";
import {
  IoChevronBack, IoChevronForward,
  IoCalendarOutline, IoArrowBack,
} from "react-icons/io5";
import {
  format, addMonths, subMonths,
  startOfMonth, endOfMonth,
  startOfWeek, endOfWeek,
  isSameMonth, isSameDay, addDays,
  isBefore, isAfter, startOfDay,
} from "date-fns";
import { ru } from "date-fns/locale";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const TODAY = startOfDay(new Date(2026, 4, 7));

const BookingStep3 = () => {
  const {
    selectedBarber,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    nextStep, prevStep,
  } = useBooking();

  const { data: slots = [], isLoading, isError } = useTimeSlots(selectedBarber?.id);
  const [viewDate, setViewDate] = useState(new Date(2026, 4, 7));

  const availableDates = useMemo(
    () => [...new Set(slots.map((slot) => slot.date))],
    [slots]
  );

  const groupedSlots = useMemo(() => {
    const groups = { Утро: [], День: [], Вечер: [] };
    if (!selectedDate || slots.length === 0) return groups;

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    slots
      .filter((s) => s.date === dateStr && !s.is_booked)
      .forEach((slot) => {
        const hour = parseInt(slot.time.split(":")[0]);
        const timeStr = slot.time.substring(0, 5);
        if (hour < 12) groups["Утро"].push(timeStr);
        else if (hour < 17) groups["День"].push(timeStr);
        else groups["Вечер"].push(timeStr);
      });

    return groups;
  }, [selectedDate, slots]);

  const handlePrevMonth = () => {
    const prev = subMonths(viewDate, 1);
    if (!isBefore(prev, subMonths(TODAY, 12))) setViewDate(prev);
  };

  const handleNextMonth = () => {
    const next = addMonths(viewDate, 1);
    if (!isAfter(next, addMonths(TODAY, 12))) setViewDate(next);
  };

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 });
    const days = [];
    let curr = start;
    while (isBefore(curr, end) || isSameDay(curr, end)) {
      days.push(curr);
      curr = addDays(curr, 1);
    }
    return days;
  }, [viewDate]);

  if (isLoading) return <div className="loading-container">Загружаем карту времени...</div>;
  if (isError) return <div className="error-container">Ошибка связи с маяком (Бэкендом)</div>;

  const hasSlots = Object.values(groupedSlots).some((g) => g.length > 0);

  return (
    <div className="step-datetime">

      <div className="step-cover-nav">
        <button className="header-back-btn" onClick={prevStep}>
          <IoArrowBack size={20} />
        </button>
      </div>

      <div className="step-datetime__body">
        <h2 className="step-title">Дата и время</h2>

        <div className="calendar-container">
          <div className="calendar-header">
            <span className="month-name">
              {format(viewDate, "LLLL yyyy", { locale: ru })}
            </span>
            <div className="calendar-nav">
              <button onClick={handlePrevMonth}><IoChevronBack /></button>
              <button onClick={handleNextMonth}><IoChevronForward /></button>
            </div>
          </div>

          <div className="calendar-grid">
            {WEEKDAYS.map((d) => (
              <div key={d} className="weekday">{d}</div>
            ))}
            {calendarDays.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, viewDate);
              const dateStr = format(day, "yyyy-MM-dd");
              const isAvailable = availableDates.includes(dateStr);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={idx}
                  className={[
                    "calendar-day",
                    !isCurrentMonth && "not-month",
                    isAvailable ? "available" : "disabled",
                    isSelected && "selected",
                  ].filter(Boolean).join(" ")}
                  onClick={() => {
                    if (isAvailable && isCurrentMonth) {
                      setSelectedDate(day);
                      setSelectedTime(null);
                    }
                  }}
                >
                  <span className="day-number">{format(day, "d")}</span>
                  {isAvailable && isCurrentMonth && <div className="available-dot" />}
                </div>
              );
            })}
          </div>
        </div>

        {selectedDate ? (
          <div className="time-selection">
            {hasSlots ? (
              Object.entries(groupedSlots).map(([period, times]) =>
                times.length > 0 && (
                  <div key={period} className="time-group">
                    <h4 className="period-title">{period}</h4>
                    <div className="time-grid">
                      {times.map((t) => (
                        <button
                          key={t}
                          className={`time-btn ${selectedTime === t ? "active" : ""}`}
                          onClick={() => setSelectedTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="no-slots-message">
                <IoCalendarOutline size={32} />
                <p>В этот день нет свободного времени</p>
                {availableDates.length > 0 && (
                  <small>
                    Ближайшая дата:{" "}
                    {format(new Date(availableDates[0]), "d MMMM", { locale: ru })}
                  </small>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="no-date-selected">
            <IoCalendarOutline size={40} />
            <p>Выберите свободную дату в календаре</p>
          </div>
        )}
      </div>

      {/* Футер */}
      <div className="step-services__footer">
        <button className="next-btn" disabled={!selectedTime} onClick={nextStep}>
          Продолжить
        </button>
      </div>

    </div>
  );
};

export default BookingStep3;