import React, { useMemo } from 'react';
import type { CandidateData, BookRecord, ArticleRecord } from './CandidateInfo';
import type { ScientificWork } from '../utils/calculator';


interface Props {
  data: CandidateData;
  works: ScientificWork[];
  onClose: () => void;
  onExportWord: () => void;
}

const bookTypes = ['specializedBook', 'textBook', 'referenceBook', 'guideBook'];
const bookTypeMap: Record<string, string> = { specializedBook: 'CK', textBook: 'GT', referenceBook: 'TK', guideBook: 'HD' };
const articleTypes = ['articleISI', 'articleISSNOnline', 'articleISSNOffline', 'nationalConference', 'internationalConference'];

export const Mau01Preview: React.FC<Props> = ({ data, works, onClose, onExportWord }) => {
  // Merge Tab 1 books into Mục 5
  const mergedBooksBefore = useMemo<BookRecord[]>(() => {
    const fromTab1 = works.filter(w => bookTypes.includes(w.type) && w.stage === 'BEFORE').map(w => ({
      id: `t1_${w.id}`, title: w.title, bookType: bookTypeMap[w.type] || '', publisher: w.journalName || '',
      totalAuthors: w.totalAuthors.toString(), writingRole: w.isMainAuthor ? 'CB' : '', confirmation: '',
    }));
    return [...fromTab1, ...(data.booksBefore || [])];
  }, [works, data.booksBefore]);

  const mergedBooksAfter = useMemo<BookRecord[]>(() => {
    const fromTab1 = works.filter(w => bookTypes.includes(w.type) && w.stage === 'AFTER').map(w => ({
      id: `t1_${w.id}`, title: w.title, bookType: bookTypeMap[w.type] || '', publisher: w.journalName || '',
      totalAuthors: w.totalAuthors.toString(), writingRole: w.isMainAuthor ? 'CB' : '', confirmation: '',
    }));
    return [...fromTab1, ...(data.booksAfter || [])];
  }, [works, data.booksAfter]);

  // Merge Tab 1 articles into Mục 7.1
  const mergedArticlesBefore = useMemo<ArticleRecord[]>(() => {
    const fromTab1 = works.filter(w => articleTypes.includes(w.type) && w.stage === 'BEFORE').map(w => ({
      id: `t1_${w.id}`, title: w.title, totalAuthors: w.totalAuthors.toString(),
      journalName: w.journalName || '', intlJournal: w.impactFactor ? `IF=${w.impactFactor}` : '',
      citations: w.citations || '', volumeIssue: w.volume || '', pages: w.pages || '', publishYear: w.publishYear || '',
    }));
    return [...fromTab1, ...(data.articlesBefore || [])];
  }, [works, data.articlesBefore]);

  const mergedArticlesAfter = useMemo<ArticleRecord[]>(() => {
    const fromTab1 = works.filter(w => articleTypes.includes(w.type) && w.stage === 'AFTER').map(w => ({
      id: `t1_${w.id}`, title: w.title, totalAuthors: w.totalAuthors.toString(),
      journalName: w.journalName || '', intlJournal: w.impactFactor ? `IF=${w.impactFactor}` : '',
      citations: w.citations || '', volumeIssue: w.volume || '', pages: w.pages || '', publishYear: w.publishYear || '',
    }));
    return [...fromTab1, ...(data.articlesAfter || [])];
  }, [works, data.articlesAfter]);

  // Merge Tab 1 patents into Mục 7.2
  const mergedPatents = useMemo(() => {
    const fromTab1 = works.filter(w => ['patent', 'usefulSolution'].includes(w.type)).map(w => ({
      id: `t1_${w.id}`, name: w.title, issuingOrg: w.journalName || '', issueDate: w.publishYear || '', totalAuthors: w.totalAuthors.toString(),
    }));
    return [...fromTab1, ...(data.patents || [])];
  }, [works, data.patents]);

  // Merge Tab 1 awards into Mục 7.3
  const mergedAwards = useMemo(() => {
    const fromTab1 = works.filter(w => ['nationalArtAward', 'internationalArtAward'].includes(w.type)).map(w => ({
      id: `t1_${w.id}`, name: w.title, organization: w.journalName || '', decisionInfo: w.publishYear || '', totalAuthors: w.totalAuthors.toString(),
    }));
    return [...fromTab1, ...(data.awards || [])];
  }, [works, data.awards]);

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
          {/* Mẫu số 01 label */}
          <div style={{ textAlign: 'right', marginBottom: '1rem', fontWeight: 'bold', fontSize: '13pt' }}>Mẫu số 01</div>

          {/* Two-column header: CQ chủ quản / Quốc hiệu */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ width: '45%' }}>
              <div style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11pt' }}>{data.organizationName || 'TÊN CQ, TC CHỦ QUẢN (1)'}</div>
              <div style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11pt', textDecoration: 'underline' }}>{data.trainingInstitution || 'TÊN CƠ SỞ ĐÀO TẠO...(2)...'}</div>
            </div>
            <div style={{ width: '50%', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '12pt' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
              <div style={{ fontWeight: 'bold', fontSize: '13pt', textDecoration: 'underline' }}>Độc lập - Tự do - Hạnh phúc</div>
            </div>
          </div>

          {/* Title + Photo placeholder */}
          <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: '0.5rem' }}>BẢN ĐĂNG KÝ XÉT CÔNG NHẬN ĐẠT TIÊU CHUẨN</div>
              <div style={{ fontWeight: 'bold', fontSize: '14pt' }}>CHỨC DANH: {data.targetLevel === 'GS' ? 'GIÁO SƯ' : 'PHÓ GIÁO SƯ'}</div>
              <div style={{ marginTop: '0.5rem' }}>Mã hồ sơ: {data.applicationCode || '........................'}</div>
            </div>
            <div style={{ width: '100px', height: '130px', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '10pt', textAlign: 'center', color: '#666' }}>
              Ảnh mẫu<br />4 x 6
            </div>
          </div>

          {/* Checkbox instructions */}
          <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>(Nội dung đúng ở ô nào thì đánh dấu vào ô đó: ☑; Nội dung không đúng thì để trống: ☐)</div>
          <div style={{ marginBottom: '0.5rem' }}>
            Đối tượng đăng ký: Giảng viên {data.registrationType === 'Giảng viên' || !data.registrationType ? '☑' : '☐'};
            Giảng viên thỉnh giảng {data.registrationType === 'Giảng viên thỉnh giảng' ? '☑' : '☐'}
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            Ngành: {data.field === 'NATURAL_SCIENCES' ? 'Khoa học Tự nhiên' : 'Khoa học Xã hội'};
            Chuyên ngành: {data.specialty || '.............................................'}
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

          <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>7. Quá trình công tác:</div>
          {data.workHistoryRecords && data.workHistoryRecords.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.5rem', fontSize: '11pt' }}>
              <thead><tr><th style={thStyle}>Từ năm</th><th style={thStyle}>Đến năm</th><th style={thStyle}>Chức danh, chức vụ</th><th style={thStyle}>Nơi công tác</th></tr></thead>
              <tbody>{data.workHistoryRecords.map((rec) => (<tr key={rec.id}><td style={tdStyle}>{rec.fromYear}</td><td style={tdStyle}>{rec.toYear}</td><td style={tdStyle}>{rec.position}</td><td style={tdStyle}>{rec.workplace}</td></tr>))}</tbody>
            </table>
          ) : (
            <div style={{ ...rowStyle, whiteSpace: 'pre-wrap' }}>{data.workHistory || 'Từ năm........ đến năm........: ..................................................................................'}</div>
          )}

          <div style={rowStyle}>Chức vụ: Hiện nay: {data.currentPosition || '...........................'}; Chức vụ cao nhất đã qua: {data.highestPastPosition || '...........................'}</div>
          <div style={rowStyle}>Cơ quan công tác hiện nay: {data.currentWorkplace || '.......................................................................'}</div>
          <div style={rowStyle}>Địa chỉ cơ quan: {data.workplaceAddress || '.......................................................................'}</div>
          <div style={rowStyle}>Điện thoại cơ quan: {data.workplacePhone || '.......................................................................'}</div>
          <div style={rowStyle}>Thỉnh giảng tại cơ sở giáo dục đại học (nếu có): {data.visitingSchool || '.......................................................................'}</div>
          <div style={rowStyle}>8. Đã nghỉ hưu từ tháng {data.retiredDate || '........ năm ........'}</div>
          <div style={rowStyle}>Nơi làm việc sau khi nghỉ hưu (nếu có): {data.postRetirementWorkplace || '.......................................................................'}</div>
          <div style={rowStyle}>Tên cơ sở giáo dục đại học nơi hợp đồng thỉnh giảng 3 năm cuối: {data.recentVisitingSchool || '........................................................'}</div>

          <div style={{ marginTop: '1rem', lineHeight: '1.5' }}>
            9. Học vị:<br />
            - Bằng ĐH: {data.bachelorInfo || '.......................................................................'}<br />
            - Bằng ThS: {data.masterInfo || '.......................................................................'}<br />
            - Bằng TS: {data.doctorInfo || '.......................................................................'}
          </div>

          <div style={rowStyle}>10. Ngoại ngữ: {data.foreignLanguage || '.......................................................................'}</div>
          <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            11. Các hướng nghiên cứu chủ yếu:<br />
            {data.researchDirections || '.......................................................................................................\n.......................................................................................................'}
          </div>

          {/* Section B: TỰ KHAI THEO TIÊU CHUẨN */}
          <div style={{ fontWeight: 'bold', fontSize: '14pt', margin: '2rem 0 1rem' }}>B. TỰ KHAI THEO TIÊU CHUẨN CHỨC DANH GIÁO SƯ/PHÓ GIÁO SƯ</div>

          <div style={{ ...rowStyle, fontWeight: 'bold' }}>1. Tiêu chuẩn và nhiệm vụ của nhà giáo (tự đánh giá).</div>
          <div style={{ ...rowStyle, whiteSpace: 'pre-wrap', marginLeft: '1rem' }}>{data.selfAssessment || '.......................................................................................................'}</div>

          <div style={{ ...rowStyle, marginTop: '1rem', fontWeight: 'bold' }}>2. Thời gian tham gia đào tạo, bồi dưỡng từ trình độ đại học trở lên:</div>
          <div style={rowStyle}>Tổng số: {data.teachingYearsTotal || '...............'} năm.</div>

          {/* Teaching Records Table */}
          {data.teachingRecords && data.teachingRecords.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', marginTop: '0.5rem', fontSize: '11pt' }}>
              <thead>
                <tr>
                  <th style={thStyle} rowSpan={2}>TT</th>
                  <th style={thStyle} rowSpan={2}>Năm học</th>
                  <th style={thStyle} colSpan={2}>Hướng dẫn NCS</th>
                  <th style={thStyle} rowSpan={2}>HD luận văn ThS</th>
                  <th style={thStyle} rowSpan={2}>HD đồ án, khóa luận tốt nghiệp ĐH</th>
                  <th style={thStyle} colSpan={2}>Giảng dạy</th>
                  <th style={thStyle} rowSpan={2}>Tổng số giờ giảng/số giờ quy đổi</th>
                </tr>
                <tr>
                  <th style={thStyle}>Chính</th>
                  <th style={thStyle}>Phụ</th>
                  <th style={thStyle}>ĐH</th>
                  <th style={thStyle}>SĐH</th>
                </tr>
              </thead>
              <tbody>
                {data.teachingRecords.map((rec, idx) => (
                  <tr key={rec.id}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={tdStyle}>{rec.academicYear}</td>
                    <td style={tdStyle}>{rec.ncsMain}</td>
                    <td style={tdStyle}>{rec.ncsSub}</td>
                    <td style={tdStyle}>{rec.masterThesis}</td>
                    <td style={tdStyle}>{rec.undergradProject}</td>
                    <td style={tdStyle}>{rec.teachingUG}</td>
                    <td style={tdStyle}>{rec.teachingPG}</td>
                    <td style={tdStyle}>{rec.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 3. Foreign Language */}
          <div style={{ ...rowStyle, marginTop: '1rem', fontWeight: 'bold' }}>3. Ngoại ngữ:</div>
          <div style={rowStyle}>3.1. Ngoại ngữ thành thạo phục vụ chuyên môn: {data.foreignLanguage || '.......................................................................'}</div>

          <div style={{ marginLeft: '1rem' }}>
            <div style={rowStyle}>a) Được đào tạo ở nước ngoài: {data.flTrainedAbroad ? '☑' : '☐'}</div>
            {data.flTrainedAbroad && (
              <div style={{ marginLeft: '1rem' }}>
                <div style={rowStyle}>- Học {data.flAbroadLevel || '..........'}; Tại nước: {data.flAbroadCountry || '..........'}; Từ năm {data.flAbroadFrom || '...........'} đến năm {data.flAbroadTo || '...........'}</div>
                <div style={rowStyle}>- Bảo vệ luận văn ThS ☐ hoặc luận án TS ☐ hoặc TSKH ☐; {data.flDefenseAbroad || 'Tại nước:.....; năm......'}</div>
              </div>
            )}
            <div style={rowStyle}>b) Được đào tạo ngoại ngữ trong nước: {data.flTrainedDomestic ? '☑' : '☐'}</div>
            {data.flTrainedDomestic && (
              <div style={{ marginLeft: '1rem' }}>
                <div style={rowStyle}>- Trường ĐH cấp bằng tốt nghiệp ĐH ngoại ngữ: {data.flDomesticDegree || '.......................................................................'}</div>
              </div>
            )}
            <div style={rowStyle}>c) Giảng dạy bằng tiếng nước ngoài: {data.flTeachingForeign ? '☑' : '☐'}</div>
            {data.flTeachingForeign && (
              <div style={{ marginLeft: '1rem' }}>
                <div style={rowStyle}>- Giảng dạy bằng ngoại ngữ: {data.flTeachingDetails || '.......................................................................'}</div>
                <div style={rowStyle}>- Nơi giảng dạy (cơ sở đào tạo, nước): {data.flTeachingPlace || '.......................................................................'}</div>
              </div>
            )}
            <div style={rowStyle}>d) Đối tượng khác: {data.flOther ? '☑' : '☐'}{data.flOther && data.flOtherDetails ? `; Diễn giải: ${data.flOtherDetails}` : ''}</div>
          </div>
          <div style={{ ...rowStyle, marginTop: '0.5rem' }}>3.2. Tiếng Anh (văn bằng, chứng chỉ): {data.flEnglishCert || '.......................................................................'}</div>

          {/* 4. Guidance Table */}
          <div style={{ ...rowStyle, marginTop: '1rem', fontWeight: 'bold' }}>4. Hướng dẫn thành công NCS làm luận án TS và học viên làm luận văn ThS (đã được cấp bằng/có quyết định cấp bằng)</div>
          {data.guidanceRecords && data.guidanceRecords.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', marginTop: '0.5rem', fontSize: '11pt' }}>
              <thead>
                <tr>
                  <th style={thStyle}>TT</th>
                  <th style={thStyle}>Họ tên NCS hoặc HV</th>
                  <th style={thStyle}>Đối tượng</th>
                  <th style={thStyle}>Trách nhiệm HD</th>
                  <th style={thStyle}>Thời gian HD</th>
                  <th style={thStyle}>Cơ sở đào tạo</th>
                  <th style={thStyle}>Năm cấp bằng</th>
                </tr>
              </thead>
              <tbody>
                {data.guidanceRecords.map((rec, idx) => (
                  <tr key={rec.id}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={tdStyle}>{rec.name}</td>
                    <td style={tdStyle}>{rec.objectType}</td>
                    <td style={tdStyle}>{rec.roleMain ? 'Chính' : 'Phụ'}</td>
                    <td style={tdStyle}>{rec.periodFrom}{rec.periodTo ? ` - ${rec.periodTo}` : ''}</td>
                    <td style={tdStyle}>{rec.institution}</td>
                    <td style={tdStyle}>{rec.graduationYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem' }}>(Chưa có thông tin)</div>
          )}
          <div style={{ fontStyle: 'italic', fontSize: '11pt', marginBottom: '1rem' }}>Ghi chú: Ứng viên chức danh GS chỉ kê khai số lượng NCS.</div>

          {/* 5. Books */}
          <div style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>5. Biên soạn sách phục vụ đào tạo đại học và sau đại học</div>
          <div style={{ fontStyle: 'italic', fontSize: '11pt', marginBottom: '0.5rem' }}>(Tách thành 2 giai đoạn: Đối với PGS: Trước/Sau khi bảo vệ học vị TS; Đối với GS: Trước/Sau khi được công nhận chức danh PGS)</div>

          {/* Books Before */}
          <div style={{ fontStyle: 'italic', marginBottom: '0.5rem', marginTop: '1rem' }}>Giai đoạn 1: {data.targetLevel === 'PGS' ? 'Trước khi bảo vệ TS' : 'Trước khi được công nhận PGS'}</div>
          {mergedBooksBefore.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '11pt' }}>
              <thead>
                <tr>
                  <th style={thStyle}>TT</th>
                  <th style={thStyle}>Tên sách</th>
                  <th style={thStyle}>Loại sách</th>
                  <th style={thStyle}>NXB và năm XB</th>
                  <th style={thStyle}>Số tác giả</th>
                  <th style={thStyle}>Viết MM hoặc CB</th>
                  <th style={thStyle}>Xác nhận CS GDĐH</th>
                </tr>
              </thead>
              <tbody>
                {mergedBooksBefore.map((rec, idx) => (
                  <tr key={rec.id}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={tdStyle}>{rec.title}</td>
                    <td style={tdStyle}>{rec.bookType}</td>
                    <td style={tdStyle}>{rec.publisher}</td>
                    <td style={tdStyle}>{rec.totalAuthors}</td>
                    <td style={tdStyle}>{rec.writingRole}</td>
                    <td style={tdStyle}>{rec.confirmation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem' }}>(Không có sách)</div>
          )}

          {/* Books After */}
          <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Giai đoạn 2: {data.targetLevel === 'PGS' ? 'Sau khi bảo vệ TS' : 'Sau khi được công nhận PGS'}</div>
          {mergedBooksAfter.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '11pt' }}>
              <thead>
                <tr>
                  <th style={thStyle}>TT</th>
                  <th style={thStyle}>Tên sách</th>
                  <th style={thStyle}>Loại sách</th>
                  <th style={thStyle}>NXB và năm XB</th>
                  <th style={thStyle}>Số tác giả</th>
                  <th style={thStyle}>Viết MM hoặc CB</th>
                  <th style={thStyle}>Xác nhận CS GDĐH</th>
                </tr>
              </thead>
              <tbody>
                {mergedBooksAfter.map((rec, idx) => (
                  <tr key={rec.id}>
                    <td style={tdStyle}>{idx + 1}</td>
                    <td style={tdStyle}>{rec.title}</td>
                    <td style={tdStyle}>{rec.bookType}</td>
                    <td style={tdStyle}>{rec.publisher}</td>
                    <td style={tdStyle}>{rec.totalAuthors}</td>
                    <td style={tdStyle}>{rec.writingRole}</td>
                    <td style={tdStyle}>{rec.confirmation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem', marginBottom: '1rem' }}>(Không có sách)</div>
          )}

          {/* 6. Science Projects */}
          <div style={{ fontWeight: 'bold', marginTop: '2rem', marginBottom: '0.5rem' }}>6. Thực hiện nhiệm vụ khoa học và công nghệ đã nghiệm thu</div>
          {data.scienceProjects && data.scienceProjects.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '11pt' }}>
              <thead><tr><th style={thStyle}>TT</th><th style={thStyle}>Tên nhiệm vụ KHCN</th><th style={thStyle}>CN/PCN/TK</th><th style={thStyle}>Mã số và cấp QL</th><th style={thStyle}>Thời gian TH</th><th style={thStyle}>Thời gian NT</th></tr></thead>
              <tbody>{data.scienceProjects.map((rec, idx) => (<tr key={rec.id}><td style={tdStyle}>{idx + 1}</td><td style={tdStyle}>{rec.name}</td><td style={tdStyle}>{rec.role}</td><td style={tdStyle}>{rec.codeAndLevel}</td><td style={tdStyle}>{rec.implementPeriod}</td><td style={tdStyle}>{rec.acceptanceDate}</td></tr>))}</tbody>
            </table>
          ) : (<div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem' }}>(Chưa có thông tin)</div>)}

          {/* 7. Research Results */}
          <div style={{ fontWeight: 'bold', marginTop: '2rem', marginBottom: '0.5rem' }}>7. Kết quả nghiên cứu khoa học và công nghệ đã công bố</div>
          <div style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>7.1. Bài báo khoa học đã công bố</div>
          <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Giai đoạn 1: {data.targetLevel === 'PGS' ? 'Trước khi bảo vệ TS' : 'Trước khi được công nhận PGS'}</div>
          {mergedArticlesBefore.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', fontSize: '10pt' }}>
              <thead><tr><th style={thStyle}>TT</th><th style={thStyle}>Tên bài báo</th><th style={thStyle}>Số TG</th><th style={thStyle}>Tạp chí/Kỷ yếu</th><th style={thStyle}>TC QT (IF)</th><th style={thStyle}>Trích dẫn</th><th style={thStyle}>Tập/số</th><th style={thStyle}>Trang</th><th style={thStyle}>Năm</th></tr></thead>
              <tbody>{mergedArticlesBefore.map((r, i) => (<tr key={r.id}><td style={tdStyle}>{i + 1}</td><td style={tdStyle}>{r.title}</td><td style={tdStyle}>{r.totalAuthors}</td><td style={tdStyle}>{r.journalName}</td><td style={tdStyle}>{r.intlJournal}</td><td style={tdStyle}>{r.citations}</td><td style={tdStyle}>{r.volumeIssue}</td><td style={tdStyle}>{r.pages}</td><td style={tdStyle}>{r.publishYear}</td></tr>))}</tbody>
            </table>
          ) : (<div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem' }}>(Không có bài báo)</div>)}
          <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Giai đoạn 2: {data.targetLevel === 'PGS' ? 'Sau khi bảo vệ TS' : 'Sau khi được công nhận PGS'}</div>
          {mergedArticlesAfter.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', fontSize: '10pt' }}>
              <thead><tr><th style={thStyle}>TT</th><th style={thStyle}>Tên bài báo</th><th style={thStyle}>Số TG</th><th style={thStyle}>Tạp chí/Kỷ yếu</th><th style={thStyle}>TC QT (IF)</th><th style={thStyle}>Trích dẫn</th><th style={thStyle}>Tập/số</th><th style={thStyle}>Trang</th><th style={thStyle}>Năm</th></tr></thead>
              <tbody>{mergedArticlesAfter.map((r, i) => (<tr key={r.id}><td style={tdStyle}>{i + 1}</td><td style={tdStyle}>{r.title}</td><td style={tdStyle}>{r.totalAuthors}</td><td style={tdStyle}>{r.journalName}</td><td style={tdStyle}>{r.intlJournal}</td><td style={tdStyle}>{r.citations}</td><td style={tdStyle}>{r.volumeIssue}</td><td style={tdStyle}>{r.pages}</td><td style={tdStyle}>{r.publishYear}</td></tr>))}</tbody>
            </table>
          ) : (<div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem', marginBottom: '1rem' }}>(Không có bài báo)</div>)}

          {/* 7.2 Patents */}
          <div style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>7.2. Bằng độc quyền sáng chế, giải pháp hữu ích</div>
          {mergedPatents && mergedPatents.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', fontSize: '11pt' }}>
              <thead><tr><th style={thStyle}>TT</th><th style={thStyle}>Tên bằng ĐQ sáng chế, GPHỮ</th><th style={thStyle}>Cơ quan cấp</th><th style={thStyle}>Ngày cấp</th><th style={thStyle}>Số TG</th></tr></thead>
              <tbody>{mergedPatents.map((r, i) => (<tr key={r.id}><td style={tdStyle}>{i + 1}</td><td style={tdStyle}>{r.name}</td><td style={tdStyle}>{r.issuingOrg}</td><td style={tdStyle}>{r.issueDate}</td><td style={tdStyle}>{r.totalAuthors}</td></tr>))}</tbody>
            </table>
          ) : (<div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem' }}>(Không có)</div>)}

          {/* 7.3 Awards */}
          <div style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}>7.3. Giải thưởng quốc gia, quốc tế</div>
          {mergedAwards && mergedAwards.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '11pt' }}>
              <thead><tr><th style={thStyle}>TT</th><th style={thStyle}>Tên giải thưởng</th><th style={thStyle}>Cơ quan/TC ra QĐ</th><th style={thStyle}>Số QĐ, ngày</th><th style={thStyle}>Số TG</th></tr></thead>
              <tbody>{mergedAwards.map((r, i) => (<tr key={r.id}><td style={tdStyle}>{i + 1}</td><td style={tdStyle}>{r.name}</td><td style={tdStyle}>{r.organization}</td><td style={tdStyle}>{r.decisionInfo}</td><td style={tdStyle}>{r.totalAuthors}</td></tr>))}</tbody>
            </table>
          ) : (<div style={{ ...rowStyle, fontStyle: 'italic', marginLeft: '1rem', marginBottom: '1rem' }}>(Không có)</div>)}

          {/* Score Summary */}
          {/* <div style={{ fontWeight: 'bold', fontSize: '14pt', margin: '2rem 0 1rem' }}>TỔNG HỢP ĐIỂM QUY ĐỔI</div> */}
          {/* <div>- Tổng điểm quy đổi công trình khoa học: <strong>{summary.totalPoints.toFixed(2)}</strong> điểm</div> */}
          {/* <div>- Tổng điểm 3 năm cuối: <strong>{summary.recentPoints.toFixed(2)}</strong> điểm</div> */}
          {/* <div>- Tổng điểm bài báo/sáng chế: <strong>{summary.articlePoints.toFixed(2)}</strong> điểm</div> */}
          {/* <div>- Tổng điểm viết sách: <strong>{summary.bookPoints.toFixed(2)}</strong> điểm</div> */}

          {/* 8. Program Development */}
          <div style={{ ...rowStyle, marginTop: '1rem', fontWeight: 'bold' }}>8. Chủ trì hoặc tham gia xây dựng, phát triển chương trình đào tạo hoặc chương trình nghiên cứu, ứng dụng khoa học công nghệ của cơ sở giáo dục đại học</div>
          <div style={{ ...rowStyle, whiteSpace: 'pre-wrap', marginLeft: '1rem' }}>{data.programDevelopment || '........'}</div>

          {/* Section 9: Missing standards */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ ...rowStyle, fontWeight: 'bold' }}>9. Các tiêu chuẩn còn thiếu so với quy định cần được thay thế bằng bài báo khoa học quốc tế uy tín:</div>
            <div style={{ marginLeft: '1rem' }}>
              <div style={rowStyle}>- Thời gian được cấp bằng TS, được bổ nhiệm PGS: {data.missingTimeRequirement ? '☑' : '☐'}</div>
              <div style={rowStyle}>- Giờ chuẩn giảng dạy: {data.missingTeachingHours ? '☑' : '☐'}</div>
              <div style={rowStyle}>- Công trình khoa học đã công bố: {data.missingPublications ? '☑' : '☐'}</div>
              <div style={rowStyle}>- Chủ trì nhiệm vụ khoa học và công nghệ: {data.missingScienceProjects ? '☑' : '☐'}</div>
              <div style={rowStyle}>- Hướng dẫn NCS, ThS: {data.missingGuidance ? '☑' : '☐'}</div>
            </div>
          </div>

          {/* Section C: Cam đoan */}
          <div style={{ fontWeight: 'bold', fontSize: '14pt', margin: '2rem 0 1rem' }}>C. CAM ĐOAN CỦA NGƯỜI ĐĂNG KÝ XÉT CÔNG NHẬN ĐẠT TIÊU CHUẨN CHỨC DANH:</div>
          <div style={{ marginBottom: '1rem', textIndent: '2rem' }}>Tôi cam đoan những điều khai trên là đúng, nếu sai tôi xin chịu trách nhiệm trước pháp luật.</div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'center', width: '300px' }}>
              <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{data.signingLocation ? data.signingLocation : '.'}, ngày ..... tháng ..... năm ........</div>
              <div style={{ fontWeight: 'bold' }}>Người đăng ký</div>
              <div style={{ fontStyle: 'italic' }}>(Ký và ghi rõ họ tên)</div>
              <div style={{ marginTop: '4rem', fontWeight: 'bold' }}>{data.fullName}</div>
            </div>
          </div>

          {/* Section D: Xác nhận */}
          <div style={{ fontWeight: 'bold', fontSize: '14pt', margin: '3rem 0 1rem' }}>D. XÁC NHẬN CỦA NGƯỜI ĐỨNG ĐẦU NƠI ĐANG LÀM VIỆC</div>
          <div style={rowStyle}>- Về những nội dung "Thông tin cá nhân" ứng viên đã kê khai.</div>
          <div style={rowStyle}>- Về giai đoạn ứng viên công tác tại đơn vị và mức độ hoàn thành nhiệm vụ trong giai đoạn này.</div>
          <div style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>(Những nội dung khác đã kê khai, ứng viên tự chịu trách nhiệm trước pháp luật).</div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'center', width: '350px' }}>
              <div style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{data.signingLocation ? data.signingLocation : '.'}, ngày ..... tháng ..... năm ........</div>
              <div style={{ fontWeight: 'bold' }}>THỦ TRƯỞNG CƠ QUAN</div>
              <div style={{ fontStyle: 'italic' }}>(Ký và ghi rõ họ tên, đóng dấu)</div>
              <div style={{ marginTop: '4rem' }}>&nbsp;</div>
            </div>
          </div>

          {/* Ghi chú */}
          <div style={{ marginTop: '3rem', borderTop: '1px solid #000', paddingTop: '0.5rem', fontSize: '11pt' }}>
            <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Ghi chú:</div>
            <div>(1) Tên cơ quan, tổ chức chủ quản trực tiếp (nếu có).</div>
            <div>(2) Tên cơ sở đào tạo.</div>
            <div>(3) Địa danh.</div>
          </div>
        </div>
      </div>
    </div >
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
