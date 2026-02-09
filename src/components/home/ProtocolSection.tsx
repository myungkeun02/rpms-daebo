'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowsRightLeftIcon,
  ServerStackIcon,
  ComputerDesktopIcon,
  ClockIcon,
  SignalIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface ProtocolSectionProps {
  translations: {
    title: string;
    subtitle: string;
    features: {
      realtime: string;
      keepalive: string;
      events: string;
      control: string;
    };
  };
}

// Packet Animation Component
function PacketFlow() {
  const [activePacket, setActivePacket] = useState<number | null>(null);

  const packets = [
    { opcode: '0x11', name: 'STATUS_REQ', direction: 'right', color: 'green' },
    { opcode: '0x12', name: 'STATUS_RES', direction: 'left', color: 'green' },
    { opcode: '0x21', name: 'CTRL_CMD', direction: 'right', color: 'gray' },
    { opcode: '0x22', name: 'CTRL_ACK', direction: 'left', color: 'green' },
  ];

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Devices */}
      <div className="flex items-center justify-between">
        {/* Server */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30">
              <ComputerDesktopIcon className="h-12 w-12 text-white" />
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="mt-3 text-sm font-bold text-white">Web Server</span>
          <span className="text-xs text-slate-400">192.168.1.10:3000</span>
        </motion.div>

        {/* Connection Lines with Animated Packets */}
        <div className="relative flex-1 px-8">
          {/* Base connection line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-700" />

          {/* Animated packets */}
          {packets.map((packet, i) => (
            <motion.div
              key={packet.opcode}
              className="absolute left-0 right-0"
              style={{ top: `${20 + i * 20}%` }}
            >
              {/* Packet */}
              <motion.div
                className={`absolute flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono shadow-lg ${
                  packet.color === 'green'
                    ? 'bg-primary-500 text-white'
                    : packet.color === 'gray'
                      ? 'bg-gray-700 text-white'
                      : 'bg-primary-500 text-white'
                }`}
                animate={{
                  x: packet.direction === 'right' ? ['0%', '300%'] : ['300%', '0%'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: 'easeInOut',
                }}
                onMouseEnter={() => setActivePacket(i)}
                onMouseLeave={() => setActivePacket(null)}
              >
                <span className="font-bold">{packet.opcode}</span>
                <span className="hidden sm:inline">{packet.name}</span>
              </motion.div>
            </motion.div>
          ))}

          {/* Arrow indicator */}
          <ArrowsRightLeftIcon className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-slate-500" />
        </div>

        {/* RPMS Device */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg shadow-slate-900/50">
              <ServerStackIcon className="h-12 w-12 text-white" />
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <span className="mt-3 text-sm font-bold text-white">RPMS Device</span>
          <span className="text-xs text-slate-400">192.168.1.100:502</span>
        </motion.div>
      </div>

      {/* Packet Info Popup */}
      {activePacket !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 top-full mt-4 -translate-x-1/2 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-xl"
        >
          <div className="text-xs text-slate-400">Packet Info</div>
          <div className="mt-2 font-mono text-sm">
            <span className="text-primary-400">{packets[activePacket].opcode}</span>
            <span className="ml-2 text-white">{packets[activePacket].name}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Protocol Feature Card
function ProtocolFeatureCard({
  icon: Icon,
  title,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm transition-all hover:border-primary-500/50 hover:bg-slate-800"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-500/10 p-2">
          <Icon className="h-5 w-5 text-primary-400" />
        </div>
        <p className="text-sm font-medium text-white">{title}</p>
      </div>
      <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-primary-500/5 blur-xl transition-all group-hover:bg-primary-500/10" />
    </motion.div>
  );
}

// Protocol Hex Display
function HexDisplay() {
  const hexData = [
    { label: 'STX', value: '0x02', color: 'text-primary-400' },
    { label: 'DevID', value: '0xFF', color: 'text-primary-400' },
    { label: 'OpCode', value: '0x11', color: 'text-gray-400' },
    { label: 'Length', value: '0x08', color: 'text-primary-400' },
    { label: 'Data', value: '...', color: 'text-slate-400' },
    { label: 'CRC', value: '0xAB', color: 'text-primary-400' },
    { label: 'ETX', value: '0x03', color: 'text-primary-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto mt-12 max-w-2xl"
    >
      <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Protocol Frame Structure (v2.2)</span>
          <div className="flex items-center gap-2">
            <motion.div
              className="h-2 w-2 rounded-full bg-primary-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[10px] text-primary-400">ACTIVE</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {hexData.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            >
              <span className={`font-mono text-sm font-bold ${item.color}`}>
                {item.value}
              </span>
              <span className="mt-1 text-[10px] text-slate-500">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProtocolSection({ translations }: ProtocolSectionProps) {
  const features = [
    { icon: ClockIcon, title: translations.features.realtime },
    { icon: SignalIcon, title: translations.features.keepalive },
    { icon: BoltIcon, title: translations.features.events },
    { icon: ArrowsRightLeftIcon, title: translations.features.control },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Circuit board pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Data flow lines */}
        <svg className="absolute inset-0 h-full w-full opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1="0%"
              y1={`${20 + i * 15}%`}
              x2="100%"
              y2={`${20 + i * 15}%`}
              stroke="url(#gradient)"
              strokeWidth="1"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#005B23" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
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
            className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400"
          >
            <ArrowsRightLeftIcon className="h-4 w-4" />
            TCP/IP Protocol
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

        {/* Packet Flow Animation */}
        <div className="mt-16">
          <PacketFlow />
        </div>

        {/* Hex Display */}
        <HexDisplay />

        {/* Feature Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <ProtocolFeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
