import { Calendar, Clock, Search, Users, CreditCard, TrendingUp, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for today's appointments
const todaysAppointments = [
    {
        id: 1,
        patientName: 'Sarah Johnson',
        age: 42,
        time: '9:00 AM',
        reason: 'Annual checkup',
        status: 'Checked In',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 2,
        patientName: 'Michael Chen',
        age: 35,
        time: '10:30 AM',
        reason: 'Follow-up consultation',
        status: 'Scheduled',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 3,
        patientName: 'Emily Davis',
        age: 28,
        time: '1:15 PM',
        reason: 'Headache and dizziness',
        status: 'Scheduled',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 4,
        patientName: 'Robert Wilson',
        age: 51,
        time: '3:45 PM',
        reason: 'Medication review',
        status: 'Scheduled',
        avatar: '/placeholder.svg?height=80&width=80'
    }
];

// Stats data
const stats = [
    {
        title: 'Total Patients',
        value: '1,284',
        change: '+12%',
        icon: Users,
        color: 'bg-blue-100',
        iconColor: 'text-blue-600'
    },
    {
        title: 'Appointments',
        value: '48',
        change: '+8%',
        icon: Calendar,
        color: 'bg-indigo-100',
        iconColor: 'text-indigo-600'
    },
    {
        title: 'Revenue',
        value: '$28,350',
        change: '+24%',
        icon: CreditCard,
        color: 'bg-green-100',
        iconColor: 'text-green-600'
    },
    {
        title: 'Avg. Visit Time',
        value: '24min',
        change: '-2%',
        icon: Clock,
        color: 'bg-amber-100',
        iconColor: 'text-amber-600'
    }
];

export const Doctor = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="space-y-8">
            {/* Welcome section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, Dr. Jefferson
                        </h1>
                        <p className="text-gray-600 mt-1">{currentDate}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search patients..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <div className="flex items-baseline">
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {stat.value}
                                    </p>
                                    <p
                                        className={`ml-2 text-sm font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}
                                    >
                                        {stat.change}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Today's appointments */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Today's Appointments
                        </h2>
                        <Link
                            to="/doctor/appointments"
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            View all
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Patient
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Reason
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {todaysAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={appointment.avatar}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {appointment.patientName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {appointment.age} years old
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {appointment.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {appointment.reason}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${appointment.status === 'Checked In' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/doctor/patients/${appointment.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            View
                                        </Link>
                                        <button className="text-blue-600 hover:text-blue-900">
                                            Start
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
