import useReveal from '../hooks/useReveal.js';

const ITEMS = [
  ['♔', 'Exclusive Selection', 'Access the rarest and most exclusive luxury vehicles.'],
  ['★', 'Unmatched Quality', 'Every car meets our highest standards of excellence.'],
  ['☺', 'Client First', 'Your satisfaction and privacy are our top priorities.'],
  ['🌐', 'Worldwide Delivery', 'Delivering luxury cars to your doorstep.'],
];

export default function WhyChoose() {
  const headRef = useReveal();
  return (
    <section className="why section" id="about">
      <div className="container">
        <div className="section-head center reveal in-view" ref={headRef}>
          <h2 className="section-title">Why Choose Luxora Motors?</h2>
          <span className="divider"></span>
        </div>

        <div className="why-grid">
          {ITEMS.map(([icon, title, text]) => (
            <div className="why-item" key={title}>
              <div className="why-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
