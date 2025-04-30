import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDoctorByIdQuery } from '@/services/doctorApi';
import { skipToken } from '@reduxjs/toolkit/query';

export const DoctorDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // If no ID is provided, redirect back
    React.useEffect(() => {
        if (!id) {
            navigate(-1);
        }
    }, [id, navigate]);

    // Only fetch if we have an ID
    const { data: doctor, isLoading, error } = useGetDoctorByIdQuery(id ?? skipToken);

    if (!id) {
        return null; // Will redirect due to useEffect
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error || !doctor) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Not Found</h2>
                <p className="text-gray-600 mb-4">
                    The doctor you're looking for could not be found.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    ← Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="text-indigo-600 hover:text-indigo-800 mb-6 flex items-center"
            >
                ← Back to Doctors
            </button>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
                        <p className="text-lg text-gray-600">{doctor.specialization}</p>
                    </div>
                    <button
                        onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
                        className="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Book Appointment
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">About</h2>
                        <p className="text-gray-600">
                            {doctor.about || 'No information available'}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Specialties</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>{doctor.specialization}</li>
                            {doctor.subspecialties?.map((subspecialty, index) => (
                                <li key={index}>{subspecialty}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
                        <ul className="space-y-2 text-gray-600">
                            {doctor.education?.map((edu, index) => <li key={index}>{edu}</li>) || (
                                <li>No education information available</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Contact Information
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>Email: {doctor.email}</li>
                            <li>Phone: {doctor.phone || 'Not available'}</li>
                            <li>Office: {doctor.office || 'Not available'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
