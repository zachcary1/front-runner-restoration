import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import DiagonalPattern from '../shared/DiagonalPattern.jsx';
import Button from '../shared/Button.jsx';
import { ServiceIcon, PhoneIcon, ArrowRightIcon, CheckIcon } from '../shared/Icons.jsx';
import { PHONE_DISPLAY, PHONE_TEL, FLORIDA_LOCATIONS } from '../../data/services.js';
import './ServiceDetail.css';

export default function ServiceDetail({ service }) {
  const { slug, name, icon, headline, summary, checklist, image, imageAlt } = service;

  const location = useMemo(
    () => FLORIDA_LOCATIONS[Math.floor(Math.random() * FLORIDA_LOCATIONS.length)],
    [slug]
  );

  return (
    <section className="service-detail">
      <DiagonalPattern tone="light-on-dark" className="service-detail__pattern" />
      <div className="service-detail__inner">
        <div className="service-detail__copy">
          <Link to="/#services" className="service-detail__back">
            <ArrowRightIcon className="service-detail__back-icon" />
            <span>All Services</span>
          </Link>

          <span className="eyebrow service-detail__eyebrow">
            <ServiceIcon name={icon} className="service-detail__eyebrow-icon" />
            {name}
          </span>

          <h1 className="service-detail__headline">{headline}</h1>
          <p className="service-detail__summary">{summary}</p>

          <ul className="service-detail__checklist">
            {checklist.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="service-detail__ctas">
            <Button as={Link} to="/#contact" variant="solid" icon={<ArrowRightIcon />}>
              Request Help
            </Button>
            <Button as="a" href={`tel:${PHONE_TEL}`} variant="outline" icon={<PhoneIcon />}>
              Call {PHONE_DISPLAY}
            </Button>
          </div>
        </div>

        <div className="service-detail__media">
          <div className="service-detail__frame">
            {image ? (
              <img className="service-detail__photo" src={image} alt={imageAlt} />
            ) : (
              <div className="service-detail__photo" role="img" aria-label={imageAlt} />
            )}
          </div>
          <div className="service-detail__caption">
            <span>Front Runner Restoration Crew</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
