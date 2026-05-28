export const XP_LEVELS = [

  0,      // Level 0
  200,    // Level 1
  500,    // Level 2
  1000,   // Level 3
  2500,   // Level 4
  5000,   // Level 5
  8000,   // Level 6
  12000,  // Level 7
  17000,  // Level 8
  25000,  // Level 9
  40000,  // Level 10

];

export function getXPProgress(

  xp: number,

  level: number

) {

  const currentLevelXP =

    XP_LEVELS[level] || 0;

  const nextLevelXP =

    XP_LEVELS[level + 1] ||

    currentLevelXP;

  const progress =

    (
      (
        xp - currentLevelXP
      ) /

      (
        nextLevelXP -
        currentLevelXP
      )
    ) * 100;

  return {

    currentLevelXP,

    nextLevelXP,

    progress:
      Math.max(
        0,
        Math.min(
          progress,
          100
        )
      ),

    remaining:
      Math.max(
        0,
        nextLevelXP - xp
      ),

  };
}

export function getLevelFromXP(
  xp: number
) {

  if (xp >= 40000)
    return 10;

  if (xp >= 25000)
    return 9;

  if (xp >= 17000)
    return 8;

  if (xp >= 12000)
    return 7;

  if (xp >= 8000)
    return 6;

  if (xp >= 5000)
    return 5;

  if (xp >= 2500)
    return 4;

  if (xp >= 1000)
    return 3;

  if (xp >= 500)
    return 2;

  if (xp >= 200)
    return 1;

  return 0;
}

export function getNextLevelXP(
  level: number
) {

  return (
    XP_LEVELS[level + 1] ||

    XP_LEVELS[
      XP_LEVELS.length - 1
    ]
  );
}