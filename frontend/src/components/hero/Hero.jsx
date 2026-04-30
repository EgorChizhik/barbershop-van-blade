import './Hero.scss';
import { useEffect, useState } from 'react';
import useHairstyleSwitcher from '../../hooks/useHairstyleSwitcher';

import hairstyle1 from '../../assets/images/hero/hairstyle_1.jpg';
import hairstyle2 from '../../assets/images/hero/hairstyle_2.jpg';
import hairstyle3 from '../../assets/images/hero/hairstyle_3.jpg';
import hairstyle4 from '../../assets/images/hero/hairstyle_4.jpg';
import hairstyle5 from '../../assets/images/hero/hairstyle_5.jpg';
import hairstyle6 from '../../assets/images/hero/hairstyle_6.jpg';
import hairstyle7 from '../../assets/images/hero/hairstyle_7.jpg';

const images = [
  hairstyle1, hairstyle2, hairstyle3, 
  hairstyle4, hairstyle5, hairstyle6, hairstyle7
];

const Hero = () => {
  const {
    currentIndex,
    handleNext,
    handlePrev,
    handleGoTo,
    isLoaded
  } = useHairstyleSwitcher(images, false);

  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevIndex(currentIndex);
    }, 800);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section className="hero" role="region">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">Стильные стрижки для мужчин</h1>
          <div className="hero__info">
            <p className="hero__phone">(8422) 70-49-00</p>
            <p className="hero__address">Камышинская ул., 135</p>
            <p className="hero__hours">10:00-19:00</p>
          </div>
          <button className="hero__cta" onClick={() => window.location.href = '/booking'}>
            Записаться онлайн
          </button>
        </div>

        <div className="hero__slider-wrapper">
          <div className="hero__model-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Стрижка ${index + 1}`}
                className={`hero__model-photo ${
                  index === currentIndex ? 'active' : index === prevIndex ? 'prev' : ''
                }`}
              />
            ))}
          </div>

          <div className="hero__controls">
            <button onClick={handlePrev} disabled={!isLoaded}>‹</button>
            <div className="hero__dots">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => handleGoTo(idx)}
                  disabled={!isLoaded}
                />
              ))}
            </div>
            <button onClick={handleNext} disabled={!isLoaded}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;