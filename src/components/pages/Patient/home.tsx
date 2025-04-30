import React from 'react';
import { Calendar, Clock, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { RescheduleModal } from '@/components/molecules/RescheduleModal';
import { useGetAllDoctorsQuery } from '@/services/doctorApi';
import {
    useGetPatientProfileQuery,
    useGetPatientAppointmentsQuery,
    useGetMedicalHistoryQuery
} from '@/services/patientApi';
import { useCancelAppointmentMutation, type Appointment } from '@/services/appointmentApi';
import { API_CONFIG } from '@/config/api';

// Specialty icons mapping
const specialtyIcons: { [key: string]: string } = {
    Cardiology: '❤️',
    Neurology: '🧠',
    Orthopedics: '🦴',
    Dermatology: '👨‍⚕️',
    Pediatrics: '👶',
    Ophthalmology: '👁️',
    'General Medicine': '⚕️',
    Psychiatry: '🧠',
    ENT: '👂',
    Dentistry: '🦷',
    Gynecology: '👩‍⚕️',
    Urology: '🚽'
};

const specialtyDescriptions: { [key: string]: string } = {
    Cardiology: 'Heart and cardiovascular system specialists',
    Neurology: 'Brain, spinal cord, and nervous system specialists',
    Orthopedics: 'Bone, joint, ligament, tendon, and muscle specialists',
    Dermatology: 'Skin, hair, and nail specialists',
    Pediatrics: 'Child and adolescent health specialists',
    Ophthalmology: 'Eye and vision specialists',
    'General Medicine': 'Primary healthcare and general medical conditions',
    Psychiatry: 'Mental health and behavioral disorders',
    ENT: 'Ear, nose, and throat specialists',
    Dentistry: 'Dental and oral health specialists',
    Gynecology: "Women's health and reproductive system",
    Urology: 'Urinary tract and male reproductive system'
};

export const Patient = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [cancelAppointment] = useCancelAppointmentMutation();

    // Get doctors data
    const { data: doctors = [], isLoading: isDoctorsLoading } = useGetAllDoctorsQuery();

    // Check for authentication
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Fetch patient data
    const { data: profile, isLoading: isProfileLoading } = useGetPatientProfileQuery();

    // Fetch appointments using patientApi
    const { data: appointments = [], isLoading: isAppointmentsLoading } =
        useGetPatientAppointmentsQuery({
            status: 'upcoming'
        });

    console.log('Appointments data:', appointments); // Debug log

    const { data: medicalHistory, isLoading: isMedicalHistoryLoading } =
        useGetMedicalHistoryQuery();

    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);

    if (isProfileLoading || isAppointmentsLoading || isMedicalHistoryLoading || isDoctorsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    const handleCancel = async (id: string) => {
        if (!id) {
            console.error('No appointment ID provided');
            return;
        }
        try {
            setIsLoading(true);
            await cancelAppointment({
                id,
                reason: 'Cancelled by patient'
            }).unwrap();
            window.location.reload();
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Failed to cancel appointment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Welcome section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, {profile?.name}!
                        </h1>
                        <p className="text-gray-600 mt-1">How are you feeling today?</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for doctors, specialties..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {appointments?.length || 0}
                    </p>
                </div>
                {/* <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Medical Records</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                        {medicalHistory?.length || 0}
                    </p>
                </div> */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Next Appointment</h3>
                    <p className="text-lg text-gray-600 mt-2">
                        {appointments && appointments.length > 0 ? (
                            <React.Fragment key="next-appointment">
                                {new Date(appointments[0].date).toLocaleDateString()} at{' '}
                                {appointments[0].time}
                            </React.Fragment>
                        ) : (
                            'No upcoming appointments'
                        )}
                    </p>
                </div>
            </div>

            {/* Recent Medical History */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Medical History</h2>
                <div className="space-y-4">
                    {medicalHistory && medicalHistory.length > 0 ? (
                        medicalHistory.slice(0, 3).map((record) => (
                            <div key={record.id} className="border-b border-gray-200 pb-4">
                                <h3 className="font-medium text-gray-800">{record.condition}</h3>
                                <p className="text-sm text-gray-600">
                                    Diagnosed on:{' '}
                                    {new Date(record.diagnosisDate).toLocaleDateString()}
                                </p>
                                {record.medications.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm font-medium text-gray-700">
                                            Medications:
                                        </p>
                                        <ul className="list-disc list-inside text-sm text-gray-600">
                                            {record.medications.map((med, index) => (
                                                <li key={index}>
                                                    {med.name} - {med.dosage} ({med.frequency})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No medical history available</p>
                    )}
                </div>
            </div> */}

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
                <div className="space-y-4">
                    {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="flex items-center justify-between border-b border-gray-200 pb-4"
                            >
                                <div>
                                    <h3 className="font-medium text-gray-800">
                                        {appointment.doctor?.name || 'Doctor'}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(appointment.date).toLocaleDateString()} at{' '}
                                        {appointment.time}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {appointment.type} - {appointment.location}
                                    </p>
                                </div>
                                <button
                                    className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                                    onClick={() => handleCancel(appointment.id)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Cancelling...' : 'Cancel'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No upcoming appointments</p>
                    )}
                </div>
            </div>

            {/* Medical specialties */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Doctors</h2>
                {isDoctorsLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {doctors?.map((doctor) => {
                            if (!doctor?.id) return null;
                            return (
                                <Link
                                    key={doctor.id}
                                    to={`/patient/doctors/${doctor.id}`}
                                    className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center mb-2">
                                        <span className="text-2xl mr-2">
                                            {specialtyIcons[doctor.specialization] || '⚕️'}
                                        </span>
                                        <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {doctor.specialization}
                                    </p>
                                    <div className="text-xs text-gray-400">
                                        Available for appointments
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Reschedule Modal */}
            {selectedAppointment && (
                <RescheduleModal
                    isOpen={showRescheduleModal}
                    onClose={() => {
                        setShowRescheduleModal(false);
                        setSelectedAppointment(null);
                    }}
                    onConfirm={(newDate, newTime) => {
                        if (selectedAppointment && appointments) {
                            const updatedAppointments = appointments.map((appointment) =>
                                appointment.id === selectedAppointment.id
                                    ? { ...appointment, date: newDate, time: newTime }
                                    : appointment
                            );
                            // Here you would typically make an API call to update the appointment
                            console.log('Appointment updated:', {
                                id: selectedAppointment.id,
                                newDate,
                                newTime
                            });
                        }
                    }}
                    appointmentDetails={{
                        doctorName: selectedAppointment.doctor?.name || 'Unknown Doctor',
                        specialty:
                            selectedAppointment.doctor?.specialization || 'Unknown Specialty',
                        currentDate: selectedAppointment.date,
                        currentTime: selectedAppointment.time
                    }}
                />
            )}
        </div>
    );
};
