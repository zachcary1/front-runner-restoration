import IconCard from '../shared/IconCard.jsx';
import { DropletIcon, ShieldIcon, CheckIcon } from '../shared/Icons.jsx';
import './ProcessTrio.css';

const STEPS = [
  {
    icon: <DropletIcon />,
    title: 'Water Removed',
    description: 'Rapid extraction and cleanup.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Structure Dried',
    description: 'Measured moisture control.',
  },
  {
    icon: <CheckIcon />,
    title: 'Property Restored',
    description: 'Clean, careful completion.',
  },
];

export default function ProcessTrio() {
  return (
    <section className="section process-trio reveal">
      <div className="section-inner process-trio__grid">
        {STEPS.map((step) => (
          <IconCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  );
}
