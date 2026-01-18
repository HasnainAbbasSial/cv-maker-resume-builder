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
                <h1 className={styles.name}>{personalDetails.firstName} {personalDetails.lastName}</h1>
                <div className={styles.jobTitle}>{personalDetails.jobTitle}</div>
                <div className={styles.contactInfo}>
                    {personalDetails.city && <span>{personalDetails.city}, {personalDetails.country}</span>}
                    {personalDetails.phone && <span>{personalDetails.phone}</span>}
                    {personalDetails.email && <span>{personalDetails.email}</span>}
                </div>
            </header>

            <div className={styles.main}>
                {data.professionalSummary && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Profile</h2>
                        <div className={styles.summary}>{data.professionalSummary}</div>
                    </div>
                )}

                {data.employmentHistory.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Employment History</h2>
                        {data.employmentHistory.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemTitle}>{item.jobTitle} at {item.employer}, {item.city}</div>
                                    <div className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</div>
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
                                    <div className={styles.itemTitle}>{item.school}, {item.city}</div>
                                    <div className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</div>
                                </div>
                                <div className={styles.itemSubtitle}>{item.degree}</div>
                            </div>
                        ))}
                    </div>
                )}

                {data.skills.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Skills</h2>
                        <div className={styles.skillsGrid}>
                            {data.skills.map(skill => (
                                <div key={skill.id} className={styles.skillItem}>
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.languages.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Languages</h2>
                        <div className={styles.skillsGrid}>
                            {data.languages.map(lang => (
                                <div key={lang.id} className={styles.skillItem}>
                                    {lang.name} ({lang.level})
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.courses.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Courses</h2>
                        {data.courses.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemTitle}>{item.course}, {item.institution}</div>
                                    <div className={styles.date}>{item.startDate} — {item.endDate}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {data.extraCurricularActivities.length > 0 && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Extra-curricular Activities</h2>
                        {data.extraCurricularActivities.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemTitle}>{item.title} at {item.employer}, {item.city}</div>
                                    <div className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</div>
                                </div>
                                <div className={styles.description}>{item.description}</div>
                            </div>
                        ))}
                    </div>
                )}

                {data.hobbies && (
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Hobbies</h2>
                        <div className={styles.description}>{data.hobbies}</div>
                    </div>
                )}

                {data.customSections.map(section => (
                    <div key={section.id} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        {section.items.map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div className={styles.itemTitle}>{item.title} {item.city && `, ${item.city}`}</div>
                                    {(item.startDate || item.endDate) && (
                                        <div className={styles.date}>{item.startDate} — {item.endDate || 'Present'}</div>
                                    )}
                                </div>
                                <div className={styles.description}>{item.description}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stockholm;
