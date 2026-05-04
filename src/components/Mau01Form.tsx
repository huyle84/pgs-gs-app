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
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Tiêu đề hồ sơ</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="form-group">
          <label className="form-label">Tên CQ, TC chủ quản (1)</label>
          <input type="text" name="organizationName" className="form-control" value={data.organizationName || ''} onChange={handleChange} placeholder="Bộ Giáo dục và Đào tạo..." />
        </div>
        <div className="form-group">
          <label className="form-label">Tên cơ sở đào tạo (2)</label>
          <input type="text" name="trainingInstitution" className="form-control" value={data.trainingInstitution || ''} onChange={handleChange} placeholder="Trường Đại học..." />
        </div>
        <div className="form-group">
          <label className="form-label">Mã hồ sơ</label>
          <input type="text" name="applicationCode" className="form-control" value={data.applicationCode || ''} onChange={handleChange} placeholder="Số mã hồ sơ..." />
        </div>
      </div>

      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Thông tin Cá nhân</h3>
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

      {/* ========== SECTION B ========== */}
      <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem', marginTop: '2rem' }}>B. TỰ KHAI THEO TIÊU CHUẨN CHỨC DANH</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">1. Tiêu chuẩn và nhiệm vụ của nhà giáo (tự đánh giá)</label>
          <textarea name="selfAssessment" className="form-control" rows={3} value={data.selfAssessment || ''} onChange={handleChange} placeholder="Ghi nhận xét tự đánh giá việc đáp ứng tiêu chuẩn..." />
        </div>
        <div className="form-group">
          <label className="form-label">2. Tổng số năm tham gia đào tạo</label>
          <input type="text" name="teachingYearsTotal" className="form-control" value={data.teachingYearsTotal || ''} onChange={handleChange} placeholder="Ví dụ: 15" />
        </div>
      </div>

      {/* Teaching Records Table */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <label className="form-label" style={{ margin: 0, fontWeight: 'bold' }}>Bảng kê hoạt động đào tạo theo năm học</label>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const records = data.teachingRecords || [];
            onChange({ ...data, teachingRecords: [...records, { id: Date.now().toString(), academicYear: '', ncsMain: '', ncsSub: '', masterThesis: '', undergradProject: '', teachingUG: '', teachingPG: '', totalHours: '' }] });
          }}>+ Thêm năm học</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={formThStyle}>TT</th>
                <th style={formThStyle}>Năm học</th>
                <th style={formThStyle}>Hướng dẫn NCS (Chính)</th>
                <th style={formThStyle}>Hướng dẫn NCS (Phụ)</th>
                <th style={formThStyle}>HD luận văn ThS</th>
                <th style={formThStyle}>HD đồ án/KL tốt nghiệp ĐH</th>
                <th style={formThStyle}>Giảng dạy ĐH</th>
                <th style={formThStyle}>Giảng dạy SĐH</th>
                <th style={formThStyle}>Tổng số giờ</th>
                <th style={formThStyle}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {(data.teachingRecords || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.academicYear} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], academicYear: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} placeholder="2022-2023" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.ncsMain} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], ncsMain: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.ncsSub} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], ncsSub: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.masterThesis} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], masterThesis: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.undergradProject} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], undergradProject: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.teachingUG} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], teachingUG: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.teachingPG} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], teachingPG: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.totalHours} onChange={e => { const recs = [...(data.teachingRecords || [])]; recs[idx] = { ...recs[idx], totalHours: e.target.value }; onChange({ ...data, teachingRecords: recs }); }} /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.teachingRecords || []).filter((_, i) => i !== idx); onChange({ ...data, teachingRecords: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.teachingRecords || data.teachingRecords.length === 0) && (
                <tr><td colSpan={10} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Bấm "+ Thêm năm học" để bắt đầu nhập liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Foreign Language Section */}
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>3. Ngoại ngữ</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">3.1. Ngoại ngữ thành thạo phục vụ chuyên môn</label>
          <input type="text" name="foreignLanguage" className="form-control" value={data.foreignLanguage || ''} onChange={handleChange} placeholder="Ví dụ: Tiếng Anh" />
        </div>

        {/* a) Được đào tạo ở nước ngoài */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
            <input type="checkbox" checked={data.flTrainedAbroad || false} onChange={e => onChange({ ...data, flTrainedAbroad: e.target.checked })} />
            a) Được đào tạo ở nước ngoài
          </label>
        </div>
        {data.flTrainedAbroad && (<>
          <div className="form-group">
            <label className="form-label">Trình độ (Học ĐH, ThS, TS...)</label>
            <input type="text" name="flAbroadLevel" className="form-control" value={data.flAbroadLevel || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Tại nước</label>
            <input type="text" name="flAbroadCountry" className="form-control" value={data.flAbroadCountry || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Từ năm</label>
            <input type="text" name="flAbroadFrom" className="form-control" value={data.flAbroadFrom || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Đến năm</label>
            <input type="text" name="flAbroadTo" className="form-control" value={data.flAbroadTo || ''} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Bảo vệ luận văn ThS/Luận án TS/TSKH tại nước và năm</label>
            <input type="text" name="flDefenseAbroad" className="form-control" value={data.flDefenseAbroad || ''} onChange={handleChange} placeholder="Tại nước:... ; Năm:..." />
          </div>
        </>)}

        {/* b) Được đào tạo ngoại ngữ trong nước */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
            <input type="checkbox" checked={data.flTrainedDomestic || false} onChange={e => onChange({ ...data, flTrainedDomestic: e.target.checked })} />
            b) Được đào tạo ngoại ngữ trong nước
          </label>
        </div>
        {data.flTrainedDomestic && (<>
          <div className="form-group">
            <label className="form-label">Bằng tốt nghiệp ĐH ngoại ngữ / Số bằng / Năm cấp</label>
            <input type="text" name="flDomesticDegree" className="form-control" value={data.flDomesticDegree || ''} onChange={handleChange} placeholder="Ngoại ngữ:...; Số bằng:...; Năm cấp:..." />
          </div>
        </>)}

        {/* c) Giảng dạy bằng tiếng nước ngoài */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
            <input type="checkbox" checked={data.flTeachingForeign || false} onChange={e => onChange({ ...data, flTeachingForeign: e.target.checked })} />
            c) Giảng dạy bằng tiếng nước ngoài
          </label>
        </div>
        {data.flTeachingForeign && (<>
          <div className="form-group">
            <label className="form-label">Giảng dạy bằng ngoại ngữ</label>
            <input type="text" name="flTeachingDetails" className="form-control" value={data.flTeachingDetails || ''} onChange={handleChange} placeholder="Tên ngoại ngữ..." />
          </div>
          <div className="form-group">
            <label className="form-label">Nơi giảng dạy (cơ sở đào tạo, nước)</label>
            <input type="text" name="flTeachingPlace" className="form-control" value={data.flTeachingPlace || ''} onChange={handleChange} />
          </div>
        </>)}

        {/* d) Đối tượng khác */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
            <input type="checkbox" checked={data.flOther || false} onChange={e => onChange({ ...data, flOther: e.target.checked })} />
            d) Đối tượng khác
          </label>
        </div>
        {data.flOther && (
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Diễn giải</label>
            <input type="text" name="flOtherDetails" className="form-control" value={data.flOtherDetails || ''} onChange={handleChange} />
          </div>
        )}

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">3.2. Tiếng Anh (văn bằng, chứng chỉ)</label>
          <input type="text" name="flEnglishCert" className="form-control" value={data.flEnglishCert || ''} onChange={handleChange} placeholder="IELTS 6.5, TOEFL 90..." />
        </div>
      </div>

      {/* Guidance Section */}
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>4. Hướng dẫn thành công NCS & Học viên</h3>
      <div style={{ marginBottom: '2rem' }}>
        <div className="form-group">
          <label className="form-label">Hướng dẫn thành công NCS làm luận án TS và học viên làm luận văn ThS (đã được cấp bằng/có quyết định cấp bằng)</label>
          <textarea name="guidanceDetails" className="form-control" rows={4} value={data.guidanceDetails || ''} onChange={handleChange} placeholder="Liệt kê tên NCS/học viên, đề tài, năm bảo vệ..." />
        </div>
      </div>

      {/* Section 9: Các tiêu chuẩn còn thiếu */}
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>9. Các tiêu chuẩn còn thiếu cần thay thế bằng bài báo KHQT uy tín</h3>
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[
          { key: 'missingTimeRequirement', label: 'Thời gian được cấp bằng TS, được bổ nhiệm PGS' },
          { key: 'missingTeachingHours', label: 'Giờ chuẩn giảng dạy' },
          { key: 'missingPublications', label: 'Công trình khoa học đã công bố' },
          { key: 'missingScienceProjects', label: 'Chủ trì nhiệm vụ khoa học và công nghệ' },
          { key: 'missingGuidance', label: 'Hướng dẫn NCS, ThS' },
        ].map(item => (
          <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={(data as unknown as Record<string, unknown>)[item.key] as boolean || false} onChange={e => onChange({ ...data, [item.key]: e.target.checked })} />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      {/* Section C & D: Signing */}
      <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>C & D. Cam đoan & Xác nhận</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Địa danh (nơi ký xác nhận)</label>
          <input type="text" name="signingLocation" className="form-control" value={data.signingLocation || ''} onChange={handleChange} placeholder="Ví dụ: Hà Nội, TP. Hồ Chí Minh..." />
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>
        Phần C (Cam đoan của người đăng ký) và Phần D (Xác nhận của Thủ trưởng cơ quan) sẽ được tự động in trong file Word xuất ra. Ứng viên chỉ cần ký tên sau khi in.
      </p>
      
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

const formThStyle: React.CSSProperties = { border: '1px solid #ccc', padding: '0.4rem', textAlign: 'center', fontWeight: 'bold', background: 'rgba(99, 102, 241, 0.08)', fontSize: '0.8rem' };
const formTdStyle: React.CSSProperties = { border: '1px solid #ccc', padding: '0.25rem', textAlign: 'center' };
const tableCellInput: React.CSSProperties = { padding: '0.25rem 0.4rem', fontSize: '0.85rem', minWidth: '70px', textAlign: 'center' };
