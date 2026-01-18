import React, { type CSSProperties } from 'react';
import type { ResumeData } from '../types';
import styles from './London.module.css';

interface LondonProps {
    data: ResumeData;
}

const London: React.FC<LondonProps> = ({ data }) => {
    const { personalDetails, meta } = data;

    return (
        <div
            className={styles.page}
            id="resume-preview-id"
            style={{ '--primary-color': meta.primaryColor } as CSSProperties}
        >
            <header className={styles.header}>
                {personalDetails.photoUrl && (
                    <img src={personalDetails.photoUrl} alt="Profile" className={styles.photo} />
                )}
                <h1 className={styles.name}>{personalDetails.firstName} {personalDetails.lastName}</h1>
                <div className={styles.jobTitle}>{personalDetails.jobTitle}</div>

                <div className={styles.contactInfo}>
                    {personalDetails.phone && <span>{personalDetails.phone}</span>}
                    {personalDetails.email && <span>{personalDetails.email}</span>}
                    {personalDetails.city && <span>{personalDetails.city}, {personalDetails.country}</span>}
                    {data.socialLinks.map(link => (
                        <span key={link.id}>
                            <a href={link.url} style={{ color: 'inherit' }}>{link.network}</a>
                        </span>
                    ))}
                </div>
            </header>

            <div className={styles.main}>
                {data.professionalSummary && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}><span>Profile</span></h2>
                        <p className={styles.description}>{data.professionalSummary}</p>
                    </div>
                )}

                {data.employmentHistory.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}><span>Experience</span></h2>
                        {data.employmentHistory.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemTitle}>{item.jobTitle}</div>
                                    <div className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</div>
                                </div>
                                <div className={styles.itemSubtitle}>{item.employer}, {item.city}</div>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.education.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}><span>Education</span></h2>
                        {data.education.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemTitle}>{item.school}</div>
                                    <div className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</div>
                                </div>
                                <div className={styles.itemSubtitle}>{item.degree}, {item.city}</div>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.skills.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}><span>Skills</span></h2>
                        <div className={styles.skillsGrid}>
                            {data.skills.map(skill => (
                                <div key={skill.id} className={styles.skillTag}>
                                    {skill.name} ({['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'][skill.level - 1]})
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default London;
