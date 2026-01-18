import { useResume } from '../../context/ResumeContext';
import { exportToDocx } from '../../utils/docxExport';
import { FileText, Download } from 'lucide-react';

const Header = () => {
    const { resumeData } = useResume();

    const handlePrint = () => {
        window.print();
    };

    return (
        <header className="no-print bg-white border-b border-[var(--border-color)] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-[var(--primary)] text-white p-2 rounded">
                    <FileText size={24} />
                </div>
                <span className="font-bold text-xl text-[var(--text-main)]">CV Maker</span>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => exportToDocx(resumeData)}
                    className="flex items-center gap-2 px-4 py-2 text-[var(--text-main)] hover:bg-[var(--bg-body)] rounded font-medium border border-[var(--border-color)]"
                >
                    DOCX
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] rounded font-medium shadow-sm transition-colors"
                >
                    <Download size={18} /> Download PDF
                </button>
            </div>
        </header>
    );
};

export default Header;
