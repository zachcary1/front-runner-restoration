import SectionEyebrow from '../shared/SectionEyebrow.jsx';
import DiagonalPattern from '../shared/DiagonalPattern.jsx';
import IconLabel from '../shared/IconLabel.jsx';
import FloridaMap from './FloridaMap.jsx';
import { PhoneIcon, MapPinIcon } from '../shared/Icons.jsx';
import { regions, PHONE_DISPLAY, PHONE_TEL } from '../../data/services.js';
import './ServiceArea.css';

export default function ServiceArea() {
  return (
    <section className="section service-area reveal">
      <div className="section-inner service-area__grid">
        <div className="service-area__copy">
          <SectionEyebrow>Statewide &amp; Responsive</SectionEyebrow>
          <h2 className="service-area__headline">Restoration Response Across Florida.</h2>
          <p className="service-area__text">
            From the Panhandle to the Keys, our crews are positioned to respond
            fast — no matter which corner of the state gets hit.
          </p>
          <a href={`tel:${PHONE_TEL}`} className="service-area__phone">
            <PhoneIcon />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <ul className="service-area__regions">
            {regions.map((region) => (
              <li key={region}>
                <IconLabel icon={<MapPinIcon />}>{region}</IconLabel>
              </li>
            ))}
          </ul>
        </div>

        <div className="service-area__map-card">
          <DiagonalPattern tone="gold-on-dark" />
          <div className="florida-map">
            <FloridaMap />
          </div>
          <div className="service-area__map-captions">
            <span>Recent Project Areas</span>
            <span>Statewide Florida</span>
          </div>
        </div>
      </div>
    </section>
  );
}
