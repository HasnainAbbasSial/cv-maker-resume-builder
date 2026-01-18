import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';

import ImageUpload from '../ui/ImageUpload';

const PersonalDetails = () => {
    const { resumeData, updatePersonalDetails } = useResume();
    const { personalDetails } = resumeData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // We cast name to keyof PersonalDetails because we know our inputs match
        updatePersonalDetails(name as any, value);
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Personal Details</h2>
            <ImageUpload />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    label="Job Title"
                    name="jobTitle"
                    value={personalDetails.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                />
                <div className="grid grid-cols-2 gap-4">
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
                </div>
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
        </div>
    );
};

export default PersonalDetails;
