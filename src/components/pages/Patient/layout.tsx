import type React from 'react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, FileText, Home, LogOut, Menu, User, X } from 'lucide-react';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigation = [
        { name: 'Home', href: '/patient', icon: Home },
        { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
        { name: 'Medical Records', href: '/patient/records', icon: FileText },
        { name: 'Profile', href: '/patient/profile', icon: User }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-indigo-600 focus:outline-none"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-16 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-indigo-600">MediCare</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="px-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                        }`}
                                    >
                                        <item.icon
                                            className={`mr-3 h-5 w-5 ${
                                                isActive
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-500 group-hover:text-indigo-600'
                                            }`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-4 border-t border-gray-200">
                        <button
                            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                            onClick={() => console.log('Logout clicked')}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                <main className="p-4 sm:p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}
