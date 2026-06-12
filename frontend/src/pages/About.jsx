import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import PageTitle from "../components/PageTitle/PageTitle";
import { FaCheckCircle } from "react-icons/fa";
import "./About.scss";
import Team from "../components/team/Team";

import skullImg from "../assets/images/about/skull_logo.png";
import shipImg from "../assets/images/about/ship_lagoon.jpg";
import slide1 from "../assets/images/about/slide1.jpg";
import slide2 from "../assets/images/about/slide2.jpg";
import slide3 from "../assets/images/about/slide3.jpg";
import slide4 from "../assets/images/about/slide4.png";
import slide5 from "../assets/images/about/slide5.jpg";
import photoLeft from "../assets/images/about/photo_left.jpg";
import photoRight from "../assets/images/about/photo_right.jpg";
import dividerImg from "../assets/images/about/divider.png";

const slides = [slide1, slide2, slide3, slide4, slide5];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-page">
      <PageTitle title="О НАС" />

      {/* СЕКЦИЯ 1: НАШ ПОДХОД */}
      <section className="about-hero" ref={heroRef}>
        <div className="container">
          <div className="about-hero__grid">
            {/* ШТУРВАЛ */}
            <div className="about-hero__logo">
              <motion.img
                src={skullImg}
                alt="Van Blade Logo"
                animate={{
                  rotate: [-10, 10, -10],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* ПРАВАЯ ВЕРХНЯЯ ЧАСТЬ */}
            <div className="about-hero__block-top-right">
              <h3 className="about-hero__subtitle">НАШ ПОДХОД</h3>
              <p>
                Это место создано для тех, кто ценит время, порядок и высокий
                стандарт обслуживания. Здесь не объясняют, что такое хороший
                подход — его просто соблюдают на каждом этапе.
              </p>
            </div>

            {/* ЛЕВАЯ НИЖНЯЯ ЧАСТЬ */}
            <div className="about-hero__block-bottom-left">
              <p>
                Команда состоит из специалистов разного уровня подготовки — от
                уверенной базовой работы до максимально точного и
                профессионального исполнения. Это система, которая позволяет
                каждому выбрать свой уровень качества и внимания.
              </p>
              <p>
                Мы работаем собранно, ответственно и всегда с одной целью —
                чтобы клиент остался доволен результатом.
              </p>
            </div>
          </div>
        </div>

        {/* КОРАБЛЬ */}
        <div className="about-hero__ship">
          <img src={shipImg} alt="" className="ship-background-element" />
        </div>
      </section>

      {/* СЕКЦИЯ 2: УНИКАЛЬНОЕ ПРОСТРАНСТВО*/}
      <section className="about-atmosphere">
        <div className="container about-atmosphere__grid">
          {/* 1. Заголовок */}
          <h2 className="about-atmosphere__title">Уникальное пространство</h2>

          {/* 2. Текст Часть 1 */}
          <div className="about-atmosphere__text-1">
            <p>
              Здесь каждая деталь создаёт настроение спокойной уверенности.
              Воздух наполнен лёгкими древесными нотами и ощущением сдержанной
              силы, которое чувствуется сразу, без лишних слов.
            </p>
          </div>

          {/* 3. Квадратный Слайдер */}
          <div className="about-atmosphere__slider">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentSlide}
                src={slides[currentSlide]}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  x: { type: "tween", ease: "easeInOut", duration: 0.8 },
                }}
                className="atmosphere-image"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </AnimatePresence>
            <div className="slider-overlay"></div>
          </div>

          {/* 4. Текст Часть 2 */}
          <div className="about-atmosphere__text-2">
            <p>
              Это пространство про тишину в нужный момент и внимание к человеку.
              Здесь не спешат и не отвлекаются — здесь работают точно, спокойно
              и с уважением к тому, кто в кресле.
            </p>
          </div>

          {/* 5. Декоративная цитата */}
          <div className="about-atmosphere__accent-text">
            Место, где всё происходит в своём ритме.
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ 3: ОСОБЕННОСТИ */}
      <section className="about-features">
        <div className="container">
          <div className="features-grid">
            <div className="features-col left-side">
              <h2 className="features-title">
                ДВИЖЕНИЕ <br /> В СТОРОНУ <br /> СТИЛЯ.
              </h2>
              <div className="image-wrapper main-img">
                <img src={photoLeft} alt="Barber at work" />
              </div>
            </div>

            <div className="features-col">
              <div className="image-wrapper side-img">
                <img src={photoRight} alt="Barbershop interior" />
              </div>

              <div className="features-info-card">
                <div className="card-top">
                  <h4 className="info-title">Почему выбирают нас?</h4>
                  <p className="info-subtitle">
                    Не за обещания и формулировки, а за стабильный результат и
                    понятный подход к работе.
                  </p>
                  <ul className="features-list">
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>Честная работа без навязывания лишних услуг</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>
                        Понятная система уровней специалистов без случайности
                      </span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>Точная работа с вниманием к деталям</span>
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" />
                      <span>
                        Стабильный результат без необходимости исправлений
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="premium-divider-png">
                  <img src={dividerImg} alt="decorative divider" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Team />
    </div>
  );
};

export default About;
