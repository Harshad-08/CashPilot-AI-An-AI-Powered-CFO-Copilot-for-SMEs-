import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import DecisionSimulator from './components/DecisionSimulator';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

interface UserProfile {
  name: string;
  email: string;
  companyName: string;
}

function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  if (view === 'auth') {
    return (
      <Auth 
        onLoginSuccess={(profile) => {
          setUserProfile(profile);
          setView('dashboard');
        }} 
        onBackToHome={() => setView('landing')} 
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <Dashboard 
        userProfile={userProfile}
        onBackToLanding={() => {
          setUserProfile(null);
          setView('landing');
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 selection:text-blue-900">
      {/* Navigation */}
      <Navbar onEnterDashboard={() => setView('auth')} />

      {/* Main Content */}
      <main>
        {/* Hero Section (Includes Interactive Dashboard) */}
        <Hero onEnterDashboard={() => setView('auth')} />

        {/* Trusted By SMEs Logo Strip */}
        <TrustedBy />

        {/* Core Features Cards */}
        <Features />

        {/* Decision Simulator Interactive Mini-App */}
        <DecisionSimulator />

        {/* 6-Step Onboarding Timeline */}
        <HowItWorks />

        {/* Why Choose Us Comparison */}
        <WhyChooseUs />

        {/* Customer Testimonials Grid */}
        <Testimonials />

        {/* FAQ Accordion Section */}
        <FAQ />

        {/* Bottom CTA Sign-up Panel */}
        <CTA onEnterDashboard={() => setView('auth')} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
