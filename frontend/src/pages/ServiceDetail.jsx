import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useServiceDetail } from "../hooks/useServiceDetail";
import { useBooking } from "../context/BookingContext";
import "./ServiceDetail.scss";

import sailorImg from "../assets/images/detail_page/van_blade_sailor_bg.jpg";
import skipperImg from "../assets/images/detail_page/van_blade_skipper_bg.jpg";
import captainImg from "../assets/images/detail_page/van_blade_captain_bg.jpg";

const ServiceDetail = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: service, isLoading, isError } = useServiceDetail(slug);
  const [activeLevel, setActiveLevel] = useState("");

  const { openBooking } = useBooking();

  const levelImages = {
    Матрос: sailorImg,
    Шкипер: skipperImg,
    Капитан: captainImg,
  };

  useEffect(() => {
    if (service?.variants?.length > 0) {
      const urlLevel = searchParams.get("level");
      const validLevel = service.variants.some(
        (v) => v.barber_level === urlLevel,
      )
        ? urlLevel
        : service.variants[0].barber_level;
      setActiveLevel(validLevel);
    }
  }, [service, searchParams]);

  const scrollToServices = () => {
    document
      .getElementById("qualifiers-grid")
      .scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) return <div className="page-loader">⚓ Готовим палубу...</div>;
  if (isError || !service)
    return <div className="page-error">Услуга не найдена.</div>;

  return (
    <div className="service-detail-page">
      <section
        className="service-hero"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="service-hero__overlay">
          <motion.div
            className="service-hero__container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="service-hero__label">Услуга для вас</span>
            <h1 className="service-hero__title">Мы лучше знаем ваш стиль</h1>

            <motion.div
              className="service-hero__arrow"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={scrollToServices}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M7 13l5 5 5-5M7 6l5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* МОБИЛЬНЫЕ ТАБЫ (Отображаются только до 1024px) */}
      <section className="mobile-tabs-section">
        <div className="mobile-tabs-container">
          <div className="mobile-tabs">
            {service.variants.map((variant) => (
              <button
                key={`tab-${variant.barber_level}`}
                className={`mobile-tab ${activeLevel === variant.barber_level ? "is-active" : ""}`}
                onClick={() => setActiveLevel(variant.barber_level)}
              >
                {variant.barber_level}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="qualifiers-section" id="qualifiers-grid">
        <div className="qualifiers-grid">
          {service.variants.map((variant) => {
            const isActive = activeLevel === variant.barber_level;

            return (
              <div
                key={variant.barber_level}
                className={`variant-card ${isActive ? "is-active" : ""}`}
              >
                <div className="variant-card__top">
                  <h3 className="variant-card__level">
                    {variant.barber_level}
                  </h3>
                  <p className="variant-card__cat">{service.category_name}</p>
                </div>

                <div className="variant-card__main">
                  <AnimatePresence mode="wait">
                    {!isActive ? (
                      <motion.div
                        key="preview"
                        className="variant-card__preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="variant-card__image-container">
                          <img
                            src={
                              levelImages[variant.barber_level] ||
                              "/assets/images/default_bg.jpg"
                            }
                            alt={variant.barber_level}
                            className="variant-card__image-bg"
                          />
                          <div className="variant-card__image-overlay"></div>
                        </div>

                        <button
                          className="variant-card__more-btn"
                          onClick={() => setActiveLevel(variant.barber_level)}
                        >
                          Подробнее
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="info"
                        className="variant-card__info"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h4 className="variant-card__service-name">
                          {service.name}
                        </h4>

                        {/* ОБЕРТКА ДЛЯ БЕЗОПАСНОГО СКРОЛЛА */}
                        <div className="variant-card__desc-wrap">
                          <p className="variant-card__description">
                            {variant.description || service.description}
                          </p>
                        </div>

                        <div className="variant-card__price">
                          {Math.floor(variant.price)} ₽
                        </div>
                        <button
                          className="variant-card__book-btn"
                          onClick={() =>
                            openBooking({
                              service: service,
                              variant: variant,
                            })
                          }
                        >
                          Записаться
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
