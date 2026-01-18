import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import type { Course } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const CoursesSection = () => {
    const { resumeData, setResumeData } = useResume();

    const addItem = () => {
        const newItem: Course = {
            id: uuidv4(),
            course: '',
            institution: '',
            startDate: '',
            endDate: ''
        };
        setResumeData(prev => ({
            ...prev,
            courses: [...prev.courses, newItem]
        }));
    };

    const updateItem = (id: string, field: keyof Course, value: string) => {
        setResumeData(prev => ({
            ...prev,
            courses: prev.courses.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeItem = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            courses: prev.courses.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Courses</h2>

            <div className="space-y-6">
                {resumeData.courses.map((item) => (
                    <div key={item.id} className="relative group p-4 border rounded-lg bg-gray-50">
                        <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-2 right-2 text-[var(--text-secondary)] hover:text-[var(--error)]"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                label="Course"
                                placeholder="e.g. Web Development Bootcamp"
                                value={item.course}
                                onChange={(e) => updateItem(item.id, 'course', e.target.value)}
                            />
                            <FormField
                                label="Institution"
                                placeholder="e.g. Udemy"
                                value={item.institution}
                                onChange={(e) => updateItem(item.id, 'institution', e.target.value)}
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
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="mt-4 flex items-center gap-2 text-[var(--primary)] font-medium hover:text-[var(--primary-hover)]"
            >
                <Plus size={20} /> Add Course
            </button>
        </div>
    );
};

export default CoursesSection;
