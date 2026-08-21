export const services = [
  {
    slug: 'water-damage',
    name: 'Water Damage',
    icon: 'droplet',
    description: 'Rapid extraction, drying, and moisture control for any water loss.',
    headline: 'Water Damage Restoration',
    summary:
      "From burst pipes to storm flooding, our crews extract standing water, dry the structure, and stop secondary damage before it spreads. IICRC-certified techs track moisture levels until every material is back to a safe, dry standard.",
    checklist: [
      'Emergency water extraction & pump-out',
      'Moisture mapping with thermal imaging',
      'Industrial air movers & dehumidification',
      'Removal of unsalvageable drywall, flooring & insulation',
      'Antimicrobial treatment to prevent mold growth',
      'Documented drying logs for insurance claims',
    ],
    imageAlt: 'Technician running industrial air movers and a dehumidifier in a flooded room',
    image: '/water-damage.png',
  },
  {
    slug: 'fire-smoke',
    name: 'Fire & Smoke',
    icon: 'flame',
    description: 'Soot removal, odor treatment, and structural fire cleanup.',
    headline: 'Fire & Smoke Damage Restoration',
    summary:
      "Fire leaves more than burned materials behind — soot and odor can spread through an entire structure in minutes. We handle everything from board-up and debris removal to deep soot cleaning and odor neutralization, so your property is safe to re-enter.",
    checklist: [
      'Emergency board-up & structural securing',
      'Soot & smoke residue removal from surfaces',
      'HVAC & duct cleaning to stop odor recirculation',
      'Thermal fogging & ozone odor treatment',
      'Content cleaning & smoke damage restoration',
      'Structural rebuild coordination',
    ],
    imageAlt: 'Restoration crew clearing soot and debris from a fire-damaged interior',
    image: '/fire-smoke.png',
  },
  {
    slug: 'mold-prevention',
    name: 'Mold Prevention',
    icon: 'mold',
    description: 'Remediation and prevention to keep your property safe and dry.',
    headline: 'Mold Remediation & Prevention',
    summary:
      "Mold spreads fast in warm, humid conditions — and Florida gives it plenty of both. We identify the moisture source, contain and remove active growth, and treat the area to keep it from coming back.",
    checklist: [
      'Moisture source identification & containment',
      'Air quality & mold spore testing',
      'Negative-air containment barriers',
      'HEPA-filtered mold removal',
      'Antimicrobial & encapsulation treatment',
      'Post-remediation clearance verification',
    ],
    imageAlt: 'Technician in protective gear removing mold inside a sealed containment barrier',
    image: '/mold.png',
  },
  {
    slug: 'storm-damage',
    name: 'Storm Damage',
    icon: 'storm',
    description: 'Board-up, tarping, and full recovery after severe weather.',
    headline: 'Storm Damage Restoration',
    summary:
      "High winds, flying debris, and flooding can compromise a structure fast. Our crews respond ahead of the next storm system to tarp, board, and stabilize your property, then manage the full recovery from there.",
    checklist: [
      'Emergency roof tarping & board-up',
      'Downed tree & debris removal',
      'Wind & flood damage assessment',
      'Water extraction from storm intrusion',
      'Structural drying & dehumidification',
      'Insurance documentation & claims support',
    ],
    imageAlt: 'Crew securing a tarp over a storm-damaged roof after high winds',
    image: '/storm.png',
  },
  {
    slug: 'emergency-response',
    name: 'Emergency Response',
    icon: 'zap',
    description: 'Crews dispatched statewide, 24 hours a day, every day of the year.',
    headline: '24/7 Emergency Response',
    summary:
      "Disasters don't wait for business hours, and neither do we. Our dispatch team fields calls around the clock and routes the nearest available crew to your property, typically arriving within the hour anywhere in Florida.",
    checklist: [
      'Live dispatch answered 24/7/365',
      'Crews positioned statewide for fast arrival',
      'On-site damage assessment within hours',
      'Direct insurance carrier coordination',
      'Immediate mitigation to stop damage from spreading',
      'Single point of contact through full recovery',
    ],
    imageAlt: 'Restoration van and crew arriving on-site at night for an emergency call',
    image: '/247.png',
  },
  {
    slug: 'dry-ice-blasting',
    name: 'Dry Ice Blasting',
    icon: 'snowflake',
    description: 'Non-abrasive surface cleaning for soot, mold, and grime.',
    headline: 'Dry Ice Blasting',
    summary:
      'Dry ice blasting strips soot, mold, and grime from surfaces using pressurized CO2 pellets — no water, chemicals, or abrasion involved. It’s a fast, non-destructive way to restore structural framing, equipment, and hard-to-reach surfaces.',
    checklist: [
      'Non-abrasive CO2 pellet cleaning',
      'No secondary moisture or chemical residue',
      'Safe for electrical & mechanical equipment',
      'Effective on soot, mold & heavy grime buildup',
      'Faster turnaround than sanding or media blasting',
      'Ideal for framing, ductwork & machinery',
    ],
    imageAlt: 'Technician dry ice blasting soot from exposed structural framing',
    image: '/dry-ice-blasting.png',
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}

export const FLORIDA_LOCATIONS = [
  'Palm Beach Gardens',
  'Vero Beach',
  'Miami',
  'Naples',
  'Jacksonville',
  'Orlando',
  'Port St. Lucie',
  'Cape Coral',
  'St. Petersburg',
  'Tallahassee',
  'Daytona Beach',
  'Pensacola',
];

export const regions = [
  'South Florida',
  'Central Florida',
  'Tampa Bay',
  'Gulf Coast',
  'North Florida',
  'Treasure Coast',
];

export const PHONE_DISPLAY = '1-888-DRYOUT-2';
export const PHONE_TEL = '+18883796882';
