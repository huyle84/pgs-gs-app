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

      {/* ========== 4. Guidance Table ========== */}
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>4. Hướng dẫn thành công NCS làm luận án TS và học viên làm luận văn ThS</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>(đã được cấp bằng/có quyết định cấp bằng). <em>Ghi chú: Ứng viên chức danh GS chỉ kê khai số lượng NCS.</em></p>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.guidanceRecords || [];
            onChange({ ...data, guidanceRecords: [...recs, { id: Date.now().toString(), name: '', objectType: 'NCS', roleMain: true, roleSub: false, periodFrom: '', periodTo: '', institution: '', graduationYear: '' }] });
          }}>+ Thêm NCS/HV</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={formThStyle}>TT</th>
                <th style={formThStyle}>Họ tên NCS hoặc HV</th>
                <th style={formThStyle}>Đối tượng</th>
                <th style={formThStyle}>Trách nhiệm HD</th>
                <th style={formThStyle}>Từ năm</th>
                <th style={formThStyle}>Đến năm</th>
                <th style={formThStyle}>Cơ sở đào tạo</th>
                <th style={formThStyle}>Năm cấp bằng</th>
                <th style={formThStyle}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {(data.guidanceRecords || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '120px' }} value={rec.name} onChange={e => { const recs = [...(data.guidanceRecords || [])]; recs[idx] = { ...recs[idx], name: e.target.value }; onChange({ ...data, guidanceRecords: recs }); }} /></td>
                  <td style={formTdStyle}>
                    <select className="form-control" style={{ ...tableCellInput, minWidth: '70px' }} value={rec.objectType} onChange={e => { const recs = [...(data.guidanceRecords || [])]; recs[idx] = { ...recs[idx], objectType: e.target.value as 'NCS' | 'HV' }; onChange({ ...data, guidanceRecords: recs }); }}>
                      <option value="NCS">NCS</option>
                      <option value="HV">HV</option>
                    </select>
                  </td>
                  <td style={formTdStyle}>
                    <select className="form-control" style={{ ...tableCellInput, minWidth: '80px' }} value={rec.roleMain ? 'Chính' : 'Phụ'} onChange={e => { const recs = [...(data.guidanceRecords || [])]; recs[idx] = { ...recs[idx], roleMain: e.target.value === 'Chính', roleSub: e.target.value === 'Phụ' }; onChange({ ...data, guidanceRecords: recs }); }}>
                      <option value="Chính">Chính</option>
                      <option value="Phụ">Phụ</option>
                    </select>
                  </td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.periodFrom} onChange={e => { const recs = [...(data.guidanceRecords || [])]; recs[idx] = { ...recs[idx], periodFrom: e.target.value }; onChange({ ...data, guidanceRecords: recs }); }} placeholder="2019" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.periodTo} onChange={e => { const recs = [...(data.guidanceRecords || [])]; recs[idx] = { ...recs[idx], periodTo: e.target.value }; onChange({ ...data, guidanceRecords: recs }); }} placeholder="2023" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.institution} onChange={e => { const recs = [...(data.guidanceRecords || [])]; recs[idx] = { ...recs[idx], institution: e.target.value }; onChange({ ...data, guidanceRecords: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.graduationYear} onChange={e => { const recs = [...(data.guidanceRecords || [])]; recs[idx] = { ...recs[idx], graduationYear: e.target.value }; onChange({ ...data, guidanceRecords: recs }); }} placeholder="2023" /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.guidanceRecords || []).filter((_, i) => i !== idx); onChange({ ...data, guidanceRecords: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.guidanceRecords || data.guidanceRecords.length === 0) && (
                <tr><td colSpan={9} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Bấm "+ Thêm NCS/HV" để bắt đầu nhập liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========== 5. Books ========== */}
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>5. Biên soạn sách phục vụ đào tạo đại học và sau đại học</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        (Tách thành 2 giai đoạn: Đối với PGS: Trước/Sau khi bảo vệ học vị TS; Đối với GS: Trước/Sau khi được công nhận chức danh PGS)
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        <strong>Chữ viết tắt:</strong> CK: sách chuyên khảo; GT: sách giáo trình; TK: sách tham khảo; HD: sách hướng dẫn; MM: viết một mình; CB: chủ biên; phản ứng viên biên soạn đánh dấu từ trang... đến trang... (ví dụ: 17-56; 145-329).
      </p>

      {/* Books BEFORE */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="form-label" style={{ margin: 0, fontWeight: 'bold', fontStyle: 'italic' }}>Giai đoạn 1: {data.targetLevel === 'PGS' ? 'Trước khi bảo vệ TS' : 'Trước khi được công nhận PGS'}</label>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.booksBefore || [];
            onChange({ ...data, booksBefore: [...recs, { id: Date.now().toString(), title: '', bookType: '', publisher: '', totalAuthors: '', writingRole: '', confirmation: '' }] });
          }}>+ Thêm sách</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={formThStyle}>TT</th>
                <th style={formThStyle}>Tên sách</th>
                <th style={formThStyle}>Loại sách (CK, GT, TK, HD)</th>
                <th style={formThStyle}>NXB và năm XB</th>
                <th style={formThStyle}>Số tác giả</th>
                <th style={formThStyle}>Viết MM hoặc CB, phản biện soạn</th>
                <th style={formThStyle}>Xác nhận CS GDĐH</th>
                <th style={formThStyle}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {(data.booksBefore || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '140px' }} value={rec.title} onChange={e => { const recs = [...(data.booksBefore || [])]; recs[idx] = { ...recs[idx], title: e.target.value }; onChange({ ...data, booksBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '60px' }} value={rec.bookType} onChange={e => { const recs = [...(data.booksBefore || [])]; recs[idx] = { ...recs[idx], bookType: e.target.value }; onChange({ ...data, booksBefore: recs }); }} placeholder="GT" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.publisher} onChange={e => { const recs = [...(data.booksBefore || [])]; recs[idx] = { ...recs[idx], publisher: e.target.value }; onChange({ ...data, booksBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.totalAuthors} onChange={e => { const recs = [...(data.booksBefore || [])]; recs[idx] = { ...recs[idx], totalAuthors: e.target.value }; onChange({ ...data, booksBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.writingRole} onChange={e => { const recs = [...(data.booksBefore || [])]; recs[idx] = { ...recs[idx], writingRole: e.target.value }; onChange({ ...data, booksBefore: recs }); }} placeholder="MM / CB / trang 17-56" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.confirmation} onChange={e => { const recs = [...(data.booksBefore || [])]; recs[idx] = { ...recs[idx], confirmation: e.target.value }; onChange({ ...data, booksBefore: recs }); }} /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.booksBefore || []).filter((_, i) => i !== idx); onChange({ ...data, booksBefore: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.booksBefore || data.booksBefore.length === 0) && (
                <tr><td colSpan={8} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Không có sách nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Books AFTER */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="form-label" style={{ margin: 0, fontWeight: 'bold', fontStyle: 'italic' }}>Giai đoạn 2: {data.targetLevel === 'PGS' ? 'Sau khi bảo vệ TS' : 'Sau khi được công nhận PGS'}</label>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.booksAfter || [];
            onChange({ ...data, booksAfter: [...recs, { id: Date.now().toString(), title: '', bookType: '', publisher: '', totalAuthors: '', writingRole: '', confirmation: '' }] });
          }}>+ Thêm sách</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th style={formThStyle}>TT</th>
                <th style={formThStyle}>Tên sách</th>
                <th style={formThStyle}>Loại sách</th>
                <th style={formThStyle}>NXB và năm XB</th>
                <th style={formThStyle}>Số tác giả</th>
                <th style={formThStyle}>Viết MM hoặc CB, phản biện soạn</th>
                <th style={formThStyle}>Xác nhận CS GDĐH</th>
                <th style={formThStyle}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {(data.booksAfter || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '140px' }} value={rec.title} onChange={e => { const recs = [...(data.booksAfter || [])]; recs[idx] = { ...recs[idx], title: e.target.value }; onChange({ ...data, booksAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '60px' }} value={rec.bookType} onChange={e => { const recs = [...(data.booksAfter || [])]; recs[idx] = { ...recs[idx], bookType: e.target.value }; onChange({ ...data, booksAfter: recs }); }} placeholder="GT" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.publisher} onChange={e => { const recs = [...(data.booksAfter || [])]; recs[idx] = { ...recs[idx], publisher: e.target.value }; onChange({ ...data, booksAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.totalAuthors} onChange={e => { const recs = [...(data.booksAfter || [])]; recs[idx] = { ...recs[idx], totalAuthors: e.target.value }; onChange({ ...data, booksAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.writingRole} onChange={e => { const recs = [...(data.booksAfter || [])]; recs[idx] = { ...recs[idx], writingRole: e.target.value }; onChange({ ...data, booksAfter: recs }); }} placeholder="MM / CB / trang 17-56" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.confirmation} onChange={e => { const recs = [...(data.booksAfter || [])]; recs[idx] = { ...recs[idx], confirmation: e.target.value }; onChange({ ...data, booksAfter: recs }); }} /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.booksAfter || []).filter((_, i) => i !== idx); onChange({ ...data, booksAfter: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.booksAfter || data.booksAfter.length === 0) && (
                <tr><td colSpan={8} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Không có sách nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========== 6. Science & Technology Projects ========== */}
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>6. Thực hiện nhiệm vụ khoa học và công nghệ đã nghiệm thu</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        <strong>Chữ viết tắt:</strong> CT: Chương trình; ĐT: Đề tài; CN: Chủ nhiệm; PCN: Phó chủ nhiệm; TK: Thư ký.
      </p>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.scienceProjects || [];
            onChange({ ...data, scienceProjects: [...recs, { id: Date.now().toString(), name: '', role: '', codeAndLevel: '', implementPeriod: '', acceptanceDate: '' }] });
          }}>+ Thêm nhiệm vụ KHCN</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead><tr>
              <th style={formThStyle}>TT</th>
              <th style={formThStyle}>Tên nhiệm vụ KHCN (CT, ĐT...)</th>
              <th style={formThStyle}>CN/PCN/TK</th>
              <th style={formThStyle}>Mã số và cấp quản lý</th>
              <th style={formThStyle}>Thời gian thực hiện</th>
              <th style={formThStyle}>Thời gian nghiệm thu</th>
              <th style={formThStyle}>Xóa</th>
            </tr></thead>
            <tbody>
              {(data.scienceProjects || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '160px' }} value={rec.name} onChange={e => { const recs = [...(data.scienceProjects || [])]; recs[idx] = { ...recs[idx], name: e.target.value }; onChange({ ...data, scienceProjects: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '60px' }} value={rec.role} onChange={e => { const recs = [...(data.scienceProjects || [])]; recs[idx] = { ...recs[idx], role: e.target.value }; onChange({ ...data, scienceProjects: recs }); }} placeholder="CN" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.codeAndLevel} onChange={e => { const recs = [...(data.scienceProjects || [])]; recs[idx] = { ...recs[idx], codeAndLevel: e.target.value }; onChange({ ...data, scienceProjects: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.implementPeriod} onChange={e => { const recs = [...(data.scienceProjects || [])]; recs[idx] = { ...recs[idx], implementPeriod: e.target.value }; onChange({ ...data, scienceProjects: recs }); }} placeholder="2019-2022" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.acceptanceDate} onChange={e => { const recs = [...(data.scienceProjects || [])]; recs[idx] = { ...recs[idx], acceptanceDate: e.target.value }; onChange({ ...data, scienceProjects: recs }); }} placeholder="12/2022" /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.scienceProjects || []).filter((_, i) => i !== idx); onChange({ ...data, scienceProjects: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.scienceProjects || data.scienceProjects.length === 0) && (
                <tr><td colSpan={7} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Bấm "+ Thêm" để nhập</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========== 7. Research Results ========== */}
      <h3 style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>7. Kết quả nghiên cứu khoa học và công nghệ đã công bố</h3>

      {/* 7.1 Articles */}
      <h4 style={{ marginBottom: '0.5rem' }}>7.1. Bài báo khoa học đã công bố</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>(Tách thành 2 giai đoạn: Đối với PGS: Trước/Sau khi bảo vệ TS; Đối với GS: Trước/Sau khi được công nhận PGS)</p>

      {/* Articles BEFORE */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="form-label" style={{ margin: 0, fontWeight: 'bold', fontStyle: 'italic' }}>Giai đoạn 1: {data.targetLevel === 'PGS' ? 'Trước khi bảo vệ TS' : 'Trước khi được công nhận PGS'}</label>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.articlesBefore || [];
            onChange({ ...data, articlesBefore: [...recs, { id: Date.now().toString(), title: '', totalAuthors: '', journalName: '', intlJournal: '', citations: '', volumeIssue: '', pages: '', publishYear: '' }] });
          }}>+ Thêm bài báo</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead><tr>
              <th style={formThStyle}>TT</th>
              <th style={formThStyle}>Tên bài báo</th>
              <th style={formThStyle}>Số TG</th>
              <th style={formThStyle}>Tạp chí/Kỷ yếu KH</th>
              <th style={formThStyle}>TC QT uy tín (IF)</th>
              <th style={formThStyle}>Số trích dẫn</th>
              <th style={formThStyle}>Tập/số</th>
              <th style={formThStyle}>Trang</th>
              <th style={formThStyle}>Năm CB</th>
              <th style={formThStyle}>Xóa</th>
            </tr></thead>
            <tbody>
              {(data.articlesBefore || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '150px' }} value={rec.title} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], title: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.totalAuthors} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], totalAuthors: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '120px' }} value={rec.journalName} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], journalName: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '80px' }} value={rec.intlJournal} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], intlJournal: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} placeholder="IF=2.5" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.citations} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], citations: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.volumeIssue} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], volumeIssue: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.pages} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], pages: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.publishYear} onChange={e => { const recs = [...(data.articlesBefore || [])]; recs[idx] = { ...recs[idx], publishYear: e.target.value }; onChange({ ...data, articlesBefore: recs }); }} placeholder="2023" /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.articlesBefore || []).filter((_, i) => i !== idx); onChange({ ...data, articlesBefore: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.articlesBefore || data.articlesBefore.length === 0) && (
                <tr><td colSpan={10} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Không có bài báo nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Articles AFTER */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="form-label" style={{ margin: 0, fontWeight: 'bold', fontStyle: 'italic' }}>Giai đoạn 2: {data.targetLevel === 'PGS' ? 'Sau khi bảo vệ TS' : 'Sau khi được công nhận PGS'}</label>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.articlesAfter || [];
            onChange({ ...data, articlesAfter: [...recs, { id: Date.now().toString(), title: '', totalAuthors: '', journalName: '', intlJournal: '', citations: '', volumeIssue: '', pages: '', publishYear: '' }] });
          }}>+ Thêm bài báo</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead><tr>
              <th style={formThStyle}>TT</th><th style={formThStyle}>Tên bài báo</th><th style={formThStyle}>Số TG</th><th style={formThStyle}>Tạp chí/Kỷ yếu KH</th><th style={formThStyle}>TC QT uy tín (IF)</th><th style={formThStyle}>Số trích dẫn</th><th style={formThStyle}>Tập/số</th><th style={formThStyle}>Trang</th><th style={formThStyle}>Năm CB</th><th style={formThStyle}>Xóa</th>
            </tr></thead>
            <tbody>
              {(data.articlesAfter || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '150px' }} value={rec.title} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], title: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.totalAuthors} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], totalAuthors: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '120px' }} value={rec.journalName} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], journalName: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '80px' }} value={rec.intlJournal} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], intlJournal: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} placeholder="IF=2.5" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.citations} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], citations: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.volumeIssue} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], volumeIssue: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.pages} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], pages: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.publishYear} onChange={e => { const recs = [...(data.articlesAfter || [])]; recs[idx] = { ...recs[idx], publishYear: e.target.value }; onChange({ ...data, articlesAfter: recs }); }} placeholder="2023" /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.articlesAfter || []).filter((_, i) => i !== idx); onChange({ ...data, articlesAfter: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.articlesAfter || data.articlesAfter.length === 0) && (
                <tr><td colSpan={10} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Không có bài báo nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7.2 Patents */}
      <h4 style={{ marginBottom: '0.5rem' }}>7.2. Bằng độc quyền sáng chế, giải pháp hữu ích</h4>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.patents || [];
            onChange({ ...data, patents: [...recs, { id: Date.now().toString(), name: '', issuingOrg: '', issueDate: '', totalAuthors: '' }] });
          }}>+ Thêm sáng chế</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead><tr>
              <th style={formThStyle}>TT</th>
              <th style={formThStyle}>Tên bằng độc quyền sáng chế, giải pháp hữu ích</th>
              <th style={formThStyle}>Tên cơ quan cấp</th>
              <th style={formThStyle}>Ngày tháng năm cấp</th>
              <th style={formThStyle}>Số tác giả</th>
              <th style={formThStyle}>Xóa</th>
            </tr></thead>
            <tbody>
              {(data.patents || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '180px' }} value={rec.name} onChange={e => { const recs = [...(data.patents || [])]; recs[idx] = { ...recs[idx], name: e.target.value }; onChange({ ...data, patents: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '120px' }} value={rec.issuingOrg} onChange={e => { const recs = [...(data.patents || [])]; recs[idx] = { ...recs[idx], issuingOrg: e.target.value }; onChange({ ...data, patents: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '100px' }} value={rec.issueDate} onChange={e => { const recs = [...(data.patents || [])]; recs[idx] = { ...recs[idx], issueDate: e.target.value }; onChange({ ...data, patents: recs }); }} placeholder="15/06/2023" /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.totalAuthors} onChange={e => { const recs = [...(data.patents || [])]; recs[idx] = { ...recs[idx], totalAuthors: e.target.value }; onChange({ ...data, patents: recs }); }} /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.patents || []).filter((_, i) => i !== idx); onChange({ ...data, patents: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.patents || data.patents.length === 0) && (
                <tr><td colSpan={6} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Không có sáng chế nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7.3 Awards */}
      <h4 style={{ marginBottom: '0.5rem' }}>7.3. Giải thưởng quốc gia, quốc tế</h4>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <button className="btn btn-primary" type="button" style={{ fontSize: '0.9rem' }} onClick={() => {
            const recs = data.awards || [];
            onChange({ ...data, awards: [...recs, { id: Date.now().toString(), name: '', organization: '', decisionInfo: '', totalAuthors: '' }] });
          }}>+ Thêm giải thưởng</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead><tr>
              <th style={formThStyle}>TT</th>
              <th style={formThStyle}>Tên giải thưởng</th>
              <th style={formThStyle}>Cơ quan/tổ chức ra quyết định</th>
              <th style={formThStyle}>Số QĐ và ngày, tháng, năm</th>
              <th style={formThStyle}>Số tác giả</th>
              <th style={formThStyle}>Xóa</th>
            </tr></thead>
            <tbody>
              {(data.awards || []).map((rec, idx) => (
                <tr key={rec.id}>
                  <td style={formTdStyle}>{idx + 1}</td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '160px' }} value={rec.name} onChange={e => { const recs = [...(data.awards || [])]; recs[idx] = { ...recs[idx], name: e.target.value }; onChange({ ...data, awards: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '140px' }} value={rec.organization} onChange={e => { const recs = [...(data.awards || [])]; recs[idx] = { ...recs[idx], organization: e.target.value }; onChange({ ...data, awards: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={{ ...tableCellInput, minWidth: '120px' }} value={rec.decisionInfo} onChange={e => { const recs = [...(data.awards || [])]; recs[idx] = { ...recs[idx], decisionInfo: e.target.value }; onChange({ ...data, awards: recs }); }} /></td>
                  <td style={formTdStyle}><input type="text" className="form-control" style={tableCellInput} value={rec.totalAuthors} onChange={e => { const recs = [...(data.awards || [])]; recs[idx] = { ...recs[idx], totalAuthors: e.target.value }; onChange({ ...data, awards: recs }); }} /></td>
                  <td style={formTdStyle}><button type="button" style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => { const recs = (data.awards || []).filter((_, i) => i !== idx); onChange({ ...data, awards: recs }); }}>✕</button></td>
                </tr>
              ))}
              {(!data.awards || data.awards.length === 0) && (
                <tr><td colSpan={6} style={{ ...formTdStyle, textAlign: 'center', color: '#999' }}>Không có giải thưởng nào</td></tr>
              )}
            </tbody>
          </table>
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
