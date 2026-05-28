"use client";

import {
  motion,
} from "framer-motion";

export default function TCDMotion({

  children,

  delay = 0,

}: any) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      viewport={{
        once: true,
      }}

      transition={{
        duration: 0.45,
        delay,
      }}
    >

      {children}

    </motion.div>
  );
}