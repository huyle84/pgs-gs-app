import { useState, useEffect, useMemo, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './config/firebase'

import { CandidateInfo } from './components/CandidateInfo'
import type { CandidateData } from './components/CandidateInfo'
import { ScientificWorks } from './components/ScientificWorks'
import { PointSummary } from './components/PointSummary'
import { FormExport } from './components/FormExport'
import { Mau01Form } from './components/Mau01Form'
import { Mau01Preview } from './components/Mau01Preview'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { generateDocx } from './utils/wordGenerator'
import { calculateTotalScores } from './utils/calculator'
import type { ScientificWork } from './utils/calculator'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import './index.css'

function MainApp() {
  const { currentUser, logout, updateUserPassword } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  
  const [candidateData, setCandidateData] = useState<CandidateData>({
    fullName: '',
    birthDate: '',
    targetLevel: 'PGS',
    field: 'NATURAL_SCIENCES',
    specialty: '',
  });

  const [works, setWorks] = useState<ScientificWork[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error'>('saved');
  const [activeTab, setActiveTab] = useState<'ESTIMATOR' | 'MAU01' | 'PREVIEW'>('ESTIMATOR');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Load data from Firestore when user selects a form
  useEffect(() => {
    if (!currentUser || !activeFormId) return;

    const loadData = async () => {
      try {
        const docRef = doc(db, `users/${currentUser.uid}/forms`, activeFormId);
        const docSnap = await getDoc(docRef);
          
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.candidateData) setCandidateData(data.candidateData);
          if (data.works) setWorks(data.works);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ Cloud:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, [currentUser, activeFormId]);

  // Auto-save to Firestore (debounce 1s)
  useEffect(() => {
    if (!isLoaded || !currentUser || !activeFormId) return;
    
    setSaveStatus('saving');
    const timer = setTimeout(async () => {
      try {
        await setDoc(doc(db, `users/${currentUser.uid}/forms`, activeFormId), {
          candidateData,
          works
        }, { merge: true });
        setSaveStatus('saved');
      } catch (error) {
        console.error("Lỗi khi đồng bộ lên Cloud:", error);
        setSaveStatus('error');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [candidateData, works, currentUser, isLoaded, activeFormId]);

  // Protect against closing window while saving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (saveStatus === 'saving') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus]);

  const summary = useMemo(() => calculateTotalScores(works), [works]);
  
  const totalArticles = useMemo(() => {
    return works.filter(w => ['articleISI', 'articleISSNOnline', 'articleISSNOffline'].includes(w.type)).length;
  }, [works]);

  const handleExportJson = () => {
    const dataToSave = { candidateData, works };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToSave, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    const fileName = candidateData.fullName ? `BanNhap_GSPGS_${candidateData.fullName.replace(/\s+/g, '')}.json` : "BanNhap_GSPGS.json";
    downloadAnchorNode.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.candidateData) setCandidateData(parsed.candidateData);
        if (parsed.works) setWorks(parsed.works);
        alert('Đã tải dữ liệu thành công!');
      } catch (error) {
        alert('File không hợp lệ hoặc bị lỗi!');
        console.error(error);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

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

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    try {
      await updateUserPassword(newPassword);
      alert('Đổi mật khẩu thành công!');
      setIsChangingPassword(false);
      setNewPassword('');
    } catch (error: any) {
      alert('Lỗi khi đổi mật khẩu: ' + error.message + '\nNếu bạn vừa đăng nhập từ lâu, Firebase yêu cầu bạn đăng xuất và đăng nhập lại trước khi đổi mật khẩu.');
    }
  };

  if (!activeFormId) {
    return (
      <div className="container">
        <header className="d-flex justify-content-between align-items-center" style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.8)', borderRadius: '12px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary)' }}>Hệ thống Quản lý Hồ sơ Ứng viên</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{currentUser?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={() => setIsChangingPassword(true)}>Đổi mật khẩu</button>
            <button className="btn btn-outline" onClick={logout}>Đăng xuất</button>
          </div>
        </header>

        {isChangingPassword && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div className="glass-panel" style={{ padding: '2rem', width: '400px' }}>
              <h3 style={{ marginTop: 0 }}>Đổi mật khẩu</h3>
              <div className="form-group">
                <label className="form-label">Mật khẩu mới</label>
                <input type="password" placeholder="Tối thiểu 6 ký tự" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={handleChangePassword}>Cập nhật</button>
                <button className="btn btn-outline" onClick={() => setIsChangingPassword(false)}>Hủy</button>
              </div>
            </div>
          </div>
        )}

        <Dashboard onSelectForm={setActiveFormId} />
      </div>
    );
  }

  return (
    <div className="container">
      <header className="no-print" style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, top: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }} onClick={() => setActiveFormId(null)}>← Trở về</button>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Tài khoản: <strong>{currentUser.email}</strong>
            <div style={{ fontSize: '0.75rem', color: saveStatus === 'saving' ? 'var(--primary)' : saveStatus === 'error' ? 'var(--danger)' : 'var(--success)' }}>
              {saveStatus === 'saving' ? 'Đang đồng bộ...' : saveStatus === 'error' ? 'Lỗi đồng bộ' : 'Đã đồng bộ lên Đám mây'}
            </div>
          </span>
        </div>
        
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>GS/PGS Point Estimator</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Hệ thống ước tính điểm quy đổi chức danh Giáo sư, Phó Giáo sư theo QĐ 37/2018 và QĐ 25/2020
        </p>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={handleExportJson} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            💾 Tải bản nháp về máy (.json)
          </button>
          <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            📂 Mở bản nháp (.json)
          </button>
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleImportJson} 
            style={{ display: 'none' }} 
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.5)', padding: '0.25rem', borderRadius: '12px' }}>
            <button 
              className={`btn ${activeTab === 'ESTIMATOR' ? 'btn-primary' : ''}`} 
              style={{ background: activeTab === 'ESTIMATOR' ? 'var(--primary)' : 'transparent', color: activeTab === 'ESTIMATOR' ? 'white' : 'var(--text-main)', border: 'none', boxShadow: activeTab === 'ESTIMATOR' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
              onClick={() => setActiveTab('ESTIMATOR')}
            >
              1. Ước lượng Điểm
            </button>
            <button 
              className={`btn ${activeTab === 'MAU01' ? 'btn-primary' : ''}`} 
              style={{ background: activeTab === 'MAU01' ? 'var(--primary)' : 'transparent', color: activeTab === 'MAU01' ? 'white' : 'var(--text-main)', border: 'none', boxShadow: activeTab === 'MAU01' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
              onClick={() => setActiveTab('MAU01')}
            >
              2. Hoàn thiện Mẫu 01
            </button>
            <button 
              className={`btn ${activeTab === 'PREVIEW' ? 'btn-primary' : ''}`} 
              style={{ background: activeTab === 'PREVIEW' ? 'var(--primary)' : 'transparent', color: activeTab === 'PREVIEW' ? 'white' : 'var(--text-main)', border: 'none', boxShadow: activeTab === 'PREVIEW' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
              onClick={() => setActiveTab('PREVIEW')}
            >
              3. Xem trước & Xuất File
            </button>
          </div>
        </div>
      </header>

      {!isLoaded ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--primary)' }}>Đang tải dữ liệu từ Đám mây...</div>
      ) : (
        <>
          {activeTab === 'ESTIMATOR' && (
            <div className="no-print">
              <CandidateInfo data={candidateData} onChange={setCandidateData} />
              <ScientificWorks works={works} onChange={setWorks} />
              <PointSummary summary={summary} data={candidateData} totalArticles={totalArticles} />
              
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Bạn đã tính điểm xong? Chuyển sang bước tiếp theo để hoàn thiện hồ sơ nhé.</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('MAU01')} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                  Tiếp tục điền Mẫu số 01 →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'MAU01' && (
            <div className="no-print">
              <Mau01Form data={candidateData} onChange={setCandidateData} onExportWord={() => setActiveTab('PREVIEW')} />
            </div>
          )}

          {activeTab === 'PREVIEW' && (
            <div className="no-print">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <button className="btn btn-primary" onClick={() => generateDocx(candidateData, works, summary)} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                  📄 Tải xuống File Word (.docx) Chính thức
                </button>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Hãy đọc lại thật kỹ bản Xem trước bên dưới trước khi in nhé!</p>
              </div>
              <Mau01Preview data={candidateData} works={works} summary={summary} />
            </div>
          )}

          <div style={{ display: 'none' }}>
            {/* Ẩn FormExport cũ vì giờ dùng xuất Word */}
            <FormExport data={candidateData} works={works} summary={summary} />
          </div>
        </>
      )}
      
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
