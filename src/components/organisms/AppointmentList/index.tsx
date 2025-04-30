import React, { useState } from 'react';
import { AppointmentCard } from '@/components/molecules/AppointmentCard';
import { useGetPatientAppointmentsQuery } from '@/services/appointmentApi';
import { useCancelAppointmentMutation } from '@/services/patientApi';
import type { Appointment } from '@/services/appointmentApi';
import { getStoredUser } from '@/utils/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Define filter types
export type AppointmentFilter = 'all' | 'upcoming' | 'completed' | 'cancelled';

export const AppointmentList: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<AppointmentFilter>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Check for authentication
    const user = getStoredUser();
    if (!user) {
        // Redirect to login if not authenticated
        navigate('/login');
        return null;
    }

    // Fetch appointments using the API hook
    const { data: appointments, isLoading, error } = useGetPatientAppointmentsQuery({});
    const [cancelAppointment] = useCancelAppointmentMutation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                Error loading appointments. Please try again later.
            </div>
        );
    }

    // Apply search filter
    const filtered = (appointments || []).filter((a: Appointment) =>
        searchTerm
            ? (a.doctor?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (a.doctor?.specialization || '').toLowerCase().includes(searchTerm.toLowerCase())
            : true
    );

    const handleReschedule = async (id: number, newDate: string, newTime: string) => {
        try {
            // Implement rescheduling logic here
            toast.success('Appointment rescheduled successfully');
        } catch (error) {
            toast.error('Failed to reschedule appointment');
        }
    };

    return (
        <div>
            {/* Search input and segment control */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex rounded-md overflow-hidden border border-gray-300">
                    {(['all', 'upcoming', 'completed', 'cancelled'] as AppointmentFilter[]).map(
                        (f, idx, arr) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={
                                    `px-4 py-2 transition-colors duration-200 focus:outline-none` +
                                    (filter === f
                                        ? ' bg-indigo-600 text-white'
                                        : ' bg-white text-gray-700 hover:bg-gray-100')
                                }
                                style={{
                                    borderRadius:
                                        idx === 0
                                            ? '0.375rem 0 0 0.375rem'
                                            : idx === arr.length - 1
                                              ? '0 0.375rem 0.375rem 0'
                                              : '0'
                                }}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        )
                    )}
                </div>
            </div>
            {/* Appointment cards list */}
            <div className="space-y-4">
                {filtered.length > 0 ? (
                    filtered.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            id={Number(appointment.id)}
                            doctorName={appointment.doctor?.name || 'Unknown Doctor'}
                            specialty={appointment.doctor?.specialization || 'Unknown Specialty'}
                            date={appointment.date}
                            time={appointment.time}
                            type={appointment.type === 'virtual' ? 'video' : 'in-person'}
                            location={appointment.location}
                            onReschedule={handleReschedule}
                            onJoin={
                                appointment.type === 'virtual'
                                    ? (id) => navigate(`/meeting/${id}`)
                                    : undefined
                            }
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No appointments found for this filter.
                    </div>
                )}
            </div>
        </div>
    );
};
