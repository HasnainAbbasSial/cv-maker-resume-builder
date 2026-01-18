import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import type { EmploymentHistory } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const EmploymentSection = () => {
    const { resumeData, setResumeData } = useResume();

    const addItem = () => {
        const newItem: EmploymentHistory = {
            id: uuidv4(),
            jobTitle: '',
            employer: '',
            startDate: '',
            endDate: '',
            city: '',
            description: ''
        };
        setResumeData(prev => ({
            ...prev,
            employmentHistory: [...prev.employmentHistory, newItem]
        }));
    };

    const updateItem = (id: string, field: keyof EmploymentHistory, value: string) => {
        setResumeData(prev => ({
            ...prev,
            employmentHistory: prev.employmentHistory.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeItem = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            employmentHistory: prev.employmentHistory.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Employment History</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
                Show your relevant experience (last 10 years). Use bullet points to note your achievements.
            </p>

            <div className="space-y-6">
                {resumeData.employmentHistory.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg border border-[var(--border-color)] shadow-sm relative group">
                        <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--error)] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-8">
                            <FormField
                                label="Job Title"
                                value={item.jobTitle}
                                onChange={(e) => updateItem(item.id, 'jobTitle', e.target.value)}
                            />
                            <FormField
                                label="Employer"
                                value={item.employer}
                                onChange={(e) => updateItem(item.id, 'employer', e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="Start Date"
                                    type="month"
                                    value={item.startDate}
                                    onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                                />
                                <FormField
                                    label="End Date"
                                    type="month"
                                    value={item.endDate}
                                    onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                                />
                            </div>
                            <FormField
                                label="City"
                                value={item.city}
                                onChange={(e) => updateItem(item.id, 'city', e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <FormField
                                label="Description"
                                textarea
                                value={item.description}
                                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="mt-4 flex items-center gap-2 text-[var(--primary)] font-medium hover:text-[var(--primary-hover)]"
            >
                <Plus size={20} /> Add Employment
            </button>
        </div>
    );
};

export default EmploymentSection;
