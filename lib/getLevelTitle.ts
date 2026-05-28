export function getLevelTitle(
  level: number
) {

  switch (level) {

    case 1:
      return "Explorer";

    case 2:
      return "Learner";

    case 3:
      return "Scholar";

    case 4:
      return "Achiever";

    case 5:
      return "Strategist";

    case 6:
      return "Master";

    case 7:
      return "Champion";

    case 8:
      return "Elite";

    case 9:
      return "Legend";

    case 10:
      return "Titan";

    default:
      return "Beginner";
  }
}