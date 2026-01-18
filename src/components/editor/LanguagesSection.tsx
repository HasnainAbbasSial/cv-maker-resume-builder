import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import type { Language } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const LanguagesSection = () => {
    const { resumeData, setResumeData } = useResume();

    const addItem = () => {
        const newItem: Language = {
            id: uuidv4(),
            name: '',
            level: 'General Professional Proficiency'
        };
        setResumeData(prev => ({
            ...prev,
            languages: [...prev.languages, newItem]
        }));
    };

    const updateItem = (id: string, field: keyof Language, value: string) => {
        setResumeData(prev => ({
            ...prev,
            languages: prev.languages.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeItem = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            languages: prev.languages.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Languages</h2>

            <div className="space-y-4">
                {resumeData.languages.map((item) => (
                    <div key={item.id} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <FormField
                                label="Language"
                                placeholder="e.g. English"
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                className="mb-0"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Level</label>
                            <select
                                value={item.level}
                                onChange={(e) => updateItem(item.id, 'level', e.target.value)}
                                className="w-full h-[42px] border rounded px-3"
                            >
                                <option>Native speaker</option>
                                <option>Highly proficient</option>
                                <option>Very good command</option>
                                <option>Good working knowledge</option>
                                <option>Working knowledge</option>
                                <option>Elementary proficiency</option>
                            </select>
                        </div>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--text-secondary)] hover:text-[var(--error)] p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="mt-4 flex items-center gap-2 text-[var(--primary)] font-medium hover:text-[var(--primary-hover)]"
            >
                <Plus size={20} /> Add Language
            </button>
        </div>
    );
};

export default LanguagesSection;
