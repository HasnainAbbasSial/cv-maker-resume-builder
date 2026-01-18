import { ResumeProvider } from './context/ResumeContext';
import MainLayout from './layout/MainLayout';
import './styles/index.css';

function App() {
  return (
    <ResumeProvider>
      <MainLayout />
    </ResumeProvider>
  );
}

export default App;
