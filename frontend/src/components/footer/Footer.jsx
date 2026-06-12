import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  useEffect(() => {
    const container = document.getElementById("yandex-map-anchor");

    if (container && container.children.length === 0) {
      const script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A0670847a35cf47d25fd327e84e46aba5d2ddf7e04343d1e313ab9039a46638a3&amp;width=100%25&amp;height=600&amp;lang=ru_RU&amp;scroll=true";
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
              VAN BLADE • ВЫСШАЯ КАТЕГОРИЯ МАСТЕРСТВА • КЛАССИЧЕСКАЯ ТЕХНИКА • ЭСТЕТИКА И ПОРЯДОК •
            </span>
          ))}
        </div>
      </section>

      <section className="footer__map-section">
        <div className="footer__map-container" id="yandex-map-anchor"></div>

        <div className="footer__floating-card">
          <div className="floating-card__brand">
            <div className="floating-card__logo">
              <Link to="/">
                <img src={logo} alt="Van Blade Logo" className="footer-logo-img" />
              </Link>
            </div>
            <p className="floating-card__desc">
              Премиальный барберинг с характером. Каждый визит — это
              продуманная работа над внешностью и финальным впечатлением.
            </p>
          </div>

          <div className="floating-card__contacts">
            <div className="contact-item">
              <span className="contact-item__label">АДРЕС</span>
              <p>г. Ульяновск, ул. Рябикова, 61/37</p>
              <p>Засвияжский район</p>
            </div>
            <div className="contact-item">
              <span className="contact-item__label">СВЯЗЬ</span>
              <p>+7 (917) 611-34-60</p>
              <p>info@vanblade.ru</p>
            </div>
            <div className="contact-item">
              <span className="contact-item__label">ГРАФИК</span>
              <p>Ежедневно</p>
              <p>10:00 — 20:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="footer__bottom">
        <div className="footer__bottom-container">
          <nav className="footer__bottom-nav">
            <Link to="/services">Услуги</Link>
            <Link to="/about">О нас</Link>
            <Link to="/works">Работы</Link>
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