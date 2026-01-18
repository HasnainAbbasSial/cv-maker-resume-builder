import { useResume } from '../../context/ResumeContext';
import Stockholm from '../../templates/Stockholm';
import NewYork from '../../templates/NewYork';
import London from '../../templates/London';
import Dublin from '../../templates/Dublin';

const Preview = () => {
    const { resumeData } = useResume();
    const { templateId } = resumeData.meta;

    const renderTemplate = () => {
        switch (templateId) {
            case 'new-york':
                return <NewYork data={resumeData} />;
            case 'london':
                return <London data={resumeData} />;
            case 'dublin':
                return <Dublin data={resumeData} />;
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
