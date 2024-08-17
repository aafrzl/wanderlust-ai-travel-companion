"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plane } from "lucide-react";

export default function LoadingTripDetail() {
  return (
    <AnimatePresence mode="wait">
      <div className="h-screen flex flex-col items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-10, 10, -10],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            exit={{
              y: -200,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          >
            <Plane size={64} />
          </motion.div>
          <h1 className="text-2xl font-semibold tracking-tighter">
            Loading Trip Details...
          </h1>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
