export interface ScoringConfig {
  minimumPoints: {
    GS: number;
    PGS: number;
  };
  minimumRecentPoints: {
    GS: number; // 3 năm cuối
    PGS: number;
  };
  minimumArticlesPoints: {
    NATURAL_SCIENCES: {
      GS: number;
      PGS: number;
    };
    SOCIAL_SCIENCES: {
      GS: number;
      PGS: number;
    };
  };
  minimumBooksPoints: {
    NATURAL_SCIENCES: {
      GS: number;
      PGS: number;
      minSpecialized: number; // Điểm tối thiểu từ sách chuyên khảo/giáo trình
    };
    SOCIAL_SCIENCES: {
      GS: number;
      PGS: number;
      minSpecialized: number;
    };
  };
  maxPoints: {
    articleISI: number;
    articleISSNOnline: number;
    articleISSNOffline: number;
    patent: number;
    usefulSolution: number;
    nationalArtAward: number;
    internationalArtAward: number;
    specializedBook: number;
    textBook: number;
    referenceBook: number;
    guideBook: number;
    nationalConference: number;
    internationalConference: number;
  };
  multipliers: {
    internationalPublisher: number; // +25%
    exceptionalArticle: number; // +50%
    militaryAlternative: number; // 1.5 multiplier for alternative military articles
  };
  minimumRequiredArticles: {
    // Theo QĐ 37/2018 và sửa đổi QĐ 25/2020 (từ 1/1/2020)
    GS: number; // 5 bài
    PGS: number; // 3 bài
  };
  authorDistribution: {
    mainAuthorShare: number; // 1/3
  }
}

export const config: ScoringConfig = {
  minimumPoints: {
    GS: 20.0,
    PGS: 10.0,
  },
  minimumRecentPoints: {
    GS: 5.0,
    PGS: 2.5,
  },
  minimumArticlesPoints: {
    NATURAL_SCIENCES: { GS: 12.0, PGS: 6.0 }, // Khoa học tự nhiên, kỹ thuật, sức khỏe
    SOCIAL_SCIENCES: { GS: 8.0, PGS: 4.0 },   // Khoa học xã hội, nghệ thuật, TDTT
  },
  minimumBooksPoints: {
    NATURAL_SCIENCES: { GS: 3.0, PGS: 0, minSpecialized: 1.5 },
    SOCIAL_SCIENCES: { GS: 5.0, PGS: 0, minSpecialized: 2.5 },
  },
  maxPoints: {
    articleISI: 2.0,
    articleISSNOnline: 1.0,
    articleISSNOffline: 0.75,
    patent: 3.0,
    usefulSolution: 2.0,
    nationalArtAward: 1.0,
    internationalArtAward: 1.5,
    specializedBook: 3.0,
    textBook: 2.0,
    referenceBook: 1.5,
    guideBook: 1.0,
    nationalConference: 0.5,
    internationalConference: 1.0,
  },
  multipliers: {
    internationalPublisher: 1.25,
    exceptionalArticle: 1.5,
    militaryAlternative: 1.5,
  },
  minimumRequiredArticles: {
    GS: 5,
    PGS: 3,
  },
  authorDistribution: {
    mainAuthorShare: 1 / 3,
  }
};
