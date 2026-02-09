'use client';

import { motion } from 'framer-motion';
import {
  PowerIcon,
  ChartBarSquareIcon,
  AdjustmentsHorizontalIcon,
  BellAlertIcon,
  ClipboardDocumentListIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

// Feature icons mapping
const featureIcons = {
  remoteControl: PowerIcon,
  monitoring: ChartBarSquareIcon,
  threshold: AdjustmentsHorizontalIcon,
  alerts: BellAlertIcon,
  logging: ClipboardDocumentListIcon,
  integration: LinkIcon,
};

interface FeaturesSectionProps {
  translations: {
    badge: string;
    title: string;
    description: string;
    items: {
      key: string;
      title: string;
      description: string;
      details: string[];
    }[];
  };
}

export default function FeaturesSection({ translations }: FeaturesSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-primary-400/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-slate-400/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" />
            {translations.badge}
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
            {translations.description}
          </motion.p>
        </motion.div>

        {/* Features Grid - 3x2 */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {translations.items.map((feature, index) => {
            const Icon = featureIcons[feature.key as keyof typeof featureIcons] || PowerIcon;

            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Decorative corner */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-slate-100 to-transparent opacity-30" />

                  <div className="relative z-10 flex flex-1 flex-col">
                    {/* Icon */}
                    <motion.div
                      className="inline-flex rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 p-3 shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>

                    {/* Title and Description */}
                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>

                    {/* Details List */}
                    <ul className="mt-4 flex-1 space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + detailIndex * 0.05 }}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary-500" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Feature index */}
                    <div className="mt-6 flex items-center gap-2">
                      <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" />
                      <span className="text-xs font-medium text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Animated border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent"
                    initial={false}
                    whileHover={{
                      borderColor: 'rgba(239, 68, 68, 0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
