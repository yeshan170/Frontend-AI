import { SignUpForm } from '@/components/molecules/Form/signUpForm';
import { useNavigate } from 'react-router-dom';
import { useRegisterDoctorMutation, useRegisterPatientMutation } from '@/services/userApi';
import { useState } from 'react';
import type { RegisterDoctorRequest, RegisterPatientRequest } from '@/services/userApi';

export const SignUpPage = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState<'doctor' | 'patient'>('patient');
    const [registerDoctor] = useRegisterDoctorMutation();
    const [registerPatient] = useRegisterPatientMutation();

    const handleSignUp = async (data: RegisterDoctorRequest | RegisterPatientRequest) => {
        try {
            console.log('SignUpPage received data:', JSON.stringify(data, null, 2));

            if ('role' in data && data.role === 'doctor') {
                const doctorData = data as RegisterDoctorRequest;
                console.log(
                    'Attempting doctor registration with:',
                    JSON.stringify(doctorData, null, 2)
                );
                await registerDoctor(doctorData).unwrap();
            } else {
                const patientData = data as RegisterPatientRequest;
                console.log(
                    'Attempting patient registration with:',
                    JSON.stringify(patientData, null, 2)
                );
                await registerPatient(patientData).unwrap();
            }

            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error: any) {
            console.error('Registration error details:', error);
            console.error('Error response:', error.data);
            console.error('Full error object:', JSON.stringify(error, null, 2));

            let errorMessage = 'Registration failed. Please try again.';

            if (error.data?.message) {
                errorMessage = error.data.message;
            } else if (error.data?.error) {
                errorMessage = error.data.error;
            } else if (typeof error.data === 'string') {
                errorMessage = error.data;
            }

            alert(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">
                    Create an account
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">Sign up to get started</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mb-4 flex justify-center space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${userType === 'patient' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setUserType('patient')}
                    >
                        Patient
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${userType === 'doctor' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setUserType('doctor')}
                    >
                        Doctor
                    </button>
                </div>
                <SignUpForm onSubmit={handleSignUp} isLoading={false} userType={userType} />
            </div>
        </div>
    );
};
