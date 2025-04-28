import { useState } from "react";
import { Check, Clock, Heart, MapPin, MessageSquare, Phone, Star, Video, User } from 'lucide-react';

// Mock data for the doctor
const doctor = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    subSpecialty: 'Interventional Cardiology',
    rating: 4.9,
    reviewCount: 124,
    location: 'New York Medical Center',
    address: '123 Medical Plaza, New York, NY 10001',
    experience: '15 years',
    image: '/placeholder.svg?height=300&width=300',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She specializes in interventional cardiology and has performed over 1,000 cardiac catheterizations and stent placements.',
    education: [
        { degree: 'MD', institution: 'Harvard Medical School', year: '2005' },
        { degree: 'Residency', institution: 'Massachusetts General Hospital', year: '2009' },
        { degree: 'Fellowship', institution: 'Cleveland Clinic', year: '2012' }
    ],
    languages: ['English', 'Spanish'],
    consultationFee: '$200'
};

// Mock data for available time slots
const availableDates = [
    { date: '2023-05-15', day: 'Mon', slots: 5 },
    { date: '2023-05-16', day: 'Tue', slots: 3 },
    { date: '2023-05-17', day: 'Wed', slots: 0 },
    { date: '2023-05-18', day: 'Thu', slots: 7 },
    { date: '2023-05-19', day: 'Fri', slots: 2 },
    { date: '2023-05-22', day: 'Mon', slots: 4 },
    { date: '2023-05-23', day: 'Tue', slots: 6 }
];

const timeSlots = [
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '09:30 AM', available: true },
    { id: 3, time: '10:00 AM', available: false },
    { id: 4, time: '10:30 AM', available: true },
    { id: 5, time: '11:00 AM', available: true },
    { id: 6, time: '11:30 AM', available: false },
    { id: 7, time: '01:00 PM', available: true },
    { id: 8, time: '01:30 PM', available: true },
    { id: 9, time: '02:00 PM', available: true },
    { id: 10, time: '02:30 PM', available: false },
    { id: 11, time: '03:00 PM', available: true },
    { id: 12, time: '03:30 PM', available: true }
];

export const DoctorDetails = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(availableDates[0].date);
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

    const handleBookAppointment = () => {
        if (selectedDate && selectedTimeSlot) {
            setShowBookingModal(true);
        }
    };
    
    return (
        <div className="space-y-8">
            {/* Doctor profile header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto md:mx-0">
                            <img
                                src={doctor.image || '/placeholder.svg'}
                                alt={doctor.name}
                                width={160}
                                height={160}
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {doctor.name}
                                    </h1>
                                    <p className="text-indigo-600">
                                        {doctor.specialty} • {doctor.subSpecialty}
                                    </p>
                                </div>
                                <button className="mt-4 md:mt-0 flex items-center justify-center gap-1 text-gray-500 hover:text-red-500">
                                    <Heart className="h-5 w-5" />
                                    <span className="text-sm">Save to favorites</span>
                                </button>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    <span className="ml-1 font-medium">{doctor.rating}</span>
                                    <span className="ml-1 text-gray-500">
                                        ({doctor.reviewCount} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                    <span className="ml-1 text-gray-600">{doctor.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                    <span className="ml-1 text-gray-600">
                                        {doctor.experience} experience
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Book Appointment
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <Phone className="inline-block h-4 w-4 mr-1" />
                                    Call Clinic
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <MessageSquare className="inline-block h-4 w-4 mr-1" />
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Doctor info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            About Dr. Sarah Johnson
                        </h2>
                        <p className="text-gray-600">{doctor.bio}</p>

                        <div className="mt-6">
                            <h3 className="font-medium text-gray-900 mb-2">Education</h3>
                            <ul className="space-y-2">
                                {doctor.education.map((edu, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {edu.degree}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {edu.institution}, {edu.year}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-medium text-gray-900 mb-2">Languages</h3>
                            <div className="flex flex-wrap gap-2">
                                {doctor.languages.map((language, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
                                    >
                                        {language}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Consultation Fee</span>
                                <span className="font-semibold text-gray-900">
                                    {doctor.consultationFee}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-600">Address</span>
                                <span className="text-gray-900">{doctor.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Patient Reviews
                        </h2>
                        <div className="flex items-center mb-4">
                            <div className="flex items-center mr-4">
                                <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                                <span className="ml-2 text-3xl font-bold">{doctor.rating}</span>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    {doctor.reviewCount} verified patient reviews
                                </p>
                                <div className="flex items-center mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-4 w-4 ${
                                                star <= Math.floor(doctor.rating)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            View All Reviews
                        </button>
                    </div>
                </div>

                {/* Appointment booking */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Book an Appointment
                        </h2>

                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-3">
                                Select Appointment Type
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    className={`flex items-center px-4 py-2 rounded-md ${
                                        appointmentType === 'in-person'
                                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setAppointmentType('in-person')}
                                >
                                    <User className="h-5 w-5 mr-2" />
                                    In-Person Visit
                                </button>
                                <button
                                    className={`flex items-center px-4 py-2 rounded-md ${
                                        appointmentType === 'video'
                                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setAppointmentType('video')}
                                >
                                    <Video className="h-5 w-5 mr-2" />
                                    Video Consultation
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-3">Select Date</h3>
                            <div className="flex overflow-x-auto pb-2 space-x-2">
                                {availableDates.map((dateObj) => (
                                    <button
                                        key={dateObj.date}
                                        className={`flex flex-col items-center min-w-[80px] px-3 py-2 rounded-md ${
                                            selectedDate === dateObj.date
                                                ? 'bg-indigo-600 text-white'
                                                : dateObj.slots === 0
                                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                        onClick={() =>
                                            dateObj.slots > 0 && handleDateSelect(dateObj.date)
                                        }
                                        disabled={dateObj.slots === 0}
                                    >
                                        <span className="text-sm font-medium">{dateObj.day}</span>
                                        <span className="text-lg font-semibold">
                                            {new Date(dateObj.date).getDate()}
                                        </span>
                                        <span className="text-xs mt-1">
                                            {dateObj.slots > 0
                                                ? `${dateObj.slots} slots`
                                                : 'No slots'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-3">Select Time</h3>
                            {selectedDate ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {timeSlots.map((slot) => (
                                        <button
                                            key={slot.id}
                                            className={`px-3 py-2 rounded-md text-center ${
                                                selectedTimeSlot === slot.id
                                                    ? 'bg-indigo-600 text-white'
                                                    : !slot.available
                                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                            onClick={() =>
                                                slot.available && handleTimeSlotSelect(slot.id)
                                            }
                                            disabled={!slot.available}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Please select a date first</p>
                            )}
                        </div>

                        <button
                            className={`w-full px-4 py-3 rounded-md font-medium ${
                                selectedDate && selectedTimeSlot
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!selectedDate || !selectedTimeSlot}
                            onClick={handleBookAppointment}
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            {/* Booking confirmation modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Confirm Appointment
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <img
                                        src={doctor.image || '/placeholder.svg'}
                                        alt={doctor.name}
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{doctor.name}</p>
                                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium">
                                        {selectedDate &&
                                            new Date(selectedDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time:</span>
                                    <span className="font-medium">
                                        {
                                            timeSlots.find((slot) => slot.id === selectedTimeSlot)
                                                ?.time
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-medium">
                                        {appointmentType === 'in-person'
                                            ? 'In-Person Visit'
                                            : 'Video Consultation'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Fee:</span>
                                    <span className="font-medium">{doctor.consultationFee}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => setShowBookingModal(false)}
                                    >
                                        Confirm & Pay
                                    </button>
                                    <button
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => setShowBookingModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

