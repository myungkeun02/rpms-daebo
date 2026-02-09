'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FadeIn } from '@/components/ui/animations';

interface CTASectionProps {
  locale: string;
  translations: {
    title: string;
    description: string;
    button: string;
    phoneLabel: string;
    emailLabel: string;
    contact: {
      phone: string;
      email: string;
    };
  };
}

export default function CTASection({ locale, translations }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-600 via-primary-700 to-secondary px-8 py-16 shadow-2xl sm:px-16 lg:px-24 lg:py-24">
          {/* Background decorations */}
          <div className="absolute inset-0">
            {/* Gradient orbs */}
            <motion.div
              className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary/30 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {translations.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-lg text-primary-100 lg:text-xl">
                  {translations.description}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                  <Link
                    href={`/${locale}/contact`}
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl"
                  >
                    {translations.button}
                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Contact cards */}
            <FadeIn delay={0.3} direction="left">
              <div className="space-y-4">
                <motion.a
                  href={`tel:${translations.contact.phone}`}
                  className="flex items-center gap-4 rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                    <PhoneIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-200">{translations.phoneLabel}</p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      {translations.contact.phone || '02-1234-5678'}
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href={`mailto:${translations.contact.email}`}
                  className="flex items-center gap-4 rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                    <EnvelopeIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-200">{translations.emailLabel}</p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      {translations.contact.email || 'contact@anjsolution.com'}
                    </p>
                  </div>
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
