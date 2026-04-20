import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div className="header__logo">

        <div className="logo-placeholder">LOGO</div>
      </div>
      <nav className="header__nav">
        <Link to="/services">Услуги</Link>
        <Link to="/about">О нас</Link>
        <Link to="/reviews">Отзывы</Link>
        <Link to="/gallery">Работы</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
    </div>
  <div className="marquee">
    <div className="marquee__track">

      <div className="marquee__group">
        <span className="marquee__text">Добро пожаловать в мир Van Blade</span>
        <span className="marquee__text">Добро пожаловать в мир Van Blade</span>
      </div>

      <div className="marquee__group">
        <span className="marquee__text">Добро пожаловать в мир Van Blade</span>
        <span className="marquee__text">Добро пожаловать в мир Van Blade</span>
      </div>
    </div>
  </div>

  </header>
);

export default Header;
