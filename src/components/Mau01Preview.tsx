import React from 'react';
import type { CandidateData } from './CandidateInfo';
import type { ScientificWork, ScoreSummary } from '../utils/calculator';

interface Props {
  data: CandidateData;
  works: ScientificWork[];
  summary: ScoreSummary;
}

export const Mau01Preview: React.FC<Props> = ({ data, works, summary }) => {
  const worksBefore = works.filter(w => w.stage === 'BEFORE');
  const worksAfter = works.filter(w => w.stage === 'AFTER');

  return (
    <div style={{
      background: 'white',
      color: 'black',
      padding: '4rem',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: '14pt',
      lineHeight: '1.5',
      textAlign: 'justify'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ margin: 0, fontWeight: 'bold' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
        <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>Độc lập - Tự do - Hạnh phúc</p>
      </div>

      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h2 style={{ margin: 0, fontWeight: 'bold' }}>BẢN ĐĂNG KÝ XÉT CÔNG NHẬN ĐẠT TIÊU CHUẨN</h2>
        <h2 style={{ margin: 0, fontWeight: 'bold' }}>CHỨC DANH: {data.targetLevel === 'GS' ? 'GIÁO SƯ' : 'PHÓ GIÁO SƯ'}</h2>
      </div>

      <h3 style={{ fontWeight: 'bold', marginTop: '2rem' }}>A. THÔNG TIN CÁ NHÂN</h3>
      <p>1. Họ và tên người đăng ký: <strong>{data.fullName || '......................................................'}</strong></p>
      <p>2. Ngày tháng năm sinh: {data.birthDate ? data.birthDate.split('-').reverse().join('/') : '...........................'}; Giới tính: {data.gender || '........'}; Quốc tịch: Việt Nam</p>
      <p>Dân tộc: {data.nation || '.......................'}; Tôn giáo: {data.religion || '.......................'}; Đảng viên: {data.isPartyMember ? 'Có' : 'Không'}</p>
      <p>3. Quê quán: {data.hometown || '.......................................................................'}</p>
      <p>4. Nơi đăng ký hộ khẩu thường trú: {data.permanentAddress || '......................................................'}</p>
      <p>5. Địa chỉ liên hệ: {data.contactAddress || '.......................................................................'}</p>
      <p>Điện thoại: {data.phoneMobile || '.......................'}; Email: {data.email || '.......................'}</p>
      
      <p>6. Quá trình công tác:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }} border={1}>
        <thead>
          <tr>
            <th style={{ padding: '0.5rem' }}>Từ năm</th>
            <th style={{ padding: '0.5rem' }}>Đến năm</th>
            <th style={{ padding: '0.5rem' }}>Chức vụ</th>
            <th style={{ padding: '0.5rem' }}>Cơ quan công tác</th>
          </tr>
        </thead>
        <tbody>
          {(data.workHistories || []).length > 0 ? data.workHistories!.map((h, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{h.fromYear}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{h.toYear}</td>
              <td style={{ padding: '0.5rem' }}>{h.position}</td>
              <td style={{ padding: '0.5rem' }}>{h.workplace}</td>
            </tr>
          )) : (
            <tr><td colSpan={4} style={{ padding: '0.5rem', textAlign: 'center' }}>.....................................</td></tr>
          )}
        </tbody>
      </table>

      <p>7. Chức vụ hiện nay: {data.currentPosition || '......................................................'}</p>
      <p>Cơ quan công tác hiện nay: {data.currentWorkplace || '......................................................'}</p>
      
      <p>8. Học vị:</p>
      <p>- Bằng ĐH: {data.bachelorInfo || '......................................................'}</p>
      <p>- Bằng ThS: {data.masterInfo || '......................................................'}</p>
      <p>- Bằng TS: {data.doctorInfo || '......................................................'}</p>
      <p>9. Ngoại ngữ: {data.foreignLanguage || '......................................................'}</p>
      <p>10. Các hướng nghiên cứu chủ yếu: <br/><span style={{ whiteSpace: 'pre-wrap' }}>{data.researchDirections || '.......................................................................'}</span></p>

      <h3 style={{ fontWeight: 'bold', marginTop: '2rem' }}>B. TỰ KHAI THEO TIÊU CHUẨN</h3>
      <p><strong>1. Hướng dẫn thành công NCS / Học viên cao học</strong></p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }} border={1}>
        <thead>
          <tr>
            <th style={{ padding: '0.5rem' }}>Họ tên NCS/HV</th>
            <th style={{ padding: '0.5rem' }}>Đối tượng</th>
            <th style={{ padding: '0.5rem' }}>Trách nhiệm HD</th>
            <th style={{ padding: '0.5rem' }}>Cơ sở đào tạo</th>
            <th style={{ padding: '0.5rem' }}>Năm cấp bằng</th>
          </tr>
        </thead>
        <tbody>
          {(data.supervisions || []).length > 0 ? data.supervisions!.map((s, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem' }}>{s.name}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{s.type}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{s.role}</td>
              <td style={{ padding: '0.5rem' }}>{s.institution}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{s.graduationYear}</td>
            </tr>
          )) : (
            <tr><td colSpan={5} style={{ padding: '0.5rem', textAlign: 'center' }}>.....................................</td></tr>
          )}
        </tbody>
      </table>

      <p><strong>2. Thực hiện nhiệm vụ KH&CN đã nghiệm thu</strong></p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }} border={1}>
        <thead>
          <tr>
            <th style={{ padding: '0.5rem' }}>Tên đề tài/Dự án</th>
            <th style={{ padding: '0.5rem' }}>Vai trò</th>
            <th style={{ padding: '0.5rem' }}>Mã số</th>
            <th style={{ padding: '0.5rem' }}>Ngày nghiệm thu</th>
          </tr>
        </thead>
        <tbody>
          {(data.projects || []).length > 0 ? data.projects!.map((p, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem' }}>{p.name}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{p.role}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{p.codeAndLevel}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{p.acceptanceDate}</td>
            </tr>
          )) : (
            <tr><td colSpan={4} style={{ padding: '0.5rem', textAlign: 'center' }}>.....................................</td></tr>
          )}
        </tbody>
      </table>

      <p><strong>3. Các công trình khoa học</strong></p>
      <p><i>Giai đoạn 1: Trước khi bảo vệ TS (đối với PGS) / Trước khi nhận PGS (đối với GS)</i></p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }} border={1}>
        <thead>
          <tr>
            <th style={{ padding: '0.5rem' }}>TT</th>
            <th style={{ padding: '0.5rem' }}>Tên bài báo / công trình</th>
            <th style={{ padding: '0.5rem' }}>Tên tạp chí / NXB</th>
            <th style={{ padding: '0.5rem' }}>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {worksBefore.length > 0 ? worksBefore.map((w, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{i + 1}</td>
              <td style={{ padding: '0.5rem' }}>{w.title}</td>
              <td style={{ padding: '0.5rem' }}>{w.journalName}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{w.baseScore}</td>
            </tr>
          )) : <tr><td colSpan={4} style={{ padding: '0.5rem', textAlign: 'center' }}>Không có công trình nào trong giai đoạn này</td></tr>}
        </tbody>
      </table>

      <p><i>Giai đoạn 2: Sau khi bảo vệ TS (đối với PGS) / Sau khi nhận PGS (đối với GS)</i></p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }} border={1}>
        <thead>
          <tr>
            <th style={{ padding: '0.5rem' }}>TT</th>
            <th style={{ padding: '0.5rem' }}>Tên bài báo / công trình</th>
            <th style={{ padding: '0.5rem' }}>Tên tạp chí / NXB</th>
            <th style={{ padding: '0.5rem' }}>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {worksAfter.length > 0 ? worksAfter.map((w, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{i + 1}</td>
              <td style={{ padding: '0.5rem' }}>{w.title}</td>
              <td style={{ padding: '0.5rem' }}>{w.journalName}</td>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{w.baseScore}</td>
            </tr>
          )) : <tr><td colSpan={4} style={{ padding: '0.5rem', textAlign: 'center' }}>Không có công trình nào trong giai đoạn này</td></tr>}
        </tbody>
      </table>

      <h3 style={{ fontWeight: 'bold', marginTop: '2rem' }}>C. TỔNG HỢP ĐIỂM QUY ĐỔI</h3>
      <p>- Tổng điểm quy đổi công trình khoa học: <strong>{summary.totalPoints.toFixed(2)}</strong> điểm</p>
      <p>- Tổng điểm 3 năm cuối: <strong>{summary.recentPoints.toFixed(2)}</strong> điểm</p>
      
      <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <p>......., ngày ..... tháng ..... năm 20...</p>
          <p style={{ fontWeight: 'bold' }}>NGƯỜI ĐĂNG KÝ</p>
          <p style={{ fontStyle: 'italic', marginBottom: '4rem' }}>(Ký và ghi rõ họ tên)</p>
          <p style={{ fontWeight: 'bold' }}>{data.fullName}</p>
        </div>
      </div>
    </div>
  );
};
