import { baseApi, handleApiError } from './api';
import { API_CONFIG } from '@/config/api';
import { getStoredUser } from '../utils/auth';

// Types
export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    qualification: string;
    experience: number;
    contactNumber: string;
}

export interface Appointment {
    id: string;
    doctorId: string;
    doctor?: Doctor;
    date: string;
    time: string;
    type: 'in-person' | 'virtual';
    status: 'upcoming' | 'completed' | 'cancelled';
    location: string;
    notes?: string;
}

export interface MedicalHistory {
    id: string;
    date: string;
    diagnosis: string;
    treatment: string;
    prescription: string;
    notes: string;
    doctorId: string;
    doctorName: string;
    condition: string;
    diagnosisDate: string;
    medications: Array<{
        name: string;
        dosage: string;
        frequency: string;
    }>;
}

export interface PatientProfile {
    id: string;
    name: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    bloodGroup: string;
    allergies: string[];
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
}

// Patient API service
export const patientApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get patient profile
        getPatientProfile: builder.query<PatientProfile, void>({
            query: () => {
                const user = getStoredUser();
                console.log('Fetching profile - User data:', {
                    storedId: user?.id,
                    email: user?.email,
                    role: user?.role
                });

                if (!user?.id) {
                    throw new Error('User ID not found');
                }

                const url = API_CONFIG.ENDPOINTS.PATIENTS.BY_ID(user.id);
                console.log('Profile request details:', {
                    url,
                    userId: user.id,
                    fullUrl: `${API_CONFIG.BASE_URL}${url}`
                });

                return {
                    url,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                };
            },
            providesTags: ['Patient']
        }),

        // Update patient profile
        updatePatientProfile: builder.mutation<PatientProfile, Partial<PatientProfile>>({
            query: (data) => ({
                url: API_CONFIG.ENDPOINTS.PATIENTS.BASE,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Patient']
        }),

        // Get patient appointments
        getPatientAppointments: builder.query<Appointment[], { status?: 'upcoming' | 'completed' | 'cancelled' }>({
            query: (params) => {
                const user = getStoredUser();
                if (!user?.id) {
                    throw new Error('User ID not found');
                }

                // Get current date and one month from now
                const today = new Date();
                const currentDate = today.toISOString().split('T')[0];
                const futureDate = new Date();
                futureDate.setMonth(today.getMonth() + 1);
                const endDate = futureDate.toISOString().split('T')[0];

                return {
                    url: API_CONFIG.ENDPOINTS.APPOINTMENTS.PATIENT(currentDate, endDate),
                    method: 'GET',
                    params,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                };
            },
            providesTags: ['Appointment']
        }),

        // Create appointment
        createAppointment: builder.mutation<Appointment, {
            doctorId: string;
            date: string;
            time: string;
            type: 'in-person' | 'virtual';
            location: string;
        }>({
            query: (data) => ({
                url: API_CONFIG.ENDPOINTS.APPOINTMENTS.BASE,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Appointment']
        }),

        // Cancel appointment
        cancelAppointment: builder.mutation<void, { id: string; reason: string; notes?: string }>({
            query: ({ id, ...data }) => ({
                url: API_CONFIG.ENDPOINTS.APPOINTMENTS.CANCEL(id),
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Appointment']
        }),

        // Get medical history
        getMedicalHistory: builder.query<MedicalHistory[], void>({
            query: () => {
                const user = getStoredUser();
                if (!user?.id) {
                    throw new Error('User ID not found');
                }

                return {
                    url: API_CONFIG.ENDPOINTS.PATIENTS.MEDICAL_HISTORY.BASE(user.id),
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                };
            },
            providesTags: ['MedicalHistory']
        }),

        // Get available doctors
        getAvailableDoctors: builder.query<Doctor[], { specialization?: string }>({
            query: (params) => ({
                url: params.specialization
                    ? API_CONFIG.ENDPOINTS.DOCTORS.BY_SPECIALIZATION
                    : API_CONFIG.ENDPOINTS.DOCTORS.BASE,
                params
            }),
            providesTags: ['Doctor']
        }),

        // Get doctor details
        getDoctorDetails: builder.query<Doctor, string>({
            query: (id) => API_CONFIG.ENDPOINTS.DOCTORS.BY_ID(id),
            providesTags: ['Doctor']
        })
    })
});

export const {
    useGetPatientProfileQuery,
    useUpdatePatientProfileMutation,
    useGetPatientAppointmentsQuery,
    useCreateAppointmentMutation,
    useCancelAppointmentMutation,
    useGetMedicalHistoryQuery,
    useGetAvailableDoctorsQuery,
    useGetDoctorDetailsQuery
} = patientApi; 