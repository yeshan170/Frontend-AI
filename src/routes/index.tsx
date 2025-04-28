import { Route, Routes, Outlet } from 'react-router-dom';
import { Home } from '@/components/pages/Home';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { ProtectedPatient } from './ProtectedPatient';
import PatientLayout from '@/components/pages/Patient/layout';
import { Patient } from '@/components/pages/Patient/home';
import { Appointments } from '@/components/pages/Patient/appointments';
import { Profile } from '@/components/pages/Patient/profile';
import { DoctorList } from '@/components/pages/Patient/Doctor/doctorList';
import { DoctorDetails } from '@/components/pages/Patient/Doctor/[id]';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route
                path="/patient/*"
                element={
                    <ProtectedPatient>
                        <PatientLayout>
                            <Outlet />
                        </PatientLayout>
                    </ProtectedPatient>
                }
            >
                <Route index element={<Patient />} />
                <Route path="home" element={<Patient />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="profile" element={<Profile />} />
                <Route path="doctors" element={<DoctorList />} />
                <Route path="doctors/:id" element={<DoctorDetails />} />
            </Route>
        </Routes>
    );
};
