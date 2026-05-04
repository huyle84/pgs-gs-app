export interface CandidateData {
  fullName: string;
  birthYear: string;
  targetLevel: 'GS' | 'PGS';
  field: 'NATURAL_SCIENCES' | 'SOCIAL_SCIENCES';
  specialty: string;

  // Mau 01 Extended Data
  gender?: string;
  nation?: string;
  religion?: string;
  hometown?: string;
  permanentAddress?: string;
  contactAddress?: string;
  phoneMobile?: string;
  email?: string;
  workHistory?: string;
  currentPosition?: string;
  currentWorkplace?: string;
  bachelorInfo?: string;
  masterInfo?: string;
  doctorInfo?: string;
  associateProfDate?: string;
  councilBasic?: string;
  councilIndustry?: string;
  researchDirections?: string;
  foreignLanguage?: string;
  englishCertificate?: string;
  
  isLecturer?: boolean;
  isVisitingLecturer?: boolean;
  isPartyMember?: boolean;
  
  workHistories?: { fromYear: string; toYear: string; position: string; workplace: string }[];
  supervisions?: { name: string; type: 'NCS' | 'ThS'; role: 'Chính' | 'Phụ'; period: string; institution: string; graduationYear: string }[];
  projects?: { name: string; role: string; codeAndLevel: string; executionTime: string; acceptanceDate: string }[];
  teachingHours?: { year: string; phdHours: string; masterHours: string; bachelorHours: string; totalHours: string }[];
}

interface Props {
  data: CandidateData;
  onChange: (data: CandidateData) => void;
}

export const CandidateInfo: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="glass-panel">
      <h2>Thông tin Ứng viên</h2>
      <div className="d-flex gap-4">
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label" htmlFor="fullName">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Ví dụ: Nguyễn Văn A"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label" htmlFor="birthYear">Năm sinh</label>
          <input
            type="number"
            id="birthYear"
            name="birthYear"
            className="form-control"
            value={data.birthYear}
            onChange={handleChange}
            placeholder="Ví dụ: 1980"
          />
        </div>
      </div>

      <div className="d-flex gap-4">
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label" htmlFor="targetLevel">Chức danh đăng ký</label>
          <select
            id="targetLevel"
            name="targetLevel"
            className="form-control"
            value={data.targetLevel}
            onChange={handleChange}
          >
            <option value="GS">Giáo sư</option>
            <option value="PGS">Phó Giáo sư</option>
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label" htmlFor="field">Nhóm ngành/Chuyên ngành</label>
          <select
            id="field"
            name="field"
            className="form-control"
            value={data.field}
            onChange={handleChange}
          >
            <option value="NATURAL_SCIENCES">Khoa học tự nhiên, Kỹ thuật, Công nghệ, Sức khỏe</option>
            <option value="SOCIAL_SCIENCES">Khoa học xã hội nhân văn, Nghệ thuật, Thể dục thể thao</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="specialty">Ngành/Chuyên ngành cụ thể</label>
        <input
          type="text"
          id="specialty"
          name="specialty"
          className="form-control"
          value={data.specialty}
          onChange={handleChange}
          placeholder="Ví dụ: Công nghệ thông tin / Kỹ thuật phần mềm"
        />
      </div>
    </div>
  );
};
