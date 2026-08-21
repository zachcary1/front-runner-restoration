import { Outlet } from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import ChatWidget from '../Chat/ChatWidget.jsx';
import useScrollManager from '../../hooks/useScrollManager.js';

export default function Layout() {
  useScrollManager();

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <ChatWidget />
    </>
  );
}
