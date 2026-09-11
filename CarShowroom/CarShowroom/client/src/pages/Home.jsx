import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import FeaturedCars from '../components/FeaturedCars.jsx';
import WhyChoose from '../components/WhyChoose.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <FeaturedCars />
      <WhyChoose />
      <Contact />
    </main>
  );
}
