import './DiagonalPattern.css';

/**
 * Repeating diagonal-line texture used as a decorative background layer.
 * `tone` picks the line color so the pattern reads correctly against
 * whatever section background it's layered on top of.
 */
export default function DiagonalPattern({ tone = 'light-on-dark', className = '' }) {
  return <div className={`diagonal-pattern diagonal-pattern--${tone} ${className}`} aria-hidden="true" />;
}
