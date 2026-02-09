'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
  TableCellsIcon,
  ChevronDownIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

const downloadIcons = {
  software: ArrowDownTrayIcon,
  manual: DocumentTextIcon,
  datasheet: TableCellsIcon,
};

const downloadGradients = {
  software: 'from-primary-500 to-primary-600',
  manual: 'from-gray-500 to-gray-600',
  datasheet: 'from-gray-500 to-gray-600',
};

type DownloadKey = 'software' | 'manual' | 'datasheet';

interface FaqItem {
  question: string;
  answer: string;
}

interface SupportContentProps {
  downloads: {
    title: string;
    description: string;
    items: {
      [K in DownloadKey]: {
        title: string;
        description: string;
        version: string;
        button: string;
      };
    };
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
  };
}

function FaqAccordionItem({ item, index, isOpen, onClick }: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-md"
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-lg font-semibold text-gray-900">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100"
        >
          <ChevronDownIcon className="h-5 w-5 text-gray-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SupportContent({ downloads, faq, contact }: SupportContentProps) {
  const [hoveredDownload, setHoveredDownload] = useState<DownloadKey | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const downloadKeys: DownloadKey[] = ['software', 'manual', 'datasheet'];

  return (
    <div className="relative overflow-hidden">
      {/* Downloads Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 lg:py-32">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gray-100/50 blur-3xl" />
          <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-gray-200/50 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {downloads.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {downloads.description}
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {downloadKeys.map((key, index) => {
              const Icon = downloadIcons[key];
              const gradient = downloadGradients[key];
              const item = downloads.items[key];
              const isHovered = hoveredDownload === key;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredDownload(key)}
                  onMouseLeave={() => setHoveredDownload(null)}
                  className="group relative"
                >
                  <motion.div
                    className="relative h-full overflow-hidden rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-100"
                    whileHover={{
                      y: -8,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}
                      animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>

                    {/* Sparkle on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-4 top-4"
                        >
                          <SparklesIcon className="h-5 w-5 text-amber-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.h3
                      className="mt-5 text-xl font-bold text-gray-900"
                      animate={isHovered ? { x: 3 } : { x: 0 }}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {item.version}
                    </div>

                    <motion.button
                      className={`mt-6 w-full rounded-lg bg-gradient-to-r ${gradient} px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.button}
                    </motion.button>

                    {/* Hover gradient overlay */}
                    <motion.div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-br ${gradient} pointer-events-none`}
                      animate={{ opacity: isHovered ? 0.03 : 0 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 lg:py-32" id="faq">
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(107, 114, 128, 0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {faq.title}
            </h2>
          </motion.div>

          <div className="mt-12 space-y-4">
            {faq.items.map((item, index) => (
              <FaqAccordionItem
                key={index}
                item={item}
                index={index}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-500 via-black to-gray-600 p-8 text-center md:p-16"
          >
            {/* Background decorations - contained */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white sm:text-4xl"
              >
                {contact.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mx-auto mt-4 max-w-xl text-lg text-white/90"
              >
                {contact.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <motion.a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-3 rounded-lg bg-white px-8 py-4 font-semibold text-gray-900 shadow-xl transition-all duration-300 hover:bg-gray-50"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  {contact.email}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
