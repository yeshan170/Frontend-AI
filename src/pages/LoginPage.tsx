import { LoginForm } from '@/components/molecules/Form/loginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();

    // Placeholder onSubmit function - replace with actual login logic
    const handleLogin = (email: string, password: string) => {
        console.log('Attempting login with:', email, password);
        // Simulate successful login and navigate
        // In a real app, you'd call an API, handle errors, store tokens, etc.
        alert('Login successful! (Placeholder)');
        navigate('/'); // Navigate to home or dashboard after login
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
};
