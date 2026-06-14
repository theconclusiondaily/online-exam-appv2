
import Image from "next/image";

export const TCDIcons = {

  mastery: (
    <Image
      src="/icons/mastery-star.svg"
      alt="Mastery"
      width={48}
      height={48}
    />
  ),

  achievement: (
    <Image
      src="/icons/achievement-medal.svg"
      alt="Achievement"
      width={48}
      height={48}
    />
  ),

  journey: (
    <Image
      src="/icons/learning-journey.svg"
      alt="Journey"
      width={48}
      height={48}
    />
  ),

  target: (
    <Image
      src="/icons/precision-target.svg"
      alt="Target"
      width={48}
      height={48}
    />
  ),

  wallet: (
    <Image
      src="/icons/tcd-coin.svg"
      alt="Wallet"
      width={48}
      height={48}
    />
  ),

  streak: (
    <Image
      src="/icons/mastery-star.svg"
      alt="Streak"
      width={48}
      height={48}
    />
  ),

  rank: (
    <Image
      src="/icons/rank.svg"
      alt="Rank"
      width={48}
      height={48}
    />
  ),

  coin: (
    <Image
      src="/icons/coin.svg"
      alt="Coin"
      width={48}
      height={48}
    />
  ),

  dashboard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
    >
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="2"
        fill="#274472"
      />
      <rect
        x="13"
        y="3"
        width="8"
        height="5"
        rx="2"
        fill="#E6C06E"
      />
      <rect
        x="13"
        y="10"
        width="8"
        height="11"
        rx="2"
        fill="#274472"
      />
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx="2"
        fill="#E6C06E"
      />
    </svg>
  ),

  leaderboard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
    >
      <path
        d="M7 3H17V8C17 12 14.5 15 12 16C9.5 15 7 12 7 8V3Z"
        fill="#274472"
      />
      <path
        d="M10 16H14V19H17V21H7V19H10V16Z"
        fill="#E6C06E"
      />
      <path
        d="M4 5H7V8C7 9.5 6 11 4 12V10C5 9.5 5.5 8.5 5.5 7.5V5Z"
        fill="#E6C06E"
      />
      <path
        d="M20 5H17V8C17 9.5 18 11 20 12V10C19 9.5 18.5 8.5 18.5 7.5V5Z"
        fill="#E6C06E"
      />
    </svg>
  ),

  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
    >
      <path
        d="M12 2L4 5V11C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 11V5L12 2Z"
        fill="#274472"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="#E6C06E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  timer: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
    >
      <circle
        cx="12"
        cy="13"
        r="8"
        fill="#274472"
      />
      <path
        d="M12 13L15 10"
        stroke="#E6C06E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 2H15"
        stroke="#274472"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  fire: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
    >
      <path
        d="M13.5 2C13.5 5 10 6.5 10 10C10 12.5 12 13 12 15C12 17 10.5 18 9 18C6 18 4 15.5 4 12C4 7 7.5 4.5 13.5 2Z"
        fill="#E6C06E"
      />
      <path
        d="M14 7C17.5 10 20 12 20 16C20 19.5 17 22 12 22C15.5 20 16.5 17 16.5 14C16.5 11 15.5 9 14 7Z"
        fill="#274472"
      />
    </svg>
  ),

  profile: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
        fill="#274472"
      />
      <path
        d="M4 21C4 16.5 7 14 12 14C17 14 20 16.5 20 21"
        fill="#E6C06E"
      />
    </svg>
  ),

  questions: (
  <img src="/icons/questions.svg" className="w-6 h-6" />
),

answered: (
  <img src="/icons/answered.svg" className="w-6 h-6" />
),

bookmark: (
  <img src="/icons/bookmark.svg" className="w-6 h-6" />
),

unanswered: (
  <img src="/icons/unanswered.svg" className="w-6 h-6" />
),

security: (
  <img src="/icons/security.svg" className="w-6 h-6" />
),

};