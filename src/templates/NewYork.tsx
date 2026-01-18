import React, { type CSSProperties } from 'react';
import type { ResumeData } from '../types';
import styles from './NewYork.module.css';

interface NewYorkProps {
    data: ResumeData;
}

const NewYork: React.FC<NewYorkProps> = ({ data }) => {
    const { personalDetails, meta } = data;

    return (
        <div
            className={styles.page}
            id="resume-preview-id"
            style={{ '--primary-color': meta.primaryColor } as CSSProperties}
        >
            <aside className={styles.sidebar}>
                {/* Photo and Details */}
                <div className={styles.photoPlaceholder}>
                    {personalDetails.photoUrl && <img src={personalDetails.photoUrl} alt="Profile" className={styles.photo} />}
                </div>

                <div className={styles.sidebarSection}>
                    <h3 className={styles.sidebarTitle}>Details</h3>
                    <div className={styles.contactItem}>{personalDetails.address}</div>
                    <div className={styles.contactItem}>{personalDetails.city}, {personalDetails.postalCode}</div>
                    <div className={styles.contactItem}>{personalDetails.phone}</div>
                    <div className={styles.contactItem}>{personalDetails.email}</div>
                </div>

                {/* Links */}
                {data.socialLinks.length > 0 && (
                    <div className={styles.sidebarSection}>
                        <h3 className={styles.sidebarTitle}>Links</h3>
                        {data.socialLinks.map(link => (
                            <div key={link.id} className={styles.contactItem}>
                                <a href={link.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {link.network}
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <div className={styles.sidebarSection}>
                        <h3 className={styles.sidebarTitle}>Skills</h3>
                        {data.skills.map(skill => (
                            <div key={skill.id} className={styles.skillItem}>
                                <div className={styles.skillName}>{skill.name}</div>
                                <div className={styles.skillBar}>
                                    <div className={styles.skillLevel} style={{ width: `${(skill.level / 5) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1 className={styles.name}>{personalDetails.firstName} <br /> {personalDetails.lastName}</h1>
                    <div className={styles.jobTitle}>{personalDetails.jobTitle}</div>
                </header>

                {data.professionalSummary && (
                    <div className={styles.summary}>
                        {data.professionalSummary}
                    </div>
                )}

                {data.employmentHistory.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Employment History</h2>
                        {data.employmentHistory.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div>
                                        <div className={styles.itemTitle}>{item.jobTitle}, {item.employer}, {item.city}</div>
                                    </div>
                                    <div className={styles.itemMeta}>
                                        <span className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</span>
                                    </div>
                                </div>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {data.education.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Education</h2>
                        {data.education.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div>
                                        <div className={styles.itemTitle}>{item.school}, {item.city}</div>
                                        <div className={styles.itemMeta}>{item.degree}</div>
                                    </div>
                                    <div className={styles.itemMeta}>
                                        <span className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</span>
                                    </div>
                                </div>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
};

export default NewYork;
