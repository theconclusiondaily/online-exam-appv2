/* ============================================================================
   TCD Landing Platform
   Global Types
   ============================================================================ */

export type ExamStatus = "LIVE" | "UPCOMING" | "COMPLETED";

export type CompetitionStatus = "LIVE" | "UPCOMING" | "ENDED";

export type RewardType =
  | "CASH"
  | "SCHOLARSHIP"
  | "CERTIFICATE";



/* ============================================================================
   Hero
   ============================================================================ */

export interface HeroMetric {
  label: string;
  value: number;
}

export interface FeaturedExam {
  id: string;
  title: string;
  subject: string;
  status: ExamStatus;
  participants: number;
}

export interface HeroData {
  featuredExam: {
    id: string;
    title: string;
        status: ExamStatus;
    rewardPool: string;
    entryFee: string;
    startsAt: string | null;
    startsIn: string;
  } | null;

  stats: {
    students: string;
    institutes: string;
    exams: string;
    questions: string;
  };
}



/* ============================================================================
   Student Experience
   ============================================================================ */
export interface StudentDashboardData {
  profile: {
    id: string;
    name: string | null;
    avatarUrl: string | null;

    xp: string;
    level: number;
    streak: number;

    prestigeLevel: string | null;

    achievementScore: string;
  };

  wallet: {
    available: string;
    locked: string;
    bonus: string;

    lifetimeWon: string;
    lifetimeAdded: string;
    lifetimeWithdrawn: string;
  };

  achievements: {
    unlocked: number;
    total: number;
  };

  statistics: {
    examsAttempted: number;
    averageAccuracy: string;
    averagePercentage: string;
  };

  upcomingExam: {
    id: string;
    title: string | null;
    entryFee: string;
    rewardPool: string;
    startTime: string | null;
  } | null;
}



/* ============================================================================
   Exam Experience
   ============================================================================ */

export interface ExamCard {
  id: string;

  title: string;

  description: string | null;

  startTime: string | null;

  endTime: string | null;

  duration: number | null;

  totalQuestions: number | null;

  rewardPool: string;

  entryFee: string;

  status: ExamStatus;

  published: boolean;

  maxParticipants: number | null;
}

export interface ExamExperienceData {
  liveExam: ExamCard | null;

  upcomingExams: ExamCard[];

  publishedExamCount: string;
}


/* ============================================================================
   Competition
   ============================================================================ */

export interface LeaderboardUser {
  rank: number;

  name: string;

  score: number;

  avatarUrl: string | null;
}

export interface Competition {
  id: string;

  title: string;

  prizePool: number;

  participants: number;

  status: CompetitionStatus;
}

export interface CompetitionData {
  leaderboard: LeaderboardUser[];

  competitions: Competition[];
}



/* ============================================================================
   Rewards
============================================================================ */

export interface RewardsData {
  wallet: {
    totalWallets: string;

    availableBalance: string;

    lockedBalance: string;

    bonusBalance: string;

    lifetimeAdded: string;

    lifetimeWon: string;

    lifetimeSpent: string;

    lifetimeWithdrawn: string;

    lifetimeRefunded: string;
  };

  rewards: {
    publishedExams: string;

    rewardPool: string;

    tcdRewardPool: string;

    scholarshipPool: string;

    totalEntryFee: string;
  };
}



/* ============================================================================
   Institutes
   ============================================================================ */

export interface InstituteAnalytics {
  totalInstitutes: string;
  totalTeachers: string;
  totalStudents: string;
  publishedExams: string;
}



/* ============================================================================
   AI Security
   ============================================================================ */

export interface AISecurityData {
  totalEvents: string;
  monitoredAttempts: string;
  monitoredStudents: string;
  tabSwitchEvents: string;
  faceMissingEvents: string;
  multipleFaceEvents: string;
  fullscreenExitEvents: string;
}



/* ============================================================================
   Testimonials
============================================================================ */

export interface Testimonial {
  id: string;

  name: string;

  role: string;

  institute: string;

  avatarUrl: string | null;

  rating: number;

  quote: string;

  featured: boolean;

  displayOrder: number;
}

export interface TestimonialData {
  testimonials: Testimonial[];
}



/* ============================================================================
   FAQ
============================================================================ */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
}

export interface FAQData {
  faqs: FAQItem[];
}



/* ============================================================================
   Landing Page
   ============================================================================ */

export interface LandingData {
  hero: HeroData;
  exams: ExamExperienceData;
  competition: CompetitionData;
  rewards: RewardsData;
  institutes: InstituteAnalytics;
  ai: AISecurityData;
  testimonials: TestimonialData;
  faq: FAQData;
}