import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/hive logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu  = () => setMenuOpen(false);

  return (
    <header className={styles.nav}>
      <Link to="/" className={styles.logo} aria-label="The Hive home" onClick={closeMenu}>
        <img className={styles.logoImg} src={logo} alt="The Hive logo" />
      </Link>

      {/* Desktop Nav */}
      <nav className={styles.navLinks} aria-label="Primary navigation">
        <NavLink to="/"            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.isActive : ''}`}>Home</NavLink>
        <NavLink to="/about"       className={({ isActive }) => `${styles.navItem} ${isActive ? styles.isActive : ''}`}>About</NavLink>

        {/* Dropdown */}
        <div
          className={styles.navDropdown}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            className={styles.navDropdownTrigger}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            type="button"
          >
            Community <span className={styles.navChevron} aria-hidden="true">▾</span>
          </button>
          {dropdownOpen && (
            <div className={styles.navDropdownMenu} aria-label="Community submenu">
              <NavLink to="/events" className={styles.navDropdownItem} onClick={() => setDropdownOpen(false)}>Events</NavLink>
              <NavLink to="/news"   className={styles.navDropdownItem} onClick={() => setDropdownOpen(false)}>News</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/get-involved" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.isActive : ''}`}>Get Involved</NavLink>
        <NavLink to="/projects"     className={({ isActive }) => `${styles.navItem} ${isActive ? styles.isActive : ''}`}>Projects</NavLink>
        <NavLink to="/contact"      className={({ isActive }) => `${styles.navItem} ${isActive ? styles.isActive : ''}`}>Contact Us</NavLink>
      </nav>

      {/* Hamburger */}
      <button
        className={`${styles.navMenu} ${menuOpen ? styles.isOpen : ''}`}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls="mobileNav"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <span></span><span></span><span></span>
      </button>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className={styles.mobileNav} id="mobileNav">
          <NavLink to="/"            className={styles.mobileNavLink} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about"       className={styles.mobileNavLink} onClick={closeMenu}>About</NavLink>
          <span className={styles.mobileNavSection}>Community</span>
          <NavLink to="/events"      className={`${styles.mobileNavLink} ${styles.mobileNavLinkSub}`} onClick={closeMenu}>Events</NavLink>
          <NavLink to="/news"        className={`${styles.mobileNavLink} ${styles.mobileNavLinkSub}`} onClick={closeMenu}>News</NavLink>
          <NavLink to="/get-involved" className={styles.mobileNavLink} onClick={closeMenu}>Get Involved</NavLink>
          <NavLink to="/projects"    className={styles.mobileNavLink} onClick={closeMenu}>Projects</NavLink>
          <NavLink to="/contact"     className={styles.mobileNavLink} onClick={closeMenu}>Contact Us</NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;
