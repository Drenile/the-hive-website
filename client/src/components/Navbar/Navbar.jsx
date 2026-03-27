import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';
import logo from '../../assets/hive logo.png';

function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen]         = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu  = () => setMenuOpen(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    closeMenu();
  };

  return (
    <header className={styles.nav}>
      <Link to="/" className={styles.logo} aria-label="The Hive home" onClick={closeMenu}>
        <img className={styles.logoImg} src={logo} alt="The Hive logo" />
      </Link>

      {/* Desktop Nav */}
      <nav className={styles.navLinks} aria-label="Primary navigation">
        <NavLink to="/"            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.isActive : ''}`}>Home</NavLink>
        <NavLink to="/about"       className={({ isActive }) => `${styles.navItem} ${isActive ? styles.isActive : ''}`}>About</NavLink>

        <div
          className={styles.navDropdown}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className={styles.navDropdownTrigger} aria-haspopup="true" aria-expanded={dropdownOpen} type="button">
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

        {/* Auth */}
        {user ? (
          <div className={styles.authWrap}>
            {profile?.role === 'admin' && (
              <NavLink to="/admin" className={styles.adminLink}>⚙️ Admin</NavLink>
            )}
            <span className={styles.authName}>{profile?.full_name || user.email}</span>
            <span className={styles.adminBadge}>{profile?.role}</span>
            <button className={styles.signOutBtn} onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className={styles.authWrap}>
            <NavLink to="/login"  className={styles.loginBtn}>Login</NavLink>
            <NavLink to="/signup" className={styles.signupBtn}>Join Us</NavLink>
          </div>
        )}
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
          <NavLink to="/"             className={styles.mobileNavLink} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about"        className={styles.mobileNavLink} onClick={closeMenu}>About</NavLink>
          <span className={styles.mobileNavSection}>Community</span>
          <NavLink to="/events"       className={`${styles.mobileNavLink} ${styles.mobileNavLinkSub}`} onClick={closeMenu}>Events</NavLink>
          <NavLink to="/news"         className={`${styles.mobileNavLink} ${styles.mobileNavLinkSub}`} onClick={closeMenu}>News</NavLink>
          <NavLink to="/get-involved" className={styles.mobileNavLink} onClick={closeMenu}>Get Involved</NavLink>
          <NavLink to="/projects"     className={styles.mobileNavLink} onClick={closeMenu}>Projects</NavLink>
          <NavLink to="/contact"      className={styles.mobileNavLink} onClick={closeMenu}>Contact Us</NavLink>
          {user ? (
            <>
              {profile?.role === 'admin' && (
                <NavLink to="/admin" className={styles.mobileNavLink} onClick={closeMenu}>⚙️ Admin Dashboard</NavLink>
              )}
              <span className={styles.mobileNavSection}>{profile?.full_name || user.email}</span>
              <button className={styles.mobileNavLink} onClick={handleSignOut} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', font: 'inherit' }}>Sign Out</button>
            </>
          ) : (
            <>
              <NavLink to="/login"  className={styles.mobileNavLink} onClick={closeMenu}>Login</NavLink>
              <NavLink to="/signup" className={styles.mobileNavLink} onClick={closeMenu}>Join Us</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
