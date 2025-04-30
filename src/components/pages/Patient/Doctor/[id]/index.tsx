import { useState } from 'react';
import {
    Check,
    Clock,
    Heart,
    MapPin,
    MessageSquare,
    Phone,
    Star,
    Video,
    User,
    Calendar
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDoctorByIdQuery } from '@/services/doctorApi';
import { useCreateAppointmentMutation } from '@/services/appointmentApi';
import { toast } from 'react-hot-toast';

// Mock data for available time slots only - will be replaced with actual schedules
const timeSlots = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:00 AM', available: true },
    { id: 3, time: '11:00 AM', available: true },
    { id: 4, time: '02:00 PM', available: true },
    { id: 5, time: '03:00 PM', available: true },
    { id: 6, time: '04:00 PM', available: true }
];

export const DoctorDetails = () => {
    const navigate = useNavigate();
    const { id: doctorId } = useParams();
    const { data: doctor, isLoading: isDoctorLoading } = useGetDoctorByIdQuery(doctorId || '');
    const [createAppointment, { isLoading: isBooking }] = useCreateAppointmentMutation();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
    const [appointmentType, setAppointmentType] = useState<'in-person' | 'video'>('in-person');
    const [showBookingModal, setShowBookingModal] = useState(false);

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setSelectedTimeSlot(null);
    };

    const handleTimeSlotSelect = (slotId: number) => {
        setSelectedTimeSlot(slotId);
    };

    const handleBookAppointmentClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (selectedDate && selectedTimeSlot) {
            setShowBookingModal(true);
        }
    };

    const handleConfirmBooking = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedTimeSlot || !doctorId) return;

        const selectedSlot = timeSlots.find((slot) => slot.id === selectedTimeSlot);
        if (!selectedSlot) return;

        try {
            // Parse the time string to get hours and minutes
            const [time, meridian] = selectedSlot.time.split(' ');
            const [hours, minutes] = time.split(':');
            let startHour = parseInt(hours);

            // Convert to 24-hour format
            if (meridian === 'PM' && startHour !== 12) {
                startHour += 12;
            } else if (meridian === 'AM' && startHour === 12) {
                startHour = 0;
            }

            // Format times
            const startTime = `${startHour.toString().padStart(2, '0')}:${minutes}`;
            const endHour = (startHour + 1) % 24;
            const endTime = `${endHour.toString().padStart(2, '0')}:${minutes}`;

            await createAppointment({
                doctorId,
                date: selectedDate,
                startTime,
                endTime,
                type: appointmentType === 'video' ? 'virtual' : 'in-person',
                location: appointmentType === 'video' ? 'Video Call' : 'Main Clinic'
            }).unwrap();

            toast.success('Appointment booked successfully!');
            setShowBookingModal(false);
            // Optionally redirect to appointments page
            navigate('/patient/appointments');
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error('Failed to book appointment. Please try again.');
        }
    };

    if (isDoctorLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!doctor) {
        return <div className="text-center py-8 text-red-500">Doctor not found.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-indigo-600 hover:text-indigo-700 flex items-center"
            >
                ← Back to Doctors
            </button>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                            <p className="text-lg text-indigo-600 mb-4">{doctor.specialization}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-2" />
                                    <span>SLMC: {doctor.slmcRegistrationNo}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                                    <span>{doctor.experience} years experience</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                    <span>{doctor.contactNumber}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                    <span>Available for appointments</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-900">Qualification</h3>
                                    <p className="text-gray-600">{doctor.qualification}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/3">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="font-medium text-gray-900 mb-4">Book Appointment</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Appointment Type
                                        </label>
                                        <div className="mt-2 space-x-2">
                                            <button
                                                className={`px-4 py-2 rounded-md ${
                                                    appointmentType === 'in-person'
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-300'
                                                }`}
                                                onClick={() => setAppointmentType('in-person')}
                                            >
                                                In Person
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded-md ${
                                                    appointmentType === 'video'
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 border border-gray-300'
                                                }`}
                                                onClick={() => setAppointmentType('video')}
                                            >
                                                Video Call
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={handleBookAppointmentClick}
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Book Appointment with {doctor.name}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={selectedDate || ''}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            {selectedDate && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Select Time
                                    </label>
                                    <div className="mt-2 grid grid-cols-3 gap-2">
                                        {timeSlots.map((slot) => (
                                            <button
                                                key={slot.id}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    selectedTimeSlot === slot.id
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white border border-gray-300 text-gray-700'
                                                }`}
                                                onClick={() => handleTimeSlotSelect(slot.id)}
                                            >
                                                {slot.time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                <button
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    onClick={handleConfirmBooking}
                                    disabled={!selectedDate || !selectedTimeSlot || isBooking}
                                >
                                    {isBooking ? 'Booking...' : 'Confirm Booking'}
                                </button>
                                <button
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                                    onClick={() => setShowBookingModal(false)}
                                    disabled={isBooking}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
