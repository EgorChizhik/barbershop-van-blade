import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/images/logo.png';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="Van Blade Logo" className="logo-img" />
        </Link>
      </div>
      <nav className="header__nav">
        <Link to="/services">Услуги</Link>
        <Link to="/about">О нас</Link>
        <Link to="/works">Работы</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
    </div>
  </header>
);

export default Header;