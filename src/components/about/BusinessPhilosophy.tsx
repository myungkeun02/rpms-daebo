'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';
import {
  HandThumbUpIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/cn';

interface CoreValue {
  title: string;
  subtitle: string;
}

interface WorkingStandard {
  key: string;
  title: string;
  titleEn?: string;
  description: string;
}

interface BusinessPhilosophyProps {
  translations: {
    sectionTitle: string;
    sectionSubtitle: string;
    vision: {
      label: string;
      content: string;
    };
    mission: {
      label: string;
      content: string;
    };
    coreValuesLabel: string;
    coreValues: CoreValue[];
    workingStandardsLabel: string;
    workingStandardsSubtitle: string;
    workingStandards: WorkingStandard[];
  };
}

const workingStandardIcons: Record<string, typeof HandThumbUpIcon> = {
  profitability: CurrencyDollarIcon,
  riskManagement: ExclamationTriangleIcon,
  trust: HandThumbUpIcon,
  teamwork: UserGroupIcon,
  challenge: RocketLaunchIcon,
};

const workingStandardColors: Record<string, { bg: string; text: string; border: string }> = {
  profitability: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  riskManagement: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  trust: { bg: 'bg-primary-50', text: 'text-primary-600', border: 'border-primary-200' },
  teamwork: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  challenge: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
};

export default function BusinessPhilosophy({ translations }: BusinessPhilosophyProps) {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #d1d5db 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center">
          <span className="inline-block rounded-md bg-white px-4 py-1.5 text-sm font-semibold text-gray-700 shadow-sm">
            PHILOSOPHY
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {translations.sectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {translations.sectionSubtitle}
          </p>
        </FadeIn>

        {/* Vision & Mission */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Vision */}
          <FadeIn delay={0.1} className="h-full">
            <motion.div
              className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10 flex h-full flex-col justify-center">
                <span className="text-sm font-medium uppercase tracking-wider text-primary-200">
                  {translations.vision.label}
                </span>
                <h3 className="mt-4 text-2xl font-bold leading-relaxed lg:text-3xl">
                  {translations.vision.content}
                </h3>
              </div>
            </motion.div>
          </FadeIn>

          {/* Mission */}
          <FadeIn delay={0.2} className="h-full">
            <motion.div
              className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark p-8 text-white shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative z-10 flex h-full flex-col justify-center">
                <span className="text-sm font-medium uppercase tracking-wider text-blue-200">
                  {translations.mission.label}
                </span>
                <h3 className="mt-4 text-2xl font-bold leading-relaxed lg:text-3xl">
                  {translations.mission.content}
                </h3>
              </div>
            </motion.div>
          </FadeIn>
        </div>

        {/* Core Values */}
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <h3 className="mb-8 text-center text-xl font-bold text-gray-900">
              {translations.coreValuesLabel}
            </h3>
            <div className="mx-auto grid max-w-lg grid-cols-3 gap-4">
              {translations.coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md">
                    <span className="text-base font-medium text-gray-500 sm:text-lg">{value.subtitle}</span>
                    <span className="mt-1 text-xl font-bold text-primary-600 sm:text-2xl">{value.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Working Standards */}
        <FadeIn delay={0.4}>
          <div className="mt-16">
            <div className="mb-8 text-center">
              <h3 className="text-xl font-bold text-gray-900">
                {translations.workingStandardsLabel}
              </h3>
              <p className="mt-2 text-gray-600">{translations.workingStandardsSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {translations.workingStandards.map((standard, index) => {
                const Icon = workingStandardIcons[standard.key] || ShieldCheckIcon;
                const colors = workingStandardColors[standard.key] || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };

                return (
                  <motion.div
                    key={standard.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'group rounded-xl border p-5 transition-all hover:shadow-md',
                      colors.bg,
                      colors.border
                    )}
                  >
                    <div className="flex h-full flex-col items-center text-center">
                      <div className={cn('rounded-full p-3', colors.bg)}>
                        <Icon className={cn('h-6 w-6', colors.text)} />
                      </div>
                      <h4 className={cn('mt-3 text-lg font-bold', colors.text)}>
                        {standard.title}
                      </h4>
                      {standard.titleEn && (
                        <span className="text-xs text-gray-500">{standard.titleEn}</span>
                      )}
                      <p className="mt-auto pt-2 text-xs leading-relaxed text-gray-600">
                        {standard.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
