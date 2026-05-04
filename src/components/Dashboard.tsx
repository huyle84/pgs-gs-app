import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';

interface DashboardProps {
  onSelectForm: (formId: string) => void;
}

interface FormMeta {
  id: string;
  title: string;
  createdAt: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectForm }) => {
  const { currentUser } = useAuth();
  const [forms, setForms] = useState<FormMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, [currentUser]);

  const fetchForms = async () => {
    if (!currentUser) return;
    try {
      const q = query(collection(db, `users/${currentUser.uid}/forms`), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const formList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FormMeta[];
      setForms(formList);
    } catch (error) {
      console.error('Error fetching forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = async () => {
    const title = window.prompt('Nhập tên cho hồ sơ mới (Ví dụ: Hồ sơ xét PGS 2026):');
    if (!title || !currentUser) return;
    
    setLoading(true);
    try {
      const newFormRef = await addDoc(collection(db, `users/${currentUser.uid}/forms`), {
        title,
        createdAt: serverTimestamp(),
        candidateData: {},
        works: []
      });
      onSelectForm(newFormRef.id);
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Không thể tạo hồ sơ mới.');
      setLoading(false);
    }
  };

  const handleDeleteForm = async (formId: string, title: string) => {
    if (!currentUser || !window.confirm(`Bạn có chắc chắn muốn xóa "${title}" không? Hành động này không thể hoàn tác.`)) return;
    try {
      await deleteDoc(doc(db, `users/${currentUser.uid}/forms`, formId));
      fetchForms();
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--primary)' }}>Đang tải dữ liệu...</div>;

  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '4rem auto' }}>
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '2rem' }}>
        <h2>Danh sách Hồ sơ Ứng viên</h2>
        <button className="btn btn-primary" onClick={handleCreateForm}>+ Tạo Hồ sơ Mới</button>
      </div>
      
      {forms.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Bạn chưa có hồ sơ nào. Bấm nút "Tạo Hồ sơ Mới" để bắt đầu.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {forms.map(form => (
            <div key={form.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.8)' }}>
              <div>
                <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{form.title}</h3>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  ID: {form.id.substring(0, 8)}...
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-primary" onClick={() => onSelectForm(form.id)}>Mở hồ sơ</button>
                <button className="btn btn-danger" onClick={() => handleDeleteForm(form.id, form.title)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
