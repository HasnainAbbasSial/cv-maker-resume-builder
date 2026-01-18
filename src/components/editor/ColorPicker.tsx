import { useResume } from '../../context/ResumeContext';

const colors = [
    '#1a91f0', // Blue
    '#e63946', // Red
    '#10b981', // Green
    '#d946ef', // Purple
    '#f59e0b', // Orange
    '#1f2937', // Dark Grey
    '#2563eb', // Royal Blue
    '#059669', // Emerald
];

const ColorPicker = () => {
    const { resumeData, setResumeData } = useResume();

    const handleColorChange = (color: string) => {
        setResumeData(prev => ({
            ...prev,
            meta: { ...prev.meta, primaryColor: color }
        }));
    };

    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Accent Color</h3>
            <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                    <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${resumeData.meta.primaryColor === color
                                ? 'border-[var(--text-main)] scale-110 ring-2 ring-offset-2 ring-gray-300'
                                : 'border-transparent'
                            }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;
