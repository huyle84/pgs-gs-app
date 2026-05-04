export interface CandidateData {
  fullName: string;
  birthDate: string;
  targetLevel: 'GS' | 'PGS';
  field: 'NATURAL_SCIENCES' | 'SOCIAL_SCIENCES';
  specialty: string;

  // Mau 01 Header
  organizationName?: string;
  trainingInstitution?: string;
  applicationCode?: string;

  // Mau 01 Extended Data
  gender?: string;
  nation?: string;
  religion?: string;
  hometown?: string;
  permanentAddress?: string;
  contactAddress?: string;
  phoneMobile?: string;
  phoneHome?: string;
  email?: string;
  
  registrationType?: 'Giảng viên' | 'Giảng viên thỉnh giảng';
  isPartyMember?: boolean;

  // Academic & Work History
  workHistory?: string;
  currentPosition?: string;
  highestPastPosition?: string;
  currentWorkplace?: string;
  workplaceAddress?: string;
  workplacePhone?: string;
  visitingSchool?: string;
  retiredDate?: string;
  postRetirementWorkplace?: string;
  recentVisitingSchool?: string;

  bachelorInfo?: string;
  masterInfo?: string;
  doctorInfo?: string;
  associateProfDate?: string;
  councilBasic?: string;
  councilIndustry?: string;
  researchDirections?: string;
  foreignLanguage?: string;
  englishCertificate?: string;

  // Section B: Teaching Standards
  selfAssessment?: string;
  teachingYearsTotal?: string;
  teachingRecords?: TeachingRecord[];
  
  // Foreign Language details
  flTrainedAbroad?: boolean;
  flAbroadLevel?: string;
  flAbroadCountry?: string;
  flAbroadFrom?: string;
  flAbroadTo?: string;
  flDefenseAbroad?: string;
  flTrainedDomestic?: boolean;
  flDomesticDegree?: string;
  flDomesticNumber?: string;
  flDomesticYear?: string;
  flTeachingForeign?: boolean;
  flTeachingDetails?: string;
  flTeachingPlace?: string;
  flOther?: boolean;
  flOtherDetails?: string;
  flEnglishCert?: string;

  // PhD & Masters Guidance
  guidanceDetails?: string;
}

export interface TeachingRecord {
  id: string;
  academicYear: string;
  ncsMain: string;
  ncsSub: string;
  masterThesis: string;
  undergradProject: string;
  teachingUG: string;
  teachingPG: string;
  totalHours: string;
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
          <label className="form-label">Ngày sinh</label>
          <input
            type="date"
            className="form-control"
            value={data.birthDate}
            onChange={e => onChange({ ...data, birthDate: e.target.value })}
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
