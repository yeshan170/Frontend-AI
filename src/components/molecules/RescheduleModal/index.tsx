import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';

interface RescheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (date: string, time: string) => void;
    appointmentDetails: {
        doctorName: string;
        specialty: string;
        currentDate: string;
        currentTime: string;
    };
}

// Available time slots (you might want to fetch these from an API)
const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM'
];

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    appointmentDetails
}) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    // Get next 7 available dates
    const availableDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        return date.toISOString().split('T')[0];
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <Typography variant="h3" label="Reschedule Appointment" />

                <div className="mt-4">
                    <Typography
                        variant="p"
                        label={`Current appointment with ${appointmentDetails.doctorName}`}
                        className="text-gray-600"
                    />
                    <Typography
                        variant="p"
                        label={`${appointmentDetails.currentDate} at ${appointmentDetails.currentTime}`}
                        className="text-gray-600"
                    />
                </div>

                {/* Date Selection */}
                <div className="mt-6">
                    <Typography variant="h4" label="Select New Date" />
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {availableDates.map((date) => (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={`p-2 rounded border ${
                                    selectedDate === date
                                        ? 'bg-indigo-600 text-white'
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                {new Date(date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                    <div className="mt-6">
                        <Typography variant="h4" label="Select New Time" />
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`p-2 rounded border ${
                                        selectedTime === time
                                            ? 'bg-indigo-600 text-white'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-3">
                    <Button type="secondary" label="Cancel" onClick={onClose} />
                    <Button
                        type="primary"
                        label="Confirm"
                        onClick={() => {
                            if (selectedDate && selectedTime) {
                                onConfirm(selectedDate, selectedTime);
                                onClose();
                            }
                        }}
                        isDisable={!selectedDate || !selectedTime}
                    />
                </div>
            </div>
        </div>
    );
};
