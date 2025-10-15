"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ThreadPrimitive } from "@assistant-ui/react";

interface SlotMachineProps {}

const proteins = ["🍗", "🥩", "🍤", "🍳", "🐟", "🦆", "🥓", "🍖"];
const carbs = ["🍞", "🍚", "🍝", "🥔", "🌽", "🥖", "🥨", "🍠"];
const vegetables = ["🥦", "🥕", "🥬", "🌶️", "🥒", "🍅", "🫑", "🥑"];

// Reel component for smooth spinning animation
const Reel: React.FC<{
  items: string[];
  finalIndex: number;
  stopped: boolean;
  delay: number;
}> = ({ items, finalIndex, stopped, delay }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!stopped) {
      const interval = setInterval(() => {
        setOffset((prev) => prev - 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stopped]);

  const displayItems = [...items, ...items, ...items, ...items, ...items];
  const itemHeight = 112; // 28 * 4 (h-28 = 7rem = 112px)
  
  let translateY = offset * itemHeight;
  if (stopped) {
    translateY = -(finalIndex * itemHeight);
  }

  return (
    <div className="relative w-24 h-28 bg-white rounded-xl border-4 border-yellow-400 shadow-inner overflow-hidden">
      <motion.div
        className="absolute w-full"
        animate={{ y: translateY }}
        transition={
          stopped
            ? { type: "spring", stiffness: 100, damping: 20, delay }
            : { duration: 0 }
        }
      >
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center text-6xl"
            style={{ height: `${itemHeight}px` }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const SlotMachine: React.FC<SlotMachineProps> = () => {
  const [proteinStopped, setProteinStopped] = useState(false);
  const [carbStopped, setCarbStopped] = useState(false);
  const [vegetableStopped, setVegetableStopped] = useState(false);
  const [finalProtein] = useState(Math.floor(Math.random() * proteins.length));
  const [finalCarb] = useState(Math.floor(Math.random() * carbs.length));
  const [finalVegetable] = useState(Math.floor(Math.random() * vegetables.length));
  const [allStopped, setAllStopped] = useState(false);

  useEffect(() => {
    // Stop reels at different times like a real poker machine
    setTimeout(() => setProteinStopped(true), 2000);
    setTimeout(() => setCarbStopped(true), 2800);
    setTimeout(() => {
      setVegetableStopped(true);
      setTimeout(() => setAllStopped(true), 500);
    }, 3600);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start gap-8 p-8 min-h-0">
      {/* Animated Vegas Lights Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              background: i % 3 === 0 ? "#facc15" : i % 3 === 1 ? "#ef4444" : "#ec4899",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Vegas Title with Neon Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <motion.h2
          className="text-6xl md:text-7xl font-black tracking-wider mb-2 relative"
          animate={{
            textShadow: [
              "0 0 20px #facc15, 0 0 40px #facc15",
              "0 0 30px #ef4444, 0 0 50px #ef4444",
              "0 0 20px #ec4899, 0 0 40px #ec4899",
              "0 0 30px #facc15, 0 0 50px #facc15",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            🎰 MEAL JACKPOT 🎰
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-yellow-300 font-bold tracking-widest"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ★ LAS VEGAS STYLE ★
        </motion.p>
      </motion.div>

      {/* Slot Machine Frame with Enhanced Vegas Theme */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative shrink-0"
      >
        {/* Outer Glow */}
        <motion.div
          className="absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-40 blur-3xl pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main Slot Machine Body */}
        <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-950 px-12 pt-16 pb-10 rounded-[3rem] shadow-2xl border-8 border-yellow-400">
          {/* Animated Border Lights */}
          <div className="absolute -inset-1 rounded-[3rem] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(0deg, #facc15, #ef4444, #ec4899, #facc15)",
                  "linear-gradient(90deg, #facc15, #ef4444, #ec4899, #facc15)",
                  "linear-gradient(180deg, #facc15, #ef4444, #ec4899, #facc15)",
                  "linear-gradient(270deg, #facc15, #ef4444, #ec4899, #facc15)",
                  "linear-gradient(360deg, #facc15, #ef4444, #ec4899, #facc15)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ filter: "blur(8px)", opacity: 0.5 }}
            />
          </div>

          {/* Crown Decoration */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]"
            >
              👑
            </motion.div>
          </div>

          {/* Inner Frame */}
          <div className="relative bg-gradient-to-br from-black/60 to-black/40 rounded-3xl p-8 backdrop-blur-sm border-4 border-yellow-500/50">
            {/* Reels Container */}
            <div className="flex gap-6 mb-6">
              {/* Protein Reel */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className="text-sm font-black text-yellow-300 tracking-[0.3em] px-4 py-2 bg-red-900/50 rounded-full border-2 border-yellow-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  PROTEIN
                </motion.div>
                <Reel
                  items={proteins}
                  finalIndex={finalProtein}
                  stopped={proteinStopped}
                  delay={0}
                />
              </div>

              {/* Carb Reel */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className="text-sm font-black text-yellow-300 tracking-[0.3em] px-4 py-2 bg-red-900/50 rounded-full border-2 border-yellow-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                  CARBS
                </motion.div>
                <Reel
                  items={carbs}
                  finalIndex={finalCarb}
                  stopped={carbStopped}
                  delay={0.1}
                />
              </div>

              {/* Vegetable Reel */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className="text-sm font-black text-yellow-300 tracking-[0.3em] px-4 py-2 bg-red-900/50 rounded-full border-2 border-yellow-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                  VEGGIES
                </motion.div>
                <Reel
                  items={vegetables}
                  finalIndex={finalVegetable}
                  stopped={vegetableStopped}
                  delay={0.2}
                />
              </div>
            </div>

            {/* Status Display */}
            <div className="text-center mt-6">
              {!allStopped ? (
                <motion.div
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-yellow-300 font-black tracking-[0.4em] text-3xl drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]"
                >
                  ★★ SPINNING ★★
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="space-y-3"
                >
                  <motion.div
                    className="text-yellow-300 font-black tracking-[0.3em] text-4xl"
                    animate={{
                      textShadow: [
                        "0 0 20px #facc15",
                        "0 0 40px #facc15",
                        "0 0 20px #facc15",
                      ],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    💰 JACKPOT! 💰
                  </motion.div>
                  <motion.div
                    className="text-white text-lg font-bold tracking-wider"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    YOU WIN!
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Side Decorative Lights */}
          <div className="absolute -left-4 top-1/4 flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`left-${i}`}
                className="w-6 h-6 rounded-full bg-yellow-400 shadow-[0_0_20px_#facc15]"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className="absolute -right-4 top-1/4 flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`right-${i}`}
                className="w-6 h-6 rounded-full bg-pink-500 shadow-[0_0_20px_#ec4899]"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 + 0.5 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Result Display with Vegas Flair */}
      {allStopped && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
          className="relative shrink-0"
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-3xl blur-2xl opacity-50 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative text-center bg-gradient-to-br from-yellow-400/20 to-red-500/20 rounded-3xl px-8 py-6 border-4 border-yellow-400 backdrop-blur-sm">
            <p className="text-yellow-300 text-lg font-bold tracking-wider mb-3">
              🏆 WINNING COMBINATION 🏆
            </p>
            <p className="text-5xl font-black mb-4">
              {proteins[finalProtein]} {carbs[finalCarb]} {vegetables[finalVegetable]}
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 space-y-3"
            >
              <p className="text-white text-lg font-semibold">
                Curious what this delicious combo looks like?
              </p>
              <ThreadPrimitive.Suggestion
                prompt={`Create a beautiful, appetizing image of this meal: ${proteins[finalProtein]} ${carbs[finalCarb]} ${vegetables[finalVegetable]}`}
                send
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-black text-lg rounded-full shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_50px_rgba(250,204,21,0.8)] transition-all duration-300 border-2 border-yellow-300"
                >
                  ✨ Generate My Meal Image ✨
                </motion.button>
              </ThreadPrimitive.Suggestion>
              <p className="text-yellow-300/80 text-sm italic">
                Let AI bring your meal to life!
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
