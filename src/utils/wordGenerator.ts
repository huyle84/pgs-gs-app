import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import type { CandidateData } from '../components/CandidateInfo';
import type { ScientificWork } from './calculator';

const createCell = (text: string, bold: boolean = false) => {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold, font: "Times New Roman", size: 24 })], alignment: AlignmentType.CENTER })],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
    },
  });
};

const createTextCell = (text: string, bold: boolean = false) => {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold, font: "Times New Roman", size: 24 })] })],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1 },
      bottom: { style: BorderStyle.SINGLE, size: 1 },
      left: { style: BorderStyle.SINGLE, size: 1 },
      right: { style: BorderStyle.SINGLE, size: 1 },
    },
  });
};






export const generateDocx = async (data: CandidateData, works: ScientificWork[]) => {


  // Merge Tab 1 data
  const bookTypesMap: Record<string, string> = { specializedBook: 'CK', textBook: 'GT', referenceBook: 'TK', guideBook: 'HD' };
  const bookTypesList = ['specializedBook', 'textBook', 'referenceBook', 'guideBook'];
  const articleTypesList = ['articleISI', 'articleISSNOnline', 'articleISSNOffline', 'nationalConference', 'internationalConference'];
  
  const mergedBooksBefore = [
    ...works.filter(w => bookTypesList.includes(w.type) && w.stage === 'BEFORE').map(w => ({
      id: 't1_'+w.id, title: w.title, bookType: bookTypesMap[w.type]||'', publisher: w.journalName||'',
      totalAuthors: w.totalAuthors.toString(), writingRole: w.isMainAuthor?'CB':'', confirmation: '',
    })),
    ...(data.booksBefore || []),
  ];
  const mergedBooksAfter = [
    ...works.filter(w => bookTypesList.includes(w.type) && w.stage === 'AFTER').map(w => ({
      id: 't1_'+w.id, title: w.title, bookType: bookTypesMap[w.type]||'', publisher: w.journalName||'',
      totalAuthors: w.totalAuthors.toString(), writingRole: w.isMainAuthor?'CB':'', confirmation: '',
    })),
    ...(data.booksAfter || []),
  ];
  const mergedArticlesBefore = [
    ...works.filter(w => articleTypesList.includes(w.type) && w.stage === 'BEFORE').map(w => ({
      id: 't1_'+w.id, title: w.title, totalAuthors: w.totalAuthors.toString(),
      journalName: w.journalName||'', intlJournal: w.impactFactor?'IF='+w.impactFactor:'',
      citations: w.citations||'', volumeIssue: w.volume||'', pages: w.pages||'', publishYear: w.publishYear||'',
    })),
    ...(data.articlesBefore || []),
  ];
  const mergedArticlesAfter = [
    ...works.filter(w => articleTypesList.includes(w.type) && w.stage === 'AFTER').map(w => ({
      id: 't1_'+w.id, title: w.title, totalAuthors: w.totalAuthors.toString(),
      journalName: w.journalName||'', intlJournal: w.impactFactor?'IF='+w.impactFactor:'',
      citations: w.citations||'', volumeIssue: w.volume||'', pages: w.pages||'', publishYear: w.publishYear||'',
    })),
    ...(data.articlesAfter || []),
  ];
  const mergedPatents = [
    ...works.filter(w => ['patent', 'usefulSolution'].includes(w.type)).map(w => ({
      id: 't1_'+w.id, name: w.title, issuingOrg: w.journalName||'', issueDate: w.publishYear||'', totalAuthors: w.totalAuthors.toString(),
    })),
    ...(data.patents || []),
  ];
  const mergedAwards = [
    ...works.filter(w => ['nationalArtAward', 'internationalArtAward'].includes(w.type)).map(w => ({
      id: 't1_'+w.id, name: w.title, organization: w.journalName||'', decisionInfo: w.publishYear||'', totalAuthors: w.totalAuthors.toString(),
    })),
    ...(data.awards || []),
  ];

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Mẫu số 01 label
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Mẫu số 01", bold: true, font: "Times New Roman", size: 26 })],
          spacing: { after: 200 }
        }),

        // TÊN CQ CHỦ QUẢN
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [new TextRun({ text: (data.organizationName || 'TÊN CQ, TC CHỦ QUẢN (1)').toUpperCase(), bold: true, font: "Times New Roman", size: 24 })],
        }),
        // TÊN CƠ SỞ ĐÀO TẠO
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [new TextRun({ text: (data.trainingInstitution || 'TÊN CƠ SỞ ĐÀO TẠO...(2)...').toUpperCase(), bold: true, underline: { type: "single" }, font: "Times New Roman", size: 24 })],
          spacing: { after: 200 }
        }),

        // QUỐC HIỆU
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", bold: true, font: "Times New Roman", size: 26 }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Độc lập - Tự do - Hạnh phúc", bold: true, underline: { type: "single" }, font: "Times New Roman", size: 28 }),
          ],
          spacing: { after: 400 }
        }),

        // TITLE
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "BẢN ĐĂNG KÝ XÉT CÔNG NHẬN ĐẠT TIÊU CHUẨN", bold: true, font: "Times New Roman", size: 30 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: `CHỨC DANH: ${data.targetLevel === 'GS' ? 'GIÁO SƯ' : 'PHÓ GIÁO SƯ'}`, bold: true, font: "Times New Roman", size: 30 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: `Mã hồ sơ: ${data.applicationCode || '........................'}`, font: "Times New Roman", size: 28 })],
          spacing: { after: 400 }
        }),

        // A. THÔNG TIN CÁ NHÂN
        new Paragraph({ children: [new TextRun({ text: "(Nội dung đúng ở ô nào thì đánh dấu vào ô đó: ☑; Nội dung không đúng thì để trống: ☐)", italics: true, font: "Times New Roman", size: 24 })], spacing: { after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `Đối tượng đăng ký: Giảng viên ${data.registrationType === 'Giảng viên' || !data.registrationType ? '☑' : '☐'}; Giảng viên thỉnh giảng ${data.registrationType === 'Giảng viên thỉnh giảng' ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Ngành: ${data.field === 'NATURAL_SCIENCES' ? 'Khoa học Tự nhiên' : 'Khoa học Xã hội'}; Chuyên ngành: ${data.specialty || '.............................................'}`, font: "Times New Roman", size: 28 })], spacing: { after: 400 } }),

        new Paragraph({
          children: [new TextRun({ text: "A. THÔNG TIN CÁ NHÂN", bold: true, font: "Times New Roman", size: 28 })],
          spacing: { before: 200, after: 200 }
        }),
        new Paragraph({ children: [new TextRun({ text: `1. Họ và tên người đăng ký: ${data.fullName || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `2. Ngày tháng năm sinh: ${data.birthDate ? data.birthDate.split('-').reverse().join('/') : '...........................'}; Nam ${data.gender?.toLowerCase() === 'nam' ? '☑' : '☐'} Nữ ${data.gender?.toLowerCase() === 'nữ' ? '☑' : '☐'}; Quốc tịch: Việt Nam`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Dân tộc: ${data.nation || '.......................'}; Tôn giáo: ${data.religion || '.......................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `3. Đảng viên Đảng Cộng sản Việt Nam: ${data.isPartyMember ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `4. Quê quán: ${data.hometown || '.......................................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `5. Nơi đăng ký hộ khẩu thường trú: ${data.permanentAddress || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `6. Địa chỉ liên hệ (ghi rõ, đầy đủ để liên hệ được qua Bưu điện): ${data.contactAddress || '.......................................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Điện thoại nhà riêng: ${data.phoneHome || '.......................'}; Điện thoại di động: ${data.phoneMobile || '.......................'}; Email: ${data.email || '.......................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `7. Quá trình công tác (công việc, chức vụ, cơ quan):`, font: "Times New Roman", size: 28 })] }),
        ...(data.workHistoryRecords && data.workHistoryRecords.length > 0 ? [
          new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
            new TableRow({ children: [createCell("Từ năm", true), createCell("Đến năm", true), createCell("Chức danh, chức vụ", true), createCell("Nơi công tác", true)] }),
            ...data.workHistoryRecords.map((r) => new TableRow({ children: [createCell(r.fromYear), createCell(r.toYear), createTextCell(r.position), createTextCell(r.workplace)] })),
          ]}),
        ] : [new Paragraph({ children: [new TextRun({ text: data.workHistory || '........', font: "Times New Roman", size: 28 })] })]),
        new Paragraph({ children: [new TextRun({ text: `Chức vụ: Hiện nay: ${data.currentPosition || '.......................................'}; Chức vụ cao nhất đã qua: ${data.highestPastPosition || '.......................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Cơ quan công tác hiện nay: ${data.currentWorkplace || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Địa chỉ cơ quan: ${data.workplaceAddress || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Điện thoại cơ quan: ${data.workplacePhone || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Thỉnh giảng tại cơ sở giáo dục đại học (nếu có): ${data.visitingSchool || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `8. Đã nghỉ hưu từ tháng ${data.retiredDate || '........ năm ........'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Nơi làm việc sau khi nghỉ hưu (nếu có): ${data.postRetirementWorkplace || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `Tên cơ sở giáo dục đại học nơi hợp đồng thỉnh giảng 3 năm cuối (tính đến thời điểm hết hạn nộp hồ sơ): ${data.recentVisitingSchool || '......................................................'}`, font: "Times New Roman", size: 28 })] }),

        new Paragraph({ children: [new TextRun({ text: `9. Học vị:`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Bằng ĐH: ${data.bachelorInfo || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Bằng ThS: ${data.masterInfo || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Bằng TS: ${data.doctorInfo || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `10. Ngoại ngữ: ${data.foreignLanguage || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `11. Các hướng nghiên cứu chủ yếu:\n${data.researchDirections || '.......................................................................\n.......................................................................'}`, font: "Times New Roman", size: 28 })] }),

        // B. TỰ KHAI THEO TIÊU CHUẨN CHỨC DANH
        new Paragraph({
          children: [new TextRun({ text: "B. TỰ KHAI THEO TIÊU CHUẨN CHỨC DANH GIÁO SƯ/PHÓ GIÁO SƯ", bold: true, font: "Times New Roman", size: 28 })],
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({ children: [new TextRun({ text: `1. Tiêu chuẩn và nhiệm vụ của nhà giáo (tự đánh giá).`, bold: true, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: data.selfAssessment || '.......................................................................................................', font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `2. Thời gian tham gia đào tạo, bồi dưỡng từ trình độ đại học trở lên:`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `Tổng số: ${data.teachingYearsTotal || '...............'} năm.`, font: "Times New Roman", size: 28 })] }),

        // Teaching Records Table
        ...(data.teachingRecords && data.teachingRecords.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("TT", true),
                  createCell("Năm học", true),
                  createCell("HD NCS Chính", true),
                  createCell("HD NCS Phụ", true),
                  createCell("HD LV ThS", true),
                  createCell("HD ĐA/KL TN ĐH", true),
                  createCell("GD ĐH", true),
                  createCell("GD SĐH", true),
                  createCell("Tổng giờ", true),
                ],
              }),
              ...data.teachingRecords.map((rec, idx) => new TableRow({
                children: [
                  createCell((idx + 1).toString()),
                  createCell(rec.academicYear),
                  createCell(rec.ncsMain),
                  createCell(rec.ncsSub),
                  createCell(rec.masterThesis),
                  createCell(rec.undergradProject),
                  createCell(rec.teachingUG),
                  createCell(rec.teachingPG),
                  createCell(rec.totalHours),
                ],
              })),
            ],
          }),
        ] : []),

        // 3. Foreign Language
        new Paragraph({ children: [new TextRun({ text: `3. Ngoại ngữ:`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `3.1. Ngoại ngữ thành thạo phục vụ chuyên môn: ${data.foreignLanguage || '......................................................'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `a) Được đào tạo ở nước ngoài: ${data.flTrainedAbroad ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        ...(data.flTrainedAbroad ? [
          new Paragraph({ children: [new TextRun({ text: `- Học ${data.flAbroadLevel || '..........'}; Tại nước: ${data.flAbroadCountry || '..........'}; Từ năm ${data.flAbroadFrom || '...........'} đến năm ${data.flAbroadTo || '...........'}`, font: "Times New Roman", size: 28 })], indent: { left: 360 } }),
          new Paragraph({ children: [new TextRun({ text: `- Bảo vệ luận văn ThS ☐ hoặc luận án TS ☐ hoặc TSKH ☐; ${data.flDefenseAbroad || 'Tại nước:.....; năm......'}`, font: "Times New Roman", size: 28 })], indent: { left: 360 } }),
        ] : []),
        new Paragraph({ children: [new TextRun({ text: `b) Được đào tạo ngoại ngữ trong nước: ${data.flTrainedDomestic ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        ...(data.flTrainedDomestic ? [
          new Paragraph({ children: [new TextRun({ text: `- Trường ĐH cấp bằng tốt nghiệp ĐH ngoại ngữ: ${data.flDomesticDegree || '......................................................'}`, font: "Times New Roman", size: 28 })], indent: { left: 360 } }),
        ] : []),
        new Paragraph({ children: [new TextRun({ text: `c) Giảng dạy bằng tiếng nước ngoài: ${data.flTeachingForeign ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        ...(data.flTeachingForeign ? [
          new Paragraph({ children: [new TextRun({ text: `- Giảng dạy bằng ngoại ngữ: ${data.flTeachingDetails || '......................................................'}`, font: "Times New Roman", size: 28 })], indent: { left: 360 } }),
          new Paragraph({ children: [new TextRun({ text: `- Nơi giảng dạy (cơ sở đào tạo, nước): ${data.flTeachingPlace || '......................................................'}`, font: "Times New Roman", size: 28 })], indent: { left: 360 } }),
        ] : []),
        new Paragraph({ children: [new TextRun({ text: `d) Đối tượng khác: ${data.flOther ? '☑' : '☐'}${data.flOther && data.flOtherDetails ? `; Diễn giải: ${data.flOtherDetails}` : ''}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `3.2. Tiếng Anh (văn bằng, chứng chỉ): ${data.flEnglishCert || '......................................................'}`, font: "Times New Roman", size: 28 })], spacing: { before: 100 } }),

        // 4. Guidance Table
        new Paragraph({ children: [new TextRun({ text: `4. Hướng dẫn thành công NCS làm luận án TS và học viên làm luận văn ThS (đã được cấp bằng/có quyết định cấp bằng):`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 200 } }),
        ...(data.guidanceRecords && data.guidanceRecords.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Họ tên NCS/HV", true), createCell("Đối tượng", true), createCell("TN HD", true), createCell("Thời gian HD", true), createCell("Cơ sở ĐT", true), createCell("Năm cấp bằng", true)] }),
              ...data.guidanceRecords.map((rec, idx) => new TableRow({
                children: [createCell((idx + 1).toString()), createTextCell(rec.name), createCell(rec.objectType), createCell(rec.roleMain ? 'Chính' : 'Phụ'), createCell(`${rec.periodFrom}${rec.periodTo ? ' - ' + rec.periodTo : ''}`), createTextCell(rec.institution), createCell(rec.graduationYear)],
              })),
            ],
          }),
        ] : []),
        new Paragraph({ children: [new TextRun({ text: "Ghi chú: Ứng viên chức danh GS chỉ kê khai số lượng NCS.", italics: true, font: "Times New Roman", size: 24 })], spacing: { after: 200 } }),

        // 5. Books
        new Paragraph({ children: [new TextRun({ text: `5. Biên soạn sách phục vụ đào tạo đại học và sau đại học`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 400 } }),
        new Paragraph({ children: [new TextRun({ text: `Giai đoạn 1: ${data.targetLevel === 'PGS' ? 'Trước khi bảo vệ TS' : 'Trước khi được công nhận PGS'}`, italics: true, font: "Times New Roman", size: 28 })], spacing: { before: 200, after: 100 } }),
        ...(mergedBooksBefore.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Tên sách", true), createCell("Loại", true), createCell("NXB, năm", true), createCell("Số TG", true), createCell("MM/CB", true), createCell("Xác nhận", true)] }),
              ...mergedBooksBefore.map((r, i) => new TableRow({ children: [createCell((i + 1).toString()), createTextCell(r.title), createCell(r.bookType), createTextCell(r.publisher), createCell(r.totalAuthors), createTextCell(r.writingRole), createTextCell(r.confirmation)] })),
            ]
          }),
        ] : [new Paragraph({ children: [new TextRun({ text: "(Không có sách)", italics: true, font: "Times New Roman", size: 28 })] })]),
        new Paragraph({ children: [new TextRun({ text: `Giai đoạn 2: ${data.targetLevel === 'PGS' ? 'Sau khi bảo vệ TS' : 'Sau khi được công nhận PGS'}`, italics: true, font: "Times New Roman", size: 28 })], spacing: { before: 200, after: 100 } }),
        ...(mergedBooksAfter.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Tên sách", true), createCell("Loại", true), createCell("NXB, năm", true), createCell("Số TG", true), createCell("MM/CB", true), createCell("Xác nhận", true)] }),
              ...mergedBooksAfter.map((r, i) => new TableRow({ children: [createCell((i + 1).toString()), createTextCell(r.title), createCell(r.bookType), createTextCell(r.publisher), createCell(r.totalAuthors), createTextCell(r.writingRole), createTextCell(r.confirmation)] })),
            ]
          }),
        ] : [new Paragraph({ children: [new TextRun({ text: "(Không có sách)", italics: true, font: "Times New Roman", size: 28 })] })]),


        // 6. Science Projects
        new Paragraph({ children: [new TextRun({ text: `6. Thực hiện nhiệm vụ khoa học và công nghệ đã nghiệm thu`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 400 } }),
        ...(data.scienceProjects && data.scienceProjects.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Tên nhiệm vụ KHCN", true), createCell("CN/PCN/TK", true), createCell("Mã số, cấp QL", true), createCell("TG thực hiện", true), createCell("TG nghiệm thu", true)] }),
              ...data.scienceProjects.map((r, i) => new TableRow({ children: [createCell((i + 1).toString()), createTextCell(r.name), createCell(r.role), createTextCell(r.codeAndLevel), createCell(r.implementPeriod), createCell(r.acceptanceDate)] })),
            ]
          }),
        ] : []),

        // 7. Research Results
        new Paragraph({ children: [new TextRun({ text: `7. Kết quả nghiên cứu khoa học và công nghệ đã công bố`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 400 } }),

        // 7.1. Bài báo khoa học đã công bố
        new Paragraph({ children: [new TextRun({ text: `7.1. Bài báo khoa học đã công bố`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `Giai đoạn 1: ${data.targetLevel === 'PGS' ? 'Trước khi bảo vệ TS' : 'Trước khi được công nhận PGS'}`, italics: true, font: "Times New Roman", size: 28 })], spacing: { before: 100 } }),
        ...(mergedArticlesBefore.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Tên bài báo", true), createCell("Số TG", true), createCell("TC/Kỷ yếu", true), createCell("TC QT (IF)", true), createCell("Trích dẫn", true), createCell("Tập/số", true), createCell("Trang", true), createCell("Năm", true)] }),
              ...mergedArticlesBefore.map((r, i) => new TableRow({ children: [createCell((i + 1).toString()), createTextCell(r.title), createCell(r.totalAuthors), createTextCell(r.journalName), createCell(r.intlJournal), createCell(r.citations), createCell(r.volumeIssue), createCell(r.pages), createCell(r.publishYear)] })),
            ]
          }),
        ] : [new Paragraph({ children: [new TextRun({ text: "(Không có bài báo)", italics: true, font: "Times New Roman", size: 28 })] })]),
        new Paragraph({ children: [new TextRun({ text: `Giai đoạn 2: ${data.targetLevel === 'PGS' ? 'Sau khi bảo vệ TS' : 'Sau khi được công nhận PGS'}`, italics: true, font: "Times New Roman", size: 28 })], spacing: { before: 200 } }),
        ...(mergedArticlesAfter.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Tên bài báo", true), createCell("Số TG", true), createCell("TC/Kỷ yếu", true), createCell("TC QT (IF)", true), createCell("Trích dẫn", true), createCell("Tập/số", true), createCell("Trang", true), createCell("Năm", true)] }),
              ...mergedArticlesAfter.map((r, i) => new TableRow({ children: [createCell((i + 1).toString()), createTextCell(r.title), createCell(r.totalAuthors), createTextCell(r.journalName), createCell(r.intlJournal), createCell(r.citations), createCell(r.volumeIssue), createCell(r.pages), createCell(r.publishYear)] })),
            ]
          }),
        ] : [new Paragraph({ children: [new TextRun({ text: "(Không có bài báo)", italics: true, font: "Times New Roman", size: 28 })] })]),

        // 7.2 Patents
        new Paragraph({ children: [new TextRun({ text: `7.2. Bằng độc quyền sáng chế, giải pháp hữu ích`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 200 } }),
        ...(mergedPatents.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Tên bằng ĐQSC/GPHỮ", true), createCell("Cơ quan cấp", true), createCell("Ngày cấp", true), createCell("Số TG", true)] }),
              ...mergedPatents.map((r, i) => new TableRow({ children: [createCell((i + 1).toString()), createTextCell(r.name), createTextCell(r.issuingOrg), createCell(r.issueDate), createCell(r.totalAuthors)] })),
            ]
          }),
        ] : [new Paragraph({ children: [new TextRun({ text: "(Không có)", italics: true, font: "Times New Roman", size: 28 })] })]),

        // 7.3 Awards
        new Paragraph({ children: [new TextRun({ text: `7.3. Giải thưởng quốc gia, quốc tế`, bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 200 } }),
        ...(mergedAwards.length > 0 ? [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE }, rows: [
              new TableRow({ children: [createCell("TT", true), createCell("Tên giải thưởng", true), createCell("CQ/TC ra QĐ", true), createCell("Số QĐ, ngày", true), createCell("Số TG", true)] }),
              ...mergedAwards.map((r, i) => new TableRow({ children: [createCell((i + 1).toString()), createTextCell(r.name), createTextCell(r.organization), createTextCell(r.decisionInfo), createCell(r.totalAuthors)] })),
            ]
          }),
        ] : [new Paragraph({ children: [new TextRun({ text: "(Không có)", italics: true, font: "Times New Roman", size: 28 })] })]),

        // TỔNG HỢP ĐIỂM
        // new Paragraph({
        // children: [new TextRun({ text: "TỔNG HỢP ĐIỂM QUY ĐỔI", bold: true, font: "Times New Roman", size: 28 })],
        //  spacing: { before: 400, after: 200 }
        //}),
        // new Paragraph({ children: [new TextRun({ text: `- Tổng điểm quy đổi công trình khoa học: ${summary.totalPoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),
        // new Paragraph({ children: [new TextRun({ text: `- Tổng điểm 3 năm cuối: ${summary.recentPoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),
        // new Paragraph({ children: [new TextRun({ text: `- Tổng điểm bài báo/sáng chế: ${summary.articlePoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),
        // new Paragraph({ children: [new TextRun({ text: `- Tổng điểm viết sách: ${summary.bookPoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),


        // 8. Program Development
        new Paragraph({ children: [new TextRun({ text: "8. Chủ trì hoặc tham gia xây dựng, phát triển chương trình đào tạo hoặc chương trình nghiên cứu, ứng dụng khoa học công nghệ của cơ sở giáo dục đại học", bold: true, font: "Times New Roman", size: 28 })], spacing: { before: 400 } }),
        new Paragraph({ children: [new TextRun({ text: data.programDevelopment || "........", font: "Times New Roman", size: 28 })], spacing: { after: 200 } }),



        // Section 9: Missing standards
        new Paragraph({
          children: [new TextRun({ text: "9. Các tiêu chuẩn còn thiếu so với quy định cần được thay thế bằng bài báo khoa học quốc tế uy tín:", bold: true, font: "Times New Roman", size: 28 })],
          spacing: { before: 400, after: 100 }
        }),
        new Paragraph({ children: [new TextRun({ text: `- Thời gian được cấp bằng TS, được bổ nhiệm PGS:  ${data.missingTimeRequirement ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Giờ chuẩn giảng dạy:  ${data.missingTeachingHours ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Công trình khoa học đã công bố:  ${data.missingPublications ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Chủ trì nhiệm vụ khoa học và công nghệ:  ${data.missingScienceProjects ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Hướng dẫn NCS, ThS:  ${data.missingGuidance ? '☑' : '☐'}`, font: "Times New Roman", size: 28 })] }),

        // C. CAM ĐOAN
        new Paragraph({
          children: [new TextRun({ text: "C. CAM ĐOAN CỦA NGƯỜI ĐĂNG KÝ XÉT CÔNG NHẬN ĐẠT TIÊU CHUẨN CHỨC DANH:", bold: true, font: "Times New Roman", size: 28 })],
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({ children: [new TextRun({ text: "Tôi cam đoan những điều khai trên là đúng, nếu sai tôi xin chịu trách nhiệm trước pháp luật.", font: "Times New Roman", size: 28 })], indent: { firstLine: 720 } }),

        new Paragraph({ text: "", spacing: { after: 400 } }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: `......${data.signingLocation || '.'}, ngày ..... tháng ..... năm ........`, italics: true, font: "Times New Roman", size: 28 })],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Người đăng ký         ", bold: true, font: "Times New Roman", size: 28 })],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "(Ký và ghi rõ họ tên)         ", italics: true, font: "Times New Roman", size: 24 })],
        }),
        new Paragraph({ text: "", spacing: { after: 800 } }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: `${data.fullName}         `, bold: true, font: "Times New Roman", size: 28 })],
        }),

        // D. XÁC NHẬN
        new Paragraph({
          children: [new TextRun({ text: "D. XÁC NHẬN CỦA NGƯỜI ĐỨNG ĐẦU NƠI ĐANG LÀM VIỆC", bold: true, font: "Times New Roman", size: 28 })],
          spacing: { before: 600, after: 200 }
        }),
        new Paragraph({ children: [new TextRun({ text: "- Về những nội dung \"Thông tin cá nhân\" ứng viên đã kê khai.", font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: "- Về giai đoạn ứng viên công tác tại đơn vị và mức độ hoàn thành nhiệm vụ trong giai đoạn này.", font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: "(Những nội dung khác đã kê khai, ứng viên tự chịu trách nhiệm trước pháp luật).", italics: true, font: "Times New Roman", size: 28 })], spacing: { after: 400 } }),

        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: `${data.signingLocation || '.'}, ngày ..... tháng ..... năm ........`, italics: true, font: "Times New Roman", size: 28 })],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "THỦ TRƯỞNG CƠ QUAN         ", bold: true, font: "Times New Roman", size: 28 })],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "(Ký và ghi rõ họ tên, đóng dấu)         ", italics: true, font: "Times New Roman", size: 24 })],
        }),
        new Paragraph({ text: "", spacing: { after: 1200 } }),

        // Ghi chú
        new Paragraph({
          children: [new TextRun({ text: "Ghi chú:", bold: true, italics: true, font: "Times New Roman", size: 24 })],
          spacing: { before: 600 },
          border: { top: { style: BorderStyle.SINGLE, size: 1, space: 4, color: "000000" } }
        }),
        new Paragraph({ children: [new TextRun({ text: "(1) Tên cơ quan, tổ chức chủ quản trực tiếp (nếu có).", font: "Times New Roman", size: 24 })] }),
        new Paragraph({ children: [new TextRun({ text: "(2) Tên cơ sở đào tạo.", font: "Times New Roman", size: 24 })] }),
        new Paragraph({ children: [new TextRun({ text: "(3) Địa danh.", font: "Times New Roman", size: 24 })] }),
      ],
    }],
  });

  Packer.toBlob(doc).then((blob) => {
    const fileName = data.fullName ? `Mau01_${data.targetLevel}_${data.fullName.replace(/\s+/g, '')}.docx` : `Mau01_${data.targetLevel}.docx`;
    saveAs(blob, fileName);
  });
};
