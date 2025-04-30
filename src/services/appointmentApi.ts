import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/config/api';
import { Doctor as PatientApiDoctor } from '@/services/patientApi';
import { getStoredUser } from '../utils/auth';

export interface Appointment {
    id: string;
    _id?: string;
    startTime?: string;
    patientId: string;
    doctorId: string;
    doctor?: PatientApiDoctor;
    patientName: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'upcoming';
    type: 'in-person' | 'virtual';
    location?: string;
    notes?: string;
}

interface GetDoctorAppointmentsParams {
    doctorId: string;
    status?: string;
    startDate: string;
    endDate: string;
}

interface GetPatientAppointmentsParams {
    status?: string;
    startDate?: string;
    endDate?: string;
}

interface CreateAppointmentRequest {
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    type: 'in-person' | 'virtual';
    location: string;
}

export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Appointments'],
    endpoints: (builder) => ({
        getDoctorAppointments: builder.query<Appointment[], GetDoctorAppointmentsParams>({
            query: ({ doctorId, status, startDate, endDate }) => ({
                url: `/appointments`,
                params: {
                    doctorId,
                    status,
                    startDate,
                    endDate
                }
            }),
            providesTags: ['Appointments'],
        }),
        getPatientAppointments: builder.query<Appointment[], GetPatientAppointmentsParams>({
            query: () => {
                // Get today's date
                const today = new Date();
                const currentDate = today.toISOString().split('T')[0];

                // Get date 30 days from now
                const futureDate = new Date();
                futureDate.setDate(today.getDate() + 30);
                const endDateValue = futureDate.toISOString().split('T')[0];

                return {
                    url: API_CONFIG.ENDPOINTS.APPOINTMENTS.PATIENT(currentDate, endDateValue)
                };
            },
            providesTags: ['Appointments'],
        }),
        updateAppointmentStatus: builder.mutation<Appointment, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/appointments/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Appointments'],
        }),
        cancelAppointment: builder.mutation<void, { id: string; reason: string }>({
            query: ({ id, reason }) => ({
                url: `/appointments/${id}/cancel`,
                method: 'PUT',
                body: { reason }
            }),
            invalidatesTags: ['Appointments'],
        }),
        completeAppointment: builder.mutation<void, string>({
            query: (id) => ({
                url: `/appointments/${id}/complete`,
                method: 'POST',
            }),
            invalidatesTags: ['Appointments'],
        }),
        createAppointment: builder.mutation<Appointment, CreateAppointmentRequest>({
            query: (appointment) => ({
                url: '/appointments',
                method: 'POST',
                body: appointment,
            }),
            invalidatesTags: ['Appointments'],
        }),
    }),
});

export const {
    useCreateAppointmentMutation,
    useGetDoctorAppointmentsQuery,
    useGetPatientAppointmentsQuery,
    useUpdateAppointmentStatusMutation,
    useCancelAppointmentMutation,
    useCompleteAppointmentMutation,
} = appointmentApi; 