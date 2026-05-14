import React, { useState, useMemo } from "react";
import { useBooking } from "../../../context/BookingContext";
import { useServices } from "../../../hooks/useServices";
import { IoSearch, IoChevronDown, IoChevronUp, IoCheckmark } from "react-icons/io5";
import BookingHeader from "./BookingHeader";

const BookingStep1 = () => {
  const { toggleService, selectedServices, nextStep } = useBooking();
  const { data, isLoading } = useServices(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const servicesData = data || [];

  const groupedByCategory = useMemo(() => {
    const filtered = servicesData.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.reduce((acc, service) => {
      const catName = service.category_name || "Другие услуги";
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(service);
      return acc;
    }, {});
  }, [servicesData, searchQuery]);

  const toggleCategory = (catName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  if (isLoading && servicesData.length === 0) {
    return <div className="loading-container">Загрузка услуг Van Blade...</div>;
  }

  return (
    <div className="step-services">
      <BookingHeader />

      <div className="step-services__body">
        <h2 className="step-title">Выбрать услуги</h2>

        <div className="search-box">
          <IoSearch />
          <input
            type="text"
            placeholder="Поиск услуги..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="categories-list">
          {Object.entries(groupedByCategory).map(([catName, services]) => (
            <div key={catName} className="category-item">
              <div
                className="category-item__header"
                onClick={() => toggleCategory(catName)}
              >
                <span>{catName}</span>
                {expandedCategories[catName] ? <IoChevronUp /> : <IoChevronDown />}
              </div>

              {expandedCategories[catName] && (
                <div className="category-item__services">
                  {services.map((service) => {
                    const isSelected = selectedServices.some((s) => s.id === service.id);
                    const prices = service.variants?.map((v) => parseFloat(v.price)) || [];
                    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
                    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

                    return (
                      <div
                        key={service.id}
                        className={`service-selection ${isSelected ? "is-selected" : ""}`}
                        onClick={() => toggleService(service)}
                      >
                        {service.image && (
                          <div className="service-selection__image">
                            <img
                              src={service.image}
                              alt={service.name}
                            />
                          </div>
                        )}

                        <div className="service-selection__info">
                          <h4>{service.name}</h4>
                          <p>{service.subtitle}</p>
                          <span className="price-tag">
                            {prices.length > 1 && minPrice !== maxPrice
                              ? `${minPrice} — ${maxPrice} ₽`
                              : `${minPrice} ₽`}
                          </span>
                        </div>

                        <div className="service-selection__checkbox">
                          {isSelected && <IoCheckmark style={{ color: "#0F1A2B", width: "100%" }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="step-services__footer">
        <div className="selected-count">
          Выбрано: <strong>{selectedServices.length}</strong>
        </div>
        <button
          className="next-btn"
          disabled={selectedServices.length === 0}
          onClick={nextStep}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default BookingStep1;