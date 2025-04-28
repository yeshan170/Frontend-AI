import { Calendar, Clock, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const specialties = [
    {
        id: 1,
        name: 'Cardiology',
        description: 'Heart and cardiovascular system specialists',
        icon: '❤️',
        doctorCount: 12
    },
    {
        id: 2,
        name: 'Neurology',
        description: 'Brain, spinal cord, and nervous system specialists',
        icon: '🧠',
        doctorCount: 8
    },
    {
        id: 3,
        name: 'Orthopedics',
        description: 'Bone, joint, ligament, tendon, and muscle specialists',
        icon: '🦴',
        doctorCount: 15
    },
    {
        id: 4,
        name: 'Dermatology',
        description: 'Skin, hair, and nail specialists',
        icon: '👨‍⚕️',
        doctorCount: 10
    },
    {
        id: 5,
        name: 'Pediatrics',
        description: 'Child and adolescent health specialists',
        icon: '👶',
        doctorCount: 14
    },
    {
        id: 6,
        name: 'Ophthalmology',
        description: 'Eye and vision specialists',
        icon: '👁️',
        doctorCount: 7
    }
];

const upcomingAppointments = [
    {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        date: 'May 15, 2023',
        time: '10:30 AM',
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        specialty: 'Neurology',
        date: 'May 22, 2023',
        time: '2:15 PM',
        image: '/placeholder.svg?height=80&width=80'
    }
];

export const Patient = () => (
    <div className="space-y-8">
        {/* Welcome section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome back, John!</h1>
                    <p className="text-gray-600 mt-1">How are you feeling today?</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for doctors, specialties..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>

        {/* Upcoming appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
                <Link
                    to="/patient/appointments"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                    View all
                </Link>
            </div>

            {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                        >
                            <img
                                src={appointment.image || '/placeholder.svg'}
                                alt={appointment.doctorName}
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                    {appointment.doctorName}
                                </h3>
                                <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                                    {appointment.date}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                                    {appointment.time}
                                </div>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Reschedule
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Link
                        to="/patient/doctors"
                        className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        Book an appointment
                    </Link>
                </div>
            )}
        </div>

        {/* Medical specialties */}
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Find Doctors by Specialty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialties.map((specialty) => (
                    <Link
                        key={specialty.id}
                        to={`/patient/doctors?specialty=${specialty.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                        <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">{specialty.icon}</span>
                            <h3 className="font-medium text-gray-900">{specialty.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{specialty.description}</p>
                        <div className="text-xs text-gray-400">
                            {specialty.doctorCount} doctors available
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);
