import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { services, PHONE_DISPLAY, PHONE_TEL } from '../../data/services.js';
import { ServiceIcon, PhoneIcon, ChevronDownIcon, MenuIcon, CloseIcon } from '../shared/Icons.jsx';
import Button from '../shared/Button.jsx';
import './Nav.css';

const NAV_LINKS = [
  { label: 'About', href: '/#services' },
  { label: 'Before & After', href: '/#before-after' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link
          to="/"
          className="nav__brand"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img className="nav__brand-logo" src="/logo.png" alt="Front Runner Restoration" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <div
            className="nav__item nav__item--dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
            }}
          >
            <button
              type="button"
              className="nav__link"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen(true)}
              onFocus={() => setServicesOpen(true)}
            >
              Services
              <ChevronDownIcon className="nav__chevron" />
            </button>

            {servicesOpen && (
              <div className="nav__mega">
                <div className="nav__mega-card">
                  <span className="nav__mega-label">All Services</span>
                  <ul className="nav__mega-grid">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}`}
                          className="nav__mega-row"
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className="nav__mega-icon">
                            <ServiceIcon name={s.icon} />
                          </span>
                          <span>{s.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} className="nav__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <Button as="a" href={`tel:${PHONE_TEL}`} variant="solid" icon={<PhoneIcon />} className="nav__call">
            Call {PHONE_DISPLAY}
          </Button>
          <button
            type="button"
            className="nav__hamburger"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="nav__drawer">
          <button
            type="button"
            className="nav__drawer-item nav__drawer-toggle"
            aria-expanded={mobileServicesOpen}
            onClick={() => setMobileServicesOpen((v) => !v)}
          >
            Services
            <ChevronDownIcon className={`nav__chevron ${mobileServicesOpen ? 'nav__chevron--open' : ''}`} />
          </button>
          {mobileServicesOpen && (
            <ul className="nav__drawer-accordion">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} onClick={() => setMobileOpen(false)}>
                    <ServiceIcon name={s.icon} />
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="nav__drawer-item"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Button
            as="a"
            href={`tel:${PHONE_TEL}`}
            variant="solid"
            icon={<PhoneIcon />}
            className="nav__drawer-call"
          >
            Call {PHONE_DISPLAY}
          </Button>
        </div>
      )}
    </header>
  );
}
