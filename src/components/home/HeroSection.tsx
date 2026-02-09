'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface HeroSectionProps {
  locale: string;
  translations: {
    subtitle: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

// Deterministic particle positions
const particles = [
  { left: 5, top: 10, duration: 4, delay: 0 },
  { left: 15, top: 80, duration: 5, delay: 1 },
  { left: 25, top: 30, duration: 3.5, delay: 2 },
  { left: 85, top: 25, duration: 5, delay: 1.2 },
  { left: 95, top: 55, duration: 6, delay: 2 },
  { left: 75, top: 70, duration: 4, delay: 0.8 },
];

// Port status data for visualization
const portData = [
  { port: 1, status: 'on', voltage: 223.4, current: 2.1, label: 'VMS-01' },
  { port: 2, status: 'on', voltage: 221.8, current: 1.8, label: 'CCTV-A' },
  { port: 3, status: 'on', voltage: 224.2, current: 3.2, label: 'Detector' },
  { port: 4, status: 'off', voltage: 0, current: 0, label: 'Reserve' },
];

export default function HeroSection({ locale, translations }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated highway background pattern */}
      <div className="absolute inset-0">
        {/* Road lines animation */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 bg-white"
              style={{
                width: '100px',
                left: '50%',
                top: `${20 + i * 15}%`,
                transform: 'translateX(-50%)',
              }}
              animate={{
                y: [0, 100, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary-500/20 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-gray-500/20 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40"
            style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
            animate={{ y: [0, -50, 0], opacity: [0, 1, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-400" />
                {translations.subtitle}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              <span className="block text-gray-100">{translations.title.split(' ').slice(0, 3).join(' ')}</span>
              <span className="mt-2 block bg-gradient-to-r from-primary-400 via-primary-500 to-secondary bg-clip-text text-transparent">
                {translations.title.split(' ').slice(3).join(' ')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl"
            >
              {translations.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                href={`/${locale}/product`}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-secondary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-xl hover:shadow-secondary/40"
              >
                <span className="relative z-10">{translations.ctaPrimary}</span>
                <ArrowRightIcon className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </motion.div>
          </div>

          {/* 3D RPMS Panel Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              className="relative"
              animate={{ rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500/30 to-secondary/30 blur-2xl" />

              {/* Main Panel Box */}
              <div className="relative rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700 to-slate-800 p-6 shadow-2xl">
                {/* Panel Header */}
                <div className="mb-4 flex items-center justify-between border-b border-slate-600/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20">
                      <motion.div
                        className="h-3 w-3 rounded-full bg-primary-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">RPMS-4P</p>
                      <p className="text-xs text-slate-400">Station: 0x1234</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Temperature</p>
                    <motion.p
                      className="text-lg font-mono font-bold text-gray-400"
                      animate={{ opacity: [1, 0.8, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      32.5°C
                    </motion.p>
                  </div>
                </div>

                {/* Port Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {portData.map((port, i) => (
                    <motion.div
                      key={port.port}
                      className={`relative overflow-hidden rounded-xl border p-4 ${
                        port.status === 'on'
                          ? 'border-primary-500/30 bg-primary-500/10'
                          : 'border-slate-600/50 bg-slate-700/50'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {/* Port header */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className={`h-2 w-2 rounded-full ${
                              port.status === 'on' ? 'bg-primary-400' : 'bg-slate-500'
                            }`}
                            animate={port.status === 'on' ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="text-xs font-medium text-slate-300">
                            Port {port.port}
                          </span>
                        </div>
                        <span className={`text-[10px] font-semibold ${
                          port.status === 'on' ? 'text-primary-400' : 'text-slate-500'
                        }`}>
                          {port.status === 'on' ? 'ON' : 'OFF'}
                        </span>
                      </div>

                      {/* Port label */}
                      <p className="mb-2 text-sm font-medium text-white">{port.label}</p>

                      {/* Voltage/Current */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded bg-black/20 p-2 text-center">
                          <p className="text-[10px] text-slate-400">Voltage</p>
                          <motion.p
                            className={`font-mono text-sm font-bold ${
                              port.status === 'on' ? 'text-primary-400' : 'text-slate-500'
                            }`}
                            animate={port.status === 'on' ? { opacity: [1, 0.7, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          >
                            {port.voltage.toFixed(1)}V
                          </motion.p>
                        </div>
                        <div className="rounded bg-black/20 p-2 text-center">
                          <p className="text-[10px] text-slate-400">Current</p>
                          <motion.p
                            className={`font-mono text-sm font-bold ${
                              port.status === 'on' ? 'text-gray-400' : 'text-slate-500'
                            }`}
                            animate={port.status === 'on' ? { opacity: [1, 0.7, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 + 0.5 }}
                          >
                            {port.current.toFixed(1)}A
                          </motion.p>
                        </div>
                      </div>

                      {/* AC Outlet visualization */}
                      <div className="mt-3 flex justify-center">
                        <div className={`flex h-6 w-10 items-center justify-center rounded border ${
                          port.status === 'on'
                            ? 'border-primary-500/50 bg-primary-500/10'
                            : 'border-slate-600 bg-slate-700'
                        }`}>
                          <div className="flex gap-1">
                            <div className={`h-2 w-0.5 rounded-full ${
                              port.status === 'on' ? 'bg-primary-400' : 'bg-slate-500'
                            }`} />
                            <div className={`h-2 w-0.5 rounded-full ${
                              port.status === 'on' ? 'bg-primary-400' : 'bg-slate-500'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-4 flex items-center justify-between rounded-lg bg-black/30 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-primary-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs text-slate-400">TCP Connected</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">192.168.1.100</span>
                </div>
              </div>

              {/* Connection lines effect */}
              <motion.div
                className="absolute -right-16 top-1/2 h-px w-16 bg-gradient-to-r from-primary-500 to-transparent"
                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-500">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-slate-600">
            <motion.div
              className="mx-auto mt-1 h-2 w-1 rounded-full bg-slate-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
