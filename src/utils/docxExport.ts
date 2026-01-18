import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import type { ResumeData } from '../types';

export const exportToDocx = (data: ResumeData) => {
    const children: any[] = [
        // Header
        new Paragraph({
            text: `${data.personalDetails.firstName} ${data.personalDetails.lastName}`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
            text: `${data.personalDetails.jobTitle}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        }),
        new Paragraph({
            text: `${data.personalDetails.email} | ${data.personalDetails.phone} | ${data.personalDetails.city}, ${data.personalDetails.country}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
        }),

        // Professional Summary
        new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
            text: data.professionalSummary,
            spacing: { after: 300 },
        }),

        // Employment
        new Paragraph({
            text: 'EMPLOYMENT HISTORY',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
        }),
        ...data.employmentHistory.flatMap(job => [
            new Paragraph({
                children: [
                    new TextRun({ text: job.jobTitle, bold: true }),
                    new TextRun({ text: ` at ${job.employer}, ${job.city}` }),
                ],
                spacing: { before: 100 },
            }),
            new Paragraph({
                text: `${job.startDate} — ${job.endDate}`,
                spacing: { after: 100 },
            }),
            new Paragraph({
                text: job.description,
                spacing: { after: 200 },
            }),
        ]),

        // Education
        new Paragraph({
            text: 'EDUCATION',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
        }),
        ...data.education.flatMap(edu => [
            new Paragraph({
                children: [
                    new TextRun({ text: `${edu.degree}, ${edu.school}`, bold: true }),
                    new TextRun({ text: ` (${edu.city})` }),
                ],
                spacing: { before: 100 },
            }),
            new Paragraph({
                text: `${edu.startDate} — ${edu.endDate}`,
                spacing: { after: 100 },
            }),
            new Paragraph({
                text: edu.description,
                spacing: { after: 200 },
            }),
        ]),

        // Skills
        new Paragraph({
            text: 'SKILLS',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
            text: data.skills.map(s => `${s.name} (${s.level}/5)`).join(', '),
            spacing: { after: 300 },
        }),
    ];

    // Languages
    if (data.languages && data.languages.length > 0) {
        children.push(
            new Paragraph({
                text: 'LANGUAGES',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 200, after: 100 },
            }),
            new Paragraph({
                text: data.languages.map(l => `${l.name} (${l.level})`).join(', '),
                spacing: { after: 300 },
            })
        );
    }

    // Social Links
    if (data.socialLinks && data.socialLinks.length > 0) {
        children.push(
            new Paragraph({
                text: 'LINKS',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 200, after: 100 },
            }),
            ...data.socialLinks.map(link =>
                new Paragraph({
                    children: [
                        new TextRun({ text: `${link.network}: `, bold: true }),
                        new TextRun({ text: link.url }),
                    ],
                })
            )
        );
    }

    // Courses
    if (data.courses && data.courses.length > 0) {
        children.push(
            new Paragraph({
                text: 'COURSES',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 100 },
            }),
            ...data.courses.flatMap(course => [
                new Paragraph({
                    children: [
                        new TextRun({ text: course.course, bold: true }),
                        new TextRun({ text: ` at ${course.institution}` }),
                    ],
                }),
                new Paragraph({
                    text: `${course.startDate} — ${course.endDate}`,
                    spacing: { after: 200 },
                })
            ])
        );
    }

    // Extra-curricular
    if (data.extraCurricularActivities && data.extraCurricularActivities.length > 0) {
        children.push(
            new Paragraph({
                text: 'EXTRA-CURRICULAR ACTIVITIES',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 100 },
            }),
            ...data.extraCurricularActivities.flatMap(activity => [
                new Paragraph({
                    children: [
                        new TextRun({ text: activity.title, bold: true }),
                        new TextRun({ text: ` at ${activity.employer}, ${activity.city}` }),
                    ],
                }),
                new Paragraph({
                    text: `${activity.startDate} — ${activity.endDate}`,
                }),
                new Paragraph({
                    text: activity.description,
                    spacing: { after: 200 },
                })
            ])
        );
    }

    // Hobbies
    if (data.hobbies) {
        children.push(
            new Paragraph({
                text: 'HOBBIES',
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
                text: data.hobbies,
                spacing: { after: 300 },
            })
        );
    }

    // Custom Sections
    if (data.customSections && data.customSections.length > 0) {
        data.customSections.forEach(section => {
            children.push(
                new Paragraph({
                    text: section.title.toUpperCase(),
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 300, after: 100 },
                }),
                ...section.items.flatMap(item => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: item.title, bold: true }),
                            new TextRun({ text: item.city ? `, ${item.city}` : '' }),
                        ],
                    }),
                    new Paragraph({
                        text: `${item.startDate} — ${item.endDate}`,
                    }),
                    new Paragraph({
                        text: item.description,
                        spacing: { after: 200 },
                    })
                ])
            );
        });
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: children,
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${data.personalDetails.firstName}_${data.personalDetails.lastName}_Resume.docx`);
    });
};
