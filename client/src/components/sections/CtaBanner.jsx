import DiagonalPattern from '../shared/DiagonalPattern.jsx';
import Button from '../shared/Button.jsx';
import { ClockIcon, PhoneIcon } from '../shared/Icons.jsx';
import { PHONE_DISPLAY, PHONE_TEL } from '../../data/services.js';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner reveal">
      <DiagonalPattern tone="dark-on-gold" />
      <div className="section-inner cta-banner__inner">
        <div className="cta-banner__message">
          <ClockIcon className="cta-banner__icon" />
          <span className="cta-banner__headline">24/7 Help</span>
          <span className="cta-banner__divider" aria-hidden="true" />
          <span className="cta-banner__label">Emergency Response Across Florida</span>
        </div>
        <Button
          as="a"
          href={`tel:${PHONE_TEL}`}
          variant="outline-dark"
          icon={<PhoneIcon />}
        >
          Call {PHONE_DISPLAY}
        </Button>
      </div>
    </section>
  );
}
