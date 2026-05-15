"use client";

import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`rounded-3xl p-6 text-white shadow-xl ${color}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg font-medium opacity-90">
          {title}
        </div>

        <div className="bg-white/20 p-3 rounded-2xl">
          {icon}
        </div>
      </div>

      <h2 className="text-5xl font-bold">
        {value}
      </h2>
    </motion.div>
  );
}