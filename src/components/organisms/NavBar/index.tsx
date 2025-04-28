import { Button } from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="border-b border-gray-100">
            <div className="container mx-auto px-4 py-5">
                <div className="flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold text-gray-800">
                        YourBrand
                    </a>

                    <div className="hidden md:flex space-x-6">
                        <Button
                            label="Home"
                            type="link"
                            onClick={() => console.log('clicked')}
                            className="px-0"
                        />
                        <Button
                            label="Features"
                            type="link"
                            onClick={() => console.log('clicked')}
                            className="px-0"
                        />
                        <Button
                            label="Pricing"
                            type="link"
                            onClick={() => console.log('clicked')}
                            className="px-0"
                        />
                        <Button
                            label="About"
                            type="link"
                            onClick={() => console.log('clicked')}
                            className="px-0"
                        />
                        <Button
                            label="Contact"
                            type="link"
                            onClick={() => console.log('clicked')}
                            className="px-0"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <Button
                            label="Login"
                            type="primary"
                            onClick={() => {
                                navigate('/login');
                            }}
                        />
                        <Button
                            label="Register"
                            type="secondary"
                            onClick={() => {
                                navigate('/register');
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};
