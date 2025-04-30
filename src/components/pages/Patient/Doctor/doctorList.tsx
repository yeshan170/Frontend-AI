import React, { useState, useMemo } from 'react';
import { MapPin, Search, Star, User, Clock, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAllDoctorsQuery } from '@/services/doctorApi';

export const DoctorList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('');
    const { data: doctors, isLoading, error } = useGetAllDoctorsQuery();

    // Group doctors by specialization
    const doctorsBySpecialty = useMemo(() => {
        if (!doctors) return {};
        return doctors.reduce(
            (acc, doctor) => {
                const specialty = doctor.specialization;
                if (!acc[specialty]) {
                    acc[specialty] = [];
                }
                acc[specialty].push(doctor);
                return acc;
            },
            {} as Record<string, typeof doctors>
        );
    }, [doctors]);

    // Filter doctors based on search term and availability
    const filteredSpecialties = useMemo(() => {
        const specialties = Object.keys(doctorsBySpecialty);
        if (!searchTerm) return specialties;
        return specialties.filter(
            (specialty) =>
                specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctorsBySpecialty[specialty].some((doctor) =>
                    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
        );
    }, [doctorsBySpecialty, searchTerm]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                Error loading doctors. Please try again later.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Search and filter controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search doctors or specialties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">All availabilities</option>
                    <option value="available">Available today</option>
                    <option value="this-week">Available this week</option>
                    <option value="next-week">Available next week</option>
                </select>
            </div>

            {/* Doctors list grouped by specialty */}
            {filteredSpecialties.map((specialty) => (
                <div key={specialty} className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{specialty}</h2>
                        <p className="text-gray-600">
                            {doctorsBySpecialty[specialty].length} doctors available
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctorsBySpecialty[specialty].map((doctor) => (
                            <Link
                                key={doctor.id || doctor._id}
                                to={`/patient/doctors/${doctor.id || doctor._id}`}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg text-gray-900">
                                            {doctor.name}
                                        </h3>
                                        {doctor.isActive && (
                                            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Active
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-indigo-600 text-sm font-medium">
                                            {doctor.specialization}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <User className="h-4 w-4 mr-2" />
                                            SLMC: {doctor.slmcRegistrationNo}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-2" />
                                            {doctor.experience} years experience
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Phone className="h-4 w-4 mr-2" />
                                            {doctor.contactNumber}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Mail className="h-4 w-4 mr-2" />
                                            {doctor.email}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <p className="font-medium">Qualification:</p>
                                            <p>{doctor.qualification}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">
                                            View Profile & Book
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}

            {filteredSpecialties.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No doctors found matching your search criteria.
                </div>
            )}
        </div>
    );
};
