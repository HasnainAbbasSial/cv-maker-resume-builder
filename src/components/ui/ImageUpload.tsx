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
    const [isprocessing, setIsProcessing] = useState(false);

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
        if (!image || !croppedAreaPixels) return;

        setIsProcessing(true);
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            updatePersonalDetails('photoUrl', croppedImage);
            setShowCropper(false);
            setImage(null);
            setZoom(1);
        } catch (e) {
            console.error("Error cropping image:", e);
            alert("Failed to crop image. Please try another one.");
        } finally {
            setIsProcessing(false);
        }
    };

    const cancelCrop = () => {
        setShowCropper(false);
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
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
                <div className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl my-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-bold text-gray-800">Crop Profile Photo</h3>
                            <button onClick={cancelCrop} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="relative h-[300px] sm:h-[400px] w-full bg-gray-900">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                cropShape="round"
                                showGrid={false}
                            />
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-600 shrink-0">Zoom</span>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={cancelCrop}
                                    className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDone}
                                    disabled={isprocessing}
                                    className="px-8 py-2.5 text-sm font-bold bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-lg transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isprocessing ? (
                                        <>
                                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save & Apply'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ImageUpload;
