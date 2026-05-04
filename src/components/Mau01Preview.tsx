import React from 'react';
import type { CandidateData } from './CandidateInfo';
import type { ScientificWork, ScoreSummary } from '../utils/calculator';


interface Props {
  data: CandidateData;
  works: ScientificWork[];
  summary: ScoreSummary;
  onClose: () => void;
  onExportWord: () => void;
}

export const Mau01Preview: React.FC<Props> = ({ data, works, summary, onClose, onExportWord }) => {
  const worksBefore = works.filter(w => w.stage === 'BEFORE');
  const worksAfter = works.filter(w => w.stage === 'AFTER');

  const renderWorksTable = (workList: ScientificWork[]) => (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '13px' }}>
      <thead>
        <tr>
          <th style={thStyle}>TT</th>
          <th style={thStyle}>Tên bài báo, Sách, Công trình...</th>
          <th style={thStyle}>Tạp chí / Kỷ yếu, NXB</th>
          <th style={thStyle}>Số T.giả</th>
          <th style={thStyle}>Điểm</th>
          <th style={thStyle}>Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        {workList.map((w, i) => (
          <tr key={w.id}>
            <td style={tdStyle}>{i + 1}</td>
            <td style={tdStyle}>{w.title}</td>
            <td style={tdStyle}>
              {w.journalName && <div>{w.journalName}</div>}
              {w.volume && <span>Tập {w.volume}, </span>}
              {w.pages && <span>Trang {w.pages}, </span>}
              {w.publishYear && <span>Năm {w.publishYear}</span>}
              {w.impactFactor && <div style={{ color: 'red' }}>IF: {w.impactFactor}</div>}
              {w.conferenceRank && <div style={{ color: 'blue' }}>Rank: {w.conferenceRank}</div>}
            </td>
            <td style={tdStyle}>{w.totalAuthors}</td>
            <td style={tdStyle}>{w.baseScore}</td>
            <td style={tdStyle}>{w.isRecent ? '3 năm cuối' : ''}</td>
          </tr>
        ))}
        {workList.length === 0 && (
          <tr>
            <td colSpan={6} style={{ ...tdStyle, textAlign: 'center', fontStyle: 'italic' }}>Không có công trình nào.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h3 style={{ margin: 0 }}>Xem trước Mẫu số 01</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={onClose}>Đóng lại</button>
            <button className="btn btn-primary" onClick={onExportWord}>📥 Tải xuống File Word</button>
          </div>
        </div>
        
        <div style={documentStyle}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontStyle: 'italic', marginBottom: '1rem', textAlign: 'left' }}>(Nội dung đúng ở ô nào thì đánh dấu vào ô đó: ☑; Nội dung không đúng thì để trống: ☐)</div>
            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
              Đối tượng đăng ký: Giảng viên {data.registrationType === 'Giảng viên' || !data.registrationType ? '☑' : '☐'}; 
              Giảng viên thỉnh giảng {data.registrationType === 'Giảng viên thỉnh giảng' ? '☑' : '☐'}
            </div>
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              Ngành: {data.field === 'NATURAL_SCIENCES' ? 'Khoa học Tự nhiên' : 'Khoa học Xã hội'}; 
              Chuyên ngành: {data.specialty || '.............................................'}
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '14pt' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div style={{ fontWeight: 'bold', fontSize: '15pt', textDecoration: 'underline', marginBottom: '2rem' }}>Độc lập - Tự do - Hạnh phúc</div>
            <div style={{ fontWeight: 'bold', fontSize: '16pt' }}>BẢN ĐĂNG KÝ XÉT CÔNG NHẬN ĐẠT TIÊU CHUẨN</div>
            <div style={{ fontWeight: 'bold', fontSize: '16pt' }}>CHỨC DANH: {data.targetLevel === 'GS' ? 'GIÁO SƯ' : 'PHÓ GIÁO SƯ'}</div>
          </div>

          {/* Section A */}
          <div style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: '1rem' }}>A. THÔNG TIN CÁ NHÂN</div>
          <div style={rowStyle}>1. Họ và tên người đăng ký: <strong>{data.fullName || '.........................................................'}</strong></div>
          <div style={rowStyle}>
            2. Ngày tháng năm sinh: {data.birthDate ? data.birthDate.split('-').reverse().join('/') : '...........................'}; 
            Nam {data.gender?.toLowerCase() === 'nam' ? '☑' : '☐'} 
            Nữ {data.gender?.toLowerCase() === 'nữ' ? '☑' : '☐'}; 
            Quốc tịch: Việt Nam
          </div>
          <div style={rowStyle}>
            Dân tộc: {data.nation || '.............................................'}; 
            Tôn giáo: {data.religion || '..................................................'}
          </div>
          <div style={rowStyle}>3. Đảng viên Đảng Cộng sản Việt Nam: {data.isPartyMember ? '☑' : '☐'}</div>
          <div style={rowStyle}>4. Quê quán: {data.hometown || '.......................................................................................................'}</div>
          <div style={rowStyle}>5. Nơi đăng ký hộ khẩu thường trú: {data.permanentAddress || '...................................................................................'}</div>
          <div style={rowStyle}>6. Địa chỉ liên hệ: {data.contactAddress || '.......................................................................................................'}</div>
          <div style={rowStyle}>
            Điện thoại nhà riêng: {data.phoneHome || '...........................'}; 
            Điện thoại di động: {data.phoneMobile || '...........................'}; 
            E-mail: {data.email || '...........................'}
          </div>
          
          <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            7. Quá trình công tác:<br/>
            {data.workHistory || 'Từ năm........ đến năm........: ..................................................................................\nTừ năm........ đến năm........: ..................................................................................'}
          </div>
          
          <div style={rowStyle}>Chức vụ: Hiện nay: {data.currentPosition || '...........................'}; Chức vụ cao nhất đã qua: {data.highestPastPosition || '...........................'}</div>
          <div style={rowStyle}>Cơ quan công tác hiện nay: {data.currentWorkplace || '.......................................................................'}</div>
          <div style={rowStyle}>Địa chỉ cơ quan: {data.workplaceAddress || '.......................................................................'}</div>
          <div style={rowStyle}>Điện thoại cơ quan: {data.workplacePhone || '.......................................................................'}</div>
          <div style={rowStyle}>Thỉnh giảng tại cơ sở giáo dục đại học (nếu có): {data.visitingSchool || '.......................................................................'}</div>
          <div style={rowStyle}>8. Đã nghỉ hưu từ tháng {data.retiredDate || '........ năm ........'}</div>
          <div style={rowStyle}>Nơi làm việc sau khi nghỉ hưu (nếu có): {data.postRetirementWorkplace || '.......................................................................'}</div>
          <div style={rowStyle}>Tên cơ sở giáo dục đại học nơi hợp đồng thỉnh giảng 3 năm cuối: {data.recentVisitingSchool || '........................................................'}</div>
          
          <div style={{ marginTop: '1rem', lineHeight: '1.5' }}>
            9. Học vị:<br/>
            - Bằng ĐH: {data.bachelorInfo || '.......................................................................'}<br/>
            - Bằng ThS: {data.masterInfo || '.......................................................................'}<br/>
            - Bằng TS: {data.doctorInfo || '.......................................................................'}
          </div>

          <div style={rowStyle}>10. Ngoại ngữ: {data.foreignLanguage || '.......................................................................'}</div>
          <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            11. Các hướng nghiên cứu chủ yếu:<br/>
            {data.researchDirections || '.......................................................................................................\n.......................................................................................................'}
          </div>

          {/* Section B */}
          <div style={{ fontWeight: 'bold', fontSize: '14pt', margin: '2rem 0 1rem' }}>B. KẾT QUẢ ĐÀO TẠO VÀ NGHIÊN CỨU KHOA HỌC</div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>1. Các công trình khoa học (Bài báo, Bằng độc quyền sáng chế, Sách...)</div>
          
          <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Giai đoạn 1: Trước khi bảo vệ TS (đối với PGS) / Trước khi nhận PGS (đối với GS)</div>
          {renderWorksTable(worksBefore)}

          <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Giai đoạn 2: Sau khi bảo vệ TS (đối với PGS) / Sau khi nhận PGS (đối với GS)</div>
          {renderWorksTable(worksAfter)}

          {/* Section C */}
          <div style={{ fontWeight: 'bold', fontSize: '14pt', margin: '2rem 0 1rem' }}>C. TỔNG HỢP ĐIỂM QUY ĐỔI</div>
          <div>- Tổng điểm quy đổi công trình khoa học: <strong>{summary.totalPoints.toFixed(2)}</strong> điểm</div>
          <div>- Tổng điểm 3 năm cuối: <strong>{summary.recentPoints.toFixed(2)}</strong> điểm</div>
          <div>- Tổng điểm bài báo/sáng chế: <strong>{summary.articlePoints.toFixed(2)}</strong> điểm</div>
          <div>- Tổng điểm viết sách: <strong>{summary.bookPoints.toFixed(2)}</strong> điểm</div>
          
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'center', width: '300px' }}>
              <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>......., ngày ..... tháng ..... năm 20...</div>
              <div style={{ fontWeight: 'bold' }}>NGƯỜI ĐĂNG KÝ</div>
              <div style={{ fontStyle: 'italic' }}>(Ký và ghi rõ họ tên)</div>
              <div style={{ marginTop: '4rem', fontWeight: 'bold' }}>{data.fullName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000,
  display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem'
};
const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '1000px',
  height: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'
};
const headerStyle: React.CSSProperties = {
  padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb'
};
const documentStyle: React.CSSProperties = {
  flex: 1, overflowY: 'auto', padding: '3rem 4rem', backgroundColor: '#fff',
  color: '#000', fontFamily: '"Times New Roman", Times, serif', fontSize: '13pt', lineHeight: 1.5
};
const rowStyle: React.CSSProperties = { marginBottom: '0.5rem' };
const thStyle: React.CSSProperties = { border: '1px solid #000', padding: '0.5rem', textAlign: 'center', fontWeight: 'bold' };
const tdStyle: React.CSSProperties = { border: '1px solid #000', padding: '0.5rem' };
