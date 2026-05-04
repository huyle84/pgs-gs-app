import { checkEligibility } from '../utils/calculator';
import type { ScoreSummary } from '../utils/calculator';
import { config } from '../config/scoringRules';
import type { CandidateData } from './CandidateInfo';

interface Props {
  summary: ScoreSummary;
  data: CandidateData;
  totalArticles: number;
}

export const PointSummary: React.FC<Props> = ({ summary, data, totalArticles }) => {
  const result = checkEligibility(data.targetLevel, data.field, summary, totalArticles);

  return (
    <div className="glass-panel">
      <h2>Tổng Hợp Điểm Quy Đổi</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Tổng điểm (Yêu cầu: {config.minimumPoints[data.targetLevel]})</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: summary.totalPoints >= config.minimumPoints[data.targetLevel] ? 'var(--success)' : 'var(--danger)' }}>
            {summary.totalPoints.toFixed(2)}
          </div>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Điểm 3 năm cuối (Yêu cầu: {config.minimumRecentPoints[data.targetLevel]})</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: summary.recentPoints >= config.minimumRecentPoints[data.targetLevel] ? 'var(--success)' : 'var(--danger)' }}>
            {summary.recentPoints.toFixed(2)}
          </div>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Điểm bài báo/Sáng chế (Yêu cầu: {config.minimumArticlesPoints[data.field][data.targetLevel]})</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: summary.articlePoints >= config.minimumArticlesPoints[data.field][data.targetLevel] ? 'var(--success)' : 'var(--danger)' }}>
            {summary.articlePoints.toFixed(2)}
          </div>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Điểm viết sách (Yêu cầu: {config.minimumBooksPoints[data.field][data.targetLevel]})</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: summary.bookPoints >= config.minimumBooksPoints[data.field][data.targetLevel] ? 'var(--success)' : 'var(--danger)' }}>
            {summary.bookPoints.toFixed(2)}
          </div>
        </div>
      </div>

      <div style={{ 
        padding: '1.5rem', 
        borderRadius: '8px', 
        background: result.isEligible ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        border: `1px solid ${result.isEligible ? 'var(--success)' : 'var(--danger)'}`
      }}>
        <h3 style={{ color: result.isEligible ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {result.isEligible ? '✓ Đạt đủ điều kiện điểm số' : '⚠ Chưa đạt điều kiện điểm số'}
        </h3>
        
        {!result.isEligible && (
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: 'var(--danger)' }}>
            {result.reasons.map((reason, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{reason}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
