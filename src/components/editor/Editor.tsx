import TemplateSelector from './TemplateSelector';
import PersonalDetails from './PersonalDetails';
import ProfessionalSummary from './ProfessionalSummary';
import EmploymentSection from './EmploymentSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import SocialLinksSection from './SocialLinksSection';
import LanguagesSection from './LanguagesSection';
import CoursesSection from './CoursesSection';
import ExtraCurricularSection from './ExtraCurricularSection';
import HobbiesSection from './HobbiesSection';
import CustomSectionEditor from './CustomSectionEditor';

const Editor = () => {
    return (
        <div className="max-w-2xl mx-auto py-8 pb-32 space-y-8">
            <TemplateSelector />
            <PersonalDetails />
            <ProfessionalSummary />
            <EmploymentSection />
            <EducationSection />
            <SocialLinksSection />
            <SkillsSection />
            <LanguagesSection />
            <CoursesSection />
            <ExtraCurricularSection />
            <HobbiesSection />
            <CustomSectionEditor />
        </div>
    );
};

export default Editor;
