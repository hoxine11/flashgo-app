import React from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  lang: 'ar' | 'en';
}

export default function SplashScreen({ lang }: SplashScreenProps) {
  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 bg-[#050505] z-[9999] flex items-center justify-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[140px] animate-pulse" />

      {/* Main Content */}
      <div className="relative flex flex-col items-center">

        {/* Logo — slides in from top */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="
            relative h-72 w-72 rounded-[2.5rem] overflow-hidden
            border border-amber-400/20 bg-black/40 backdrop-blur-xl
            shadow-[0_0_80px_rgba(251,191,36,0.15)]
          "
        >
          <img
            src="../image/flashgo.png"
            alt="Flash Go"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-[shine_4s_linear_infinite]" />
        </motion.div>

        {/* Brand Name — fades up after logo */}
        <motion.div
          className="mt-7 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.65 }}
        >
          <h1 className="text-6xl font-black italic tracking-tight uppercase leading-none">
            <span className="text-neutral-100">Flash</span>
            <span className="text-amber-400">Go</span>
          </h1>
        </motion.div>

        {/* Tagline / Motto — appears after the title */}
        <motion.p
          className="mt-3 text-amber-400/90 tracking-[0.3em] text-xs uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 1.05 }}
        >
          {isAr ? 'سرعة • أمان • راحة' : 'Speed • Safety • Comfort'}
        </motion.p>

        {/* Loader — last to appear */}
        <motion.div
          className="mt-10 flex items-center gap-3 text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeIn', delay: 1.45 }}
        >
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400 animate-spin" />
          </div>
          <span className="text-xs tracking-[0.25em] uppercase">
            {isAr ? 'جاري الاتصال بالخدمة...' : 'Connecting to Service...'}
          </span>
        </motion.div>

      </div>
    </div>
  );
}