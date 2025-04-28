import { useState } from 'react';
import PatientLayout from './layout';
import { Camera, Edit2, Save, X } from 'lucide-react';

// Mock patient data
const patientData = {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    bloodType: 'O+',
    address: '123 Main Street, New York, NY 10001',
    emergencyContact: 'Jane Smith (Wife) - +1 (555) 987-6543',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension', 'Asthma'],
    image: '/placeholder.svg?height=200&width=200'
};

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        bloodType: patientData.bloodType,
        address: patientData.address,
        emergencyContact: patientData.emergencyContact,
        allergies: patientData.allergies.join(', '),
        chronicConditions: patientData.chronicConditions.join(', ')
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the updated data to your backend
        console.log('Updated profile data:', formData);
        setIsEditing(false);
    };
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center px-4 py-2 rounded-md ${
                        isEditing
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                >
                    {isEditing ? (
                        <>
                            <X className="mr-2 h-5 w-5" /> Cancel
                        </>
                    ) : (
                        <>
                            <Edit2 className="mr-2 h-5 w-5" /> Edit Profile
                        </>
                    )}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Profile Image */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                                    <img
                                        src={patientData.image || '/placeholder.svg'}
                                        alt="Profile"
                                        width={160}
                                        height={160}
                                        className="object-cover"
                                    />
                                    {isEditing && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <button
                                                type="button"
                                                className="p-2 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                                            >
                                                <Camera className="h-6 w-6" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                                    {patientData.name}
                                </h2>
                                <p className="text-gray-500">Patient ID: #{patientData.id}</p>
                            </div>

                            {/* Profile Information */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date of Birth
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">
                                            {new Date(formData.dateOfBirth).toLocaleDateString(
                                                'en-US',
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }
                                            )}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    {isEditing ? (
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">
                                                Prefer not to say
                                            </option>
                                        </select>
                                    ) : (
                                        <p className="text-gray-900">{formData.gender}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Blood Type
                                    </label>
                                    {isEditing ? (
                                        <select
                                            name="bloodType"
                                            value={formData.bloodType}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="Unknown">Unknown</option>
                                        </select>
                                    ) : (
                                        <p className="text-gray-900">{formData.bloodType}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.address}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Emergency Contact
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{formData.emergencyContact}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Allergies
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="allergies"
                                            value={formData.allergies}
                                            onChange={handleChange}
                                            placeholder="Separate with commas"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {patientData.allergies.map((allergy, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full"
                                                >
                                                    {allergy}
                                                </span>
                                            ))}
                                            {patientData.allergies.length === 0 && (
                                                <p className="text-gray-500">No known allergies</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Chronic Conditions
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="chronicConditions"
                                            value={formData.chronicConditions}
                                            onChange={handleChange}
                                            placeholder="Separate with commas"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {patientData.chronicConditions.map(
                                                (condition, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-full"
                                                    >
                                                        {condition}
                                                    </span>
                                                )
                                            )}
                                            {patientData.chronicConditions.length === 0 && (
                                                <p className="text-gray-500">
                                                    No chronic conditions
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <Save className="mr-2 h-5 w-5" /> Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-gray-900">Change Password</h3>
                                <p className="text-sm text-gray-500">
                                    Update your password regularly to keep your account secure
                                </p>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Change Password
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Two-Factor Authentication
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Add an extra layer of security to your account
                                </p>
                            </div>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Enable
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
