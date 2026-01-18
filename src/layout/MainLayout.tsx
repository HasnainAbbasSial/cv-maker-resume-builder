import Editor from '../components/editor/Editor';
import Preview from '../components/preview/Preview';
import Header from '../components/ui/Header';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-body)]">
            <Header />
            <div className="grid-layout h-[calc(100vh-73px)]"> {/* adjust height for header */}
                <div className="editor-section">
                    <Editor />
                </div>
                <div className="preview-section">
                    <Preview />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
