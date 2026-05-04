import React from 'react';
import type { CandidateData } from './CandidateInfo';

interface Props {
  data: CandidateData;
  onChange: (data: CandidateData) => void;
  onExportWord: () => void;
}

export const Mau01Form: React.FC<Props> = ({ data, onChange, onExportWord }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '2rem' }}>
        <h2>Thông tin Chi tiết (Mẫu số 01)</h2>
        <button className="btn btn-primary" onClick={onExportWord}>
          📄 Tải xuống File Word (.docx)
        </button>
      </div>

      <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
        Bạn hãy điền các thông tin bổ sung dưới đây để hoàn thiện Mẫu số 01. Những phần nào không có có thể bỏ trống. Dữ liệu sẽ được tự động lưu lại.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="form-group">
          <label className="form-label">Giới tính</label>
          <input type="text" name="gender" className="form-control" value={data.gender || ''} onChange={handleChange} placeholder="Nam / Nữ" />
        </div>
        <div className="form-group">
          <label className="form-label">Dân tộc</label>
          <input type="text" name="nation" className="form-control" value={data.nation || ''} onChange={handleChange} placeholder="Kinh, Tày..." />
        </div>

        <div className="form-group">
          <label className="form-label">Tôn giáo</label>
          <input type="text" name="religion" className="form-control" value={data.religion || ''} onChange={handleChange} placeholder="Không" />
        </div>
        <div className="form-group">
          <label className="form-label">Email liên hệ</label>
          <input type="email" name="email" className="form-control" value={data.email || ''} onChange={handleChange} placeholder="example@email.com" />
        </div>

        <div className="form-group">
          <label className="form-label">Quê quán</label>
          <input type="text" name="hometown" className="form-control" value={data.hometown || ''} onChange={handleChange} placeholder="xã/phường, huyện/quận, tỉnh/TP" />
        </div>
        <div className="form-group">
          <label className="form-label">Hộ khẩu thường trú</label>
          <input type="text" name="permanentAddress" className="form-control" value={data.permanentAddress || ''} onChange={handleChange} placeholder="Số nhà, đường, phường..." />
        </div>

        <div className="form-group">
          <label className="form-label">Địa chỉ liên hệ</label>
          <input type="text" name="contactAddress" className="form-control" value={data.contactAddress || ''} onChange={handleChange} placeholder="Để nhận thư qua bưu điện" />
        </div>
        <div className="form-group">
          <label className="form-label">Số điện thoại di động</label>
          <input type="text" name="phoneMobile" className="form-control" value={data.phoneMobile || ''} onChange={handleChange} placeholder="0987xxxxxx" />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Quá trình công tác</label>
          <textarea name="workHistory" className="form-control" rows={3} value={data.workHistory || ''} onChange={handleChange} placeholder="Từ năm... đến năm... : làm gì ở đâu?" />
        </div>

        <div className="form-group">
          <label className="form-label">Chức vụ hiện nay</label>
          <input type="text" name="currentPosition" className="form-control" value={data.currentPosition || ''} onChange={handleChange} placeholder="Giảng viên chính..." />
        </div>
        <div className="form-group">
          <label className="form-label">Cơ quan công tác hiện nay</label>
          <input type="text" name="currentWorkplace" className="form-control" value={data.currentWorkplace || ''} onChange={handleChange} placeholder="Trường ĐH Bách Khoa..." />
        </div>

        <div className="form-group">
          <label className="form-label">Thông tin cấp bằng Đại học</label>
          <input type="text" name="bachelorInfo" className="form-control" value={data.bachelorInfo || ''} onChange={handleChange} placeholder="Ngày cấp, ngành, nơi cấp" />
        </div>
        <div className="form-group">
          <label className="form-label">Thông tin cấp bằng Thạc sĩ</label>
          <input type="text" name="masterInfo" className="form-control" value={data.masterInfo || ''} onChange={handleChange} placeholder="Ngày cấp, ngành, nơi cấp" />
        </div>

        <div className="form-group">
          <label className="form-label">Thông tin cấp bằng Tiến sĩ</label>
          <input type="text" name="doctorInfo" className="form-control" value={data.doctorInfo || ''} onChange={handleChange} placeholder="Ngày cấp, ngành, nơi cấp" />
        </div>
        <div className="form-group">
          <label className="form-label">Ngoại ngữ</label>
          <input type="text" name="foreignLanguage" className="form-control" value={data.foreignLanguage || ''} onChange={handleChange} placeholder="Ví dụ: Tiếng Anh (Được đào tạo ở nước ngoài...)" />
        </div>

        {data.targetLevel === 'GS' && (
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Ngày được công nhận Phó Giáo sư</label>
            <input type="text" name="associateProfDate" className="form-control" value={data.associateProfDate || ''} onChange={handleChange} placeholder="Ngày... tháng... năm..." />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Hội đồng GS Cơ sở</label>
          <input type="text" name="councilBasic" className="form-control" value={data.councilBasic || ''} onChange={handleChange} placeholder="Trường ĐH..." />
        </div>
        <div className="form-group">
          <label className="form-label">Hội đồng GS Ngành/Liên ngành</label>
          <input type="text" name="councilIndustry" className="form-control" value={data.councilIndustry || ''} onChange={handleChange} placeholder="Ngành CNTT..." />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Các hướng nghiên cứu chủ yếu</label>
          <textarea name="researchDirections" className="form-control" rows={3} value={data.researchDirections || ''} onChange={handleChange} placeholder="- Hướng 1&#10;- Hướng 2" />
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }} onClick={onExportWord}>
          📄 Xuất Mẫu số 01 (File Word)
        </button>
      </div>
    </div>
  );
};
