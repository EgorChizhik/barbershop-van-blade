import './Hero.scss';

const Hero = () => (
  <section className="hero">
    <div className="hero__container">
      <div className="hero__content">
        <h1 className="hero__title">Стильные стрижки для мужчин</h1>
        <div className="hero__info">
          <p className="hero__phone">(8422) 70-49-00</p>
          <p className="hero__address">Камышинская ул., 135</p>
          <p className="hero__hours">10:00-21:00</p>
        </div>
        <button className="hero__cta">Записаться онлайн</button>
      </div>
      <div className="hero__image">
        {/* Placeholder for man's photo with hairstyle */}
        <div className="image-placeholder">
          <span>Фото мастера</span>
          <small>(Смена причёсок — в разработке)</small>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
