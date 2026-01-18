import React, { useRef, useState, useCallback } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Upload, X } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/cropImage';

const ImageUpload = () => {
    const { resumeData, updatePersonalDetails } = useResume();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const onCropComplete = useCallback((_extended: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDone = async () => {
        try {
            if (image && croppedAreaPixels) {
                const croppedImage = await getCroppedImg(image, croppedAreaPixels);
                updatePersonalDetails('photoUrl', croppedImage);
                setShowCropper(false);
                setImage(null);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const removeImage = () => {
        updatePersonalDetails('photoUrl', '');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex flex-col gap-4 mb-6 relative">
            <div className="flex items-center gap-4">
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
                            className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] flex items-center gap-1"
                        >
                            <Upload size={14} /> {resumeData.personalDetails.photoUrl ? 'Change Photo' : 'Upload Photo'}
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

            {showCropper && image && (
                <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center bg-white">
                            <h3 className="text-lg font-bold">Edit Photo</h3>
                            <button onClick={() => setShowCropper(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="relative h-80 w-full bg-gray-200 overflow-hidden rounded shadow-inner">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                cropShape="round"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Zoom</label>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                onClick={() => setShowCropper(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDone}
                                className="px-6 py-2 text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded"
                            >
                                Save Photo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
