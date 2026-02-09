'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';

interface SupportHeroProps {
  translations: {
    title: string;
    description: string;
  };
}

export default function SupportHero({ translations }: SupportHeroProps) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Support icons pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="support-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="rgba(255,255,255,0.5)" />
              <path
                d="M10 30 L50 30 M30 10 L30 50"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#support-grid)" />
        </svg>

        {/* Glowing orbs - contained within bounds */}
        <motion.div
          className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-gray-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-black/20 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.3, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Floating icons - fixed positions, subtle animation */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute h-8 w-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center"
            style={{
              left: `${15 + i * 14}%`,
              top: `${30 + (i % 2) * 25}%`,
            }}
            animate={{
              y: [-5, 5, -5],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <div className="h-3 w-3 rounded bg-gray-500/40" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <motion.div
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-400/30 bg-gray-500/10 px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium text-gray-300">Support</span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {translations.title.split(' ').map((word, i) => (
                <span key={i}>
                  {i % 2 === 1 ? (
                    <span className="bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
                      {word}{' '}
                    </span>
                  ) : (
                    word + ' '
                  )}
                </span>
              ))}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 lg:text-xl">
              {translations.description}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
