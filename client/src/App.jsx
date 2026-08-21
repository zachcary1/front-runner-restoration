import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home.jsx';
import ServicePage from './pages/ServicePage.jsx';

function ServicePageRoute() {
  const { slug } = useParams();
  // Remounts ServicePage (and its effects) whenever the slug changes.
  return <ServicePage key={slug} slug={slug} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePageRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
