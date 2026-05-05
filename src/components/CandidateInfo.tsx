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

  // 4. PhD & Masters Guidance (table)
  guidanceDetails?: string; // kept for backward compat
  guidanceRecords?: GuidanceRecord[];

  // 5. Books
  booksBefore?: BookRecord[];
  booksAfter?: BookRecord[];

  // 6. Science & Technology Projects
  scienceProjects?: ScienceProjectRecord[];

  // 7. Research Results
  articlesBefore?: ArticleRecord[];
  articlesAfter?: ArticleRecord[];
  patents?: PatentRecord[];
  awards?: AwardRecord[];

  // Section 9: Missing standards replaced by international papers
  missingTimeRequirement?: boolean;
  missingTeachingHours?: boolean;
  missingPublications?: boolean;
  missingScienceProjects?: boolean;
  missingGuidance?: boolean;

  // Signing info
  signingLocation?: string;
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

export interface GuidanceRecord {
  id: string;
  name: string;
  objectType: 'NCS' | 'HV';
  roleMain: boolean;
  roleSub: boolean;
  periodFrom: string;
  periodTo: string;
  institution: string;
  graduationYear: string;
}

export interface BookRecord {
  id: string;
  title: string;
  bookType: string; // CK, GT, TK, HD
  publisher: string;
  totalAuthors: string;
  writingRole: string; // MM, CB, phản biện soạn trang...
  confirmation: string;
}

export interface ScienceProjectRecord {
  id: string;
  name: string;
  role: string; // CN, PCN, TK
  codeAndLevel: string;
  implementPeriod: string;
  acceptanceDate: string;
}

export interface ArticleRecord {
  id: string;
  title: string;
  totalAuthors: string;
  journalName: string;
  intlJournal: string; // IF info
  citations: string;
  volumeIssue: string;
  pages: string;
  publishYear: string;
}

export interface PatentRecord {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  totalAuthors: string;
}

export interface AwardRecord {
  id: string;
  name: string;
  organization: string;
  decisionInfo: string;
  totalAuthors: string;
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
