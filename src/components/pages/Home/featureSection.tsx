import { Typography } from '@/components/atoms/Typography';

export const FeatureSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Typography
                        label="Our Features"
                        variant="h2"
                        className="md:text-4xl text-gray-900 mb-4"
                    />
                    <Typography
                        label="Discover the tools that will revolutionize your workflow and boost productivity."
                        variant="p"
                        className="text-gray-600 max-w-2xl mx-auto"
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-2xl text-indigo-600 mb-6">
                            ✨
                        </div>
                        <Typography
                            label="Channeling"
                            variant="h3"
                            className="font-semibold text-gray-900 mb-3"
                        />
                        <Typography
                            label="Work together with your team in real-time, share files, and communicate efficiently."
                            variant="p"
                            className="text-gray-600"
                        />
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-2xl text-indigo-600 mb-6">
                            📊
                        </div>
                        <Typography
                            label="Advanced Analytics"
                            variant="h3"
                            className="font-semibold text-gray-900 mb-3"
                        />
                        <Typography
                            label="Get insights into your performance with detailed reports and visualizations."
                            variant="p"
                            className="text-gray-600"
                        />
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-2xl text-indigo-600 mb-6">
                            🔒
                        </div>
                        <Typography
                            label="Secure Platform"
                            variant="h3"
                            className="font-semibold text-gray-900 mb-3"
                        />
                        <p className="text-gray-600">
                            Your data is protected with enterprise-grade security and regular
                            backups.
                        </p>
                        <Typography
                            label="Your data is protected with enterprise-grade security and regular backups."
                            variant="p"
                            className="text-gray-600"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
