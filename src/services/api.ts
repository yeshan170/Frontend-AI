import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/config/api';
import { getAccessToken, getRefreshToken, setAccessToken, clearAuth } from '@/utils/auth';

// Base query with authentication
const baseQuery = fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
        const token = getAccessToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        console.log('Request headers:', Object.fromEntries(headers.entries()));
        return headers;
    },
    credentials: 'include'
});

// Custom base query with token refresh
const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    console.log('Making API request:', {
        url: typeof args === 'string' ? args : args.url,
        method: typeof args === 'string' ? 'GET' : args.method,
        baseUrl: API_CONFIG.BASE_URL,
        headers: typeof args === 'string' ? {} : args.headers
    });

    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        console.error('API request failed:', {
            error: result.error,
            request: args
        });
    }

    if (result.error && result.error.status === 401) {
        // Try to refresh token
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            console.log('Attempting token refresh...');
            const refreshResult = await baseQuery(
                {
                    url: API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
                    method: 'POST',
                    body: { refreshToken }
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                // Store new access token
                setAccessToken((refreshResult.data as { accessToken: string }).accessToken);
                console.log('Token refreshed successfully, retrying original request');
                // Retry original query
                result = await baseQuery(args, api, extraOptions);
            } else {
                console.log('Token refresh failed, redirecting to login');
                // If refresh fails, clear auth and redirect to login
                clearAuth();
                window.location.href = '/login';
            }
        }
    }

    return result;
};

// Base API configuration
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Doctor', 'Patient', 'Appointment', 'MedicalHistory']
});

// Error handling types
export interface ApiError {
    status: number;
    data: {
        error?: string;
        message?: string;
        errors?: Record<string, string>;
    };
}

// Helper function to handle API errors
export const handleApiError = (error: ApiError): string => {
    if (error.data?.message) {
        return error.data.message;
    }
    if (error.data?.error) {
        return error.data.error;
    }
    if (error.data?.errors) {
        return Object.values(error.data.errors).join(', ');
    }
    return 'An unexpected error occurred';
};
