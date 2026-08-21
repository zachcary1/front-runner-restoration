import './Button.css';

/**
 * variant: "solid" | "outline" | "outline-dark"
 * as: "button" | "a"
 */
export default function Button({
  children,
  variant = 'solid',
  as = 'button',
  icon = null,
  className = '',
  ...rest
}) {
  const Tag = as;
  return (
    <Tag className={`btn btn--${variant} ${className}`} {...rest}>
      <span>{children}</span>
      {icon}
    </Tag>
  );
}
