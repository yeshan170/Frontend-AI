import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import heroImage from '../../../assets/mental_health_Stocksy.webp';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                        <Typography
                            label="Mental Health Sporting Platform"
                            variant="h1"
                            className="md:text-5xl leading-tight text-gray-900 mb-5"
                        />
                        <Typography
                            label="Discover the easiest way to manage your projects, collaborate with your team, and achieve your goals faster than ever before."
                            variant="p"
                            className="text-lg text-gray-600 mb-8"
                        />
                        <Button
                            label="Get Started"
                            type="primary"
                            onClick={() => {
                                navigate('/register');
                            }}
                        />
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src={heroImage}
                            alt="Mental health support visual representation"
                            className="w-full rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
