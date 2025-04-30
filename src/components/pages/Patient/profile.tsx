import { useState } from 'react';
import { Camera, Edit2, Save, X } from 'lucide-react';
import { useGetPatientProfileQuery, useUpdatePatientProfileMutation, type PatientProfile } from '@/services/patientApi';

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { data: profile, isLoading } = useGetPatientProfileQuery();
    const [updateProfile] = useUpdatePatientProfileMutation();

    const [formData, setFormData] = useState<Partial<PatientProfile>>({
        name: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        bloodGroup: '',
        allergies: [],
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        },
        emergencyContact: {
            name: '',
            relationship: '',
            contactNumber: ''
        }
    });

    // Update form data when profile is loaded
    useState(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                email: profile.email,
                dateOfBirth: profile.dateOfBirth,
                gender: profile.gender,
                contactNumber: profile.contactNumber,
                bloodGroup: profile.bloodGroup,
                allergies: profile.allergies,
                address: profile.address,
                emergencyContact: profile.emergencyContact
            });
        }
    }, [profile]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev],
                    [child]: value
                }
            }));
        } else if (name === 'allergies') {
            setFormData((prev) => ({
                ...prev,
                allergies: value.split(',').map(item => item.trim()).filter(item => item !== '')
            }));
        } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile(formData).unwrap();
        setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!profile) {
        return <div>Failed to load profile</div>;
    }

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

            <div className="bg-white rounded-xl shadow">
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                    <p className="text-gray-900">{profile.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                <p className="text-gray-900">{profile.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                            onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                    <p className="text-gray-900">{profile.contactNumber}</p>
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900">
                                        {new Date(profile.dateOfBirth).toLocaleDateString()}
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                        </select>
                                    ) : (
                                    <p className="text-gray-900">{profile.gender}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Blood Group
                                    </label>
                                    {isEditing ? (
                                        <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                            onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    ) : (
                                    <p className="text-gray-900">{profile.bloodGroup}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Street
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address.street"
                                                value={formData.address?.street}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.address.street}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address.city"
                                                value={formData.address?.city}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.address.city}</p>
                                    )}
                                </div>

                                    <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                                name="address.state"
                                                value={formData.address?.state}
                                            onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                            <p className="text-gray-900">{profile.address.state}</p>
                                    )}
                                </div>

                                    <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                            ZIP Code
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                                name="address.zipCode"
                                                value={formData.address?.zipCode}
                                            onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                            <p className="text-gray-900">{profile.address.zipCode}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Country
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address.country"
                                                value={formData.address?.country}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profile.address.country}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Emergency Contact
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="emergencyContact.name"
                                                value={formData.emergencyContact?.name}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {profile.emergencyContact.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Relationship
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="emergencyContact.relationship"
                                                value={formData.emergencyContact?.relationship}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {profile.emergencyContact.relationship}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Contact Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="emergencyContact.contactNumber"
                                                value={formData.emergencyContact?.contactNumber}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {profile.emergencyContact.contactNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Allergies
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="allergies"
                                        value={formData.allergies?.join(', ')}
                                            onChange={handleChange}
                                            placeholder="Separate with commas"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                        {profile.allergies.map((allergy, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full"
                                                >
                                                    {allergy}
                                                </span>
                                            ))}
                                        {profile.allergies.length === 0 && (
                                                <p className="text-gray-500">No known allergies</p>
                                            )}
                                        </div>
                                    )}
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
        </div>
    );
};
