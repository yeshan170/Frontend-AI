// src/data/appointments.ts
export interface Appointment {
    id: number;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    type: 'in-person' | 'video';
    location: string;
    status?: string;
    avatar?: string;
}

export const appointments: Appointment[] = [
    {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        time: '10:30 AM',
        type: 'in-person',
        location: 'New York Medical Center',
        status: 'upcoming',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        specialty: 'Neurology',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        time: '2:15 PM',
        type: 'video',
        location: 'Online Consultation',
        status: 'upcoming',
        avatar: '/placeholder.svg?height=80&width=80'
    },
    // ... add more sample entries as needed ...
]; 