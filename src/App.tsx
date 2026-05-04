import { useState, useEffect, useMemo } from 'react'
import { CandidateInfo } from './components/CandidateInfo'
import type { CandidateData } from './components/CandidateInfo'
import { ScientificWorks } from './components/ScientificWorks'
import { PointSummary } from './components/PointSummary'
import { FormExport } from './components/FormExport'
import { Login } from './components/Login'
import { calculateTotalScores } from './utils/calculator'
import type { ScientificWork } from './utils/calculator'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import './index.css'

function MainApp() {
  const { currentUser, logout } = useAuth();
  
  const [candidateData, setCandidateData] = useState<CandidateData>({
    fullName: '',
    birthYear: '',
    targetLevel: 'PGS',
    field: 'NATURAL_SCIENCES',
    specialty: '',
  });

  const [works, setWorks] = useState<ScientificWork[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage when user logs in
  useEffect(() => {
    if (currentUser) {
      const savedData = localStorage.getItem(`gs_pgs_data_${currentUser.username}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.candidateData) setCandidateData(parsed.candidateData);
        if (parsed.works) setWorks(parsed.works);
      }
      setIsLoaded(true);
    }
  }, [currentUser]);

  // Auto-save data to localStorage when it changes
  useEffect(() => {
    if (currentUser && isLoaded) {
      const dataToSave = {
        candidateData,
        works
      };
      localStorage.setItem(`gs_pgs_data_${currentUser.username}`, JSON.stringify(dataToSave));
    }
  }, [candidateData, works, currentUser, isLoaded]);

  const summary = useMemo(() => calculateTotalScores(works), [works]);
  
  const totalArticles = useMemo(() => {
    return works.filter(w => ['articleISI', 'articleISSNOnline', 'articleISSNOffline'].includes(w.type)).length;
  }, [works]);

  if (!currentUser) {
    return (
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '2rem', paddingTop: '2rem' }}>
          <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>GS/PGS Point Estimator</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Hệ thống ước tính điểm quy đổi chức danh Giáo sư, Phó Giáo sư theo QĐ 37/2018 và QĐ 25/2020
          </p>
        </header>
        <Login />
      </div>
    );
  }

  return (
    <div className="container">
      <header className="no-print" style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, top: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Xin chào, <strong>{currentUser.username}</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Trạng thái: Đã lưu tự động</div>
          </span>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={logout}>
            Đăng xuất
          </button>
        </div>
        
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>GS/PGS Point Estimator</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Hệ thống ước tính điểm quy đổi chức danh Giáo sư, Phó Giáo sư theo QĐ 37/2018 và QĐ 25/2020
        </p>
      </header>

      <div className="no-print">
        <CandidateInfo data={candidateData} onChange={setCandidateData} />
        <ScientificWorks works={works} onChange={setWorks} />
        <PointSummary summary={summary} data={candidateData} totalArticles={totalArticles} />
      </div>

      <FormExport data={candidateData} works={works} summary={summary} />
      
      <footer className="no-print" style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '2rem', color: 'var(--text-muted)' }}>
        <p>© 2026 GS/PGS Estimator. Hệ thống tự động tính điểm dành cho Ứng viên Giáo sư / Phó Giáo sư.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
