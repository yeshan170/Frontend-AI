import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterPatientMutation } from '@/services/authApi';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { toast } from 'react-hot-toast';

export const PatientRegister = () => {
    const navigate = useNavigate();
    const [registerPatient] = useRegisterPatientMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        bloodGroup: '',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerPatient(formData).unwrap();
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a Patient
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <Input
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <Input
                            label="Contact Number"
                            name="contactNumber"
                            type="tel"
                            required
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />

                        <Input
                            label="Blood Group"
                            name="bloodGroup"
                            type="text"
                            required
                            value={formData.bloodGroup}
                            onChange={handleChange}
                        />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Address</h3>
                            <Input
                                label="Street"
                                name="address.street"
                                type="text"
                                required
                                value={formData.address.street}
                                onChange={handleChange}
                            />
                            <Input
                                label="City"
                                name="address.city"
                                type="text"
                                required
                                value={formData.address.city}
                                onChange={handleChange}
                            />
                            <Input
                                label="State"
                                name="address.state"
                                type="text"
                                required
                                value={formData.address.state}
                                onChange={handleChange}
                            />
                            <Input
                                label="ZIP Code"
                                name="address.zipCode"
                                type="text"
                                required
                                value={formData.address.zipCode}
                                onChange={handleChange}
                            />
                            <Input
                                label="Country"
                                name="address.country"
                                type="text"
                                required
                                value={formData.address.country}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
                            <Input
                                label="Name"
                                name="emergencyContact.name"
                                type="text"
                                required
                                value={formData.emergencyContact.name}
                                onChange={handleChange}
                            />
                            <Input
                                label="Relationship"
                                name="emergencyContact.relationship"
                                type="text"
                                required
                                value={formData.emergencyContact.relationship}
                                onChange={handleChange}
                            />
                            <Input
                                label="Contact Number"
                                name="emergencyContact.contactNumber"
                                type="tel"
                                required
                                value={formData.emergencyContact.contactNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}; 