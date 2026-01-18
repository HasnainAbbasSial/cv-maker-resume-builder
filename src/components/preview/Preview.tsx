import { useResume } from '../../context/ResumeContext';
import Stockholm from '../../templates/Stockholm';
import NewYork from '../../templates/NewYork';

const Preview = () => {
    const { resumeData } = useResume();
    const { templateId } = resumeData.meta;

    const renderTemplate = () => {
        switch (templateId) {
            case 'new-york':
                return <NewYork data={resumeData} />;
            case 'stockholm':
            default:
                return <Stockholm data={resumeData} />;
        }
    };

    return (
        <div className="py-8">
            {renderTemplate()}
        </div>
    );
};

export default Preview;
