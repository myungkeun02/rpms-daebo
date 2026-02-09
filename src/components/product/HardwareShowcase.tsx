'use client';

import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  BoltIcon,
  CircleStackIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { FadeIn } from '@/components/ui/animations';

interface HardwareShowcaseProps {
  translations: {
    badge: string;
    title: string;
    description: string;
    unit: {
      title: string;
      description: string;
      image?: string;
    };
    specs: {
      title: string;
      items: Array<{
        label: string;
        value: string;
      }>;
    };
    sensors: {
      title: string;
      items: Array<{
        name: string;
        description: string;
      }>;
    };
    firmware: {
      title: string;
      description: string;
      features: string[];
    };
  };
}

const sensorIcons = [
  BoltIcon,
  CircleStackIcon,
  CpuChipIcon,
];

export default function HardwareShowcase({ translations }: HardwareShowcaseProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center">
          <span className="inline-block rounded-md bg-slate-900/5 px-4 py-1.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10">
            {translations.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {translations.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {translations.description}
          </p>
        </FadeIn>

        {/* Main content grid */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
          {/* Left side: RPMS Unit visual */}
          <FadeIn>
            <div className="relative mx-auto w-full max-w-md">
              <motion.div
                className="relative rounded-lg border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 p-8 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Title bar */}
                <div className="flex items-center justify-between rounded-md bg-slate-800 p-3">
                  <div className="flex items-center gap-2">
                    <CpuChipIcon className="h-5 w-5 text-slate-200" />
                    <span className="text-sm font-medium text-white">{translations.unit.title}</span>
                  </div>
                  <motion.div
                    className="flex items-center gap-1.5"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs text-slate-200">ON</span>
                  </motion.div>
                </div>

                {/* Distribution board visual */}
                <div className="mt-6 space-y-4">
                  {/* Port grid (4 channels) */}
                  <div className="rounded-md bg-slate-800 p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="relative aspect-square rounded-md bg-slate-700 border border-slate-600"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: 'rgb(51, 65, 85)',
                          }}
                        >
                          <div className="flex h-full items-center justify-center">
                            <motion.div
                              className="h-1.5 w-1.5 rounded-full bg-slate-400"
                              animate={{
                                backgroundColor: ['rgb(148, 163, 184)', 'rgb(34, 197, 94)', 'rgb(148, 163, 184)'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          </div>
                          {/* Port number */}
                          <span className="absolute bottom-0.5 right-1 text-[8px] font-medium text-slate-500">
                            {i + 1}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Connection panel */}
                  <div className="flex items-center justify-between rounded-md bg-slate-700 p-3">
                    <div className="flex gap-1.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-3 w-5 rounded-sm bg-slate-600 border border-slate-500" />
                      ))}
                    </div>
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-slate-600 border border-slate-500" />
                      <div className="h-3 w-6 rounded-sm bg-slate-600 border border-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-sm text-slate-600">
                  {translations.unit.description}
                </p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Right side: Specs, Sensors, Firmware */}
          <div className="space-y-8">
            {/* Specs table */}
            <FadeIn delay={0.1}>
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Cog6ToothIcon className="h-5 w-5 text-slate-600" />
                  {translations.specs.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {translations.specs.items.map((spec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm font-medium text-slate-600">{spec.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Sensors */}
            <FadeIn delay={0.2}>
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  {translations.sensors.title}
                </h3>
                <div className="mt-4 space-y-4">
                  {translations.sensors.items.map((sensor, index) => {
                    const Icon = sensorIcons[index % sensorIcons.length];
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-3 rounded-md bg-slate-50 p-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-900">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900">{sensor.name}</p>
                          <p className="mt-1 text-xs text-slate-600">{sensor.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Firmware */}
            <FadeIn delay={0.3}>
              <div className="rounded-lg border border-slate-200 bg-slate-900 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-white">
                  {translations.firmware.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {translations.firmware.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {translations.firmware.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-2 text-sm text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
