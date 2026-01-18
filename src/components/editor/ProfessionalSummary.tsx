import { useResume } from '../../context/ResumeContext';
import FormField from '../ui/FormField';

const ProfessionalSummary = () => {
    const { resumeData, setResumeData } = useResume();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeData(prev => ({ ...prev, professionalSummary: e.target.value }));
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--text-main)]">Professional Summary</h2>
            <FormField
                label="Summary"
                textarea
                value={resumeData.professionalSummary}
                onChange={handleChange}
                placeholder="Write a short professional summary..."
            />
        </div>
    );
};

export default ProfessionalSummary;
