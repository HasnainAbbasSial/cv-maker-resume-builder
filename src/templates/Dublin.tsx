import React, { type CSSProperties } from 'react';
import type { ResumeData } from '../types';
import styles from './Dublin.module.css';

interface DublinProps {
    data: ResumeData;
}

const Dublin: React.FC<DublinProps> = ({ data }) => {
    const { personalDetails, meta } = data;

    return (
        <div
            className={styles.page}
            id="resume-preview-id"
            style={{ '--primary-color': meta.primaryColor } as CSSProperties}
        >
            <header className={styles.header}>
                <h1 className={styles.name}>{personalDetails.firstName} {personalDetails.lastName}</h1>
                <div className={styles.jobTitle}>{personalDetails.jobTitle}</div>
                <div className={styles.contactInfo}>
                    {personalDetails.email && <span>{personalDetails.email}</span>}
                    {personalDetails.phone && <span>{personalDetails.phone}</span>}
                    {personalDetails.city && <span>{personalDetails.city}</span>}
                </div>
            </header>

            <div className={styles.main}>
                <div className={styles.leftColumn}>
                    {data.professionalSummary && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Profile</h2>
                            <p className={styles.description}>{data.professionalSummary}</p>
                        </div>
                    )}

                    {data.employmentHistory.length > 0 && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Employment History</h2>
                            {data.employmentHistory.map(item => (
                                <div key={item.id} className={styles.item}>
                                    <div className={styles.itemHeader}>
                                        <div className={styles.itemTitle}>{item.jobTitle}</div>
                                        <div className={styles.itemSubtitle}>{item.employer}, {item.city}</div>
                                    </div>
                                    <span className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</span>
                                    <p className={styles.description}>{item.description}</p>
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
                                        <div className={styles.itemTitle}>{item.school}</div>
                                        <div className={styles.itemSubtitle}>{item.degree}</div>
                                    </div>
                                    <span className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Details</h2>
                        <div className={styles.contactInfo} style={{ flexDirection: 'column', gap: '5px' }}>
                            <span>{personalDetails.address}</span>
                            <span>{personalDetails.city}, {personalDetails.postalCode}</span>
                            <span>{personalDetails.country}</span>
                            <span>{personalDetails.placeOfBirth}</span>
                        </div>
                    </div>

                    {data.socialLinks.length > 0 && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Links</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '13px' }}>
                                {data.socialLinks.map(link => (
                                    <a key={link.id} href={link.url} style={{ color: '#10b981', textDecoration: 'none' }}>{link.network}</a>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.skills.length > 0 && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Skills</h2>
                            {data.skills.map(skill => (
                                <div key={skill.id} className={styles.skillItem}>
                                    <div className={styles.skillName}>{skill.name}</div>
                                    <div className={styles.dots}>
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={`${styles.dot} ${i <= skill.level ? styles.filled : ''}`}></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dublin;
