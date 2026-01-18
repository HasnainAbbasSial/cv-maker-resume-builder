import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';

const HobbiesSection = () => {
    const { resumeData, setResumeData } = useResume();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeData(prev => ({ ...prev, hobbies: e.target.value }));
    };

    return (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Hobbies</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
                What do you like to do in your free time?
            </p>
            <FormField
                label="What are your hobbies?"
                textarea
                value={resumeData.hobbies}
                onChange={handleChange}
                placeholder="e.g. Photography, Hiking, Cooking"
            />
        </div>
    );
};

export default HobbiesSection;
