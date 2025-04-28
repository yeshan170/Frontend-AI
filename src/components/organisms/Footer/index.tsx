import { Typography } from "@/components/atoms/Typography";

export const Footer = () => { 
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div>
                        <Typography label="YourBrand" variant="h3" className="text-lg font-semibold mb-4" />
                        <Typography label="Making your work easier and more productive since 2023." variant="p" className="text-gray-400 mb-5" />
                    </div>

                    <div>
                        <Typography label="Product" variant="h3" className="text-lg font-semibold mb-4" />
                        <ul className="space-y-2">
                            <li>
                                <Typography label="Features" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Pricing" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Integrations" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Updates" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Typography label="Company" variant="h3" className="text-lg font-semibold mb-4" />
                        <ul className="space-y-2">
                            <li>
                                <Typography label="About Us" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Careers" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Blog" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Contact" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Typography label="Support" variant="h3" className="text-lg font-semibold mb-4" />
                        <ul className="space-y-2">
                            <li>
                                <Typography label="Help Center" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Community" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Status" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                            <li>
                                <Typography label="Privacy Policy" variant="p" className="text-gray-400 hover:text-white" />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
                    <Typography label="© 2023 YourBrand. All rights reserved." variant="p" />
                </div>
            </div>
        </footer>
    );
}
