import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home hasConsented={hasConsented} />} />
          <Route path="professor" element={<ProfessorPage hasConsented={hasConsented} />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;