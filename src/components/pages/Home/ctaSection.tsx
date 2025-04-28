import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography"
import { useNavigate } from 'react-router-dom';

export const CTA = () => {
    const navigate = useNavigate();

    return (
        <>
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <Typography
                        label="Ready to Get Started?"
                        variant="h2"
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    />
                    <Typography
                        label="Join thousands of satisfied users who have transformed their workflow with our platform."
                        variant="p"
                        className="text-gray-600 max-w-2xl mx-auto mb-8"
                    />
                    <div className="flex justify-center space-x-4">
                        <Button
                            label="Login"
                            type="default"
                            className="bg-transparent bg-white px-5 py-2 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition duration-300"
                            onClick={() => {
                                navigate('/login');
                            }}
                        />
                        <Button
                            label="Register Now"
                            type="primary"
                            onClick={() => {
                                navigate('/register');
                            }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};
