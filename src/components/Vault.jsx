import React, { useState } from 'react';
import Login from './vault/Login';
import Dashboard from './vault/Dashboard';

export default function Vault() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-brand-red selection:text-white">
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      )}
    </div>
  );
}
