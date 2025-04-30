import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';
import { RescheduleModal } from '../RescheduleModal';
import { useNavigate } from 'react-router-dom';

export interface AppointmentCardProps {
    id: number;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    type: 'in-person' | 'video';
    location: string;
    avatar?: string;
    onReschedule: (id: number, newDate: string, newTime: string) => void;
    onJoin?: (id: number) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
    id,
    doctorName,
    specialty,
    date,
    time,
    type,
    location,
    avatar,
    onReschedule,
    onJoin
}) => {
    const [showReschedule, setShowReschedule] = useState(false);
    const navigate = useNavigate();

    const handleReschedule = (newDate: string, newTime: string) => {
        onReschedule(id, newDate, newTime);
    };

    return (
        <>
            <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
                {avatar && (
                    <img
                        src={avatar}
                        alt={`${doctorName} avatar`}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                )}
                <div className="flex-grow">
                    <Typography variant="h4" label={doctorName} />
                    <Typography variant="p" label={specialty} className="text-sm text-gray-500" />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{date}</span>
                    <Clock className="h-4 w-4" />
                    <span>{time}</span>
                    {type === 'in-person' ? (
                        <MapPin className="h-4 w-4" />
                    ) : (
                        <Video className="h-4 w-4" />
                    )}
                    <span>{location}</span>
                </div>

                <div className="ml-auto flex gap-2">
                    {type === 'video' && onJoin && (
                        <Button
                            type="success"
                            onClick={() =>
                                navigate(
                                    `${window.location.pathname.split('/').slice(0, 3).join('/')}/call/${id}`
                                )
                            }
                        >
                            Join Call
                        </Button>
                    )}
                    <Button type="primary" onClick={() => setShowReschedule(true)}>
                        Reschedule
                    </Button>
                    <Link to="#" className="text-gray-500">
                        •••
                    </Link>
                </div>
            </div>

            <RescheduleModal
                isOpen={showReschedule}
                onClose={() => setShowReschedule(false)}
                onConfirm={handleReschedule}
                appointmentDetails={{
                    doctorName,
                    specialty,
                    currentDate: date,
                    currentTime: time
                }}
            />
        </>
    );
};
