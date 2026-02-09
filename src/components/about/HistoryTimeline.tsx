'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';
import { cn } from '@/lib/cn';
import {
  RocketLaunchIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface HistoryItem {
  month: string;
  content: string;
}

interface HistoryEra {
  period: string;
  title: string;
  icon: 'rocket' | 'trending' | 'sparkles';
  years: Record<string, HistoryItem[]>;
}

interface HistoryTimelineProps {
  translations: {
    title: string;
    subtitle: string;
    decadeSuffix: string;
    achievementsSuffix: string;
    yearsOfHistory: string;
    keyAchievements: string;
    moreItems: string;
    eras: HistoryEra[];
  };
}

const eraStyles = [
  { active: 'bg-primary-500 ring-primary-400/50', inactive: 'bg-white/5 hover:bg-white/10', dot: 'bg-primary-400', yearText: 'text-primary-400' },
  { active: 'bg-secondary ring-secondary/50', inactive: 'bg-white/5 hover:bg-white/10', dot: 'bg-blue-400', yearText: 'text-blue-400' },
  { active: 'bg-slate-600 ring-slate-500/50', inactive: 'bg-white/5 hover:bg-white/10', dot: 'bg-slate-400', yearText: 'text-slate-300' },
  { active: 'bg-gray-600 ring-gray-500/50', inactive: 'bg-white/5 hover:bg-white/10', dot: 'bg-gray-400', yearText: 'text-gray-300' },
  { active: 'bg-gray-500 ring-gray-400/50', inactive: 'bg-white/5 hover:bg-white/10', dot: 'bg-gray-400', yearText: 'text-gray-300' },
];

const eraIcons = {
  rocket: RocketLaunchIcon,
  trending: ArrowTrendingUpIcon,
  sparkles: SparklesIcon,
};

export default function HistoryTimeline({ translations }: HistoryTimelineProps) {
  const [activeEra, setActiveEra] = useState(0);

  const currentEra = translations.eras[activeEra];
  const style = eraStyles[activeEra] || eraStyles[0];
  const years = Object.entries(currentEra.years).sort(
    (a, b) => Number(b[0]) - Number(a[0]),
  );

  // Total stats
  const totalYears = new Set(
    translations.eras.flatMap((era) => Object.keys(era.years)),
  ).size;
  const totalAchievements = translations.eras.reduce(
    (acc, era) =>
      acc +
      Object.values(era.years).reduce((sum, items) => sum + items.length, 0),
    0,
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-secondary to-slate-900 py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center">
          <span className="inline-block rounded-md bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            HISTORY
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {translations.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {translations.subtitle}
          </p>
        </FadeIn>

        {/* Era Tab Buttons */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {translations.eras.map((era, index) => {
            const Icon = eraIcons[era.icon] || SparklesIcon;
            const isActive = activeEra === index;
            const s = eraStyles[index] || eraStyles[0];
            const itemCount = Object.values(era.years).reduce(
              (sum, items) => sum + items.length,
              0,
            );

            return (
              <motion.button
                key={era.period}
                onClick={() => setActiveEra(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={cn(
                  'relative rounded-xl border px-4 py-4 text-left transition-all',
                  isActive
                    ? `${s.active} border-transparent text-white ring-2 shadow-lg`
                    : `${s.inactive} border-white/10 text-gray-300`,
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className={cn('h-4 w-4 flex-shrink-0', isActive ? 'text-white' : 'text-gray-400')} />
                  <span className="text-xs font-semibold tracking-wide">
                    {era.period}
                  </span>
                </div>
                <p className={cn(
                  'mt-1.5 text-sm font-bold leading-tight',
                  isActive ? 'text-white' : 'text-gray-200',
                )}>
                  {era.title}
                </p>
                <p className={cn(
                  'mt-1 text-xs',
                  isActive ? 'text-white/70' : 'text-gray-500',
                )}>
                  {itemCount}{translations.achievementsSuffix}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Era Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEra}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            <div className="relative ml-4 border-l-2 border-white/20 pl-8">
              {years.map(([year, items], yearIndex) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: yearIndex * 0.05 }}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Year Dot */}
                  <div
                    className={cn(
                      'absolute -left-[41px] h-4 w-4 rounded-full border-2 border-white',
                      style.dot,
                    )}
                  />

                  {/* Year Content */}
                  <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-baseline gap-3">
                      <span className={cn('text-2xl font-bold', style.yearText)}>
                        {year}
                      </span>
                      <span className="text-sm text-gray-400">
                        {items.length}{translations.achievementsSuffix}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="mt-0.5 min-w-[36px] text-xs font-medium text-gray-500">
                            {item.month}
                          </span>
                          <span className="text-gray-300">{item.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Total Stats */}
        <FadeIn delay={0.3}>
          <div className="mt-16 flex justify-center gap-8 text-center">
            <div className="rounded-xl bg-white/10 px-8 py-4 backdrop-blur-sm">
              <p className="text-4xl font-bold text-primary-400">{totalYears}</p>
              <p className="mt-1 text-sm text-gray-400">
                {translations.yearsOfHistory}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 px-8 py-4 backdrop-blur-sm">
              <p className="text-4xl font-bold text-primary-400">
                {totalAchievements}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {translations.keyAchievements}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
