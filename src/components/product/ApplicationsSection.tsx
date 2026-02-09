'use client';

import { motion } from 'framer-motion';
import {
  TvIcon,
  VideoCameraIcon,
  SignalIcon,
  WifiIcon
} from '@heroicons/react/24/outline';

interface ApplicationItem {
  title: string;
  description: string;
}

interface ApplicationsSectionProps {
  translations: {
    badge: string;
    title: string;
    description: string;
    items: ApplicationItem[];
  };
}

const iconMap = {
  0: TvIcon,
  1: VideoCameraIcon,
  2: SignalIcon,
  3: WifiIcon,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function ApplicationsSection({ translations }: ApplicationsSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 text-sm font-semibold rounded-md mb-4">
            {translations.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {translations.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {translations.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {translations.items.map((app, index) => {
            const Icon = iconMap[index as keyof typeof iconMap];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {app.title}
                </h3>
                <p className="text-gray-600">
                  {app.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
