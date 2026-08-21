import { Link } from 'react-router-dom';
import { services, PHONE_DISPLAY, PHONE_TEL } from '../../data/services.js';
import './Footer.css';

const COMPANY_LINKS = [
  { label: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  { label: 'About Front Runner', href: '/#services' },
  { label: 'Before & After', href: '/#before-after' },
  { label: 'Request Help', href: '/#contact' },
  { label: '24/7 Emergency Response', href: `tel:${PHONE_TEL}` },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-inner footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <img className="footer__brand-logo" src="/logo.png" alt="Front Runner Restoration" />
          </div>
          <p className="footer__tagline">
            Out <span className="footer__tagline-accent">Front</span> Every Time.
          </p>
        </div>

        <div className="footer__columns">
          <div className="footer__col">
            <h3 className="footer__col-title">Services</h3>
            <ul>
              {services
                .filter((s) => s.slug !== 'emergency-response')
                .map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Company</h3>
            <ul>
              {COMPANY_LINKS.map((link) =>
                link.href.startsWith('tel:') ? (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="section-inner footer__bottom-inner">
          <span>&copy; {new Date().getFullYear()} Front Runner Restoration. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
