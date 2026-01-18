import React, { useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useResume } from '../../context/ResumeContext';
import { Upload, X, Check } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/cropImage';
import styles from './ImageUpload.module.css';

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

    const modalContent = showCropper && image && (
        <div className={styles.modalOverlay} onClick={cancelCrop}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Adjust Photo</h3>
                    <button onClick={cancelCrop} className={styles.closeButton}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.cropperContainer}>
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

                <div className={styles.modalBody}>
                    <div className={styles.zoomControl}>
                        <div className={styles.zoomLabel}>
                            <span>Zoom & Position</span>
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
                            className={styles.rangeInput}
                        />
                    </div>

                    <div className={styles.modalFooter}>
                        <button onClick={cancelCrop} className={styles.cancelBtn}>
                            Cancel
                        </button>
                        <button
                            onClick={handleDone}
                            disabled={isprocessing}
                            className={styles.saveBtn}
                        >
                            {isprocessing ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Wait...
                                </>
                            ) : (
                                <>
                                    <Check size={20} /> Save Photo
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className={styles.imagePreview}>
                    {resumeData.personalDetails.photoUrl ? (
                        <img
                            src={resumeData.personalDetails.photoUrl}
                            alt="Profile"
                        />
                    ) : (
                        <Upload size={24} style={{ color: '#94a3b8' }} />
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={styles.uploadTrigger}
                        >
                            <Upload size={14} /> {resumeData.personalDetails.photoUrl ? 'Change Photo' : 'Upload Photo'}
                        </button>
                        {resumeData.personalDetails.photoUrl && (
                            <button
                                onClick={removeImage}
                                className={styles.removeBtn}
                            >
                                <X size={14} /> Remove
                            </button>
                        )}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        JPG or PNG. Max 2MB.
                    </p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/png, image/jpeg"
                        style={{ display: 'none' }}
                    />
                </div>
            </div>

            {showCropper && image && createPortal(modalContent, document.body)}
        </div>
    );
};

export default ImageUpload;
