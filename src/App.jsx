import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Toaster } from 'sonner';

import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Claims from './components/Claims';
import Policies from './components/Policies';
import Settings from './components/Settings';

function ProtectedRoute({ children }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/onboarding" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user } = useApp();
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Toaster theme="dark" position="bottom-right" richColors closeButton />
        <Routes>
          <Route path="/onboarding" element={
            <PublicRoute>
              <Onboarding />
            </PublicRoute>
          } />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
