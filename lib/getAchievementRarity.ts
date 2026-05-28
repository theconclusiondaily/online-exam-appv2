export function getAchievementRarity(
  rarity: string
) {

  switch (rarity) {

    case "legendary":

      return {

        bg:
          "bg-gradient-to-r from-yellow-400 to-orange-500",

        text:
          "text-white",

        border:
          "border-yellow-300",

        glow:
          "shadow-yellow-200",

        label:
          "Legendary",

      };

    case "epic":

      return {

        bg:
          "bg-gradient-to-r from-purple-500 to-pink-500",

        text:
          "text-white",

        border:
          "border-purple-300",

        glow:
          "shadow-purple-200",

        label:
          "Epic",

      };

    case "rare":

      return {

        bg:
          "bg-gradient-to-r from-cyan-500 to-blue-500",

        text:
          "text-white",

        border:
          "border-cyan-300",

        glow:
          "shadow-cyan-200",

        label:
          "Rare",

      };

    default:

  return {

    bg:
      "bg-gradient-to-r from-gray-50 to-gray-100",

    text:
      "text-tcd-blue",

    border:
      "border-gray-200",

    glow:
      "",

    label:
      "Common",

  };
  }
}