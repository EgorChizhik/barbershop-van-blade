import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollClass, setScrollClass] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setScrollClass("");
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Скролл вниз — шапка остается позади (скрывается)
        setScrollClass("header--hidden");
      } else {
        // Скролл вверх — шапка плавно выезжает поверх контента
        setScrollClass("header--smart-visible");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  return (
    <header className={`header ${scrollClass}`}>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Van Blade Logo" className="logo-img" />
          </Link>
        </div>

        <a href="tel:+79176113460" className="header__phone-centered">
          +7 (917) 611-34-60
        </a>

        <button 
          className={`header__burger ${isOpen ? "header__burger--active" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="burger-line line-1"></span>
          <span className="burger-line line-2"></span>
          <span className="burger-line line-3"></span>
        </button>

        <nav className={`header__nav ${isOpen ? "header__nav--open" : ""}`}>
          <div className="header__nav-mobile-top">
            <Link to="/services" onClick={closeMenu}>Услуги</Link>
            <Link to="/about" onClick={closeMenu}>О нас</Link>
          </div>

          <div className="header__nav-mobile-logo">
            <img src={logo} alt="Van Blade Logo" className="mobile-logo-img" />
          </div>

          <div className="header__nav-mobile-bottom">
            <Link to="/works" onClick={closeMenu}>Работы</Link>
            <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
          </div>

          <a href="tel:+79176113460" className="header__phone">
            +7 (917) 611-34-60
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;