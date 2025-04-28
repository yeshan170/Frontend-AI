import { SignUpForm } from '@/components/molecules/Form/signUpForm';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
    const navigate = useNavigate();

    // Placeholder onSubmit function - replace with actual registration logic
    const handleSignUp = (name: string, email: string, password: string) => {
        console.log('Attempting sign up with:', name, email, password);
        // Simulate successful registration and navigate
        // In a real app, you'd call an API, handle errors, etc.
        alert('Sign up successful! Please log in. (Placeholder)');
        navigate('/login'); // Navigate to login page after sign up
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">Welcome back</h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Sign in to access your account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <SignUpForm onSubmit={handleSignUp} />
            </div>
        </div>
    );
};
