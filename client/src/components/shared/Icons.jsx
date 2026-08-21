const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const PhoneIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const ClockIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const ArrowRightIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

export const ChatIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 5h16v11H8l-4 4V5Z" />
  </svg>
);

export const SendIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12 20 4l-6 16-3-7-7-1Z" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const MapPinIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

export const DropletIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
  </svg>
);

export const FlameIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3c1 3-3 4-3 7a3 3 0 0 0 6 0c1.5 1 2 2.6 2 4a5 5 0 0 1-10 0c0-4.5 4-6 5-11Z" />
  </svg>
);

export const MoldIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="14" r="4.5" />
    <circle cx="7" cy="8" r="1.6" />
    <circle cx="13" cy="6" r="1.4" />
    <circle cx="17" cy="9" r="1.6" />
  </svg>
);

export const StormIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M7 15a4 4 0 0 1 1-7.9 5.5 5.5 0 0 1 10.6 1.5A3.5 3.5 0 0 1 18 15H7Z" />
    <path d="M13 15l-2 4h3l-2 4" />
  </svg>
);

export const ZapIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M13 3 5 14h5l-1 7 8-11h-5l1-7Z" />
  </svg>
);

export const SnowflakeIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 2v20" />
    <path d="M4.5 7l15 10" />
    <path d="M19.5 7l-15 10" />
  </svg>
);

export const ShieldIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const iconMap = {
  droplet: DropletIcon,
  flame: FlameIcon,
  mold: MoldIcon,
  storm: StormIcon,
  zap: ZapIcon,
  snowflake: SnowflakeIcon,
  clock: ClockIcon,
  phone: PhoneIcon,
  pin: MapPinIcon,
  shield: ShieldIcon,
};

export function ServiceIcon({ name, ...props }) {
  const Cmp = iconMap[name] || ShieldIcon;
  return <Cmp {...props} />;
}
