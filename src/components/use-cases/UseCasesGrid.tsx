'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ServerStackIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  SignalIcon,
  ShoppingCartIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, ArrowTrendingUpIcon, SparklesIcon } from '@heroicons/react/24/solid';

const caseIcons = {
  datacenter: ServerStackIcon,
  factory: BuildingOffice2Icon,
  building: BuildingStorefrontIcon,
  telecom: SignalIcon,
  retail: ShoppingCartIcon,
  research: BeakerIcon,
};

const caseGradients = {
  datacenter: 'from-primary-500 to-primary-600',
  factory: 'from-black to-primary-600',
  building: 'from-gray-500 to-gray-600',
  telecom: 'from-gray-500 to-gray-600',
  retail: 'from-primary-500 to-primary-600',
  research: 'from-primary-500 to-primary-600',
};

const caseBgPatterns = {
  datacenter: 'radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
  factory: 'radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.15) 0%, transparent 50%)',
  building: 'radial-gradient(circle at 80% 20%, rgba(107, 114, 128, 0.15) 0%, transparent 50%)',
  telecom: 'radial-gradient(circle at 80% 20%, rgba(107, 114, 128, 0.15) 0%, transparent 50%)',
  retail: 'radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
  research: 'radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
};

// Pre-computed particle positions for SSG compatibility
const floatingParticles = [
  { left: 5, top: 12, duration: 3.2, delay: 0.3 },
  { left: 15, top: 28, duration: 4.1, delay: 1.2 },
  { left: 25, top: 8, duration: 3.7, delay: 0.8 },
  { left: 35, top: 45, duration: 4.5, delay: 1.5 },
  { left: 45, top: 18, duration: 3.3, delay: 0.5 },
  { left: 55, top: 62, duration: 4.2, delay: 1.8 },
  { left: 65, top: 35, duration: 3.8, delay: 0.2 },
  { left: 75, top: 78, duration: 4.4, delay: 1.1 },
  { left: 85, top: 22, duration: 3.5, delay: 0.9 },
  { left: 95, top: 55, duration: 4.0, delay: 1.6 },
  { left: 10, top: 72, duration: 3.4, delay: 0.4 },
  { left: 20, top: 88, duration: 4.3, delay: 1.3 },
  { left: 30, top: 42, duration: 3.6, delay: 0.7 },
  { left: 40, top: 95, duration: 4.6, delay: 1.9 },
  { left: 50, top: 5, duration: 3.1, delay: 0.1 },
  { left: 60, top: 82, duration: 4.7, delay: 1.4 },
  { left: 70, top: 15, duration: 3.9, delay: 0.6 },
  { left: 80, top: 68, duration: 4.8, delay: 1.7 },
  { left: 90, top: 32, duration: 3.0, delay: 1.0 },
  { left: 98, top: 48, duration: 4.9, delay: 0.0 },
];

type CaseKey = keyof typeof caseIcons;

interface UseCasesGridProps {
  cases: {
    key: CaseKey;
    title: string;
    description: string;
    benefits: string[];
    result: string;
  }[];
}

export default function UseCasesGrid({ cases }: UseCasesGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gray-100/50 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gray-100/50 blur-3xl" />

        {/* Floating particles */}
        {floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gray-400/20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((useCase, index) => {
            const Icon = caseIcons[useCase.key];
            const gradient = caseGradients[useCase.key];
            const bgPattern = caseBgPatterns[useCase.key];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={useCase.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <motion.div
                  className="relative h-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-100"
                  whileHover={{
                    y: -12,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Background pattern on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500"
                    style={{ background: bgPattern }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  />

                  {/* Gradient header with 3D effect */}
                  <div className={`relative h-36 bg-gradient-to-br ${gradient} p-6 overflow-hidden`}>
                    {/* Animated decorative circles */}
                    <motion.div
                      className="absolute right-4 top-4 h-28 w-28 rounded-full bg-white/10"
                      animate={isHovered ? { scale: 1.2, x: 10 } : { scale: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute right-10 top-10 h-20 w-20 rounded-full bg-white/10"
                      animate={isHovered ? { scale: 1.3, x: -5 } : { scale: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />

                    {/* Sparkle effect on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-6 top-6"
                        >
                          <SparklesIcon className="h-5 w-5 text-white/60" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Icon with 3D hover effect */}
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-xl"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      animate={isHovered ? { y: -5 } : { y: 0 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className={`h-8 w-8 text-transparent bg-gradient-to-br ${gradient} bg-clip-text`} style={{ color: gradient.includes('primary') ? '#005B23' : gradient.includes('black') ? '#000000' : '#6b7280' }} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <motion.h3
                      className="text-xl font-bold text-gray-900 transition-colors duration-300"
                      animate={isHovered ? { x: 5 } : { x: 0 }}
                    >
                      <span className={`bg-gradient-to-r ${gradient} bg-clip-text transition-all duration-300 ${isHovered ? 'text-transparent' : 'text-gray-900'}`}>
                        {useCase.title}
                      </span>
                    </motion.h3>
                    <motion.p
                      className="mt-3 text-gray-600 leading-relaxed"
                      animate={isHovered ? { opacity: 0.8 } : { opacity: 1 }}
                    >
                      {useCase.description}
                    </motion.p>

                    {/* Benefits with staggered animation */}
                    <div className="mt-6 space-y-3">
                      {useCase.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <motion.div
                            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}
                            whileHover={{ scale: 1.2 }}
                            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          >
                            <CheckIcon className="h-3 w-3 text-white" />
                          </motion.div>
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Result footer with animated reveal */}
                  <motion.div
                    className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4"
                    animate={isHovered ? { backgroundColor: 'rgba(0,0,0,0.02)' } : { backgroundColor: 'transparent' }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}
                        animate={isHovered ? { scale: 1.1, rotate: 10 } : { scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
                      </motion.div>
                      <motion.p
                        className="text-sm font-semibold text-gray-900"
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                      >
                        {useCase.result}
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Animated border on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg border-2 border-transparent`}
                    animate={isHovered ? {
                      borderColor: gradient.includes('primary') ? 'rgba(239, 68, 68, 0.3)' :
                                  gradient.includes('black') ? 'rgba(0, 0, 0, 0.3)' :
                                  'rgba(107, 114, 128, 0.3)'
                    } : { borderColor: 'transparent' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
