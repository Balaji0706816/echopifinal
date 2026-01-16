import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { LoginModal } from './components/LoginModal';
import { Dashboard } from './components/Dashboard';
import { AppView } from '../types';

const App: React.FC = () => {
  // State to track the current view of the app
  const [currentView, setCurrentView] = useState<AppView>(AppView.HERO);

  // State to show/hide the login modal
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Show login modal when login is clicked in Hero section
  const handleHeroLoginClick = () => {
    setShowLoginModal(true);
  };

  // Close modal without logging in
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setCurrentView(AppView.DASHBOARD);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Hero section */}
      {currentView === AppView.HERO && (
        <HeroSection onLoginClick={handleHeroLoginClick} />
      )}

      {/* Login modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={handleCloseModal} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {/* Dashboard */}
      {currentView === AppView.DASHBOARD && <Dashboard />}
    </div>
  );
};

export default App;
