"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedWelcomeProps {
  name: string;
}

const AnimatedWelcome: React.FC<AnimatedWelcomeProps> = ({ name }) => {
  const generateTime = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const waveVariants: Variants = {
    wave: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <h1 className="text-2xl font-semibold tracking-tighter flex items-center gap-2">
      Hello good {generateTime()}, {name}
      <motion.span
        variants={waveVariants}
        animate="wave"
        style={{ display: "inline-block", originX: 0.7, originY: 0.7 }}
        className="text-3xl"
      >
        👋🏻
      </motion.span>
    </h1>
  );
};

export default AnimatedWelcome;
