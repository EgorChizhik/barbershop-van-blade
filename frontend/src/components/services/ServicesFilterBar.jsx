import { useState, useRef, useEffect } from "react";
import "./ServicesFilterBar.scss";

const LEVELS = [
  { id: "Матрос", title: "Матрос" },
  { id: "Шкипер", title: "Шкипер" },
  { id: "Капитан", title: "Капитан" },
];

const ServicesFilterBar = ({ activeLevel, onLevelChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const dropdownRef = useRef(null);

  const activeIndex = LEVELS.findIndex((level) => level.id === activeLevel);
  const activeLevelData = LEVELS[activeIndex];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAnimating(true);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    setIsAnimating(false);
    onLevelChange(id);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  const lineStyle = {
    width: `${100 / LEVELS.length}%`,
    transform: `translateX(${activeIndex * 100}%)`,
    transition: "transform 0.3s ease",
  };

  return (
    <div 
      className={`services-filter 
        ${isOpen ? "is-open" : ""} 
        ${isAnimating ? "with-animation" : ""}`} 
      ref={dropdownRef}
    >
      {/* Мобильная фронтальная лестница */}
      <div className="services-filter__mobile-zone">
        <div className="services-filter__trigger" onClick={toggleMenu}>
          <span className="trigger__title">{activeLevelData.title}</span>
          <span className="trigger__arrow"></span>
        </div>

        <div className="services-filter__ladder">
          {LEVELS.map((level, index) => (
            <div
              key={level.id}
              className={`ladder-step step-${index + 1} ${activeLevel === level.id ? "active" : ""}`}
              onClick={() => handleSelect(level.id)}
            >
              <span className="ladder-step__title">{level.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="services-filter__desktop-container">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className={`filter-item ${activeLevel === level.id ? "active" : ""}`}
            onClick={() => onLevelChange(level.id)}
          >
            <h3 className="filter-item__title">{level.title}</h3>
            <p className="filter-item__desc">
              {level.id === "Матрос" && "Классические решения с вниманием к каждой детали."}
              {level.id === "Шкипер" && "Опытный мастер для сложных форм и точной работы."}
              {level.id === "Капитан" && "Индивидуальный подход для тех, кто ценит безупречный результат."}
            </p>
          </div>
        ))}
        <div className="filter-line" style={lineStyle} />
      </div>
    </div>
  );
};

export default ServicesFilterBar;