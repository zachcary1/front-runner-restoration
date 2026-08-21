import SectionEyebrow from '../shared/SectionEyebrow.jsx';
import ServiceRow from './ServiceRow.jsx';
import { services } from '../../data/services.js';
import './CoreServices.css';

export default function CoreServices() {
  return (
    <section className="section core-services reveal" id="services">
      <div className="section-inner">
        <div className="core-services__heading">
          <SectionEyebrow>What We Do</SectionEyebrow>
          <h2>Our Core Services</h2>
        </div>

        <div className="core-services__grid">
          {services.map((s) => (
            <ServiceRow key={s.slug} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
