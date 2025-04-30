import { baseApi } from './api';
import { API_CONFIG } from '@/config/api';
import {
    setStoredUser,
    setAccessToken,
    setRefreshToken,
    clearAuth,
    type User
} from '@/utils/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

interface RefreshTokenResponse {
    accessToken: string;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface EmergencyContact {
    name: string;
    relationship: string;
    contactNumber: string;
}

interface RegisterPatientRequest {
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    address: Address;
    bloodGroup: string;
    emergencyContact: EmergencyContact;
}

interface RegisterDoctorRequest {
    name: string;
    email: string;
    password: string;
    slmcRegistrationNo: string;
    specialization: string;
    qualification: string;
    experience: number;
    contactNumber: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        registerPatient: builder.mutation<User, RegisterPatientRequest>({
            query: (data) => ({
                url: '/auth/register/patient',
                method: 'POST',
                body: data,
            }),
        }),

        registerDoctor: builder.mutation<User, RegisterDoctorRequest>({
            query: (data) => ({
                url: '/auth/register/doctor',
                method: 'POST',
                body: data,
            }),
        }),

        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('Login response data:', {
                        userId: data.user.id,
                        email: data.user.email,
                        role: data.user.role
                    });

                    // Validate user data before storing
                    if (!data.user || !data.user.id) {
                        console.error('Invalid user data received:', data.user);
                        throw new Error('Invalid user data received from server');
                    }

                    // Store tokens and user data
                    setAccessToken(data.accessToken);
                    setRefreshToken(data.refreshToken);
                    setStoredUser(data.user);

                    // Verify stored data
                    const storedUser = getStoredUser();
                    console.log('Verification - Stored user data:', {
                        storedId: storedUser?.id,
                        loginId: data.user.id,
                        match: storedUser?.id === data.user.id
                    });
                } catch (error) {
                    console.error('Login error:', error);
                }
            },
        }),

        refreshToken: builder.mutation<RefreshTokenResponse, void>({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    setAccessToken(data.accessToken);
                } catch (error) {
                    console.error('Token refresh error:', error);
                    clearAuth();
                    window.location.href = '/login';
                }
            },
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    clearAuth();
                    window.location.href = '/login';
                } catch (error) {
                    console.error('Logout error:', error);
                }
            },
        }),
    }),
});

export const {
    useRegisterPatientMutation,
    useRegisterDoctorMutation,
    useLoginMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
} = authApi; 