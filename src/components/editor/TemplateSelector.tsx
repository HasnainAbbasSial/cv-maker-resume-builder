import { useResume } from '../../context/ResumeContext';
import type { TemplateId } from '../../types';
import { clsx } from 'clsx';
import { LayoutTemplate } from 'lucide-react';

const templates: { id: TemplateId; name: string; color: string }[] = [
    { id: 'stockholm', name: 'Stockholm', color: '#1a1a1a' },
    { id: 'new-york', name: 'New York', color: '#1a91f0' },
    { id: 'london', name: 'London', color: '#d946ef' }, // Placeholder
    { id: 'dublin', name: 'Dublin', color: '#10b981' }, // Placeholder
];

const TemplateSelector = () => {
    const { resumeData, setResumeData } = useResume();

    const selectTemplate = (id: TemplateId) => {
        setResumeData(prev => ({
            ...prev,
            meta: { ...prev.meta, templateId: id }
        }));
    };

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <LayoutTemplate size={20} className="text-[var(--primary)]" />
                <h2 className="text-xl font-bold text-[var(--text-main)]">Templates</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templates.map(t => (
                    <button
                        key={t.id}
                        onClick={() => selectTemplate(t.id)}
                        className={clsx(
                            "relative aspect-[210/297] bg-white rounded-lg border-2 transition-all overflow-hidden group hover:shadow-md",
                            resumeData.meta.templateId === t.id
                                ? "border-[var(--primary)] shadow-md ring-2 ring-[var(--primary)] ring-opacity-20"
                                : "border-transparent hover:border-gray-200"
                        )}
                    >
                        {/* Placeholder graphic for template thumbnail */}
                        <div className="absolute inset-0 p-2 flex flex-col gap-1 items-center justify-center opacity-50">
                            <div className="w-12 h-1 bg-gray-300 rounded"></div>
                            <div className="w-8 h-1 bg-gray-300 rounded"></div>
                            <div className="mt-2 w-16 h-16 rounded-full bg-gray-100"></div>
                            <div className="mt-2 space-y-1 w-full px-4">
                                <div className="h-1 bg-gray-100 rounded w-full"></div>
                                <div className="h-1 bg-gray-100 rounded w-4/5"></div>
                                <div className="h-1 bg-gray-100 rounded w-full"></div>
                            </div>
                        </div>

                        {/* Selection checkmark or overlay could go here */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {t.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
