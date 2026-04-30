import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  useEffect(() => {
    const container = document.getElementById('yandex-map-anchor');
    
    if (container && container.children.length === 0) {
      const script = document.createElement('script');
      script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aac3d2c50a1f204c1d003b82c07035dce4baccb28c365ecbd218a09e65fc828ad&width=100%25&height=600&lang=ru_RU&scroll=true";
      script.type = "text/javascript";
      script.charset = "utf-8";
      script.async = true;

      container.appendChild(script);
    }
  }, []);

  return (
    <footer className="footer">
      <section className="footer__marquee">
        <div className="footer-marquee__track">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="footer-marquee__text">
              Добро пожаловать в мир Van Blade
            </span>
          ))}
        </div>
      </section>

      <section className="footer__map-section">
        <div className="footer__map-container" id="yandex-map-anchor"></div>

        <div className="footer__floating-card">
          <div className="floating-card__brand">
            <div className="floating-card__logo">LOGO</div>
            <p className="floating-card__desc">
              Премиальный барберинг с морским характером. Мы создаем не просто прически, а историю вашего стиля.
            </p>
          </div>
          
          <div className="floating-card__contacts">
            <div className="contact-item">
              <span className="contact-item__label">Адрес</span>
              <p>Камышинская ул., 135, г. Ульяновск</p>
            </div>
            <div className="contact-item">
              <span className="contact-item__label">Связь</span>
              <p>+7 (999) 123-45-67</p>
              <p>ahoy@vanblade.ru</p>
            </div>
            <div className="contact-item">
              <span className="contact-item__label">График</span>
              <p>ПН-ПТ: 10:00 — 19:00</p>
              <p>СБ: Выходной / ВС: 10:00 — 19:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="footer__bottom">
        <div className="footer__bottom-container">
          <nav className="footer__bottom-nav">
            <Link to="/services">Услуги</Link>
            <Link to="/about">О нас</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/gallery">Работы</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
          
          <div className="footer__divider"></div>
          
          <div className="footer__copyright">
            © «Van Blade» {new Date().getFullYear()} г. Все права защищены.
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;