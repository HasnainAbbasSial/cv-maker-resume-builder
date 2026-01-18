export interface SocialLink {
    id: string;
    network: string; // e.g., LinkedIn, Twitter, Website
    username: string;
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
    level: number; // 0-5
}

export interface Language {
    id: string;
    name: string;
    level: string; // e.g., Native, Fluent
}

export interface Course {
    id: string;
    course: string;
    institution: string;
    startDate: string;
    endDate: string;
}

export interface ExtraCurricularActivity {
    id: string;
    title: string;
    employer: string;
    startDate: string;
    endDate: string;
    city: string;
    description: string;
}

export interface CustomSection {
    id: string;
    title: string;
    items: {
        id: string;
        title: string;
        city: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
}

export type TemplateId = 'stockholm' | 'new-york' | 'london' | 'dublin';

export interface ResumeData {
    meta: {
        templateId: TemplateId;
        primaryColor: string; // Hex code
    };
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
        linkedinUrl: string;
    };
    professionalSummary: string;
    employmentHistory: EmploymentHistory[];
    education: Education[];
    socialLinks: SocialLink[];
    skills: Skill[];
    languages: Language[];
    hobbies: string;
    courses: Course[];
    extraCurricularActivities: ExtraCurricularActivity[];
    customSections: CustomSection[];
}
