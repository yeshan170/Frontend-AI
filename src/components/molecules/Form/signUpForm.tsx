import type React from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Link } from '@/components/atoms/Link';
import { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import type { RegisterDoctorRequest, RegisterPatientRequest } from '@/services/userApi';

interface IRegisterFormProps {
    onSubmit: (data: RegisterDoctorRequest | RegisterPatientRequest) => Promise<void>;
    isLoading?: boolean;
    userType?: 'doctor' | 'patient';
}

export const SignUpForm = ({
    onSubmit,
    isLoading = false,
    userType = 'patient'
}: IRegisterFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        specialization: '',
        qualification: '',
        experience: '',
        contactNumber: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        allergies: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        slmcRegistrationNo: ''
    });

    const [errors, setErrors] = useState<{
        [key: string]: string;
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Common validations
        if (!formData.name?.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.contactNumber?.trim()) {
            newErrors.contactNumber = 'Contact number is required';
        }

        // Role-specific validations
        if (userType === 'doctor') {
            if (!formData.slmcRegistrationNo?.trim()) {
                newErrors.slmcRegistrationNo = 'SLMC Registration Number is required';
            }
            if (!formData.specialization?.trim()) {
                newErrors.specialization = 'Specialization is required';
            }
            if (!formData.qualification?.trim()) {
                newErrors.qualification = 'Qualification is required';
            }
            if (!formData.experience) {
                newErrors.experience = 'Experience is required';
            }
        } else {
            if (!formData.dateOfBirth) {
                newErrors.dateOfBirth = 'Date of birth is required';
            }
            if (!formData.gender) {
                newErrors.gender = 'Gender is required';
            }
            if (!formData.street?.trim()) {
                newErrors.street = 'Street address is required';
            }
            if (!formData.city?.trim()) {
                newErrors.city = 'City is required';
            }
            if (!formData.state?.trim()) {
                newErrors.state = 'State is required';
            }
            if (!formData.zipCode?.trim()) {
                newErrors.zipCode = 'ZIP code is required';
            }
            if (!formData.country?.trim()) {
                newErrors.country = 'Country is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submission started');

        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        try {
            console.log('Raw form data:', formData);
            const commonData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                contactNumber: formData.contactNumber.trim()
            };
            console.log('Common data prepared:', commonData);

            if (userType === 'doctor') {
                const doctorData: RegisterDoctorRequest = {
                    ...commonData,
                    role: 'doctor',
                    slmcRegistrationNo: formData.slmcRegistrationNo.trim(),
                    specialization: formData.specialization.trim(),
                    qualification: formData.qualification.trim(),
                    experience: parseInt(formData.experience)
                };
                console.log('Doctor data prepared:', doctorData);
                await onSubmit(doctorData);
            } else {
                const patientData: RegisterPatientRequest = {
                    ...commonData,
                    role: 'patient',
                    dateOfBirth: formData.dateOfBirth,
                    gender: formData.gender,
                    bloodGroup: formData.bloodGroup,
                    allergies: formData.allergies
                        .split(',')
                        .map((item) => item.trim())
                        .filter((item) => item !== ''),
                    address: {
                        street: formData.street.trim(),
                        city: formData.city.trim(),
                        state: formData.state.trim(),
                        zipCode: formData.zipCode.trim(),
                        country: formData.country.trim()
                    },
                    emergencyContact: {
                        name: 'Emergency Contact',
                        relationship: 'Not Specified',
                        contactNumber: formData.contactNumber
                    }
                };
                console.log('Complete patient data being sent:', {
                    ...patientData,
                    password: '[REDACTED]'
                });
                await onSubmit(patientData);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8">
                <Typography
                    label={`Create ${userType === 'doctor' ? 'Doctor' : 'Patient'} Account`}
                    variant="h2"
                    className="text-center text-gray-800 mb-8"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        required
                    />

                    <Input
                        label="Contact Number"
                        name="contactNumber"
                        type="tel"
                        placeholder="Enter your contact number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        error={errors.contactNumber}
                        required
                    />

                    {userType === 'doctor' ? (
                        <>
                            <Input
                                label="SLMC Registration Number"
                                name="slmcRegistrationNo"
                                type="text"
                                placeholder="Enter your SLMC registration number"
                                value={formData.slmcRegistrationNo}
                                onChange={handleChange}
                                error={errors.slmcRegistrationNo}
                                required
                            />

                            <Input
                                label="Specialization"
                                name="specialization"
                                type="text"
                                placeholder="Enter your specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                error={errors.specialization}
                                required
                            />

                            <Input
                                label="Qualification"
                                name="qualification"
                                type="text"
                                placeholder="Enter your qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                error={errors.qualification}
                                required
                            />

                            <Input
                                label="Years of Experience"
                                name="experience"
                                type="number"
                                placeholder="Enter years of experience"
                                value={formData.experience}
                                onChange={handleChange}
                                error={errors.experience}
                                required
                            />
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    error={errors.dateOfBirth}
                                    required
                                />
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>

                                <Input
                                    label="Allergies"
                                    name="allergies"
                                    type="text"
                                    placeholder="Enter allergies (comma-separated)"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    error={errors.allergies}
                                    required
                                />
                            </div>

                            <Input
                                label="Street Address"
                                name="street"
                                type="text"
                                placeholder="Enter street address"
                                value={formData.street}
                                onChange={handleChange}
                                error={errors.street}
                                required
                            />

                            <Input
                                label="City"
                                name="city"
                                type="text"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleChange}
                                error={errors.city}
                                required
                            />

                            <Input
                                label="State"
                                name="state"
                                type="text"
                                placeholder="Enter state"
                                value={formData.state}
                                onChange={handleChange}
                                error={errors.state}
                                required
                            />

                            <Input
                                label="ZIP Code"
                                name="zipCode"
                                type="text"
                                placeholder="Enter ZIP code"
                                value={formData.zipCode}
                                onChange={handleChange}
                                error={errors.zipCode}
                                required
                            />

                            <Input
                                label="Country"
                                name="country"
                                type="text"
                                placeholder="Enter country"
                                value={formData.country}
                                onChange={handleChange}
                                error={errors.country}
                                required
                            />
                        </>
                    )}

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            I agree to the{' '}
                            <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <Button
                        label="Create Account"
                        type="submit"
                        htmlType="submit"
                        className="w-full justify-center"
                        isLoading={isLoading}
                    />
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button
                            label=""
                            onClick={() => {}}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                    fill="#EA4335"
                                />
                                <path
                                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                                    fill="#34A853"
                                />
                            </svg>
                        </Button>

                        <Button
                            label=""
                            onClick={() => {}}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};
