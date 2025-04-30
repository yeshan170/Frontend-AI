import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

// Placeholder for fetching patient data based on ID
const mockPatientData = {
    id: 1,
    image: '/placeholder.svg?height=200&width=200',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    bloodType: 'O+',
    address: '123 Main Street, New York, NY 10001',
    emergencyContact: 'Jane Smith (Wife) - +1 (555) 987-6543',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension', 'Asthma']
};

export const DoctorPatientProfile = () => {
    const { id } = useParams();
    // TODO: replace mockPatientData with real fetch by id
    const patient = mockPatientData;

    return (
        <div className="space-y-8">
            {/* Header with avatar */}
            <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-8">
                <img
                    src={patient.image}
                    alt={patient.name}
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800">{patient.name}</h1>
                    <p className="text-gray-500">Patient ID: #{patient.id}</p>
                </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
                    <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
                        <div>
                            <dt className="font-medium text-gray-700">Email</dt>
                            <dd>{patient.email}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-700">Phone</dt>
                            <dd>{patient.phone}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-700">Date of Birth</dt>
                            <dd>{new Date(patient.dateOfBirth).toLocaleDateString()}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-700">Gender</dt>
                            <dd>{patient.gender}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-700">Blood Type</dt>
                            <dd>{patient.bloodType}</dd>
                        </div>
                    </dl>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Contact & Emergency</h2>
                    <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
                        <div>
                            <dt className="font-medium text-gray-700">Address</dt>
                            <dd>{patient.address}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-700">Emergency Contact</dt>
                            <dd>{patient.emergencyContact}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Medical Details</h2>
                <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
                    <div>
                        <dt className="font-medium text-gray-700">Allergies</dt>
                        <dd>{patient.allergies.join(', ') || 'None'}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-700">Chronic Conditions</dt>
                        <dd>{patient.chronicConditions.join(', ') || 'None'}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};
