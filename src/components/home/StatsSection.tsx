'use client';

import { motion } from 'framer-motion';
import { FadeIn, AnimatedCounter } from '@/components/ui/animations';

interface StatsSectionProps {
  translations: {
    title: string;
    stats: {
      value: number;
      suffix: string;
      label: string;
    }[];
  };
}

export default function StatsSection({ translations }: StatsSectionProps) {
  const stats = translations.stats || [
    { value: 99, suffix: '.9%', label: 'Uptime' },
    { value: 500, suffix: '+', label: 'Sites' },
    { value: 10000, suffix: '+', label: 'Devices' },
    { value: 24, suffix: '/7', label: 'Support' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-secondary to-slate-900 py-24">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {translations.title || 'Proven Performance'}
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:border-primary-400/50 hover:bg-white/10">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="text-4xl font-bold text-white sm:text-5xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
