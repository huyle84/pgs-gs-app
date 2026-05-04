import { useState } from 'react';
import type { ScientificWork } from '../utils/calculator';
import { config } from '../config/scoringRules';

interface Props {
  works: ScientificWork[];
  onChange: (works: ScientificWork[]) => void;
}

export const ScientificWorks: React.FC<Props> = ({ works, onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialNewWorkState: Partial<ScientificWork> = {
    type: 'articleISI',
    title: '',
    isMainAuthor: true,
    totalAuthors: 1,
    baseScore: 1.0,
    isRecent: true,
    isInternationalPublisher: false,
    isExceptionalArticle: false,
  };
  
  const [newWork, setNewWork] = useState<Partial<ScientificWork>>(initialNewWorkState);

  const handleAddOrUpdate = () => {
    if (!newWork.title) {
      alert('Vui lòng nhập tên công trình');
      return;
    }
    
    const work: ScientificWork = {
      id: editingId || Date.now().toString(),
      type: newWork.type as keyof typeof config.maxPoints,
      title: newWork.title!,
      isMainAuthor: newWork.isMainAuthor!,
      totalAuthors: newWork.totalAuthors!,
      baseScore: Number(newWork.baseScore),
      isRecent: newWork.isRecent!,
      isInternationalPublisher: newWork.isInternationalPublisher,
      isExceptionalArticle: newWork.isExceptionalArticle,
    };

    if (editingId) {
      // Cập nhật
      onChange(works.map(w => w.id === editingId ? work : w));
      setEditingId(null);
    } else {
      // Thêm mới
      onChange([...works, work]);
    }
    setNewWork(initialNewWorkState);
  };

  const handleEdit = (work: ScientificWork) => {
    setEditingId(work.id);
    setNewWork({ ...work });
    
    // Scroll mượt xuống form chỉnh sửa
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewWork(initialNewWorkState);
  };

  const handleRemove = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công trình này?')) {
      onChange(works.filter(w => w.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const getTypeName = (type: string) => {
    const names: Record<string, string> = {
      articleISI: 'Bài báo quốc tế uy tín (ISI/Scopus)',
      articleISSNOnline: 'Bài báo ISSN (có XB trực tuyến)',
      articleISSNOffline: 'Bài báo ISSN (không XB trực tuyến)',
      patent: 'Bằng độc quyền sáng chế',
      usefulSolution: 'Giải pháp hữu ích',
      nationalArtAward: 'Giải thưởng nghệ thuật/TDTT Quốc gia',
      internationalArtAward: 'Giải thưởng nghệ thuật/TDTT Quốc tế',
      specializedBook: 'Sách chuyên khảo',
      textBook: 'Giáo trình',
      referenceBook: 'Sách tham khảo',
      guideBook: 'Sách hướng dẫn/Từ điển',
      nationalConference: 'Báo cáo Hội thảo quốc gia',
      internationalConference: 'Báo cáo Hội thảo quốc tế',
    };
    return names[type] || type;
  };

  return (
    <div className="glass-panel">
      <h2>Danh sách Công trình Khoa học</h2>
      <p className="form-label" style={{ fontWeight: 'normal', marginBottom: '1rem' }}>
        Lưu ý: Nhập điểm gốc do Hội đồng đánh giá (chưa nhân hệ số tác giả hay xuất bản). Hệ thống sẽ tự động tính toán điểm quy đổi thực tế.
      </p>

      {works.length > 0 && (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Tên công trình</th>
                <th>Phân loại</th>
                <th>Tác giả</th>
                <th>Điểm gốc</th>
                <th>3 năm cuối</th>
                <th>Tùy chọn</th>
                <th style={{ width: '150px' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {works.map(work => (
                <tr key={work.id} style={{ background: editingId === work.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent' }}>
                  <td>{work.title}</td>
                  <td>{getTypeName(work.type)}</td>
                  <td>
                    {work.isMainAuthor ? 'Tác giả chính' : 'Đồng tác giả'} ({work.totalAuthors} người)
                  </td>
                  <td>{work.baseScore}</td>
                  <td>{work.isRecent ? 'Có' : 'Không'}</td>
                  <td>
                    {work.isExceptionalArticle && <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>[IF vượt trội +50%] </span>}
                    {work.isInternationalPublisher && <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>[NXB Quốc tế +25%]</span>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-outline" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', flex: 1 }} 
                        onClick={() => handleEdit(work)}
                        disabled={editingId === work.id}
                      >
                        Sửa
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', flex: 1 }} 
                        onClick={() => handleRemove(work.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ 
        background: editingId ? 'rgba(245, 158, 11, 0.05)' : 'rgba(0,0,0,0.02)', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        border: editingId ? '1px dashed #F59E0B' : '1px dashed #ccc',
        marginTop: '2rem'
      }}>
        <h4 style={{ marginBottom: '1rem', color: editingId ? '#D97706' : 'var(--text-main)' }}>
          {editingId ? 'Chỉnh sửa công trình' : 'Thêm công trình mới'}
        </h4>
        
        <div className="form-group">
          <label className="form-label">Tên công trình (Bài báo/Sách/Bằng sáng chế...)</label>
          <input
            type="text"
            className="form-control"
            value={newWork.title}
            onChange={e => setNewWork({ ...newWork, title: e.target.value })}
            placeholder="Nhập tên bài báo / sách"
          />
        </div>

        <div className="d-flex gap-4">
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Phân loại</label>
            <select
              className="form-control"
              value={newWork.type}
              onChange={e => setNewWork({ ...newWork, type: e.target.value as any })}
            >
              {Object.keys(config.maxPoints).map(key => (
                <option key={key} value={key}>{getTypeName(key)} (Tối đa {config.maxPoints[key as keyof typeof config.maxPoints]}đ)</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Điểm gốc đánh giá</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={newWork.baseScore}
              onChange={e => setNewWork({ ...newWork, baseScore: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="d-flex gap-4">
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Vai trò</label>
            <select
              className="form-control"
              value={newWork.isMainAuthor ? 'true' : 'false'}
              onChange={e => setNewWork({ ...newWork, isMainAuthor: e.target.value === 'true' })}
            >
              <option value="true">Tác giả chính / Chủ biên</option>
              <option value="false">Đồng tác giả / Thành viên</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Tổng số tác giả</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={newWork.totalAuthors}
              onChange={e => setNewWork({ ...newWork, totalAuthors: Number(e.target.value) })}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Thời gian</label>
            <select
              className="form-control"
              value={newWork.isRecent ? 'true' : 'false'}
              onChange={e => setNewWork({ ...newWork, isRecent: e.target.value === 'true' })}
            >
              <option value="true">Trong 3 năm cuối</option>
              <option value="false">Trước đó</option>
            </select>
          </div>
        </div>

        {(newWork.type === 'articleISI') && (
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={newWork.isExceptionalArticle} 
                onChange={e => setNewWork({ ...newWork, isExceptionalArticle: e.target.checked })} 
              />
              Tạp chí có hệ số ảnh hưởng (IF) vượt trội (+50% điểm)
            </label>
          </div>
        )}

        {(['specializedBook', 'textBook', 'referenceBook', 'guideBook'].includes(newWork.type || '')) && (
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={newWork.isInternationalPublisher} 
                onChange={e => setNewWork({ ...newWork, isInternationalPublisher: e.target.checked })} 
              />
              Xuất bản bởi Nhà xuất bản uy tín thế giới (+25% điểm)
            </label>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            className="btn btn-primary" 
            style={{ background: editingId ? '#D97706' : 'var(--primary)' }} 
            onClick={handleAddOrUpdate}
          >
            {editingId ? '✓ Lưu Cập nhật' : '+ Thêm công trình'}
          </button>
          
          {editingId && (
            <button className="btn btn-outline" onClick={handleCancelEdit}>
              Hủy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
