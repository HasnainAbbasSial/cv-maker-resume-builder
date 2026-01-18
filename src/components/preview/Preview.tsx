import { useResume } from '../../context/ResumeContext';
import Stockholm from '../../templates/Stockholm';

const Preview = () => {
    const { resumeData } = useResume();

    return (
        <div className="py-8">
            {/* In the future, we will switch templates dynamically */}
            <Stockholm data={resumeData} />
        </div>
    );
};

export default Preview;
