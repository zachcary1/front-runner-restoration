import { Link } from 'react-router-dom';
import { ArrowRightIcon, ServiceIcon } from '../shared/Icons.jsx';

export default function ServiceRow({ icon, name, description, slug }) {
  return (
    <Link to={`/services/${slug}`} className="service-row">
      <span className="service-row__icon" aria-hidden="true">
        <ServiceIcon name={icon} />
      </span>
      <div className="service-row__body">
        <span className="service-row__name">
          {name}
          <ArrowRightIcon className="service-row__arrow" />
        </span>
        <span className="service-row__desc">{description}</span>
      </div>
    </Link>
  );
}
