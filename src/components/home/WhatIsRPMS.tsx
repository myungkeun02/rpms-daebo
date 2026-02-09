'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import {
  CpuChipIcon,
  ComputerDesktopIcon,
  SignalIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface WhatIsRPMSProps {
  translations: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: {
      hardware: { title: string; description: string };
      software: { title: string; description: string };
      protocol: { title: string; description: string };
    };
    targetEquipment: string;
    equipment: string[];
  };
}

const highlightIcons = {
  hardware: CpuChipIcon,
  software: ComputerDesktopIcon,
  protocol: SignalIcon,
};

export default function WhatIsRPMS({ translations }: WhatIsRPMSProps) {
  const highlights = [
    { key: 'hardware' as const, ...translations.highlights.hardware },
    { key: 'software' as const, ...translations.highlights.software },
    { key: 'protocol' as const, ...translations.highlights.protocol },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary-100 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-gray-200 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-md bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
            {translations.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {translations.title}
          </h2>
          <p className="mt-2 text-lg font-medium text-primary-600">
            {translations.subtitle}
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            {translations.description}
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = highlightIcons[highlight.key];
            return (
              <motion.div
                key={highlight.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg">
                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-lg bg-primary-50 p-3 text-primary-600 transition-colors group-hover:bg-primary-100">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {highlight.description}
                  </p>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Target Equipment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-center text-lg font-semibold text-gray-900">
              {translations.targetEquipment}
            </h3>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {translations.equipment.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className={cn(
                    'flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                    'border-gray-200 bg-gray-50 text-gray-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700'
                  )}
                >
                  <CheckCircleIcon className="h-4 w-4 text-primary-600" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
