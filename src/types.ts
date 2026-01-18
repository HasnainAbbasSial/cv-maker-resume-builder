export interface SocialLink {
    id: string;
    platform: string;
    url: string;
}

export interface EmploymentHistory {
    id: string;
    jobTitle: string;
    employer: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 0-5 or 0-100
}

export interface CustomSectionItem {
    id: string;
    name: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface CustomSection {
    id: string;
    title: string;
    items: CustomSectionItem[];
}

export interface ResumeData {
    personalDetails: {
        jobTitle: string;
        photoUrl?: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        address: string;
        postalCode: string;
        drivingLicense: string;
        nationality: string;
        placeOfBirth: string;
        dateOfBirth: string;
    };
    professionalSummary: string;
    employmentHistory: EmploymentHistory[];
    education: Education[];
    socialLinks: SocialLink[];
    skills: Skill[];
    customSections: CustomSection[];
}
