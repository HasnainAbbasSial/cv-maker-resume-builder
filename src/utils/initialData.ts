import type { ResumeData } from '../types';

export const initialResumeData: ResumeData = {
    personalDetails: {
        jobTitle: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        postalCode: '',
        drivingLicense: '',
        nationality: '',
        placeOfBirth: '',
        dateOfBirth: '',
    },
    professionalSummary: '',
    employmentHistory: [],
    education: [],
    socialLinks: [],
    skills: [],
    customSections: [],
};
