import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import ProfessorPage from './pages/ProfessorPage';
import AboutPage from './pages/AboutPage';
import ConsentDialog from './components/ConsentDialog';

function App() {
  const [showConsent, setShowConsent] = useState(true);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('userConsent');
    if (consent !== null) {
      setHasConsented(consent === 'true');
      setShowConsent(false);
    }
  }, []);

  const handleConsent = (agreed: boolean) => {
    localStorage.setItem('userConsent', agreed.toString());
    setHasConsented(agreed);
    setShowConsent(false);
  };

  if (showConsent) {
    return (
      <ConsentDialog
        onAccept={() => handleConsent(true)}
        onDecline={() => handleConsent(false)}
      />
    );
  }

  return (
    <Router>
      <Routes>
        {/* Main Application Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home hasConsented={hasConsented} />} />
          <Route path="chat" element={<Chat />} />
          <Route path="professor" element={<ProfessorPage hasConsented={hasConsented} />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;