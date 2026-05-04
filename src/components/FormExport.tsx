import React from 'react';
import { CandidateData } from './CandidateInfo';
import { ScientificWork, ScoreSummary } from '../utils/calculator';
import { config } from '../config/scoringRules';

interface Props {
  data: CandidateData;
  works: ScientificWork[];
  summary: ScoreSummary;
}

export const FormExport: React.FC<Props> = ({ data, works, summary }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div className="d-flex justify-content-between align-items-center no-print" style={{ marginBottom: '2rem' }}>
        <h2>Xuất Biểu Mẫu (Mẫu số 01)</h2>
        <button className="btn btn-primary" onClick={handlePrint}>
          🖨️ In / Xuất PDF
        </button>
      </div>

      <div className="print-area" style={{ background: 'white', padding: '2rem', borderRadius: '8px', color: 'black' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontWeight: 'bold' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Độc lập - Tự do - Hạnh phúc</div>
          <h3 style={{ marginTop: '2rem' }}>BẢN ĐĂNG KÝ XÉT CÔNG NHẬN ĐẠT TIÊU CHUẨN CHỨC DANH {data.targetLevel === 'GS' ? 'GIÁO SƯ' : 'PHÓ GIÁO SƯ'}</h3>
        </div>

        <div>
          <p>Kính gửi: Hội đồng Giáo sư cơ sở...</p>
          <p><strong>1. Họ và tên:</strong> {data.fullName || '........................................'}</p>
          <p><strong>2. Năm sinh:</strong> {data.birthYear || '........................................'}</p>
          <p><strong>3. Đăng ký xét chức danh:</strong> {data.targetLevel === 'GS' ? 'Giáo sư' : 'Phó Giáo sư'} - <strong>Ngành/Chuyên ngành:</strong> {data.specialty || '........................................'}</p>
          
          <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>A. TỔNG HỢP CÔNG TRÌNH KHOA HỌC</h4>
          <table style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>STT</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Tên công trình</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Phân loại</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>Vai trò</th>
                <th style={{ border: '1px solid black', padding: '0.5rem' }}>3 năm cuối</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work, idx) => (
                <tr key={work.id}>
                  <td style={{ border: '1px solid black', padding: '0.5rem', textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{work.title}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{work.type}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem' }}>{work.isMainAuthor ? 'Tác giả chính' : 'Đồng tác giả'}</td>
                  <td style={{ border: '1px solid black', padding: '0.5rem', textAlign: 'center' }}>{work.isRecent ? 'X' : ''}</td>
                </tr>
              ))}
              {works.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ border: '1px solid black', padding: '0.5rem', textAlign: 'center' }}>Chưa có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>

          <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>B. TỔNG HỢP ĐIỂM QUY ĐỔI</h4>
          <ul>
            <li><strong>Tổng điểm quy đổi công trình khoa học:</strong> {summary.totalPoints.toFixed(2)} / {config.minimumPoints[data.targetLevel]} điểm</li>
            <li><strong>Tổng điểm 3 năm cuối:</strong> {summary.recentPoints.toFixed(2)} / {config.minimumRecentPoints[data.targetLevel]} điểm</li>
            <li><strong>Tổng điểm bài báo / Bằng sáng chế:</strong> {summary.articlePoints.toFixed(2)} / {config.minimumArticlesPoints[data.field][data.targetLevel]} điểm</li>
            <li><strong>Tổng điểm viết sách:</strong> {summary.bookPoints.toFixed(2)} / {config.minimumBooksPoints[data.field][data.targetLevel]} điểm</li>
          </ul>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center' }}>
              <p><strong>XÁC NHẬN CỦA CƠ QUAN</strong></p>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>(Ký, ghi rõ họ tên và đóng dấu)</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p><em>......., ngày ..... tháng ..... năm 20...</em></p>
              <p><strong>NGƯỜI ĐĂNG KÝ</strong></p>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>(Ký và ghi rõ họ tên)</p>
              <div style={{ marginTop: '4rem' }}>{data.fullName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
