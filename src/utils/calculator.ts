import { config } from '../config/scoringRules';

export interface ScientificWork {
  id: string;
  type: keyof typeof config.maxPoints;
  title: string;
  isMainAuthor: boolean;
  totalAuthors: number;
  baseScore: number; // Điểm gốc do Hội đồng đánh giá (chưa nhân hệ số)
  isRecent: boolean; // Công trình trong 3 năm cuối
  isInternationalPublisher?: boolean; // Sách xb bởi NXB uy tín quốc tế
  isExceptionalArticle?: boolean; // Bài báo ISI có IF vượt trội
  stage: 'BEFORE' | 'AFTER'; // Trước hay sau khi bảo vệ TS / đạt chuẩn PGS
}

export interface ScoreSummary {
  totalPoints: number;
  recentPoints: number;
  articlePoints: number;
  bookPoints: number;
  specializedBookPoints: number;
}

/**
 * Tính điểm cho một công trình khoa học
 * @param work Thông tin công trình
 * @returns Điểm sau khi đã tính toán các hệ số và chia cho số lượng tác giả
 */
export const calculateWorkScore = (work: ScientificWork): number => {
  let score = work.baseScore;

  // Áp dụng hệ số cho bài báo vượt trội
  if (work.isExceptionalArticle && work.type === 'articleISI') {
    score = score * config.multipliers.exceptionalArticle;
  }

  // Áp dụng hệ số cho sách xuất bản quốc tế
  if (work.isInternationalPublisher && 
      ['specializedBook', 'textBook', 'referenceBook', 'guideBook'].includes(work.type)) {
    score = score * config.multipliers.internationalPublisher;
  }

  // Chia điểm theo tác giả
  if (work.totalAuthors === 1) {
    return score;
  }

  const remainingShare = score * (1 - config.authorDistribution.mainAuthorShare);
  const sharePerAuthor = remainingShare / work.totalAuthors;

  if (work.isMainAuthor) {
    const mainAuthorShare = score * config.authorDistribution.mainAuthorShare;
    return mainAuthorShare + sharePerAuthor;
  } else {
    return sharePerAuthor;
  }
};

/**
 * Tổng hợp điểm từ danh sách các công trình
 */
export const calculateTotalScores = (works: ScientificWork[]): ScoreSummary => {
  const summary: ScoreSummary = {
    totalPoints: 0,
    recentPoints: 0,
    articlePoints: 0,
    bookPoints: 0,
    specializedBookPoints: 0,
  };

  works.forEach(work => {
    const score = calculateWorkScore(work);
    summary.totalPoints += score;

    if (work.isRecent) {
      summary.recentPoints += score;
    }

    if (['articleISI', 'articleISSNOnline', 'articleISSNOffline', 'patent', 'usefulSolution', 'nationalArtAward', 'internationalArtAward'].includes(work.type)) {
      summary.articlePoints += score;
    }

    if (['specializedBook', 'textBook', 'referenceBook', 'guideBook'].includes(work.type)) {
      summary.bookPoints += score;
    }

    if (['specializedBook', 'textBook'].includes(work.type)) {
      summary.specializedBookPoints += score;
    }
  });

  return summary;
};

/**
 * Đánh giá xem ứng viên có đạt tiêu chuẩn hay không
 */
export const checkEligibility = (
  targetLevel: 'GS' | 'PGS',
  field: 'NATURAL_SCIENCES' | 'SOCIAL_SCIENCES',
  summary: ScoreSummary,
  totalArticles: number
): { isEligible: boolean; reasons: string[] } => {
  const reasons: string[] = [];
  
  // Kiểm tra tổng điểm
  const reqTotal = config.minimumPoints[targetLevel];
  if (summary.totalPoints < reqTotal) {
    reasons.push(`Tổng điểm quy đổi chưa đạt: ${summary.totalPoints.toFixed(2)} / ${reqTotal}`);
  }

  // Kiểm tra điểm 3 năm cuối
  const reqRecent = config.minimumRecentPoints[targetLevel];
  if (summary.recentPoints < reqRecent) {
    reasons.push(`Điểm công trình 3 năm cuối chưa đạt: ${summary.recentPoints.toFixed(2)} / ${reqRecent}`);
  }

  // Kiểm tra điểm bài báo
  const reqArticlesPoints = config.minimumArticlesPoints[field][targetLevel];
  if (summary.articlePoints < reqArticlesPoints) {
    reasons.push(`Điểm bài báo/Bằng độc quyền/Giải pháp hữu ích chưa đạt: ${summary.articlePoints.toFixed(2)} / ${reqArticlesPoints}`);
  }

  // Kiểm tra số lượng bài báo uy tín
  const reqArticleCount = config.minimumRequiredArticles[targetLevel];
  if (totalArticles < reqArticleCount) {
    reasons.push(`Số lượng bài báo khoa học quốc tế uy tín chưa đạt: ${totalArticles} / ${reqArticleCount}`);
  }

  // GS cần điểm viết sách
  if (targetLevel === 'GS') {
    const reqBooks = config.minimumBooksPoints[field].GS;
    if (summary.bookPoints < reqBooks) {
      reasons.push(`Điểm viết sách phục vụ đào tạo chưa đạt: ${summary.bookPoints.toFixed(2)} / ${reqBooks}`);
    }
    const reqSpecialized = config.minimumBooksPoints[field].minSpecialized;
    if (summary.specializedBookPoints < reqSpecialized) {
      reasons.push(`Điểm viết giáo trình/sách chuyên khảo chưa đạt: ${summary.specializedBookPoints.toFixed(2)} / ${reqSpecialized}`);
    }
  }

  return {
    isEligible: reasons.length === 0,
    reasons
  };
};
