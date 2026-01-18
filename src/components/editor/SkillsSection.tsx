
import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import type { Skill } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const SkillsSection = () => {
    const { resumeData, setResumeData } = useResume();

    const addItem = () => {
        const newItem: Skill = {
            id: uuidv4(),
            name: '',
            level: 3
        };
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, newItem]
        }));
    };

    const updateItem = (id: string, field: keyof Skill, value: string | number) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeItem = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Skills</h2>

            <div className="space-y-4">
                {resumeData.skills.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <div className="flex-1">
                            <FormField
                                label=""
                                placeholder="Skill (e.g. Project Management)"
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                className="mb-0"
                            />
                        </div>
                        <div className="w-[120px]">
                            <select
                                value={item.level}
                                onChange={(e) => updateItem(item.id, 'level', parseInt(e.target.value))}
                                className="w-full h-[42px] border rounded"
                            >
                                <option value={1}>Novice</option>
                                <option value={2}>Beginner</option>
                                <option value={3}>Skillful</option>
                                <option value={4}>Experienced</option>
                                <option value={5}>Expert</option>
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
                <Plus size={20} /> Add Skill
            </button>
        </div>
    );
};

export default SkillsSection;
