'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FadeIn } from '@/components/ui/animations';

interface ProductCTAProps {
  locale: string;
  translations: {
    title: string;
    description: string;
    button: string;
  };
}

export default function ProductCTA({ locale, translations }: ProductCTAProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-black py-24 lg:py-32">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <motion.div
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gray-500/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className="h-4 w-4 rounded bg-white/10" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <motion.div
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.1)',
                '0 0 40px rgba(255,255,255,0.2)',
                '0 0 20px rgba(255,255,255,0.1)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <SparklesIcon className="h-4 w-4 text-gray-300" />
            <span className="text-sm font-medium text-white">Premium Solution</span>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {translations.title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100 lg:text-xl">
            {translations.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10">
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3"
            >
              <motion.span
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-xl transition-all group-hover:bg-primary-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations.button}
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </div>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.4}>
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Support' },
              { value: '500+', label: 'Clients' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
