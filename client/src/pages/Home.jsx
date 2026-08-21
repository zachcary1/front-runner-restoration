import Hero from '../components/sections/Hero.jsx';
import ServiceRibbon from '../components/sections/ServiceRibbon.jsx';
import CoreServices from '../components/sections/CoreServices.jsx';
import BeforeAfter from '../components/sections/BeforeAfter.jsx';
import ProcessTrio from '../components/sections/ProcessTrio.jsx';
import ServiceArea from '../components/sections/ServiceArea.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import ContactForm from '../components/sections/ContactForm.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function Home() {
  useScrollReveal();

  return (
    <main>
      <div className="hero-block">
        <Hero />
        <ServiceRibbon />
      </div>
      <CoreServices />
      <BeforeAfter />
      <ProcessTrio />
      <ServiceArea />
      <CtaBanner />
      <ContactForm />
    </main>
  );
}
