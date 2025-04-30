import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '@/services/userApi';
import { appointmentApi } from '@/services/appointmentApi';
import { patientApi } from '@/services/patientApi';
import { doctorApi } from '@/services/doctorApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            appointmentApi.middleware,
            patientApi.middleware,
            doctorApi.middleware
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 