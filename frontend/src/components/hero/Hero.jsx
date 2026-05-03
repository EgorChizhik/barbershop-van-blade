import "./Hero.scss";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useHairstyleSwitcher from "../../hooks/useHairstyleSwitcher";

import hairstyle1 from "../../assets/images/hero/hairstyle_1.png";
import hairstyle2 from "../../assets/images/hero/hairstyle_2.png";
import hairstyle3 from "../../assets/images/hero/hairstyle_3.png";
import hairstyle4 from "../../assets/images/hero/hairstyle_4.png";
import hairstyle5 from "../../assets/images/hero/hairstyle_5.png";
import hairstyle6 from "../../assets/images/hero/hairstyle_6.png";
import hairstyle7 from "../../assets/images/hero/hairstyle_7.png";

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
  const { currentIndex, handleNext, handlePrev, isLoaded } =
    useHairstyleSwitcher(images, false);
  const [direction, setDirection] = useState("next");

  const onNext = () => {
    setDirection("next");
    handleNext();
  };

  const onPrev = () => {
    setDirection("prev");
    handlePrev();
  };

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
        <div className="hero__left-col-spacer">
        </div>
        <div className="hero__center-col">
          <div className="hero__visual-unit">
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

            <div className="hero__nav-controls">
              <button onClick={onPrev} disabled={!isLoaded} className="nav-btn">
                <img
                  src={arrowLeft}
                  alt="Предыдущая"
                  className="nav-arrow-img"
                />
              </button>
              <button onClick={onNext} disabled={!isLoaded} className="nav-btn">
                <img
                  src={arrowRight}
                  alt="Следующая"
                  className="nav-arrow-img"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="hero__right-col">
          <h1 className="hero__title">
            Стильные
            <br />
            стрижки
            <br />
            для мужчин
          </h1>
          <div className="hero__contacts">
            <p className="highlight">(8422) 70-49-00</p>
            <p className="highlight">Камышинская ул., 135</p>
            <p className="highlight">10:00 — 19:00</p>
          </div>
          <div className="hero__tagline">
            <p className="sub">Вы думаете это обычная стрижка?</p>
            <p className="main">МЫ НЕ ПРОСТО СТРИЖЕМ. МЫ УДИВЛЯЕМ</p>
          </div>
          <button className="hero__cta">
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
