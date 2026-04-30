import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div className="header__logo">
        <Link className="logo-placeholder" to="/">Logo</Link>
      </div>
      <nav className="header__nav">
        <Link to="/services">Услуги</Link>
        <Link to="/about">О нас</Link>
        <Link to="/reviews">Отзывы</Link>
        <Link to="/gallery">Работы</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
    </div>
  </header>
);

export default Header;