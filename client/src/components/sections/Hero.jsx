import DiagonalPattern from '../shared/DiagonalPattern.jsx';
import Button from '../shared/Button.jsx';
import IconLabel from '../shared/IconLabel.jsx';
import { PhoneIcon, ArrowRightIcon, CheckIcon, ClockIcon } from '../shared/Icons.jsx';
import { PHONE_DISPLAY, PHONE_TEL } from '../../data/services.js';
import './Hero.css';

const TRUST_ITEMS = ['Licensed & Insured', 'IICRC Certified', 'Direct Insurance Billing'];

export default function Hero() {
  return (
    <section id="top" className="hero">
      <DiagonalPattern tone="light-on-dark" className="hero__pattern" />
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Statewide Florida Response</span>
          <h1 className="hero__headline">
            <span className="hero__headline-gold">Out Front Every Time,</span>
            <span>When Disaster Strikes.</span>
          </h1>
          <p className="hero__subtext">
            Water, fire, mold, and storm damage restoration crews on call around the
            clock — dispatched anywhere in Florida in minutes, not hours.
          </p>
          <div className="hero__ctas">
            <Button as="a" href="#contact" variant="solid" icon={<ArrowRightIcon />}>
              Request Help
            </Button>
            <Button as="a" href={`tel:${PHONE_TEL}`} variant="outline" icon={<PhoneIcon />}>
              Call {PHONE_DISPLAY}
            </Button>
          </div>
          <div className="hero__trust">
            {TRUST_ITEMS.map((item) => (
              <IconLabel key={item} icon={<CheckIcon />}>
                {item}
              </IconLabel>
            ))}
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__frame">
            <img className="hero__photo" src="/about.png" alt="Restoration crew responding on site" />
            <div className="hero__stat-card">
              <ClockIcon />
              <div>
                <span className="hero__stat-number">24/7</span>
                <span className="hero__stat-label">Emergency Response</span>
              </div>
            </div>
          </div>
          <div className="hero__caption">
            <span>Front Runner Restoration Crew</span>
            <span>Tampa Bay, FL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
