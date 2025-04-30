import { useState } from 'react';
import { Search, Filter, Users, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock patient data
const patientList = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        age: 42,
        gender: 'Female',
        lastVisit: '2023-04-28',
        condition: 'Hypertension',
        upcomingAppointment: '2023-05-15',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        age: 35,
        gender: 'Male',
        lastVisit: '2023-04-15',
        condition: 'Type 2 Diabetes',
        upcomingAppointment: '2023-05-17',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 3,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        age: 28,
        gender: 'Female',
        lastVisit: '2023-03-22',
        condition: 'Migraine',
        upcomingAppointment: '2023-05-20',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 4,
        name: 'Robert Wilson',
        email: 'robert.wilson@example.com',
        age: 51,
        gender: 'Male',
        lastVisit: '2023-04-10',
        condition: 'Arthritis',
        upcomingAppointment: null,
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 5,
        name: 'Jennifer Smith',
        email: 'jennifer.smith@example.com',
        age: 38,
        gender: 'Female',
        lastVisit: '2023-04-21',
        condition: 'Asthma',
        upcomingAppointment: '2023-05-18',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 6,
        name: 'David Lee',
        email: 'david.lee@example.com',
        age: 45,
        gender: 'Male',
        lastVisit: '2023-03-15',
        condition: 'Hyperlipidemia',
        upcomingAppointment: '2023-05-22',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 7,
        name: 'Jessica Brown',
        email: 'jessica.brown@example.com',
        age: 32,
        gender: 'Female',
        lastVisit: '2023-04-05',
        condition: 'Anxiety',
        upcomingAppointment: null,
        avatar: '/placeholder.svg?height=80&width=80'
    }
];

export const Patients = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter patients based on search query
    const filteredPatients = patientList.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center">
                        <Users className="h-6 w-6 text-blue-600 mr-2" />
                        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search patients..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            + Add Patient
                        </button>
                    </div>
                </div>
            </div>

            {/* Patients list */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {filteredPatients.length} Patient{filteredPatients.length !== 1 ? 's' : ''}
                    </h2>
                </div>

                <div className="divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                        <div key={patient.id} className="p-6 hover:bg-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                <div className="flex items-start">
                                    <img
                                        className="h-12 w-12 rounded-full"
                                        src={patient.avatar}
                                        alt=""
                                    />
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">
                                            {patient.name}
                                        </div>
                                        <div className="text-sm text-gray-500">{patient.email}</div>
                                        <div className="text-sm text-gray-500">
                                            {patient.age} years • {patient.gender}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-0 flex flex-col items-start">
                                    <div className="text-sm font-medium text-gray-900">
                                        Primary Condition
                                    </div>
                                    <div className="text-sm text-gray-500">{patient.condition}</div>
                                </div>

                                <div className="mt-4 sm:mt-0 flex flex-col items-start">
                                    <div className="text-sm font-medium text-gray-900">
                                        Last Visit
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(patient.lastVisit).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-0 flex flex-col items-start">
                                    <div className="text-sm font-medium text-gray-900">
                                        Next Appointment
                                    </div>
                                    {patient.upcomingAppointment ? (
                                        <div className="text-sm text-blue-600 flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {new Date(
                                                patient.upcomingAppointment
                                            ).toLocaleDateString()}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-500">No upcoming</div>
                                    )}
                                </div>

                                <div className="mt-4 sm:mt-0">
                                    <Link
                                        to={`/doctor/patients/${patient.id}`}
                                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        View Profile
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPatients.length === 0 && (
                    <div className="p-6 text-center">
                        <p className="text-gray-500">No patients found matching "{searchQuery}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};
