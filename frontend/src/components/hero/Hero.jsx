import "./Hero.scss";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useHairstyleSwitcher from "../../hooks/useHairstyleSwitcher";
import { useBooking } from "../../context/BookingContext";

import hairstyle1 from "../../assets/images/hero/hairstyle_1.webp";
import hairstyle2 from "../../assets/images/hero/hairstyle_2.webp";
import hairstyle3 from "../../assets/images/hero/hairstyle_3.webp";
import hairstyle4 from "../../assets/images/hero/hairstyle_4.webp";
import hairstyle5 from "../../assets/images/hero/hairstyle_5.webp";
import hairstyle6 from "../../assets/images/hero/hairstyle_6.webp";
import hairstyle7 from "../../assets/images/hero/hairstyle_7.webp";

import arrowLeft from "../../assets/images/hero/arrow_left.png";
import arrowRight from "../../assets/images/hero/arrow_right.png";

const images = [
  hairstyle1,
  hairstyle2,
  hairstyle3,
  hairstyle4,
  hairstyle5,
  hairstyle6,
  hairstyle7,
];

const Hero = () => {
  const { openBooking } = useBooking();
  const { currentIndex, handleNext, handlePrev, isLoaded } = useHairstyleSwitcher(images, true);
  const [direction, setDirection] = useState("next");

  const onNext = useCallback(() => {
    setDirection("next");
    handleNext();
  }, [handleNext]);

  const onPrev = useCallback(() => {
    setDirection("prev");
    handlePrev();
  }, [handlePrev]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext]);

  const formatNumber = (num) => String(num + 1).padStart(2, "0");
  const stepHeight = 45;

  return (
    <section className="hero">
      {/* Левый боковой индикатор */}
      <div className="hero__lines-indicator-wrapper">
        <div className="hero__lines-indicator">
          <motion.div
            className="hero__lines-track"
            animate={{ y: -currentIndex * stepHeight }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`hero__line-item ${idx === currentIndex ? "active" : ""}`}
              >
                <motion.div
                  className="line-shape"
                  animate={{
                    width: idx === currentIndex ? 80 : 30 + (idx % 3) * 15,
                    opacity: Math.abs(idx - currentIndex) > 2 ? 0 : 1,
                  }}
                />
                {idx === currentIndex && (
                  <motion.span
                    className="line-number"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {formatNumber(idx)}/07
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="hero__container">
        <div className="hero__left-col-spacer"></div>

        {/* Главный заголовок вынесен отдельно для свободного перемещения вверх */}
        <h1 className="hero__title">
          Искусство
          <br />
          мужского
          <br />
          образа
        </h1>

        {/* Центральная интерактивная зона слайдера */}
        <div className="hero__center-col">
          <div className="hero__visual-unit">
            {/* Маленький счетчик  */}
            <div className="hero__counter-step">
              <span className="number">{formatNumber(currentIndex)}</span>
              <span className={`arrows ${direction}`}>
                {direction === "next" ? "> >" : "< <"}
              </span>
            </div>

            <div className="hero__model-display">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  draggable="false"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="hero__model-photo"
                />
              </AnimatePresence>
            </div>

            {/* Ручные стрелки управления */}
            <div className="hero__nav-controls">
              <button onClick={onPrev} disabled={!isLoaded} className="nav-btn">
                <img src={arrowLeft} alt="Предыдущая" className="nav-arrow-img" />
              </button>
              <button onClick={onNext} disabled={!isLoaded} className="nav-btn">
                <img src={arrowRight} alt="Следующая" className="nav-arrow-img" />
              </button>
            </div>
          </div>
        </div>

        {/* Блок контактов и кнопка действия */}
        <div className="hero__info-block">
          <div className="hero__contacts">
            <p className="highlight">Ульяновск · Рябикова, 61/37</p>
            <p className="highlight">10:00 — 20:00</p>
          </div>
          <div className="hero__tagline">
            <p className="sub">
              Место, где стиль <span>говорит раньше слов</span>
            </p>
          </div>

          <button className="hero__cta" onClick={() => openBooking()}>
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <span className="btn-text">Записаться онлайн</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;