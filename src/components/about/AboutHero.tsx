'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';

interface AboutHeroProps {
  translations: {
    title: string;
    subtitle: string;
    description: string;
  };
}

// Deterministic floating squares for hydration consistency
const floatingSquares = [
  { width: 35, height: 28, left: 10, top: 15, duration: 12, delay: 0.3 },
  { width: 42, height: 38, left: 25, top: 70, duration: 14, delay: 1.2 },
  { width: 28, height: 32, left: 45, top: 25, duration: 11, delay: 0.8 },
  { width: 38, height: 25, left: 60, top: 85, duration: 13, delay: 1.6 },
  { width: 32, height: 40, left: 75, top: 40, duration: 10, delay: 0.5 },
  { width: 45, height: 35, left: 88, top: 60, duration: 15, delay: 1.8 },
  { width: 30, height: 30, left: 5, top: 90, duration: 12, delay: 0.2 },
  { width: 40, height: 42, left: 92, top: 10, duration: 14, delay: 1.4 },
];

export default function AboutHero({ translations }: AboutHeroProps) {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Animated lines */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"
            style={{ top: `${10 + i * 10}%` }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-primary-500/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/4 h-80 w-80 rounded-full bg-gray-500/20 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating squares */}
        {floatingSquares.map((square, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg border border-white/10 bg-white/5"
            style={{
              width: square.width,
              height: square.height,
              left: `${square.left}%`,
              top: `${square.top}%`,
            }}
            animate={{
              rotate: [0, 90, 180, 270, 360],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: square.duration,
              repeat: Infinity,
              delay: square.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <motion.span
              className="inline-block rounded-md border border-primary-400/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {translations.subtitle}
            </motion.span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {translations.title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === Math.floor(arr.length / 2) ? (
                    <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
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
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 lg:text-xl">
              {translations.description}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 60C1248 60 1344 72 1392 78L1440 84V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
