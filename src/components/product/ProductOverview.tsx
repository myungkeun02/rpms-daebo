'use client';

import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

interface ProductOverviewProps {
  translations: {
    badge: string;
    title: string;
    description: string;
    highlights: Array<{
      title: string;
      description: string;
    }>;
  };
}

const icons = [CpuChipIcon, Squares2X2Icon, GlobeAltIcon, ChartBarIcon];

export default function ProductOverview({ translations }: ProductOverviewProps) {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-50 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <span className="inline-block rounded-md bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-600">
              {translations.badge}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {translations.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {translations.description}
            </p>
          </FadeIn>
        </div>

        {/* Highlights Grid */}
        <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {translations.highlights.map((highlight, index) => {
            const Icon = icons[index];
            return (
              <StaggerItem key={index} className="h-full">
                <motion.div
                  className="group relative flex h-full flex-col rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-100 transition-all hover:shadow-xl hover:ring-primary-200"
                  whileHover={{ y: -8 }}
                >
                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-primary-500 to-primary-500 shadow-lg shadow-primary-500/25 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {highlight.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute -right-2 -top-2 h-16 w-16 rounded-md bg-gradient-to-br from-primary-500 to-primary-500 opacity-0 blur-xl transition-opacity group-hover:opacity-10" />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
