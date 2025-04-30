export const API_CONFIG = {
    BASE_URL: (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').toString(),
    ENDPOINTS: {
        AUTH: {
            REGISTER: {
                PATIENT: '/auth/register/patient',
                DOCTOR: '/auth/register/doctor'
            },
            LOGIN: '/auth/login',
            REFRESH_TOKEN: '/auth/refresh-token',
            LOGOUT: '/auth/logout'
        },
        DOCTORS: {
            BASE: '/doctors',
            BY_ID: (id: string) => `/doctors/${id}`,
            SCHEDULE: (id: string) => `/doctors/${id}/schedule`,
            BY_SPECIALIZATION: '/doctors/specialization'
        },
        PATIENTS: {
            BASE: '/patients',
            BY_ID: (id: string) => `/patients/${id}`,
            MEDICAL_HISTORY: {
                BASE: (id: string) => `/patients/${id}/medical-history`,
                BY_ID: (patientId: string, historyId: string) =>
                    `/patients/${patientId}/medical-history/${historyId}`
            }
        },
        APPOINTMENTS: {
            BASE: '/appointments',
            BY_ID: (id: string) => `/appointments/${id}`,
            DOCTOR: (doctorId: string) => `/appointments?status=scheduled&doctorId=${doctorId}`,
            PATIENT: (date: string, endDate: string) => `/appointments?status=upcoming&date=${date}&endDate=${endDate}`,
            CANCEL: (id: string) => `/appointments/${id}/cancel`,
            COMPLETE: (id: string) => `/appointments/${id}/complete`
        }
    }
}; 