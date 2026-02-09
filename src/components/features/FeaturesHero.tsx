'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';

interface FeaturesHeroProps {
  translations: {
    title: string;
    description: string;
  };
}

export default function FeaturesHero({ translations }: FeaturesHeroProps) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-slate-900 via-secondary to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Hexagon pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon
                points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>

        {/* Glowing orbs */}
        <motion.div
          className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-primary-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-secondary/30 blur-[100px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Floating icons */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-8 w-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{
              left: `${10 + (i % 6) * 15}%`,
              top: `${20 + Math.floor(i / 6) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, 0, -5, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i % 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <motion.div
              className="mx-auto inline-flex items-center gap-2 rounded-md border border-primary-400/30 bg-primary-500/10 px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium text-primary-300">Features</span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {translations.title.split(' ').map((word, i) => (
                <span key={i}>
                  {i % 2 === 1 ? (
                    <span className="bg-gradient-to-r from-primary-400 to-primary-400 bg-clip-text text-transparent">
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
