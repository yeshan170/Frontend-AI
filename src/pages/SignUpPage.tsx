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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <SignUpForm onSubmit={handleSignUp} />
        </div>
    );
};
