import { MapPin, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const doctors = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        rating: 4.9,
        reviewCount: 124,
        location: 'New York Medical Center',
        experience: '15 years',
        image: '/placeholder.svg?height=200&width=200',
        available: true
    },
    {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        rating: 4.8,
        reviewCount: 98,
        location: 'Heart & Vascular Institute',
        experience: '12 years',
        image: '/placeholder.svg?height=200&width=200',
        available: true
    },
    {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        specialty: 'Cardiology',
        rating: 4.7,
        reviewCount: 87,
        location: 'City General Hospital',
        experience: '10 years',
        image: '/placeholder.svg?height=200&width=200',
        available: false
    },
    {
        id: 4,
        name: 'Dr. James Wilson',
        specialty: 'Cardiology',
        rating: 4.9,
        reviewCount: 156,
        location: 'University Medical Center',
        experience: '20 years',
        image: '/placeholder.svg?height=200&width=200',
        available: true
    }
];

export const DoctorList = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Cardiologists</h1>
                    <p className="text-gray-600">Heart and cardiovascular system specialists</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Filter by availability</option>
                        <option value="available">Available today</option>
                        <option value="this-week">Available this week</option>
                        <option value="next-week">Available next week</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <Link
                        key={doctor.id}
                        to={`/patient/doctors/${doctor.id}`}
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="relative h-48 bg-indigo-100">
                            <img
                                src={doctor.image || '/placeholder.svg'}
                                alt={doctor.name}
                                className="object-cover"
                            />
                            {doctor.available && (
                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                                    Available Today
                                </div>
                            )}
                        </div>
                        <div className="p-5">
                            <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                            <p className="text-indigo-600 text-sm">{doctor.specialty}</p>
                            <div className="flex items-center mt-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm font-medium text-gray-900">
                                    {doctor.rating}
                                </span>
                                <span className="ml-1 text-sm text-gray-500">
                                    ({doctor.reviewCount} reviews)
                                </span>
                            </div>
                            <div className="flex items-start mt-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                <span className="ml-1.5 text-sm text-gray-500">
                                    {doctor.location}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-sm text-gray-500">
                                    {doctor.experience} experience
                                </span>
                                <span className="text-sm font-medium text-indigo-600">
                                    View Profile
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
