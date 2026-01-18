import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const CustomSectionEditor = () => {
    const { resumeData, setResumeData } = useResume();

    const addSection = () => {
        setResumeData(prev => ({
            ...prev,
            customSections: [
                ...prev.customSections,
                { id: uuidv4(), title: 'Custom Section', items: [] }
            ]
        }));
    };

    const removeSection = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.filter(s => s.id !== id)
        }));
    };

    const updateSectionTitle = (id: string, title: string) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s => s.id === id ? { ...s, title } : s)
        }));
    };

    const addItem = (sectionId: string) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId
                    ? {
                        ...s,
                        items: [
                            ...s.items,
                            { id: uuidv4(), title: '', city: '', startDate: '', endDate: '', description: '' }
                        ]
                    }
                    : s
            )
        }));
    };

    const updateItem = (sectionId: string, itemId: string, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId
                    ? {
                        ...s,
                        items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i)
                    }
                    : s
            )
        }));
    };

    const removeItem = (sectionId: string, itemId: string) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId
                    ? { ...s, items: s.items.filter(i => i.id !== itemId) }
                    : s
            )
        }));
    };

    return (
        <div className="space-y-8">
            {resumeData.customSections.map((section) => (
                <div key={section.id} className="bg-white p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex-1 mr-4">
                            <input
                                className="text-xl font-bold w-full border-b border-transparent hover:border-gray-200 focus:border-[var(--primary)] focus:outline-none py-1"
                                value={section.title}
                                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                placeholder="Section Title (e.g. Projects, Awards)"
                            />
                        </div>
                        <button
                            onClick={() => removeSection(section.id)}
                            className="text-[var(--text-secondary)] hover:text-[var(--error)]"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {section.items.map((item) => (
                            <div key={item.id} className="relative group p-4 border rounded-lg bg-gray-50">
                                <button
                                    onClick={() => removeItem(section.id, item.id)}
                                    className="absolute top-2 right-2 text-[var(--text-secondary)] hover:text-[var(--error)]"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        label="Title"
                                        value={item.title}
                                        onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                                    />
                                    <FormField
                                        label="City"
                                        value={item.city}
                                        onChange={(e) => updateItem(section.id, item.id, 'city', e.target.value)}
                                    />
                                    <FormField
                                        label="Start Date"
                                        type="month"
                                        value={item.startDate}
                                        onChange={(e) => updateItem(section.id, item.id, 'startDate', e.target.value)}
                                    />
                                    <FormField
                                        label="End Date"
                                        type="month"
                                        value={item.endDate}
                                        onChange={(e) => updateItem(section.id, item.id, 'endDate', e.target.value)}
                                    />
                                </div>
                                <div className="mt-4">
                                    <FormField
                                        label="Description"
                                        textarea
                                        value={item.description}
                                        onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => addItem(section.id)}
                        className="mt-4 flex items-center gap-2 text-[var(--primary)] font-medium hover:text-[var(--primary-hover)]"
                    >
                        <Plus size={20} /> Add Item
                    </button>
                </div>
            ))}

            <button
                onClick={addSection}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors font-medium flex items-center justify-center gap-2"
            >
                <Plus size={20} /> Add Custom Section
            </button>
        </div>
    );
};

export default CustomSectionEditor;
