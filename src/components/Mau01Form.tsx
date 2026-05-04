import React from 'react';
import type { CandidateData } from './CandidateInfo';

interface Props {
  data: CandidateData;
  onChange: (data: CandidateData) => void;
  onExportWord: () => void;
}

export const Mau01Form: React.FC<Props> = ({ data, onChange, onExportWord }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      onChange({ ...data, [name]: checked });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  const updateArray = (arrayName: keyof CandidateData, index: number, field: string, value: string) => {
    const arr = [...(data[arrayName] as any[] || [])];
    if (!arr[index]) arr[index] = {};
    arr[index][field] = value;
    onChange({ ...data, [arrayName]: arr });
  };

  const addArrayItem = (arrayName: keyof CandidateData, emptyItem: any) => {
    const arr = [...(data[arrayName] as any[] || [])];
    arr.push(emptyItem);
    onChange({ ...data, [arrayName]: arr });
  };

  const removeArrayItem = (arrayName: keyof CandidateData, index: number) => {
    const arr = [...(data[arrayName] as any[] || [])];
    arr.splice(index, 1);
    onChange({ ...data, [arrayName]: arr });
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '1rem' }}>
          <h2>Phần 1: Thông tin chung & Liên hệ</h2>
          <button className="btn btn-primary" onClick={onExportWord}>📄 Tải File Word (.docx)</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ marginRight: '2rem' }}>
              <input type="checkbox" name="isLecturer" checked={data.isLecturer || false} onChange={handleChange} /> Giảng viên hữu cơ
            </label>
            <label style={{ marginRight: '2rem' }}>
              <input type="checkbox" name="isVisitingLecturer" checked={data.isVisitingLecturer || false} onChange={handleChange} /> Giảng viên thỉnh giảng
            </label>
            <label>
              <input type="checkbox" name="isPartyMember" checked={data.isPartyMember || false} onChange={handleChange} /> Đảng viên ĐCS Việt Nam
            </label>
          </div>

          <div className="form-group"><label className="form-label">Giới tính</label><input type="text" name="gender" className="form-control" value={data.gender || ''} onChange={handleChange} placeholder="Nam / Nữ" /></div>
          <div className="form-group"><label className="form-label">Dân tộc</label><input type="text" name="nation" className="form-control" value={data.nation || ''} onChange={handleChange} placeholder="Kinh" /></div>
          <div className="form-group"><label className="form-label">Tôn giáo</label><input type="text" name="religion" className="form-control" value={data.religion || ''} onChange={handleChange} placeholder="Không" /></div>
          <div className="form-group"><label className="form-label">Email liên hệ</label><input type="text" name="email" className="form-control" value={data.email || ''} onChange={handleChange} placeholder="example@email.com" /></div>
          <div className="form-group"><label className="form-label">Quê quán</label><input type="text" name="hometown" className="form-control" value={data.hometown || ''} onChange={handleChange} placeholder="xã/phường, huyện/quận, tỉnh/TP" /></div>
          <div className="form-group"><label className="form-label">Hộ khẩu thường trú</label><input type="text" name="permanentAddress" className="form-control" value={data.permanentAddress || ''} onChange={handleChange} placeholder="Số nhà, đường, phường..." /></div>
          <div className="form-group"><label className="form-label">Địa chỉ liên hệ</label><input type="text" name="contactAddress" className="form-control" value={data.contactAddress || ''} onChange={handleChange} placeholder="Để nhận thư qua bưu điện" /></div>
          <div className="form-group"><label className="form-label">Số điện thoại di động</label><input type="text" name="phoneMobile" className="form-control" value={data.phoneMobile || ''} onChange={handleChange} placeholder="0987xxxxxx" /></div>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2>Phần 2: Quá trình công tác & Học vị</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="form-group"><label className="form-label">Chức vụ hiện nay</label><input type="text" name="currentPosition" className="form-control" value={data.currentPosition || ''} onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Cơ quan công tác hiện nay</label><input type="text" name="currentWorkplace" className="form-control" value={data.currentWorkplace || ''} onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Bằng Đại học</label><input type="text" name="bachelorInfo" className="form-control" value={data.bachelorInfo || ''} onChange={handleChange} placeholder="Ngày cấp, ngành, nơi cấp" /></div>
          <div className="form-group"><label className="form-label">Bằng Thạc sĩ</label><input type="text" name="masterInfo" className="form-control" value={data.masterInfo || ''} onChange={handleChange} placeholder="Ngày cấp, ngành, nơi cấp" /></div>
          <div className="form-group"><label className="form-label">Bằng Tiến sĩ</label><input type="text" name="doctorInfo" className="form-control" value={data.doctorInfo || ''} onChange={handleChange} placeholder="Ngày cấp, ngành, nơi cấp" /></div>
          <div className="form-group"><label className="form-label">Ngoại ngữ</label><input type="text" name="foreignLanguage" className="form-control" value={data.foreignLanguage || ''} onChange={handleChange} placeholder="Được đào tạo ở nước ngoài / Bằng Cử nhân / IELTS..." /></div>
        </div>

        <h4>Bảng Quá trình công tác</h4>
        {(data.workHistories || []).map((work, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
            <input type="text" className="form-control" placeholder="Từ năm" value={work.fromYear || ''} onChange={e => updateArray('workHistories', idx, 'fromYear', e.target.value)} />
            <input type="text" className="form-control" placeholder="Đến năm" value={work.toYear || ''} onChange={e => updateArray('workHistories', idx, 'toYear', e.target.value)} />
            <input type="text" className="form-control" placeholder="Chức vụ" value={work.position || ''} onChange={e => updateArray('workHistories', idx, 'position', e.target.value)} />
            <input type="text" className="form-control" placeholder="Cơ quan" value={work.workplace || ''} onChange={e => updateArray('workHistories', idx, 'workplace', e.target.value)} />
            <button className="btn btn-danger" onClick={() => removeArrayItem('workHistories', idx)}>Xóa</button>
          </div>
        ))}
        <button className="btn btn-outline" onClick={() => addArrayItem('workHistories', { fromYear: '', toYear: '', position: '', workplace: '' })}>+ Thêm quá trình công tác</button>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2>Phần 3: Nhiệm vụ Đào tạo & Nghiên cứu</h2>
        
        <h4 style={{ marginTop: '1.5rem' }}>Bảng Giờ giảng dạy (Ít nhất 6 năm học)</h4>
        {(data.teachingHours || []).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
            <input type="text" className="form-control" placeholder="Năm học" value={item.year || ''} onChange={e => updateArray('teachingHours', idx, 'year', e.target.value)} />
            <input type="text" className="form-control" placeholder="Giờ NCS" value={item.phdHours || ''} onChange={e => updateArray('teachingHours', idx, 'phdHours', e.target.value)} />
            <input type="text" className="form-control" placeholder="Giờ ThS" value={item.masterHours || ''} onChange={e => updateArray('teachingHours', idx, 'masterHours', e.target.value)} />
            <input type="text" className="form-control" placeholder="Giờ ĐH" value={item.bachelorHours || ''} onChange={e => updateArray('teachingHours', idx, 'bachelorHours', e.target.value)} />
            <input type="text" className="form-control" placeholder="Tổng giờ" value={item.totalHours || ''} onChange={e => updateArray('teachingHours', idx, 'totalHours', e.target.value)} />
            <button className="btn btn-danger" onClick={() => removeArrayItem('teachingHours', idx)}>Xóa</button>
          </div>
        ))}
        <button className="btn btn-outline" onClick={() => addArrayItem('teachingHours', { year: '', phdHours: '', masterHours: '', bachelorHours: '', totalHours: '' })}>+ Thêm năm học</button>

        <h4 style={{ marginTop: '2rem' }}>Bảng Hướng dẫn Sinh viên/NCS</h4>
        {(data.supervisions || []).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
            <input type="text" className="form-control" placeholder="Tên NCS/HV" value={item.name || ''} onChange={e => updateArray('supervisions', idx, 'name', e.target.value)} />
            <select className="form-control" value={item.type || 'NCS'} onChange={e => updateArray('supervisions', idx, 'type', e.target.value)}>
              <option value="NCS">NCS (Tiến sĩ)</option>
              <option value="ThS">HVCH (Thạc sĩ)</option>
            </select>
            <select className="form-control" value={item.role || 'Chính'} onChange={e => updateArray('supervisions', idx, 'role', e.target.value)}>
              <option value="Chính">Chính</option>
              <option value="Phụ">Phụ</option>
            </select>
            <input type="text" className="form-control" placeholder="Cơ sở đào tạo" value={item.institution || ''} onChange={e => updateArray('supervisions', idx, 'institution', e.target.value)} />
            <input type="text" className="form-control" placeholder="Năm cấp bằng" value={item.graduationYear || ''} onChange={e => updateArray('supervisions', idx, 'graduationYear', e.target.value)} />
            <button className="btn btn-danger" onClick={() => removeArrayItem('supervisions', idx)}>Xóa</button>
          </div>
        ))}
        <button className="btn btn-outline" onClick={() => addArrayItem('supervisions', { name: '', type: 'NCS', role: 'Chính', institution: '', graduationYear: '' })}>+ Thêm người hướng dẫn</button>

        <h4 style={{ marginTop: '2rem' }}>Bảng Đề tài Nghiên cứu khoa học đã nghiệm thu</h4>
        {(data.projects || []).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
            <input type="text" className="form-control" placeholder="Tên đề tài/nhiệm vụ" value={item.name || ''} onChange={e => updateArray('projects', idx, 'name', e.target.value)} />
            <select className="form-control" value={item.role || 'Chủ nhiệm'} onChange={e => updateArray('projects', idx, 'role', e.target.value)}>
              <option value="Chủ nhiệm">Chủ nhiệm</option>
              <option value="Phó chủ nhiệm">Phó chủ nhiệm</option>
              <option value="Thư ký">Thư ký</option>
            </select>
            <input type="text" className="form-control" placeholder="Mã số & Cấp quản lý" value={item.codeAndLevel || ''} onChange={e => updateArray('projects', idx, 'codeAndLevel', e.target.value)} />
            <input type="text" className="form-control" placeholder="Ngày nghiệm thu" value={item.acceptanceDate || ''} onChange={e => updateArray('projects', idx, 'acceptanceDate', e.target.value)} />
            <button className="btn btn-danger" onClick={() => removeArrayItem('projects', idx)}>Xóa</button>
          </div>
        ))}
        <button className="btn btn-outline" onClick={() => addArrayItem('projects', { name: '', role: 'Chủ nhiệm', codeAndLevel: '', executionTime: '', acceptanceDate: '' })}>+ Thêm đề tài</button>

        <div className="form-group" style={{ marginTop: '2rem' }}>
          <label className="form-label">Các hướng nghiên cứu chủ yếu</label>
          <textarea name="researchDirections" className="form-control" rows={3} value={data.researchDirections || ''} onChange={handleChange} placeholder="- Hướng 1&#10;- Hướng 2" />
        </div>
      </div>
    </div>
  );
};
