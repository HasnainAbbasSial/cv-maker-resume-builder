import PersonalDetails from './PersonalDetails';
import ProfessionalSummary from './ProfessionalSummary';
import EmploymentSection from './EmploymentSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import TemplateSelector from './TemplateSelector';
import SocialLinksSection from './SocialLinksSection';

const Editor = () => {
    return (
        <div className="max-w-2xl mx-auto py-8 pb-32">
            <TemplateSelector />
            <PersonalDetails />
            <ProfessionalSummary />
            <EmploymentSection />
            <EducationSection />
            <SkillsSection />
            <SocialLinksSection />
            {/* Add other sections here */}
        </div>
    );
};

export default Editor;
