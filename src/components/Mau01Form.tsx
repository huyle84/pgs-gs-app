import React from 'react';
import type { CandidateData } from './CandidateInfo';

interface Props {
  data: CandidateData;
  onChange: (data: CandidateData) => void;
  onExportWord: () => void;
  onPreview: () => void;
}

export const Mau01Form: React.FC<Props> = ({ data, onChange, onExportWord, onPreview }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '2rem' }}>
        <h2>Thông tin Chi tiết (Mẫu số 01)</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={onPreview}>
            👁️ Xem trước
          </button>
          <button className="btn btn-primary" onClick={onExportWord}>
            📄 Tải xuống File Word (.docx)
          </button>
        </div>
      </div>

      <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
        Bạn hãy điền các thông tin bổ sung dưới đây để hoàn thiện Mẫu số 01. Những phần nào không có có thể bỏ trống. Dữ liệu sẽ được tự động lưu lại.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label" style={{ fontWeight: 'bold' }}>Đối tượng đăng ký</label>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="radio" name="registrationType" value="Giảng viên" checked={data.registrationType === 'Giảng viên' || !data.registrationType} onChange={handleChange} />
              <span>Giảng viên</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="radio" name="registrationType" value="Giảng viên thỉnh giảng" checked={data.registrationType === 'Giảng viên thỉnh giảng'} onChange={handleChange} />
              <span>Giảng viên thỉnh giảng</span>
            </label>
          </div>
        </div>

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
        <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
            <input type="checkbox" name="isPartyMember" checked={data.isPartyMember || false} onChange={e => onChange({ ...data, isPartyMember: e.target.checked })} />
            <span style={{ fontWeight: 'bold' }}>Đảng viên Đảng Cộng sản Việt Nam</span>
          </label>
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
          <label className="form-label">Điện thoại nhà riêng</label>
          <input type="text" name="phoneHome" className="form-control" value={data.phoneHome || ''} onChange={handleChange} placeholder="Mã vùng + Số máy" />
        </div>
        <div className="form-group">
          <label className="form-label">Số điện thoại di động</label>
          <input type="text" name="phoneMobile" className="form-control" value={data.phoneMobile || ''} onChange={handleChange} placeholder="0987xxxxxx" />
        </div>
        <div className="form-group">
          <label className="form-label">Email liên hệ</label>
          <input type="email" name="email" className="form-control" value={data.email || ''} onChange={handleChange} placeholder="example@email.com" />
        </div>
      </div>

      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Quá trình Công tác & Chuyên môn</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Quá trình công tác</label>
          <textarea name="workHistory" className="form-control" rows={4} value={data.workHistory || ''} onChange={handleChange} placeholder="Từ năm... đến năm... : làm gì ở đâu?" />
        </div>

        <div className="form-group">
          <label className="form-label">Chức vụ hiện nay</label>
          <input type="text" name="currentPosition" className="form-control" value={data.currentPosition || ''} onChange={handleChange} placeholder="Giảng viên chính..." />
        </div>
        <div className="form-group">
          <label className="form-label">Chức vụ cao nhất đã qua</label>
          <input type="text" name="highestPastPosition" className="form-control" value={data.highestPastPosition || ''} onChange={handleChange} placeholder="Trưởng phòng..." />
        </div>

        <div className="form-group">
          <label className="form-label">Cơ quan công tác hiện nay</label>
          <input type="text" name="currentWorkplace" className="form-control" value={data.currentWorkplace || ''} onChange={handleChange} placeholder="Trường ĐH Bách Khoa..." />
        </div>
        <div className="form-group">
          <label className="form-label">Địa chỉ cơ quan</label>
          <input type="text" name="workplaceAddress" className="form-control" value={data.workplaceAddress || ''} onChange={handleChange} placeholder="Đường, phường, quận..." />
        </div>

        <div className="form-group">
          <label className="form-label">Điện thoại cơ quan</label>
          <input type="text" name="workplacePhone" className="form-control" value={data.workplacePhone || ''} onChange={handleChange} placeholder="Điện thoại cơ quan" />
        </div>
        <div className="form-group">
          <label className="form-label">Thỉnh giảng tại cơ sở GD ĐH (nếu có)</label>
          <input type="text" name="visitingSchool" className="form-control" value={data.visitingSchool || ''} onChange={handleChange} placeholder="Tên trường..." />
        </div>

        <div className="form-group">
          <label className="form-label">Đã nghỉ hưu từ tháng năm</label>
          <input type="text" name="retiredDate" className="form-control" value={data.retiredDate || ''} onChange={handleChange} placeholder="Ví dụ: 10/2022" />
        </div>
        <div className="form-group">
          <label className="form-label">Nơi làm việc sau khi nghỉ hưu (nếu có)</label>
          <input type="text" name="postRetirementWorkplace" className="form-control" value={data.postRetirementWorkplace || ''} onChange={handleChange} placeholder="Tên cơ quan..." />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Tên cơ sở giáo dục đại học nơi hợp đồng thỉnh giảng 3 năm cuối (tính đến thời điểm hết hạn nộp hồ sơ)</label>
          <input type="text" name="recentVisitingSchool" className="form-control" value={data.recentVisitingSchool || ''} onChange={handleChange} placeholder="Tên trường..." />
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
      
      <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }} onClick={onPreview}>
          👁️ Xem trước tờ khai
        </button>
        <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }} onClick={onExportWord}>
          📄 Xuất Mẫu số 01 (File Word)
        </button>
      </div>
    </div>
  );
};
