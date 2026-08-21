import './IconCard.css';

export default function IconCard({ icon, title, description }) {
  return (
    <div className="icon-card">
      <span className="icon-card__icon">{icon}</span>
      <h3 className="icon-card__title">{title}</h3>
      <p className="icon-card__desc">{description}</p>
    </div>
  );
}
