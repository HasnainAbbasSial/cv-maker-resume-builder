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
                    {personalDetails.nationality && <div className={styles.contactItem}>Nationality: {personalDetails.nationality}</div>}
                    {personalDetails.drivingLicense && <div className={styles.contactItem}>Driving License: {personalDetails.drivingLicense}</div>}
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

                {/* Languages */}
                {data.languages.length > 0 && (
                    <div className={styles.sidebarSection}>
                        <h3 className={styles.sidebarTitle}>Languages</h3>
                        {data.languages.map(lang => (
                            <div key={lang.id} className={styles.skillItem}>
                                <div className={styles.skillName}>{lang.name}</div>
                                <div className={styles.itemMeta} style={{ fontSize: '11px' }}>{lang.level}</div>
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

                {/* Hobbies */}
                {data.hobbies && (
                    <div className={styles.sidebarSection}>
                        <h3 className={styles.sidebarTitle}>Hobbies</h3>
                        <div className={styles.contactItem}>{data.hobbies}</div>
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
                            </div>
                        ))}
                    </section>
                )}

                {data.courses.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Courses</h2>
                        {data.courses.map(item => (
                            <div key={item.id} className={styles.item} style={{ marginBottom: '10px' }}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemTitle}>{item.course}, {item.institution}</div>
                                    <div className={styles.itemMeta}>{item.startDate} — {item.endDate}</div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {data.extraCurricularActivities.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Extra-curricular Activities</h2>
                        {data.extraCurricularActivities.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div>
                                        <div className={styles.itemTitle}>{item.title}, {item.employer}, {item.city}</div>
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

                {data.customSections.map(section => (
                    <section key={section.id} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        {section.items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div>
                                        <div className={styles.itemTitle}>{item.title} {item.city && `, ${item.city}`}</div>
                                    </div>
                                    <div className={styles.itemMeta}>
                                        {(item.startDate || item.endDate) && (
                                            <span className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</span>
                                        )}
                                    </div>
                                </div>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        ))}
                    </section>
                ))}
            </main>
        </div>
    );
};

export default NewYork;
