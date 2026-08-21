import { Navigate } from 'react-router-dom';
import ServiceDetail from '../components/sections/ServiceDetail.jsx';
import CtaBanner from '../components/sections/CtaBanner.jsx';
import ContactForm from '../components/sections/ContactForm.jsx';
import { getServiceBySlug } from '../data/services.js';
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function ServicePage({ slug }) {
  useScrollReveal();

  const service = getServiceBySlug(slug);
  if (!service) return <Navigate to="/" replace />;

  return (
    <main>
      <div className="service-top-block">
        <ServiceDetail service={service} />
        <CtaBanner />
      </div>
      <ContactForm />
    </main>
  );
}
