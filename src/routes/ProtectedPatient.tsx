import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedPatient({ children }: { children: React.ReactNode }) {
    // ← however you store your user info; this is just a stub
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== 'patient') return <Navigate to="/" replace />;
    return <>{children}</>;
}
