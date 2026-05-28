export function getLeague(
  xp: number
) {

  if (xp >= 5000) {

    return {

      name: "Elite",

      color:
        "text-purple-700",

      bg:
        "bg-purple-100",

      border:
        "border-purple-200",

    };
  }

  if (xp >= 2000) {

    return {

      name: "Diamond",

      color:
        "text-cyan-700",

      bg:
        "bg-cyan-100",

      border:
        "border-cyan-200",

    };
  }

  if (xp >= 1000) {

    return {

      name: "Platinum",

      color:
        "text-slate-700",

      bg:
        "bg-slate-100",

      border:
        "border-slate-200",

    };
  }

  if (xp >= 500) {

    return {

      name: "Gold",

      color:
        "text-yellow-700",

      bg:
        "bg-yellow-100",

      border:
        "border-yellow-200",

    };
  }

  if (xp >= 200) {

    return {

      name: "Silver",

      color:
        "text-gray-700",

      bg:
        "bg-gray-100",

      border:
        "border-gray-200",

    };
  }

  return {

    name: "Bronze",

    color:
      "text-orange-700",

    bg:
      "bg-orange-100",

    border:
      "border-orange-200",

  };
}