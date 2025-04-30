import { LoginForm } from '@/components/molecules/Form/loginForm';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/services/userApi';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (email: string, password: string) => {
        try {
            console.log('Starting login process...');
            const result = await login({ email, password }).unwrap();
            console.log('Login response:', {
                accessToken: result.accessToken ? 'present' : 'missing',
                refreshToken: result.refreshToken ? 'present' : 'missing',
                user: result.user
            });

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(result.user));

            // Navigation based on user role
            const userRole = result.user.role;
            console.log('User role:', userRole);

            // Navigate to the home page of respective role
            const homePath = userRole === 'doctor' ? '/doctor/home' : '/patient/home';
            console.log('Navigating to:', homePath);

            navigate(homePath, { replace: true });
        } catch (error: any) {
            console.error('Login failed:', error);
            const errorMessage = error.data?.message || 'Invalid email or password';
            alert(errorMessage);
        }
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
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            </div>
        </div>
    );
};
