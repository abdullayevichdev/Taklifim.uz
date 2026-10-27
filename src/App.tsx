/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { LanguageProvider } from './locales';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { BackgroundCarousel } from './components/BackgroundCarousel';

// Pages
import { HomePage } from './pages/HomePage';
import { TemplatesPage } from './pages/TemplatesPage';
import { TemplateDetailPage } from './pages/TemplateDetailPage';
import { BuilderPage } from './pages/BuilderPage';
import { InvitationGuestPage } from './pages/InvitationGuestPage';
import { PremiumVideoPage } from './pages/PremiumVideoPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPage } from './pages/LegalPage';
import { AuthPages } from './pages/AuthPages';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  // Determine if this is a dedicated guest-facing invitation page
  const isGuestInvitation = path.startsWith('/i/');

  // Route dispatcher
  const renderCurrentPage = () => {
    // Guest Invitation
    if (path.startsWith('/i/')) {
      return <InvitationGuestPage />;
    }

    // Home
    if (path === '/' || path === '') {
      return <HomePage />;
    }

    // Templates
    if (path === '/templates') {
      return <TemplatesPage />;
    }
    if (path.startsWith('/templates/')) {
      return <TemplateDetailPage />;
    }

    // Builder
    if (path.startsWith('/create/')) {
      return <BuilderPage />;
    }

    // Premium Video
    if (path === '/premium') {
      return <PremiumVideoPage />;
    }

    // Pricing
    if (path === '/pricing') {
      return <PricingPage />;
    }

    // Contact
    if (path === '/contact') {
      return <ContactPage />;
    }

    // FAQ
    if (path === '/faq') {
      return <FaqPage />;
    }

    // Legal
    if (path === '/privacy' || path === '/terms') {
      return <LegalPage />;
    }

    // Auth
    if (path === '/login' || path === '/register' || path === '/forgot-password') {
      return <AuthPages />;
    }

    // Customer Dashboard
    if (path.startsWith('/dashboard')) {
      return <CustomerDashboard />;
    }

    // Admin Panel (Strictly protected by code 3580)
    if (path.startsWith('/admin')) {
      return <AdminPanel />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#F5C9D8] selection:text-[#231E1B] relative">
      {!isGuestInvitation && <BackgroundCarousel />}
      {!isGuestInvitation && <Header />}

      <main className="flex-1 relative z-10">
        {renderCurrentPage()}
      </main>

      {!isGuestInvitation && <Footer />}

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
