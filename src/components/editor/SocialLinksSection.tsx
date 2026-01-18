import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';
import type { SocialLink } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus } from 'lucide-react';

const SocialLinksSection = () => {
    const { resumeData, setResumeData } = useResume();

    const addItem = () => {
        const newItem: SocialLink = {
            id: uuidv4(),
            network: '',
            username: '',
            url: ''
        };
        setResumeData(prev => ({
            ...prev,
            socialLinks: [...prev.socialLinks, newItem]
        }));
    };

    const updateItem = (id: string, field: keyof SocialLink, value: string) => {
        setResumeData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const removeItem = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Websites & Social Links</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
                You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website.
            </p>

            <div className="space-y-4">
                {resumeData.socialLinks.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative group bg-white p-4 rounded border">
                        <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-2 right-2 text-[var(--text-secondary)] hover:text-[var(--error)]"
                        >
                            <Trash2 size={16} />
                        </button>
                        <FormField
                            label="Label"
                            placeholder="e.g. LinkedIn"
                            value={item.network}
                            onChange={(e) => updateItem(item.id, 'network', e.target.value)}
                        />
                        <FormField
                            label="Link"
                            placeholder="https://linkedin.com/in/..."
                            value={item.url}
                            onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={addItem}
                className="mt-4 flex items-center gap-2 text-[var(--primary)] font-medium hover:text-[var(--primary-hover)]"
            >
                <Plus size={20} /> Add Link
            </button>
        </div>
    );
};

export default SocialLinksSection;
