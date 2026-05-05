import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useWorks } from "../../hooks/useWorks";
import { BASE_URL } from "../../utils/api";
import "./WorksPreview.scss";

const WorksPreview = () => {
  const { data: works, isLoading } = useWorks();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const trackRef = useRef(null);

  const sliderWorks = works?.filter((w) => w.show_on_home).slice(0, 12) || [];
  const totalWorks = sliderWorks.length;
  const getVisibleSlides = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1200) return 2;
    return 3;
  };

  const visibleSlides = getVisibleSlides();
  const maxIndex = Math.max(0, totalWorks - visibleSlides);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = () =>
    currentIndex < maxIndex && setCurrentIndex((prev) => prev + 1);
  const handlePrev = () =>
    currentIndex > 0 && setCurrentIndex((prev) => prev - 1);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("http") ? imagePath : `${BASE_URL}${imagePath}`;
  };
  const getSlideClass = (index) => {
    const isBeforeVisible = index < currentIndex;
    const isAfterVisible = index >= currentIndex + visibleSlides;
    const isVisible =
      index >= currentIndex && index < currentIndex + visibleSlides;

    if (isVisible) return "is-visible";
    if (isBeforeVisible && index === currentIndex - 1) return "is-prev";
    if (isAfterVisible && index === currentIndex + visibleSlides)
      return "is-next";
    return "is-hidden";
  };

  if (isLoading || totalWorks === 0) return null;

  return (
    <section className="works-preview">
      <div className="container">
        <div className="works-preview__content">
          <div className="works-preview__header">
            <h2 className="works-preview__title">НАШИ РАБОТЫ</h2>
            <p className="works-preview__subtitle">
              Взгляните на результат работы наших мастеров.
            </p>
          </div>

          <div className="works-preview__slider-wrapper">
            <button
              className="slider-arrow slider-arrow--left"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                <path
                  d="M25 10L15 20L25 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="works-slider">
              <div
                className="works-slider__track"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                }}
              >
                {sliderWorks.map((work, index) => (
                  <div
                    key={work.id}
                    className={`works-slide ${getSlideClass(index)}`}
                    style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                  >
                    <div className="works-slide__inner">
                      <img
                        src={getImageUrl(work.image)}
                        alt={work.title}
                        className="works-slide__image"
                      />
                      <div className="works-slide__overlay" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="slider-arrow slider-arrow--right"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
            >
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                <path
                  d="M15 10L25 20L15 30"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="works-preview__footer">
          <Link to="/works" className="works-preview__cta">
            <span className="cta__text">ПОСМОТРЕТЬ ВСЕ РАБОТЫ</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorksPreview;
