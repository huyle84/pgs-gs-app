import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import type { CandidateData } from '../components/CandidateInfo';
import type { ScientificWork, ScoreSummary } from './calculator';

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

export const generateDocx = async (data: CandidateData, works: ScientificWork[], summary: ScoreSummary) => {
  const worksBefore = works.filter(w => w.stage === 'BEFORE');
  const worksAfter = works.filter(w => w.stage === 'AFTER');

  const createWorksTable = (workList: ScientificWork[]) => {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            createCell("TT", true),
            createCell("Tên bài báo / công trình", true),
            createCell("Tên Tạp chí / Kỷ yếu", true),
            createCell("Tập, trang, năm", true),
            createCell("Số tác giả", true),
            createCell("Điểm", true),
            createCell("IF / Trích dẫn", true),
          ],
        }),
        ...workList.map((work, idx) => new TableRow({
          children: [
            createCell((idx + 1).toString()),
            createTextCell(work.title),
            createTextCell(work.journalName || ''),
            createTextCell([
              work.volume ? `Tập ${work.volume}` : '',
              work.pages ? `Trang ${work.pages}` : '',
              work.publishYear ? `Năm ${work.publishYear}` : ''
            ].filter(Boolean).join(', ')),
            createCell(work.totalAuthors.toString()),
            createCell(work.baseScore.toString()),
            createTextCell([
              work.impactFactor ? `IF: ${work.impactFactor}` : '',
              work.citations ? `Trích dẫn: ${work.citations}` : '',
              work.conferenceRank ? `Rank: ${work.conferenceRank}` : ''
            ].filter(Boolean).join('\n')),
          ],
        })),
        ...(workList.length === 0 ? [
          new TableRow({ children: [ createCell("Không có công trình nào trong giai đoạn này", false) ] })
        ] : []),
      ],
    });
  };

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
        new Paragraph({ children: [new TextRun({ text: data.workHistory || 'Từ năm........ đến năm........: ..................................................................................\nTừ năm........ đến năm........: ..................................................................................', font: "Times New Roman", size: 28 })] }),
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
        
        // B. KẾT QUẢ ĐÀO TẠO VÀ NGHIÊN CỨU
        new Paragraph({
          children: [new TextRun({ text: "B. KẾT QUẢ ĐÀO TẠO VÀ NGHIÊN CỨU KHOA HỌC", bold: true, font: "Times New Roman", size: 28 })],
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({ children: [new TextRun({ text: `1. Các công trình khoa học (Bài báo, Bằng độc quyền sáng chế, Sách...)`, bold: true, font: "Times New Roman", size: 28 })] }),
        
        new Paragraph({ children: [new TextRun({ text: `Giai đoạn 1: Trước khi bảo vệ TS (đối với PGS) / Trước khi nhận PGS (đối với GS)`, italics: true, font: "Times New Roman", size: 28 })], spacing: { before: 200, after: 100 } }),
        createWorksTable(worksBefore),

        new Paragraph({ children: [new TextRun({ text: `Giai đoạn 2: Sau khi bảo vệ TS (đối với PGS) / Sau khi nhận PGS (đối với GS)`, italics: true, font: "Times New Roman", size: 28 })], spacing: { before: 200, after: 100 } }),
        createWorksTable(worksAfter),

        // C. TỔNG HỢP ĐIỂM
        new Paragraph({
          children: [new TextRun({ text: "C. TỔNG HỢP ĐIỂM QUY ĐỔI", bold: true, font: "Times New Roman", size: 28 })],
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({ children: [new TextRun({ text: `- Tổng điểm quy đổi công trình khoa học: ${summary.totalPoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Tổng điểm 3 năm cuối: ${summary.recentPoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Tổng điểm bài báo/sáng chế: ${summary.articlePoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),
        new Paragraph({ children: [new TextRun({ text: `- Tổng điểm viết sách: ${summary.bookPoints.toFixed(2)} điểm`, font: "Times New Roman", size: 28 })] }),

        new Paragraph({ text: "", spacing: { after: 600 } }),
        
        // SIGNATURE
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "......., ngày ..... tháng ..... năm 20...", italics: true, font: "Times New Roman", size: 28 })],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "NGƯỜI ĐĂNG KÝ         ", bold: true, font: "Times New Roman", size: 28 })],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "(Ký và ghi rõ họ tên)         ", italics: true, font: "Times New Roman", size: 24 })],
        }),
        new Paragraph({ text: "", spacing: { after: 800 } }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: data.fullName, bold: true, font: "Times New Roman", size: 28 })],
        }),
      ],
    }],
  });

  Packer.toBlob(doc).then((blob) => {
    const fileName = data.fullName ? `Mau01_${data.targetLevel}_${data.fullName.replace(/\s+/g, '')}.docx` : `Mau01_${data.targetLevel}.docx`;
    saveAs(blob, fileName);
  });
};
