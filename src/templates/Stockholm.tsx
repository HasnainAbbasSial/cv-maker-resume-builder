import React from 'react';
import type { ResumeData } from '../types';
import styles from './Stockholm.module.css';

interface StockholmProps {
    data: ResumeData;
}

const Stockholm: React.FC<StockholmProps> = ({ data }) => {
    const { personalDetails } = data;

    return (
        <div className={styles.page} id="resume-preview-id">
            <header className={styles.header}>
                <h1 className={styles.name}>
                    {personalDetails.firstName} {personalDetails.lastName}
                </h1>
                <div className={styles.jobTitle}>{personalDetails.jobTitle}</div>

                <div className={styles.contactInfo}>
                    {personalDetails.email && <span>{personalDetails.email}</span>}
                    {personalDetails.phone && <span>{personalDetails.phone}</span>}
                    {personalDetails.city && <span>{personalDetails.city}, {personalDetails.country}</span>}
                </div>
            </header>

            {/* Basic Placeholders for other sections */}
            <div className={styles.section}>
                {data.professionalSummary && (
                    <>
                        <h2 className={styles.sectionTitle}>Profile</h2>
                        <p className={styles.description}>{data.professionalSummary}</p>
                    </>
                )}
            </div>

            {data.employmentHistory.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Employment History</h2>
                    {data.employmentHistory.map(item => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.itemHeader}>
                                <div className={styles.itemTitle}>{item.jobTitle}, {item.employer}, {item.city}</div>
                                <div className={styles.dateLocation}>
                                    {item.startDate} — {item.endDate || 'Present'}
                                </div>
                            </div>
                            <div className={styles.description}>{item.description}</div>
                        </div>
                    ))}
                </div>
            )}

            {data.education.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {data.education.map(item => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.itemHeader}>
                                <div className={styles.itemTitle}>{item.school}, {item.degree}, {item.city}</div>
                                <div className={styles.dateLocation}>
                                    {item.startDate} — {item.endDate || 'Present'}
                                </div>
                            </div>
                            <div className={styles.description}>{item.description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Stockholm;
