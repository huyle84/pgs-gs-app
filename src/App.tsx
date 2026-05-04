import { useState, useMemo } from 'react'
import { CandidateInfo } from './components/CandidateInfo'
import type { CandidateData } from './components/CandidateInfo'
import { ScientificWorks } from './components/ScientificWorks'
import { PointSummary } from './components/PointSummary'
import { FormExport } from './components/FormExport'
import { calculateTotalScores } from './utils/calculator'
import type { ScientificWork } from './utils/calculator'
import './index.css'

function App() {
  const [candidateData, setCandidateData] = useState<CandidateData>({
    fullName: '',
    birthYear: '',
    targetLevel: 'PGS',
    field: 'NATURAL_SCIENCES',
    specialty: '',
  });

  const [works, setWorks] = useState<ScientificWork[]>([]);

  const summary = useMemo(() => calculateTotalScores(works), [works]);
  
  const totalArticles = useMemo(() => {
    return works.filter(w => ['articleISI', 'articleISSNOnline', 'articleISSNOffline'].includes(w.type)).length;
  }, [works]);

  return (
    <div className="container">
      <header className="no-print" style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
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

export default App
