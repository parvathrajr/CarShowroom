import { useState } from 'react';

export default function CarDetailsView({ car }) {
  const [activeTab, setActiveTab] = useState('performance');

  if (!car) return null;

  // Derive realistic automotive metrics based on horsepower and class
  const hp = Number(car.horsepower) || 500;
  const zeroToSixty = hp >= 750 ? '2.8 sec' : hp >= 620 ? '3.1 sec' : hp >= 550 ? '3.5 sec' : '3.8 sec';
  const topSpeed = hp >= 750 ? '211 MPH (340 km/h)' : hp >= 620 ? '205 MPH (330 km/h)' : '196 MPH (315 km/h)';
  const bodyStyle = car.seats >= 5 ? 'Luxury SUV / High-Performance Saloon' : car.seats === 4 ? 'Grand Tourer (2+2 Coupe)' : 'High-Performance Supercar';
  const drivetrain = ['Rolls-Royce', 'Bentley', 'Audi', 'Porsche'].includes(car.brand) || (car.name || '').includes('Urus') || (car.name || '').includes('Range Rover')
    ? 'Intelligent All-Wheel Drive (AWD) with Torque Vectoring'
    : 'Performance Rear-Wheel Drive (RWD) with Electronic Limited-Slip Diff';

  const tabs = [
    { id: 'performance', label: '⚡ Performance & Engine' },
    { id: 'chassis', label: '🛠️ Chassis & Dynamics' },
    { id: 'interior', label: '🛋️ Interior & Tech' },
    { id: 'certification', label: '🛡️ Certification & Warranty' },
  ];

  return (
    <div className="car-details-container">
      {/* Top Section Header */}
      <div className="car-details-header">
        <div>
          <span className="eyebrow gold-eyebrow">DETAILED SPECIFICATIONS</span>
          <h2 className="car-details-title">Vehicle Technical Profile</h2>
          <p className="car-details-subtitle">
            Engineered to perfection. Explore complete powertrain metrics, cockpit craftsmanship, and verified showroom pedigree for the {car.name}.
          </p>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">HORSEPOWER</span>
          <strong className="metric-value">{car.horsepower} <span className="metric-unit">HP</span></strong>
          <span className="metric-sub">Peak Output</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">0 – 60 MPH</span>
          <strong className="metric-value">{zeroToSixty}</strong>
          <span className="metric-sub">Sprint Time</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">TOP SPEED</span>
          <strong className="metric-value">{topSpeed.split(' ')[0]} <span className="metric-unit">MPH</span></strong>
          <span className="metric-sub">Track Velocity</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">ENGINE</span>
          <strong className="metric-value metric-engine">{car.engine}</strong>
          <span className="metric-sub">Powerplant</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">SEATS</span>
          <strong className="metric-value">{car.seats} <span className="metric-unit">Passengers</span></strong>
          <span className="metric-sub">Cabin Layout</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="car-specs-tabs" role="tablist" aria-label="Specification Categories">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`specs-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content Panel */}
      <div className="specs-content-panel">
        {activeTab === 'performance' && (
          <div className="specs-group">
            <h3 className="specs-group-title">Engine & Powertrain Architecture</h3>
            <div className="specs-table-grid">
              <div className="spec-row">
                <span className="spec-key">Engine Configuration</span>
                <strong className="spec-val">{car.engine}</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Total Power Output</span>
                <strong className="spec-val">{car.horsepower} Horsepower @ 7,500 RPM</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Acceleration (0–60 mph)</span>
                <strong className="spec-val">{zeroToSixty}</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Maximum Speed</span>
                <strong className="spec-val">{topSpeed}</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Drivetrain</span>
                <strong className="spec-val">{drivetrain}</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Transmission</span>
                <strong className="spec-val">8-Speed Dual-Clutch Seamless-Shift Gearbox</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Fuel & Induction</span>
                <strong className="spec-val">Direct High-Pressure Injection with Valved Sport Exhaust</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chassis' && (
          <div className="specs-group">
            <h3 className="specs-group-title">Chassis, Aerodynamics & Suspension</h3>
            <div className="specs-table-grid">
              <div className="spec-row">
                <span className="spec-key">Body Architecture</span>
                <strong className="spec-val">{bodyStyle}</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Monocoque Structure</span>
                <strong className="spec-val">Lightweight Carbon-Composite & Extruded Aluminium Tub</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Suspension System</span>
                <strong className="spec-val">Adaptive Double-Wishbone with Continuous Damping Control (CDC)</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Braking System</span>
                <strong className="spec-val">Carbon-Ceramic Matrix (CCM) Discs with 6-Piston Monobloc Calipers</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Wheels & Rubber</span>
                <strong className="spec-val">Forged Diamond-Turned Lightweight Alloys with Ultra-High-Performance Tyres</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Active Aerodynamics</span>
                <strong className="spec-val">Speed-Sensitive Deployable Rear Spoiler & Integrated Venturi Diffusers</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interior' && (
          <div className="specs-group">
            <h3 className="specs-group-title">Cabin Craftsmanship & Digital Cockpit</h3>
            <div className="specs-table-grid">
              <div className="spec-row">
                <span className="spec-key">Seating Capacity</span>
                <strong className="spec-val">{car.seats} Bespoke Luxury Sport Seats</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Upholstery & Finish</span>
                <strong className="spec-val">Hand-Stitched Semi-Aniline Leather, Alcantara Headliner & Satin Carbon Trim</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Sound Architecture</span>
                <strong className="spec-val">1,200-Watt High-Resolution 3D Surround Audio System with 16 Speakers</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Infotainment Display</span>
                <strong className="spec-val">High-Definition Touch Cockpit with Wireless Apple CarPlay & Satellite Telemetry</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Climate Architecture</span>
                <strong className="spec-val">Multi-Zone Automatic Climate Control with Air Ionizer & Cabin Fragrance</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Ambient Lighting</span>
                <strong className="spec-val">64-Color Synchronized Dynamic Ambient LED Illumination</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certification' && (
          <div className="specs-group">
            <h3 className="specs-group-title">Luxora Motors Certified Heritage & Assurance</h3>
            <div className="specs-table-grid">
              <div className="spec-row">
                <span className="spec-key">Inspection Provenance</span>
                <strong className="spec-val">150-Point Master Technician Mechanical & Cosmetic Verification</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Warranty Coverage</span>
                <strong className="spec-val">3-Year / 36,000-Mile Factory-Grade Comprehensive Warranty Included</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">VIP Delivery</span>
                <strong className="spec-val">Complimentary Enclosed White-Glove Transporter Direct to Your Door</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Service History</span>
                <strong className="spec-val">Full Documented Pedigree, Clean Title, Zero Accident Record</strong>
              </div>
              <div className="spec-row">
                <span className="spec-key">Concierge Membership</span>
                <strong className="spec-val">24/7 Dedicated Client Advisor & Priority Private Track Access</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Luxury Features Callout Banner */}
      <div className="specs-features-grid">
        <div className="feature-item">
          <div className="feature-icon">💎</div>
          <h4>Bespoke Tailoring</h4>
          <p>Handcrafted materials and custom leatherwork curated by master artisans.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🏎️</div>
          <h4>Track Proven</h4>
          <p>Aerodynamic balance tuned for blistering track agility and road refinement.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🛡️</div>
          <h4>Certified Guarantee</h4>
          <p>Passed our uncompromising 150-point precision mechanical audit.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🛎️</div>
          <h4>White-Glove Handover</h4>
          <p>Enclosed delivery and personal concierge vehicle orientation upon arrival.</p>
        </div>
      </div>
    </div>
  );
}
