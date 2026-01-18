import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Upload, X } from 'lucide-react';

const ImageUpload = () => {
    const { resumeData, updatePersonalDetails } = useResume();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                updatePersonalDetails('photoUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        updatePersonalDetails('photoUrl', '');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                {resumeData.personalDetails.photoUrl ? (
                    <img
                        src={resumeData.personalDetails.photoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Upload size={24} className="text-gray-400" />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                    >
                        {resumeData.personalDetails.photoUrl ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    {resumeData.personalDetails.photoUrl && (
                        <button
                            onClick={removeImage}
                            className="text-sm font-medium text-[var(--error)] flex items-center gap-1"
                        >
                            <X size={14} /> Remove
                        </button>
                    )}
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                    JPG or PNG. Max 2MB.
                </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg"
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default ImageUpload;
