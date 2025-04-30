import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/config/api';

export interface Doctor {
    _id: string;
    id?: string;
    name: string;
    email: string;
    slmcRegistrationNo: string;
    specialization: string;
    qualification: string;
    experience: number;
    contactNumber: string;
    isActive: boolean;
    schedules?: Array<{
        day: string;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
    }>;
    userId?: string;
}

// Transform response to ensure id field
const transformDoctorResponse = (response: any): Doctor[] => {
    if (Array.isArray(response)) {
        return response.map(doctor => ({
            ...doctor,
            id: doctor._id // Ensure id field exists
        }));
    }
    return [];
};

export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        credentials: 'include'
    }),
    tagTypes: ['Doctors'],
    endpoints: (builder) => ({
        getAllDoctors: builder.query<Doctor[], void>({
            query: () => ({
                url: API_CONFIG.ENDPOINTS.DOCTORS.BASE,
                credentials: 'include'
            }),
            transformResponse: transformDoctorResponse,
            providesTags: ['Doctors'],
        }),
        getDoctorsBySpecialization: builder.query<Doctor[], string>({
            query: (specialization) => ({
                url: API_CONFIG.ENDPOINTS.DOCTORS.BY_SPECIALIZATION,
                params: { specialization },
                credentials: 'include'
            }),
            transformResponse: transformDoctorResponse,
            providesTags: ['Doctors'],
        }),
        getDoctorById: builder.query<Doctor, string>({
            query: (id) => ({
                url: API_CONFIG.ENDPOINTS.DOCTORS.BY_ID(id),
                credentials: 'include'
            }),
            transformResponse: (response: any): Doctor => ({
                ...response,
                id: response._id // Ensure id field exists
            }),
            providesTags: ['Doctors'],
        }),
    }),
});

export const {
    useGetAllDoctorsQuery,
    useGetDoctorsBySpecializationQuery,
    useGetDoctorByIdQuery,
} = doctorApi;