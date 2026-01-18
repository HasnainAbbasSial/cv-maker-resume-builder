import type { ResumeData } from '../types';

export const initialResumeData: ResumeData = {
    meta: {
        templateId: 'stockholm',
        primaryColor: '#1a91f0',
    },
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
        linkedinUrl: '',
    },
    professionalSummary: '',
    employmentHistory: [],
    education: [],
    socialLinks: [],
    skills: [],
    languages: [],
    hobbies: '',
    courses: [],
    extraCurricularActivities: [],
    customSections: [],
};
