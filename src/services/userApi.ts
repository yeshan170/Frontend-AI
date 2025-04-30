import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/config/api';

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        role: 'doctor' | 'patient';
        name: string;
    };
}

interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterDoctorRequest {
    name: string;
    email: string;
    password: string;
    role: 'doctor';
    slmcRegistrationNo: string;
    specialization: string;
    qualification: string;
    experience: number;
    contactNumber: string;
}

interface EmergencyContact {
    name: string;
    relationship: string;
    contactNumber: string;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface RegisterPatientRequest {
    name: string;
    email: string;
    password: string;
    role: 'patient';
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
        country: string;
    };
    emergencyContact: {
        name: string;
        relationship: string;
        contactNumber: string;
    };
}

interface RefreshTokenRequest {
    refreshToken: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
    }),
    endpoints: (builder) => ({
        registerPatient: builder.mutation<AuthResponse, RegisterPatientRequest>({
            query: (data) => ({
                url: '/auth/register/patient',
                method: 'POST',
                body: data,
            }),
        }),
        registerDoctor: builder.mutation<AuthResponse, RegisterDoctorRequest>({
            query: (data) => ({
                url: '/auth/register/doctor',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse: (response: AuthResponse) => {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                localStorage.setItem('user', JSON.stringify(response.user));
                return response;
            },
        }),
        refreshToken: builder.mutation<AuthResponse, RefreshTokenRequest>({
            query: (data) => ({
                url: '/auth/refresh-token',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            }
        })
    })
});

export const {
    useRegisterPatientMutation,
    useRegisterDoctorMutation,
    useLoginMutation,
    useRefreshTokenMutation,
    useLogoutMutation
} = userApi;

