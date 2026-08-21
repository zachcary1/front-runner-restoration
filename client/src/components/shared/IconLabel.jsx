import './IconLabel.css';

/**
 * A small gold icon paired with a label — used for trust rows,
 * the service ribbon, region lists, phone/clock callouts, etc.
 */
export default function IconLabel({ icon, children, className = '' }) {
  return (
    <span className={`icon-label ${className}`}>
      <span className="icon-label__icon">{icon}</span>
      <span className="icon-label__text">{children}</span>
    </span>
  );
}
