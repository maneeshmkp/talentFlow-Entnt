import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // renders current route
import Navbar from './components/Navbar.jsx';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div style={{ padding: '16px' }}>
        <Outlet /> {/* renders the routed page */}
      </div>
    </div>
  );
}
