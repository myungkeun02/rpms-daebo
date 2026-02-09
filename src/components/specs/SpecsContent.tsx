'use client';

import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  BoltIcon,
  CubeIcon,
  SignalIcon,
  ShieldCheckIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline';
import { FadeIn } from '@/components/ui/animations';

interface SpecItem {
  label: string;
  value: string;
}

interface SensorItem {
  name: string;
  description: string;
}

interface ProtocolItem {
  name: string;
  version: string;
  description: string;
}

interface SpecsContentProps {
  translations: {
    hero: {
      badge: string;
      title: string;
      description: string;
    };
    unit: {
      badge: string;
      title: string;
      description: string;
      specs: SpecItem[];
      sensors: {
        title: string;
        items: SensorItem[];
      };
    };
    electrical: {
      badge: string;
      title: string;
      description: string;
      specs: SpecItem[];
      protection: {
        title: string;
        items: string[];
      };
    };
    physical: {
      badge: string;
      title: string;
      description: string;
      specs: SpecItem[];
    };
    protocol: {
      badge: string;
      title: string;
      description: string;
      items: ProtocolItem[];
    };
  };
}

// RPMS Unit Visualization
function RPMSUnitVisualization() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <motion.div
        className="relative rounded-lg border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 p-6 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between rounded-md bg-slate-800 p-3">
          <div className="flex items-center gap-2">
            <CpuChipIcon className="h-5 w-5 text-slate-200" />
            <span className="text-sm font-medium text-white">RPMS Unit</span>
          </div>
          <motion.div
            className="flex items-center gap-1.5"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="h-2 w-2 rounded-full bg-primary-400" />
            <span className="text-xs text-slate-200">ON</span>
          </motion.div>
        </div>

        {/* 4-Port Grid */}
        <div className="mt-4 rounded-md bg-slate-800 p-4">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((port) => (
              <motion.div
                key={port}
                className="relative rounded-md border border-slate-600 bg-slate-700 p-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: port * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Port {port}</span>
                  <motion.div
                    className="h-2 w-2 rounded-full bg-primary-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: port * 0.2 }}
                  />
                </div>
                <div className="mt-2 space-y-1 text-[10px] text-slate-400">
                  <div className="flex justify-between">
                    <span>V</span>
                    <span className="text-slate-300">{(220 + Math.random() * 5).toFixed(1)}V</span>
                  </div>
                  <div className="flex justify-between">
                    <span>A</span>
                    <span className="text-slate-300">{(Math.random() * 10).toFixed(2)}A</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-4 flex items-center justify-between rounded-md bg-slate-700 p-3">
          <div className="flex gap-2 text-[10px] text-slate-400">
            <span>Temp: 38°C</span>
            <span>|</span>
            <span>4 Ports Active</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">192.168.1.100</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function SpecsContent({ translations }: SpecsContentProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(239,68,68,0.1)_0%,_transparent_50%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-md border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-300">
              {translations.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {translations.hero.title}
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              {translations.hero.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* RPMS Unit Specs */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Visualization */}
            <RPMSUnitVisualization />

            {/* Specs */}
            <FadeIn>
              <span className="inline-block rounded-md bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
                {translations.unit.badge}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                {translations.unit.title}
              </h2>
              <p className="mt-4 text-gray-600">
                {translations.unit.description}
              </p>

              {/* Specs table */}
              <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <dl className="space-y-4">
                  {translations.unit.specs.map((spec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm font-medium text-gray-600">{spec.label}</dt>
                      <dd className="text-sm font-semibold text-gray-900">{spec.value}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>

              {/* Sensors */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">{translations.unit.sensors.title}</h3>
                <div className="mt-4 grid gap-3">
                  {translations.unit.sensors.items.map((sensor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 rounded-lg bg-slate-900 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20">
                        <BoltIcon className="h-5 w-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{sensor.name}</p>
                        <p className="text-sm text-slate-400">{sensor.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Electrical Specs */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="inline-block rounded-md bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-600">
              {translations.electrical.badge}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {translations.electrical.title}
            </h2>
            <p className="mt-4 text-gray-600">
              {translations.electrical.description}
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Specs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
                  <BoltIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Power Specs</h3>
              </div>
              <dl className="mt-6 space-y-4">
                {translations.electrical.specs.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <dt className="text-gray-600">{spec.label}</dt>
                    <dd className="font-semibold text-gray-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* Protection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900">
                  <ShieldCheckIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{translations.electrical.protection.title}</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {translations.electrical.protection.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Physical Specs */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="inline-block rounded-md bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700">
              {translations.physical.badge}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {translations.physical.title}
            </h2>
            <p className="mt-4 text-gray-600">
              {translations.physical.description}
            </p>
          </FadeIn>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 max-w-2xl"
          >
            <div className="rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
              {translations.physical.specs.map((spec, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-5 ${
                    index !== translations.physical.specs.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CubeIcon className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700">{spec.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Communication Protocols */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="inline-block rounded-md border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-300">
              {translations.protocol.badge}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white">
              {translations.protocol.title}
            </h2>
            <p className="mt-4 text-gray-400">
              {translations.protocol.description}
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {translations.protocol.items.map((protocol, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
                  <SignalIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{protocol.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary-400">{protocol.version}</p>
                <p className="mt-3 text-sm text-gray-400">{protocol.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
