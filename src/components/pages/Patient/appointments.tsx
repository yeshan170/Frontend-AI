import PatientLayout from './layout';
import { Calendar, Clock, MapPin, MoreHorizontal, Search, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const appointments = [
    {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        date: 'May 15, 2023',
        time: '10:30 AM',
        status: 'upcoming',
        type: 'in-person',
        location: 'New York Medical Center',
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        specialty: 'Neurology',
        date: 'May 22, 2023',
        time: '2:15 PM',
        status: 'upcoming',
        type: 'video',
        location: 'Online Consultation',
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 3,
        doctorName: 'Dr. Emily Rodriguez',
        specialty: 'Dermatology',
        date: 'April 30, 2023',
        time: '9:00 AM',
        status: 'completed',
        type: 'in-person',
        location: 'City General Hospital',
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 4,
        doctorName: 'Dr. James Wilson',
        specialty: 'Orthopedics',
        date: 'April 15, 2023',
        time: '11:45 AM',
        status: 'completed',
        type: 'video',
        location: 'Online Consultation',
        image: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 5,
        doctorName: 'Dr. Lisa Thompson',
        specialty: 'Ophthalmology',
        date: 'March 28, 2023',
        time: '3:30 PM',
        status: 'cancelled',
        type: 'in-person',
        location: 'Vision Care Center',
        image: '/placeholder.svg?height=80&width=80'
    }
];

export const Appointments = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="all">All appointments</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Upcoming Appointments
                        </h2>
                        <Link
                            to="/patient/doctors"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            Book New Appointment
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {appointments
                            .filter((appointment) => appointment.status === 'upcoming')
                            .map((appointment) => (
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
                                        <p className="text-sm text-gray-500">
                                            {appointment.specialty}
                                        </p>
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
                                        <div className="flex items-center">
                                            {appointment.type === 'in-person' ? (
                                                <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Video className="mr-1.5 h-4 w-4 text-gray-400" />
                                            )}
                                            {appointment.location}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {appointment.type === 'video' && (
                                            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                                Join Call
                                            </button>
                                        )}
                                        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            Reschedule
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Past Appointments</h2>

                    <div className="space-y-4">
                        {appointments
                            .filter(
                                (appointment) =>
                                    appointment.status === 'completed' ||
                                    appointment.status === 'cancelled'
                            )
                            .map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg ${
                                        appointment.status === 'cancelled'
                                            ? 'border-red-100 bg-red-50'
                                            : 'border-gray-100 hover:bg-gray-50'
                                    }`}
                                >
                                    <img
                                        src={appointment.image || '/placeholder.svg'}
                                        alt={appointment.doctorName}
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <h3 className="font-medium text-gray-900">
                                                {appointment.doctorName}
                                            </h3>
                                            <span
                                                className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                                                    appointment.status === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {appointment.status === 'completed'
                                                    ? 'Completed'
                                                    : 'Cancelled'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {appointment.specialty}
                                        </p>
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
                                        <div className="flex items-center">
                                            {appointment.type === 'in-person' ? (
                                                <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Video className="mr-1.5 h-4 w-4 text-gray-400" />
                                            )}
                                            {appointment.location}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {appointment.status === 'completed' && (
                                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                View Summary
                                            </button>
                                        )}
                                        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
