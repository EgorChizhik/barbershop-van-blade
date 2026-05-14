import React, { useMemo } from "react";
import { useBooking } from "../../../context/BookingContext";
import { useBarbers } from "../../../hooks/useBarbers";
import BookingHeader from "./BookingHeader";

const LEVEL_MAP = {
  Матрос: "Матросы",
  Шкипер: "Шкиперы",
  Капитан: "Капитаны",
};

const BookingStep2 = () => {
  const { selectedServices, selectedBarber, setSelectedBarber, nextStep } =
    useBooking();

  const { data: barbers } = useBarbers();

  const groupedBarbers = useMemo(() => {
    if (!barbers) return {};
    return barbers.reduce((acc, barber) => {
      const displayLevel =
        LEVEL_MAP[barber.level] ?? barber.level ?? "Матросы";
      if (!acc[displayLevel]) acc[displayLevel] = [];
      acc[displayLevel].push(barber);
      return acc;
    }, {});
  }, [barbers]);

  const calculateTotalForBarber = (barberLevel) => {
    return selectedServices.reduce((total, service) => {
      const variant = service.variants?.find(
        (v) => v.barber_level === barberLevel,
      );
      if (variant) return total + parseFloat(variant.price);
      if (service.variants?.length > 0) {
        const prices = service.variants.map((v) => parseFloat(v.price));
        return total + Math.min(...prices);
      }
      return total;
    }, 0);
  };

  return (
    <div className="step-barbers">
     
       <BookingHeader showBack />
      
      <div className="step-services__body">
        <h2 className="step-title">Выбрать специалиста</h2>

        <div className="barbers-list">
          {Object.entries(groupedBarbers).map(([levelName, list]) => (
            <div key={levelName} className="barber-level-group">
              <h3 className="level-badge">{levelName}</h3>

              {list.map((barber) => {
                const isSelected = selectedBarber?.id === barber.id;
                const totalPrice = calculateTotalForBarber(barber.level);

                return (
                  <div
                    key={barber.id}
                    className={`barber-card ${isSelected ? "is-selected" : ""}`}
                    onClick={() => setSelectedBarber(barber)}
                  >
                    <div className="barber-card__main">
                      <div className="barber-avatar">
                        <img
                          src={barber.avatar || "/default-avatar.png"}
                          alt={barber.name}
                        />
                      </div>
                      <div className="barber-info">
                        <h4>{barber.display_name}</h4>
                        <p>Стаж в Van Blade: {barber.experience_display}</p>
                      </div>
                    </div>

                    <div className="barber-card__footer">
                      <span className="total-label">Итого за услуги:</span>
                      <span className="total-price">{totalPrice} ₽</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="step-services__footer">
        <button
          className="next-btn"
          disabled={!selectedBarber}
          onClick={nextStep}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default BookingStep2;
