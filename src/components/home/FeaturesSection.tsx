'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  BoltIcon,
  ChartBarIcon,
  BellAlertIcon,
  ClipboardDocumentListIcon,
  SignalIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

// Feature icons with RPMS-specific meanings
const featureIcons = {
  remoteControl: BoltIcon,
  monitoring: ChartBarIcon,
  scheduling: BellAlertIcon,
  alerts: ClipboardDocumentListIcon,
  security: SignalIcon,
  performance: Square3Stack3DIcon,
};

// Animated mini-visualizations for each feature
const featureVisuals = {
  remoteControl: () => (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4].map((port) => (
        <motion.div
          key={port}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: port * 0.1 }}
        >
          <motion.div
            className={`h-3 w-3 rounded-full ${port !== 4 ? 'bg-primary-400' : 'bg-slate-400'}`}
            animate={port !== 4 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: port * 0.2 }}
          />
          <span className="mt-1 text-[8px] text-slate-500">P{port}</span>
        </motion.div>
      ))}
    </div>
  ),
  monitoring: () => (
    <div className="flex items-end gap-1 h-8">
      {[65, 45, 80, 55, 70, 60, 75].map((height, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-t bg-gradient-to-t from-secondary to-primary-400"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        />
      ))}
    </div>
  ),
  scheduling: () => (
    <div className="flex flex-col gap-1">
      {['Temp', 'V', 'A'].map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-[8px] text-slate-500 w-6">{label}</span>
          <div className="h-1.5 w-16 rounded-full bg-slate-200">
            <motion.div
              className={`h-full rounded-full ${
                i === 0 ? 'bg-gray-400' : i === 1 ? 'bg-primary-400' : 'bg-gray-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${60 + i * 10}%` }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
  alerts: () => (
    <div className="flex flex-col gap-1">
      {[
        { type: 'alarm', color: 'bg-primary-400' },
        { type: 'control', color: 'bg-primary-400' },
        { type: 'status', color: 'bg-gray-400' },
      ].map((event, i) => (
        <motion.div
          key={event.type}
          className="flex items-center gap-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <div className={`h-1.5 w-1.5 rounded-full ${event.color}`} />
          <div className="h-1 w-12 rounded bg-slate-200" />
          <span className="text-[7px] text-slate-400">12:0{i}</span>
        </motion.div>
      ))}
    </div>
  ),
  security: () => (
    <div className="flex items-center gap-2">
      <motion.div
        className="h-2 w-2 rounded-full bg-primary-400"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <div className="flex gap-0.5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="h-3 w-0.5 bg-primary-400 rounded-full"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
      <span className="text-[8px] text-slate-500">TCP</span>
    </div>
  ),
  performance: () => (
    <div className="grid grid-cols-4 gap-0.5">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`h-4 w-4 rounded border ${
            i < 4
              ? 'border-primary-400/50 bg-primary-400/20'
              : 'border-slate-300 bg-slate-100'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {i < 4 && (
            <motion.div
              className="h-1 w-1 mx-auto mt-1.5 rounded-full bg-primary-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  ),
};

interface FeaturesSectionProps {
  translations: {
    title: string;
    subtitle: string;
    items: {
      key: string;
      title: string;
      description: string;
    }[];
  };
}

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className={`h-full transition-all duration-200 ${isHovered ? 'scale-[1.02]' : ''}`}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Gradient background colors for each feature
const gradientColors = [
  'from-primary-500/10 via-primary-500/5 to-transparent',
  'from-primary-500/10 via-primary-500/5 to-transparent',
  'from-gray-500/10 via-gray-500/5 to-transparent',
  'from-primary-500/10 via-primary-500/5 to-transparent',
  'from-primary-500/10 via-primary-500/5 to-transparent',
  'from-gray-500/10 via-gray-500/5 to-transparent',
];

const iconGradients = [
  'from-primary-500 to-primary-600',
  'from-primary-500 to-primary-600',
  'from-gray-700 to-gray-900',
  'from-primary-500 to-primary-600',
  'from-primary-500 to-primary-600',
  'from-gray-700 to-gray-900',
];

export default function FeaturesSection({ translations }: FeaturesSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-primary-400/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-40 bottom-1/4 h-[600px] w-[600px] rounded-full bg-gray-400/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" />
            RPMS Core Features
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            {translations.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            {translations.subtitle}
          </motion.p>
        </motion.div>

        {/* Features Grid with 3D Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1000px' }}>
          {translations.items.map((feature, index) => {
            const Icon = featureIcons[feature.key as keyof typeof featureIcons] || BoltIcon;
            const Visual = featureVisuals[feature.key as keyof typeof featureVisuals];

            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard>
                  <div className={`group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-2xl`}>
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    {/* Decorative corner */}
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-slate-100 to-transparent opacity-50" />

                    <div className="relative z-10">
                      {/* Icon and Badge */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          className={`inline-flex rounded-xl bg-gradient-to-br ${iconGradients[index]} p-3 shadow-lg`}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>

                        {/* Mini visualization */}
                        <div className="rounded-lg bg-slate-50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                          {Visual && <Visual />}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="mt-5 text-lg font-bold text-slate-900">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {feature.description}
                      </p>

                      {/* Feature index */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${iconGradients[index]}`} />
                        <span className="text-xs font-medium text-slate-400">
                          0{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Animated border on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent"
                      initial={false}
                      whileHover={{
                        borderColor: 'rgba(239, 68, 68, 0.3)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decoration - Connection diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 shadow-lg backdrop-blur-sm">
            {/* RPMS Device */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900">
                <Square3Stack3DIcon className="h-6 w-6 text-white" />
              </div>
              <span className="mt-2 text-xs font-medium text-slate-600">RPMS</span>
            </div>

            {/* Connection animation */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 w-2 rounded-full bg-primary-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>

            {/* Server */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700">
                <SignalIcon className="h-6 w-6 text-white" />
              </div>
              <span className="mt-2 text-xs font-medium text-slate-600">Server</span>
            </div>

            {/* Bidirectional arrows */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 w-2 rounded-full bg-primary-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: (4 - i) * 0.15 }}
                />
              ))}
            </div>

            {/* Web Dashboard */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-900">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <span className="mt-2 text-xs font-medium text-slate-600">Dashboard</span>
            </div>

            {/* Live indicator */}
            <div className="absolute -right-2 -top-2">
              <motion.div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                LIVE
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
