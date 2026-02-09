'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';

interface ProductHeroProps {
  translations: {
    title: string;
    subtitle: string;
    description: string;
  };
}

// Deterministic particle positions for hydration consistency
const particles = [
  { left: 8, top: 15, duration: 4, delay: 0.3 },
  { left: 18, top: 75, duration: 4.5, delay: 1.2 },
  { left: 28, top: 35, duration: 3.8, delay: 0.8 },
  { left: 38, top: 65, duration: 4.2, delay: 1.6 },
  { left: 48, top: 20, duration: 3.5, delay: 0.5 },
  { left: 58, top: 80, duration: 4.8, delay: 1.8 },
  { left: 68, top: 45, duration: 3.2, delay: 0.2 },
  { left: 78, top: 70, duration: 4.6, delay: 1.4 },
  { left: 88, top: 25, duration: 3.6, delay: 0.9 },
  { left: 95, top: 55, duration: 4.4, delay: 1.1 },
  { left: 12, top: 40, duration: 4.1, delay: 0.4 },
  { left: 22, top: 90, duration: 4.7, delay: 1.7 },
  { left: 32, top: 12, duration: 3.4, delay: 0.6 },
  { left: 42, top: 60, duration: 4.3, delay: 1.3 },
  { left: 52, top: 30, duration: 3.9, delay: 0.7 },
  { left: 62, top: 85, duration: 4.9, delay: 1.9 },
  { left: 72, top: 50, duration: 3.3, delay: 0.1 },
  { left: 82, top: 8, duration: 4.5, delay: 1.5 },
  { left: 92, top: 72, duration: 3.7, delay: 1.0 },
  { left: 98, top: 42, duration: 4.0, delay: 0.0 },
];

// Deterministic voltage values
const voltageValues = ['223.4', '221.8', '224.2', '222.6'];

export default function ProductHero({ translations }: ProductHeroProps) {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-slate-900 via-secondary to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 91, 35, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 91, 35, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary-500/30 blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary-500/30 blur-[128px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <FadeIn>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/10 px-4 py-2 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-400" />
                <span className="text-sm font-medium text-primary-200">
                  {translations.subtitle}
                </span>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {translations.title.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="bg-gradient-to-r from-primary-400 to-primary-400 bg-clip-text text-transparent">
                        {word}
                      </span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-gray-300 lg:text-xl">
                {translations.description}
              </p>
            </FadeIn>
          </div>

          {/* 3D Product visualization */}
          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              {/* Main device */}
              <motion.div
                className="relative mx-auto w-full max-w-md"
                animate={{ rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                {/* Controller unit */}
                <div className="relative rounded-lg border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
                  {/* LED indicators */}
                  <div className="flex gap-3">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: i < 4 ? '#005B23' : i === 4 ? '#003050' : '#6b7280',
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          boxShadow: [
                            '0 0 10px rgba(0, 91, 35, 0.3)',
                            '0 0 20px rgba(0, 91, 35, 0.6)',
                            '0 0 10px rgba(0, 91, 35, 0.3)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>

                  {/* Display */}
                  <div className="mt-4 rounded-lg bg-black/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-400">RPMS Controller v2.0</span>
                      <span className="text-xs text-gray-400">ONLINE</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {['CH1', 'CH2', 'CH3', 'CH4'].map((ch, i) => (
                        <motion.div
                          key={ch}
                          className="rounded bg-slate-700/50 p-2 text-center"
                          animate={{
                            backgroundColor: ['rgba(51, 65, 85, 0.5)', 'rgba(239, 68, 68, 0.2)', 'rgba(51, 65, 85, 0.5)'],
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        >
                          <div className="text-xs text-gray-400">{ch}</div>
                          <div className="text-sm font-mono text-primary-400">{voltageValues[i]}V</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Ports */}
                  <div className="mt-4 flex justify-center gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-3 w-8 rounded-sm bg-slate-600" />
                    ))}
                  </div>
                </div>

                {/* Floating connection lines */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
                    style={{
                      width: '150px',
                      right: '-160px',
                      top: `${30 + i * 30}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scaleX: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-md border border-primary-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary-400" />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
