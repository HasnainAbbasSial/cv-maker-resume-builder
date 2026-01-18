import PersonalDetails from './PersonalDetails';
import ProfessionalSummary from './ProfessionalSummary';
import EmploymentSection from './EmploymentSection';
import EducationSection from './EducationSection';

const Editor = () => {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <PersonalDetails />
            <ProfessionalSummary />
            <EmploymentSection />
            <EducationSection />
            {/* Add other sections here */}
        </div>
    );
};

export default Editor;
