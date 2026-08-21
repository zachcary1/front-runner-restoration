import { ServiceIcon, ZapIcon } from '../shared/Icons.jsx';
import { services } from '../../data/services.js';
import './ServiceRibbon.css';

const RIBBON_ITEMS = [
  { label: '24/7 Response', icon: 'zap' },
  ...services
    .filter((s) => s.slug !== 'emergency-response')
    .map((s) => ({ label: s.name, icon: s.icon })),
];

export default function ServiceRibbon() {
  return (
    <div className="ribbon">
      <div className="ribbon__inner">
        {RIBBON_ITEMS.map((item, i) => (
          <div className="ribbon__item" key={item.label}>
            {i > 0 && <span className="ribbon__divider" aria-hidden="true" />}
            <span className="ribbon__icon">
              {item.icon === 'zap' ? <ZapIcon /> : <ServiceIcon name={item.icon} />}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
