import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import type { Education } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const EducationSection = () => {
    const { resumeData, setResumeData } = useResume();

    const addItem = () => {
        const newItem: Education = {
            id: uuidv4(),
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            city: '',
            description: ''
        };
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, newItem]
        }));
    };

    const updateItem = (id: string, field: keyof Education, value: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeItem = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Education</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
                A varied education on your resume sums up the value that your learnings and background will bring to job.
            </p>

            <div className="space-y-6">
                {resumeData.education.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg border border-[var(--border-color)] shadow-sm relative group">
                        <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--error)] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-8">
                            <FormField
                                label="School"
                                value={item.school}
                                onChange={(e) => updateItem(item.id, 'school', e.target.value)}
                            />
                            <FormField
                                label="Degree"
                                value={item.degree}
                                onChange={(e) => updateItem(item.id, 'degree', e.target.value)}
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
                <Plus size={20} /> Add Education
            </button>
        </div>
    );
};

export default EducationSection;
