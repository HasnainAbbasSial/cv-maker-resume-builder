import React, { useRef, useState, useCallback } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Upload, X, Check } from 'lucide-react';
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
                <div
                    onClick={cancelCrop}
                    className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-2 sm:p-4 overflow-y-auto cursor-pointer"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] my-auto cursor-default"
                    >
                        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-800">Adjust Photo</h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleDone}
                                    disabled={isprocessing}
                                    className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1 shadow-sm hover:scale-105 transition-transform"
                                >
                                    <Check size={16} /> Apply
                                </button>
                                <button onClick={cancelCrop} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="relative h-[300px] sm:h-[450px] w-full bg-black">
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

                        <div className="p-6 space-y-5 bg-white">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between text-sm font-bold text-gray-700">
                                    <span>Zoom & Focus</span>
                                    <span>{Math.round(zoom * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <button
                                    onClick={cancelCrop}
                                    className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDone}
                                    disabled={isprocessing}
                                    className="flex-[2] px-8 py-4 text-base font-black bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isprocessing ? (
                                        <>
                                            <span className="animate-spin h-5 w-5 border-3 border-white border-t-transparent rounded-full"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Save Photo
                                        </>
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
