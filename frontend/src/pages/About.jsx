import React, { useState, useEffect, useRef } from "react"; // Добавил useRef
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion"; // Добавил хуки скролла
import PageTitle from "../components/PageTitle/PageTitle";
import "./About.scss";

import skullImg from "../assets/images/about/skull_logo.png";
import shipImg from "../assets/images/about/ship_lagoon.png";
import slide1 from "../assets/images/about/slide1.jpg";
import slide2 from "../assets/images/about/slide2.jpg";
import slide3 from "../assets/images/about/slide3.jpg";
import slide4 from "../assets/images/about/slide4.jpg";
import slide5 from "../assets/images/about/slide5.jpg";
import anchorImg from "../assets/images/about/anchor.png";

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


      <section className="about-hero" ref={heroRef}>
        <div className="container">
          <div className="about-hero__grid">
            <div className="about-hero__logo">
              
              <motion.img
                style={{ rotate }} 
                src={skullImg}
                alt="Van Blade Logo"
              />
            </div>

            <div className="about-hero__manifesto">
              <h3 className="about-hero__subtitle">КОДЕКС ЭКИПАЖА</h3>
              <div className="about-hero__text-content">
                <p>
                  Van Blade — это не просто парикмахерская. Это тихая гавань для
                  тех, кто знает цену своему времени и стилю. Мы собрали лучших
                  мастеров, которых называем Рейнджерами, Шкиперами и
                  Капитанами, чтобы каждый визит превращался в ритуал.
                </p>
                <p>
                  Наш штурвал повернут в сторону вечных традиций мужского
                  груминга, но наши паруса полны ветра современных трендов.
                </p>
              </div>
            </div>

            <div className="about-hero__ship">
              <img src={shipImg} alt="" className="ship-background-element" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-atmosphere">
        <div className="container">
          <div className="about-atmosphere__grid">
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

            <div className="about-atmosphere__content">
              <h2>Уникальное пространство</h2>
              <p>
                Мы создали место, где каждая деталь интерьера рассказывает
                историю. Здесь запах дорогого табака и кожи смешивается с гулом
                профессиональных инструментов.
              </p>
              <p>
                В Van Blade мы ценим приватность и комфорт. Это не просто
                стрижка — это время, проведенное в кругу своих.
              </p>
              <div className="about-atmosphere__accent-text">
                Ваша гавань. Ваши правила.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-code-section">
        <div className="container">
          <div className="quote-grid">
            <div className="quote-wrapper">
              <div className="gold-frame">
                <span className="big-quote-mark">“</span>
                <div className="quote-text">
                  <blockquote>
                    Мы не просто стрижем бороды — мы куем характер. В каждом
                    движении лезвия — верность традициям и уважение к вашей
                    истории.
                  </blockquote>
                  <cite>— Van Blade</cite>
                </div>
                <span className="big-quote-mark-end">”</span>
              </div>
            </div>

            <div className="visual-block">
              <div className="image-container">
                <img src={anchorImg} alt="Anchor" className="anchor-pic" />
                <div className="gold-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
