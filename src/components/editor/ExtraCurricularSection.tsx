import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import type { ExtraCurricularActivity } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const ExtraCurricularSection = () => {
    const { resumeData, setResumeData } = useResume();

    const addItem = () => {
        const newItem: ExtraCurricularActivity = {
            id: uuidv4(),
            title: '',
            employer: '',
            startDate: '',
            endDate: '',
            city: '',
            description: ''
        };
        setResumeData(prev => ({
            ...prev,
            extraCurricularActivities: [...prev.extraCurricularActivities, newItem]
        }));
    };

    const updateItem = (id: string, field: keyof ExtraCurricularActivity, value: string) => {
        setResumeData(prev => ({
            ...prev,
            extraCurricularActivities: prev.extraCurricularActivities.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeItem = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            extraCurricularActivities: prev.extraCurricularActivities.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Extra-curricular Activities</h2>

            <div className="space-y-6">
                {resumeData.extraCurricularActivities.map((item) => (
                    <div key={item.id} className="relative group p-4 border rounded-lg bg-gray-50">
                        <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-2 right-2 text-[var(--text-secondary)] hover:text-[var(--error)]"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                label="Function Title"
                                placeholder="e.g. Volunteer"
                                value={item.title}
                                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                            />
                            <FormField
                                label="Employer"
                                placeholder="e.g. Red Cross"
                                value={item.employer}
                                onChange={(e) => updateItem(item.id, 'employer', e.target.value)}
                            />
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
                <Plus size={20} /> Add Extra-curricular Activity
            </button>
        </div>
    );
};

export default ExtraCurricularSection;
