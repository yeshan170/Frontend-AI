import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/atoms/Input';
import { Typography } from '@/components/atoms/Typography';
import { DoctorAppointmentList } from '@/components/organisms';
import {
    useGetDoctorAppointmentsQuery,
    useUpdateAppointmentStatusMutation,
    useCancelAppointmentMutation,
    useCompleteAppointmentMutation
} from '@/services/appointmentApi';
import type { Appointment } from '@/services/appointmentApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import toast from 'react-hot-toast';
import { skipToken } from '@reduxjs/toolkit/query';

export const Appointments = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Get the current user's ID from auth state
    const user = useSelector((state: RootState) => state.auth.user);
    const doctorId = user?.id;

    // Calculate date range for appointments
    const dateRange = useMemo(() => {
        const now = new Date();
        const startDate = now.toISOString().split('T')[0];
        const endDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
        return {
            startDate,
            endDate: endDate.toISOString().split('T')[0]
        };
    }, []);

    // Fetch appointments
    const {
        data: appointments,
        isLoading,
        error,
        refetch
    } = useGetDoctorAppointmentsQuery(
        doctorId
            ? {
                  doctorId,
                  startDate: dateRange.startDate,
                  endDate: dateRange.endDate
              }
            : skipToken
    );

    const [updateStatus] = useUpdateAppointmentStatusMutation();
    const [cancelAppointment] = useCancelAppointmentMutation();
    const [completeAppointment] = useCompleteAppointmentMutation();

    // Filter appointments based on search term
    const filteredAppointments = appointments
        ? appointments.filter(
              (appointment) =>
                  (appointment.patientName?.toLowerCase() || '').includes(
                      searchTerm.toLowerCase()
                  ) ||
                  (appointment.specialty?.toLowerCase() || '').includes(searchTerm.toLowerCase())
          )
        : [];

    const handleAppointmentUpdate = async (updated: Appointment) => {
        try {
            await updateStatus({
                id: updated.id,
                status: updated.status
            }).unwrap();
            toast.success('Appointment updated successfully');
            refetch();
        } catch (error) {
            console.error('Failed to update appointment:', error);
            toast.error('Failed to update appointment');
        }
    };

    const handleCancel = async (appointmentId: string) => {
        try {
            await cancelAppointment(appointmentId).unwrap();
            toast.success('Appointment cancelled successfully');
            refetch();
        } catch (error) {
            console.error('Failed to cancel appointment:', error);
            toast.error('Failed to cancel appointment');
        }
    };

    const handleComplete = async (appointmentId: string) => {
        try {
            await completeAppointment(appointmentId).unwrap();
            toast.success('Appointment marked as completed');
            refetch();
        } catch (error) {
            console.error('Failed to complete appointment:', error);
            toast.error('Failed to mark appointment as completed');
        }
    };

    if (!doctorId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Typography
                    variant="h3"
                    label="Please log in to view appointments"
                    className="text-gray-600"
                />
                <p className="mt-2 text-gray-500">
                    You need to be logged in as a doctor to access this page.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Typography
                    variant="h3"
                    label="Loading appointments..."
                    className="text-gray-600"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Typography
                    variant="h3"
                    label="Error loading appointments"
                    className="text-red-600"
                />
                <p className="mt-2 text-gray-500">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Typography variant="h2" label="All Appointments" />
                    <p className="text-gray-600">
                        Showing appointments from{' '}
                        {new Date(dateRange.startDate).toLocaleDateString()} to{' '}
                        {new Date(dateRange.endDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="w-full md:w-64">
                    <Input
                        type="text"
                        placeholder="Search by patient name or specialty"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchTerm(e.target.value)
                        }
                        className="w-full"
                    />
                </div>
            </div>
            <DoctorAppointmentList
                appointments={filteredAppointments}
                onUpdate={handleAppointmentUpdate}
                onCancel={handleCancel}
                onComplete={handleComplete}
            />
        </div>
    );
};
