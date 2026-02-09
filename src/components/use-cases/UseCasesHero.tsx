'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';

interface UseCasesHeroProps {
  translations: {
    title: string;
    description: string;
  };
}

export default function UseCasesHero({ translations }: UseCasesHeroProps) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Animated circuit lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"
            style={{
              width: '200px',
              left: `${i * 15}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i % 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-gray-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-gray-500/20 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(107, 114, 128, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(107, 114, 128, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Industry icons floating */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{
              left: `${15 + i * 14}%`,
              top: `${25 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <div className="h-5 w-5 rounded bg-gray-500/30" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <motion.div
              className="mx-auto inline-flex items-center gap-2 rounded-md border border-gray-400/30 bg-gray-500/10 px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium text-gray-300">Use Cases</span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-gray-400 to-gray-400 bg-clip-text text-transparent">
                {translations.title}
              </span>
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
