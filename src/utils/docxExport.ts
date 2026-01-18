import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import type { ResumeData } from '../types';

export const exportToDocx = (data: ResumeData) => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: `${data.personalDetails.firstName} ${data.personalDetails.lastName}`,
                    heading: HeadingLevel.TITLE,
                }),
                new Paragraph({
                    text: data.personalDetails.email,
                }),
                new Paragraph({
                    text: data.personalDetails.phone,
                }),
                new Paragraph({
                    text: 'Professional Summary',
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: data.professionalSummary,
                }),
                // Employment
                new Paragraph({
                    text: 'Employment History',
                    heading: HeadingLevel.HEADING_1,
                }),
                ...data.employmentHistory.flatMap(job => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: job.jobTitle, bold: true }),
                            new TextRun({ text: `, ${job.employer}` }),
                        ]
                    }),
                    new Paragraph({
                        text: `${job.startDate} - ${job.endDate}`,
                    }),
                    new Paragraph({
                        text: job.description,
                    }),
                    new Paragraph({ text: '' }) // spacer
                ]),
                // Education
                new Paragraph({
                    text: 'Education',
                    heading: HeadingLevel.HEADING_1,
                }),
                ...data.education.flatMap(edu => [
                    new Paragraph({
                        children: [
                            new TextRun({ text: edu.school, bold: true }),
                            new TextRun({ text: `, ${edu.degree}` }),
                        ]
                    }),
                    new Paragraph({
                        text: `${edu.startDate} - ${edu.endDate}`,
                    }),
                    new Paragraph({
                        text: edu.description,
                    }),
                    new Paragraph({ text: '' }) // spacer
                ]),
            ],
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `resume-${data.personalDetails.firstName}.docx`);
    });
};
