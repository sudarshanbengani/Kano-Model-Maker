import React from 'react';
import { KanoModelProvider } from './context/KanoModelContext';
import Layout from './components/Layout';
import Header from './components/Header';

function App() {
  return (
    <KanoModelProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="min-h-screen bg-slate-50 font-[Inter] text-slate-800">
        <Header />
        <main id="main-content" className="container mx-auto px-4 py-6">
          <Layout />
        </main>
      </div>
    </KanoModelProvider>
  );
}

export default App;