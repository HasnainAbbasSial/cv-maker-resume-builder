import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import ImageUpload from '../ui/ImageUpload';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PersonalDetails = () => {
    const { resumeData, updatePersonalDetails } = useResume();
    const { personalDetails } = resumeData;
    const [showAdditional, setShowAdditional] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updatePersonalDetails(name as any, value);
    };

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Personal Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <FormField
                    label="Job Title"
                    name="jobTitle"
                    value={personalDetails.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                />
                <ImageUpload />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    label="First Name"
                    name="firstName"
                    value={personalDetails.firstName}
                    onChange={handleChange}
                />
                <FormField
                    label="Last Name"
                    name="lastName"
                    value={personalDetails.lastName}
                    onChange={handleChange}
                />
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={personalDetails.email}
                    onChange={handleChange}
                />
                <FormField
                    label="Phone"
                    name="phone"
                    value={personalDetails.phone}
                    onChange={handleChange}
                />
                <FormField
                    label="Country"
                    name="country"
                    value={personalDetails.country}
                    onChange={handleChange}
                />
                <FormField
                    label="City"
                    name="city"
                    value={personalDetails.city}
                    onChange={handleChange}
                />
            </div>

            <button
                onClick={() => setShowAdditional(!showAdditional)}
                className="mt-6 flex items-center gap-2 text-[var(--primary)] font-medium text-sm hover:underline"
            >
                {showAdditional ? (
                    <>Edit less details <ChevronUp size={16} /></>
                ) : (
                    <>Edit additional details <ChevronDown size={16} /></>
                )}
            </button>

            {showAdditional && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[var(--border-color)] animate-fade-in">
                    <FormField
                        label="Address"
                        name="address"
                        value={personalDetails.address || ''}
                        onChange={handleChange}
                        placeholder="House, Street, Area"
                    />
                    <FormField
                        label="Postal Code"
                        name="postalCode"
                        value={personalDetails.postalCode || ''}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Driving License"
                        name="drivingLicense"
                        value={personalDetails.drivingLicense || ''}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Nationality"
                        name="nationality"
                        value={personalDetails.nationality || ''}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Place of Birth"
                        name="placeOfBirth"
                        value={personalDetails.placeOfBirth || ''}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={personalDetails.dateOfBirth || ''}
                        onChange={handleChange}
                    />
                    <FormField
                        label="LinkedIn URL"
                        name="linkedinUrl"
                        value={personalDetails.linkedinUrl || ''}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/yourprofile"
                    />
                </div>
            )}
        </div>
    );
};

export default PersonalDetails;
