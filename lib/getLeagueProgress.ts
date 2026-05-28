export function getLeagueProgress(
  xp: number
) {

  const leagues = [

    {
      name: "Bronze",
      min: 0,
      max: 199,
    },

    {
      name: "Silver",
      min: 200,
      max: 499,
    },

    {
      name: "Gold",
      min: 500,
      max: 999,
    },

    {
      name: "Platinum",
      min: 1000,
      max: 1999,
    },

    {
      name: "Diamond",
      min: 2000,
      max: 4999,
    },

    {
      name: "Elite",
      min: 5000,
      max: Infinity,
    },

  ];

  const currentLeague =
    leagues.find(
      (
        league
      ) =>

        xp >= league.min &&

        xp <= league.max
    );

  if (
    !currentLeague ||

    currentLeague.name ===
      "Elite"
  ) {

    return {

      progress: 100,

      remaining: 0,

      nextLeague:
        "Max",

    };
  }

  const nextLeague =
    leagues[
      leagues.findIndex(
        (
          l
        ) =>
          l.name ===
          currentLeague.name
      ) + 1
    ];

  const progress =

    (
      (
        xp -
        currentLeague.min
      ) /

      (
        currentLeague.max -
        currentLeague.min
      )
    ) * 100;

  return {

    progress:
      Math.min(
        progress,
        100
      ),

    remaining:
      nextLeague.min - xp,

    nextLeague:
      nextLeague.name,

  };
}