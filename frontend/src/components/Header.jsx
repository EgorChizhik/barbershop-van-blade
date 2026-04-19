import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="container">
      <Link to="/" className="logo">Van Blade</Link>
      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/services">Услуги</Link>
      </nav>
    </div>
  </header>
);

export default Header;