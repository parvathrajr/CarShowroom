import TiltCard from './TiltCard.jsx';
import useReveal from '../hooks/useReveal.js';

const SERVICES = [
  ['◆', 'Premium Collection', "Handpicked luxury cars from the world's most prestigious brands."],
  ['🛡', 'Certified Quality', 'All vehicles undergo a rigorous inspection for uncompromised quality.'],
  ['🔔', 'Concierge Service', 'Personalized assistance for a seamless and luxurious journey.'],
  ['✦', 'Aftercare Support', 'Reliable maintenance and support long after you drive away.'],
];

export default function Services() {
  const headRef = useReveal();
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-head center reveal" ref={headRef}>
          <p className="eyebrow gold-eyebrow">EXPERIENCE EXCELLENCE</p>
          <h2 className="section-title">Premium Services</h2>
          <p className="section-sub">
            Every detail is crafted to deliver the ultimate luxury car ownership experience.
          </p>
        </div>

        <div className="service-grid">
          {SERVICES.map(([icon, title, text]) => (
            <TiltCard className="service-card reveal in-view" max={12} key={title}>
              <div className="service-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
