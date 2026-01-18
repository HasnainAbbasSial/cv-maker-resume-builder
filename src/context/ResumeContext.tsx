import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ResumeData } from '../types';
import { initialResumeData } from '../utils/initialData';

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    updatePersonalDetails: (field: keyof ResumeData['personalDetails'], value: string) => void;
    // We can add more specific helpers later
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

    const updatePersonalDetails = (field: keyof ResumeData['personalDetails'], value: string) => {
        setResumeData((prev) => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, [field]: value },
        }));
    };

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData, updatePersonalDetails }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
