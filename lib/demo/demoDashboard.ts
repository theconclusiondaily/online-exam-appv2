export const demoDashboard = {
  user: {
    name: "Guest Student",
    email: "demo@tcd.local",
  },

wallet: {
  current_balance: 250,
  last_exam_credits: 50,
  lifetime_earned: 500,
},

  streak: {
    current_streak: 12,
  },

  loginStreak: {
    current_streak: 18,
  },

  stats: {
    totalAttempts: 8,
    averageScore: 78,
    highestScore: 96,
    averageAccuracy: 82,
    averagePercentage: 78,
    totalCorrect: 412,
    totalWrong: 98,
  },

  level: 8,
  xp: 1450,

  achievements: 8,

  prestige: "Silver",
};
export const demoAchievements = [
  {
    achievements: {
      title: "First Attempt",
      description: "Completed your first test",
      rarity: "Common",
      reward_tcd: 25,
    },
  },

  {
    achievements: {
      title: "Accuracy Master",
      description: "Scored above 80%",
      rarity: "Rare",
      reward_tcd: 50,
    },
  },

  {
    achievements: {
      title: "Streak Warrior",
      description: "10 day study streak",
      rarity: "Epic",
      reward_tcd: 100,
    },
  },
];

export const demoActivities = [
  {
    title: "Completed Demo Practice Test",
    description: "Scored 82%",
    created_at: new Date().toISOString(),
  },

  {
    title: "Unlocked Achievement",
    description: "Accuracy Master",
    created_at: new Date(
      Date.now() - 3600000
    ).toISOString(),
  },

  {
    title: "Reached Level 8",
    description: "1450 XP earned",
    created_at: new Date(
      Date.now() - 7200000
    ).toISOString(),
  },
];

export const demoAttempts = [
  {
    id: "demo-attempt-1",

    exam_id: "demo-exam",

    score: 82,

    percentage: 82,

    accuracy: 86,

    correct_count: 26,

    wrong_count: 4,

    created_at:
      new Date().toISOString(),
  },
];