'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

// ITS Equipment Icons - Custom SVG components for highway equipment
const VMSIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="48" height="32" rx="4" fill="currentColor" opacity="0.2" />
    <rect x="8" y="12" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
    <rect x="12" y="16" width="40" height="24" rx="2" fill="currentColor" opacity="0.3" />
    <line x1="20" y1="52" x2="20" y2="44" stroke="currentColor" strokeWidth="2" />
    <line x1="44" y1="52" x2="44" y2="44" stroke="currentColor" strokeWidth="2" />
    <rect x="16" y="52" width="8" height="4" fill="currentColor" />
    <rect x="40" y="52" width="8" height="4" fill="currentColor" />
    <text x="32" y="32" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">VMS</text>
  </svg>
);

const CCTVIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="20" width="32" height="20" rx="4" fill="currentColor" opacity="0.2" />
    <rect x="8" y="20" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M40 24L52 16V44L40 36" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="30" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="30" r="2" fill="currentColor" />
    <line x1="24" y1="48" x2="24" y2="40" stroke="currentColor" strokeWidth="2" />
    <rect x="16" y="48" width="16" height="4" rx="1" fill="currentColor" />
  </svg>
);

const DetectorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="48" rx="20" ry="8" fill="currentColor" opacity="0.2" />
    <rect x="24" y="12" width="16" height="36" rx="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="20" r="4" fill="currentColor" />
    <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.6" />
    <circle cx="32" cy="44" r="2" fill="currentColor" opacity="0.4" />
    <path d="M16 32H24M40 32H48" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    <path d="M12 32L8 28M12 32L8 36M52 32L56 28M52 32L56 36" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CommIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="16" width="24" height="40" rx="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" />
    <rect x="24" y="20" width="16" height="4" rx="1" fill="currentColor" opacity="0.4" />
    <rect x="24" y="28" width="16" height="4" rx="1" fill="currentColor" opacity="0.4" />
    <rect x="24" y="36" width="16" height="4" rx="1" fill="currentColor" opacity="0.4" />
    <circle cx="32" cy="50" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 20C12 16 20 12 32 12C44 12 52 16 56 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 24C15 21 22 18 32 18C42 18 49 21 52 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const useCaseIcons = {
  datacenter: VMSIcon,
  factory: CCTVIcon,
  building: DetectorIcon,
  telecom: CommIcon,
};

const useCaseColors = {
  datacenter: { gradient: 'from-primary-500 to-primary-600', bg: 'bg-primary-500', light: 'bg-primary-100' },
  factory: { gradient: 'from-primary-500 to-primary-600', bg: 'bg-primary-500', light: 'bg-primary-100' },
  building: { gradient: 'from-gray-700 to-gray-900', bg: 'bg-gray-700', light: 'bg-gray-100' },
  telecom: { gradient: 'from-primary-500 to-primary-600', bg: 'bg-primary-500', light: 'bg-primary-100' },
};

// Equipment-specific data for visualization
const equipmentData = {
  datacenter: { ports: 4, voltage: '220V', power: '2.5kW' },
  factory: { ports: 2, voltage: '220V', power: '0.5kW' },
  building: { ports: 1, voltage: '220V', power: '0.3kW' },
  telecom: { ports: 2, voltage: '220V', power: '0.8kW' },
};

interface UseCasesSectionProps {
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    items: {
      key: string;
      title: string;
      description?: string;
    }[];
    viewAll: string;
  };
}

export default function UseCasesSection({ locale, translations }: UseCasesSectionProps) {
  const isKo = locale === 'ko';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Highway pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
          <defs>
            <pattern id="highway-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 0 60 L 120 60" stroke="currentColor" strokeWidth="8" className="text-slate-900" />
              <path d="M 60 0 L 60 40 M 60 80 L 60 120" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="text-slate-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#highway-pattern)" />
        </svg>

        {/* Glowing orbs */}
        <motion.div
          className="absolute -right-20 top-1/4 h-[400px] w-[400px] rounded-full bg-primary-400/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gray-400/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" />
            {isKo ? 'ITS 장비 적용' : 'ITS Equipment'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            {translations.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            {translations.subtitle}
          </motion.p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {translations.items.map((useCase, index) => {
            const Icon = useCaseIcons[useCase.key as keyof typeof useCaseIcons] || VMSIcon;
            const colors = useCaseColors[useCase.key as keyof typeof useCaseColors] || useCaseColors.datacenter;
            const data = equipmentData[useCase.key as keyof typeof equipmentData] || equipmentData.datacenter;

            return (
              <motion.div
                key={useCase.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all hover:border-slate-300 hover:shadow-xl">
                  {/* Top gradient bar */}
                  <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${colors.gradient}`} />

                  {/* Icon */}
                  <motion.div
                    className={`inline-flex rounded-xl bg-gradient-to-br ${colors.gradient} p-4 shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {useCase.title}
                  </h3>

                  {/* Equipment specs mini visualization */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{isKo ? '포트' : 'Ports'}:</span>
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < data.ports ? colors.bg : 'bg-slate-200'
                            }`}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{isKo ? '전압' : 'Voltage'}:</span>
                      <span className="font-mono font-medium text-slate-700">{data.voltage}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{isKo ? '소비전력' : 'Power'}:</span>
                      <span className="font-mono font-medium text-slate-700">{data.power}</span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-primary-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs font-medium text-primary-600">
                      {isKo ? '원격 제어 가능' : 'Remote Control Ready'}
                    </span>
                  </div>

                  {/* Hover link */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-600 opacity-0 transition-all group-hover:opacity-100">
                    <span>{isKo ? '자세히 보기' : 'Learn more'}</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Background decoration */}
                  <div className={`absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br ${colors.gradient} opacity-5 transition-opacity group-hover:opacity-10`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highway illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-xl">
            {/* Highway visualization */}
            <div className="relative h-32">
              {/* Road */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-700">
                {/* Lane markings */}
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-8 bg-yellow-400"
                      initial={{ x: 100 }}
                      animate={{ x: -100 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Equipment markers */}
              <div className="absolute bottom-16 left-[15%] flex flex-col items-center">
                <div className="flex h-8 w-12 items-center justify-center rounded bg-primary-500 text-[8px] font-bold text-white">
                  VMS
                </div>
                <div className="h-8 w-0.5 bg-slate-500" />
              </div>
              <div className="absolute bottom-16 left-[40%] flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-[8px] font-bold text-white">
                  C
                </div>
                <div className="h-8 w-0.5 bg-slate-500" />
              </div>
              <div className="absolute bottom-16 left-[65%] flex flex-col items-center">
                <div className="flex h-6 w-4 items-center justify-center rounded bg-gray-700 text-[6px] font-bold text-white">
                  D
                </div>
                <div className="h-8 w-0.5 bg-slate-500" />
              </div>
              <div className="absolute bottom-16 left-[85%] flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary-500 text-[8px] font-bold text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="h-8 w-0.5 bg-slate-500" />
              </div>

              {/* Connection lines to RPMS */}
              <motion.div
                className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-primary-500/30 bg-primary-500/10 px-3 py-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="h-2 w-2 rounded-full bg-primary-400"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-mono text-xs text-primary-400">
                  RPMS {isKo ? '연결됨' : 'Connected'}
                </span>
              </motion.div>
            </div>

            {/* Bottom stats */}
            <div className="mt-4 flex items-center justify-center gap-8 border-t border-slate-700 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-xs text-slate-400">{isKo ? '장비 유형' : 'Equipment Types'}</div>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">100%</div>
                <div className="text-xs text-slate-400">{isKo ? '원격 제어' : 'Remote Control'}</div>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">24/7</div>
                <div className="text-xs text-slate-400">{isKo ? '실시간 모니터링' : 'Real-time Monitoring'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href={`/${locale}/use-cases`}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-600 bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30"
          >
            {translations.viewAll}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
