import { Route, Routes, Outlet } from 'react-router-dom';
import { Home } from '@/components/pages/Home';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { ProtectedPatient } from './ProtectedPatient';
import PatientLayout from '@/components/pages/Patient/layout';
import { Patient } from '@/components/pages/Patient/home';
import { Appointments as PatientAppointments } from '@/components/pages/Patient/appointments';
import { Profile } from '@/components/pages/Patient/profile';
import { DoctorList } from '@/components/pages/Patient/Doctor/doctorList';
import { DoctorDetails } from '@/components/pages/Patient/DoctorDetails';

// Import doctor components
import DoctorLayout from '@/components/pages/Doctor/layout';
import { Doctor } from '@/components/pages/Doctor/home';
import { Appointments as DoctorAppointments } from '@/components/pages/Doctor/appointments';
import { Patients } from '@/components/pages/Doctor/patients';
import { ProtectedDoctor } from './ProtectedDoctor';
import { DoctorPatientProfile } from '@/components/pages/Doctor/patientProfile';

export const AppRoutes = () => {
    console.log('Rendering AppRoutes');

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />

            {/* Patient routes */}
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
                <Route path="appointments" element={<PatientAppointments />} />
                <Route path="profile" element={<Profile />} />
                <Route path="doctors" element={<DoctorList />} />
                <Route path="doctors/:id" element={<DoctorDetails />} />
            </Route>

            {/* Doctor routes */}
            <Route
                path="/doctor/*"
                element={
                    <ProtectedDoctor>
                        <DoctorLayout>
                            <Outlet />
                        </DoctorLayout>
                    </ProtectedDoctor>
                }
            >
                <Route index element={<Doctor />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="patients" element={<Patients />} />
                <Route path="patients/:id" element={<DoctorPatientProfile />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};
