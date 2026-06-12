import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle/PageTitle';
import './Contacts.scss';

const IconPhone = () => (
  <svg className="contact-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
    <path d="M22 18h4l2 7-3.5 2.5c1.5 3 4 5.5 7 7L34 31l7 2v4c0 2-2 4-4 4C22 41 18 26 18 22c0-2 2-4 4-4z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    <path d="M39 23c2 0 4 1.5 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M39 19c4 0 8 3 8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconAnchor = () => (
  <svg className="contact-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
    <circle cx="32" cy="22" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="32" y1="26" x2="32" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="32" x2="42" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 48 C22 44 18 41 18 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M42 48 C42 44 46 41 46 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M22 48 C24 50 28 51 32 51 C36 51 40 50 42 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const IconClock = () => (
  <svg className="contact-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
    <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M32 24v9l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="32" y1="16" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="46" x2="32" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="46" y1="32" x2="48" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Contacts = () => {
  useEffect(() => {
    const container = document.getElementById('yandex-map-anchor');
    if (container && container.children.length === 0) {
      const script = document.createElement('script');
      script.src =
        'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A0670847a35cf47d25fd327e84e46aba5d2ddf7e04343d1e313ab9039a46638a3&amp;width=100%25&amp;height=600&amp;lang=ru_RU&amp;scroll=true';
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      container.appendChild(script);
    }
  }, []);

  return (
    <div className="contacts-page">
      <PageTitle title="Контакты" />

      <section className="contacts-section">
        <div className="contacts-section__inner">
          <div className="contacts-grid">

            <article className="contact-card">
              <div className="contact-card__accent-bar" />
              <div className="contact-card__numeral">I</div>
              <div className="contact-card__icon-wrap">
                <IconPhone />
              </div>
              <h2 className="contact-card__title">Связь</h2>
              <div className="contact-card__body">
                <div className="contact-card__group">
                  <span className="contact-card__label">Звоните для записи</span>
                  <div className="contact-phones">
                    <a href="tel:+79176113460" className="contact-card__phone">
                     +7 917 611-34-60
                    </a>
                    <a href="tel:+79176113462" className="contact-card__phone">
                      +7 917 611-34-62
                    </a>
                  </div>
                </div>
                <div className="contact-card__sep" />
                <div className="contact-card__group">
                  <span className="contact-card__label">По любым вопросам</span>
                  <a href="mailto:info@vanblade.ru" className="contact-card__email">
                    info@vanblade.ru
                  </a>
                </div>
              </div>
            </article>

            <article className="contact-card contact-card--featured">
              <div className="contact-card__accent-bar" />
              <div className="contact-card__numeral">II</div>
              <div className="contact-card__icon-wrap">
                <IconAnchor />
              </div>
              <h2 className="contact-card__title">Адрес</h2>
              <div className="contact-card__body">
                <div className="contact-card__group">
                  <span className="contact-card__label">Ждём вас здесь</span>
                  <span className="contact-card__address">
                    ул. Рябикова, 61/37
                  </span>
                  <span className="contact-card__city">
                    г. Ульяновск<br />Засвияжский район
                  </span>
                </div>
                <div className="contact-card__sep" />
                <div className="contact-card__group">
                  <span className="contact-card__label">Ориентир</span>
                  <span className="contact-card__hint">
                    ТЦ «Аквамолл» — 5 минут пешком
                  </span>
                </div>
              </div>
            </article>

            <article className="contact-card">
              <div className="contact-card__accent-bar" />
              <div className="contact-card__numeral">III</div>
              <div className="contact-card__icon-wrap">
                <IconClock />
              </div>
              <h2 className="contact-card__title">Режим работы</h2>
              <div className="contact-card__body">
                <div className="contact-card__group">
                  <span className="contact-card__label">График</span>
                  <span className="contact-card__schedule-day">Ежедневно</span>
                  <span className="contact-card__schedule-time">10:00 — 20:00</span>
                </div>
                <div className="contact-card__sep" />
                <div className="contact-card__group">
                  <span className="contact-card__label">Запись</span>
                  <span className="contact-card__hint">По телефону или онлайн</span>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      <div id="yandex-map-anchor" className="contacts-page__map" />

      <section className="contacts-footer">
        <div className="contacts-footer__container">
          <nav className="contacts-footer__nav">
            <Link to="/services">Услуги</Link>
            <Link to="/about">О нас</Link>
            <Link to="/works">Работы</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>

          <div className="contacts-footer__divider"></div>

          <div className="contacts-footer__copyright">
            © «Van Blade» {new Date().getFullYear()} г. Все права защищены.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;