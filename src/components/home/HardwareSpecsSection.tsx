'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  BoltIcon,
  CpuChipIcon,
  SignalIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

interface HardwareSpecsSectionProps {
  translations: {
    title: string;
    subtitle: string;
    specs: {
      ports: string;
      voltage: string;
      monitoring: string;
      temperature: string;
      breaker: string;
      communication: string;
    };
  };
}

// 3D Panel Component
function Panel3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [activePort, setActivePort] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setActivePort(null);
  };

  const portData = [
    { port: 1, status: 'on', label: 'VMS' },
    { port: 2, status: 'on', label: 'CCTV' },
    { port: 3, status: 'on', label: 'Detector' },
    { port: 4, status: 'off', label: 'Reserve' },
  ];

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-md"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1500px',
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-primary-500/20 via-gray-500/10 to-transparent blur-2xl" />

        {/* Main Panel Box */}
        <div className="relative rounded-2xl border-2 border-slate-600 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-6 shadow-2xl">
          {/* Panel Face Effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />

          {/* Top Label */}
          <div className="relative mb-6 flex items-center justify-between border-b border-slate-600/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-600/50 px-3 py-1.5">
                <span className="font-mono text-sm font-bold text-white">RPMS-4P</span>
              </div>
              <motion.div
                className="h-2 w-2 rounded-full bg-primary-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-400">AC 220V</span>
              <div className="h-4 w-px bg-slate-600" />
              <span className="font-mono text-xs text-slate-400">60Hz</span>
            </div>
          </div>

          {/* Circuit Breakers Row */}
          <div className="relative mb-6">
            <div className="mb-2 text-xs font-medium text-slate-400">Circuit Breakers</div>
            <div className="flex justify-center gap-3">
              {portData.map((port, i) => (
                <motion.div
                  key={port.port}
                  className={`relative cursor-pointer rounded-lg border-2 p-2 transition-colors ${
                    port.status === 'on'
                      ? 'border-primary-500/50 bg-slate-700'
                      : 'border-slate-600 bg-slate-800'
                  } ${activePort === i ? 'ring-2 ring-primary-400' : ''}`}
                  onMouseEnter={() => setActivePort(i)}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Breaker Handle */}
                  <motion.div
                    className={`mx-auto h-8 w-4 rounded ${
                      port.status === 'on' ? 'bg-primary-500' : 'bg-slate-500'
                    }`}
                    animate={port.status === 'on' ? { y: [0, -2, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-1 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
                  </motion.div>
                  <div className="mt-1 text-center text-[10px] font-medium text-slate-300">
                    {port.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AC Outlets Grid */}
          <div className="relative mb-6">
            <div className="mb-2 text-xs font-medium text-slate-400">AC Outlets (220V)</div>
            <div className="grid grid-cols-4 gap-3">
              {portData.map((port, i) => (
                <motion.div
                  key={`outlet-${port.port}`}
                  className={`group relative flex h-16 items-center justify-center rounded-lg border-2 ${
                    port.status === 'on'
                      ? 'border-primary-500/30 bg-slate-700/50'
                      : 'border-slate-600/50 bg-slate-800/50'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ borderColor: 'rgba(239, 68, 68, 0.5)' }}
                >
                  {/* Outlet Shape */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-2">
                      <div
                        className={`h-4 w-1 rounded-full ${
                          port.status === 'on' ? 'bg-primary-400' : 'bg-slate-500'
                        }`}
                      />
                      <div
                        className={`h-4 w-1 rounded-full ${
                          port.status === 'on' ? 'bg-primary-400' : 'bg-slate-500'
                        }`}
                      />
                    </div>
                    <div
                      className={`h-2 w-1.5 rounded-full ${
                        port.status === 'on' ? 'bg-primary-400' : 'bg-slate-500'
                      }`}
                    />
                  </div>

                  {/* Port Number */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="rounded bg-slate-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      P{port.port}
                    </span>
                  </div>

                  {/* Status LED */}
                  {port.status === 'on' && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="flex items-center justify-between rounded-lg bg-slate-900/50 px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Temperature */}
              <div className="flex items-center gap-2">
                <BeakerIcon className="h-4 w-4 text-gray-400" />
                <motion.span
                  className="font-mono text-sm font-bold text-gray-400"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  32.5°C
                </motion.span>
              </div>
              {/* Network */}
              <div className="flex items-center gap-2">
                <SignalIcon className="h-4 w-4 text-primary-400" />
                <span className="font-mono text-xs text-primary-400">TCP OK</span>
              </div>
            </div>
            <div className="font-mono text-xs text-slate-500">
              192.168.1.100
            </div>
          </div>
        </div>

        {/* Floating specs indicators */}
        {activePort !== null && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-xl"
          >
            <div className="text-xs font-medium text-slate-400">
              Port {portData[activePort].port}
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">Voltage:</span>
                <span className="font-mono text-sm font-bold text-primary-400">
                  {portData[activePort].status === 'on' ? '223.4V' : '0.0V'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">Current:</span>
                <span className="font-mono text-sm font-bold text-gray-400">
                  {portData[activePort].status === 'on' ? '2.1A' : '0.0A'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">Status:</span>
                <span
                  className={`text-xs font-bold ${
                    portData[activePort].status === 'on' ? 'text-primary-400' : 'text-slate-500'
                  }`}
                >
                  {portData[activePort].status === 'on' ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function HardwareSpecsSection({ translations }: HardwareSpecsSectionProps) {
  const specs = [
    { icon: CpuChipIcon, label: translations.specs.ports, color: 'green' },
    { icon: BoltIcon, label: translations.specs.voltage, color: 'blue' },
    { icon: ChartIcon, label: translations.specs.monitoring, color: 'cyan' },
    { icon: BeakerIcon, label: translations.specs.temperature, color: 'orange' },
    { icon: ShieldIcon, label: translations.specs.breaker, color: 'purple' },
    { icon: SignalIcon, label: translations.specs.communication, color: 'indigo' },
  ];

  const colorMap: Record<string, string> = {
    green: 'from-primary-500 to-primary-600',
    blue: 'from-primary-500 to-primary-600',
    cyan: 'from-primary-500 to-primary-600',
    orange: 'from-gray-700 to-gray-900',
    purple: 'from-primary-500 to-primary-600',
    indigo: 'from-gray-700 to-gray-900',
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 py-24 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-gray-500/10 blur-[150px]"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800 px-4 py-1.5 text-sm font-semibold text-slate-300"
          >
            <CpuChipIcon className="h-4 w-4 text-primary-400" />
            Hardware Specification
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {translations.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-400"
          >
            {translations.subtitle}
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* 3D Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Panel3D />
          </motion.div>

          {/* Specs List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800"
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg bg-gradient-to-br ${colorMap[spec.color]} p-2`}>
                    <spec.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{spec.label}</p>
                  </div>
                </div>
                {/* Hover glow */}
                <div className={`absolute -bottom-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br ${colorMap[spec.color]} opacity-0 blur-2xl transition-opacity group-hover:opacity-20`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Additional icons
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}
