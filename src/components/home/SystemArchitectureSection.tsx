'use client';

import { motion } from 'framer-motion';
import {
  ServerStackIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  SignalIcon,
  BuildingOffice2Icon,
  TruckIcon,
  VideoCameraIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

interface SystemArchitectureSectionProps {
  locale: string;
}

// ITS Equipment Icons
const equipmentData = [
  { icon: CubeIcon, label: 'VMS', labelKo: 'VMS', color: 'from-primary-500 to-primary-700' },
  { icon: VideoCameraIcon, label: 'CCTV', labelKo: 'CCTV', color: 'from-primary-500 to-primary-700' },
  { icon: TruckIcon, label: 'Detector', labelKo: '검지기', color: 'from-gray-700 to-gray-900' },
  { icon: SignalIcon, label: 'Comm.', labelKo: '통신장비', color: 'from-primary-500 to-primary-700' },
];

export default function SystemArchitectureSection({ locale }: SystemArchitectureSectionProps) {
  const isKo = locale === 'ko';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
        <motion.div
          className="absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary-400/5 blur-[100px]"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gray-400/5 blur-[100px]"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <BuildingOffice2Icon className="h-4 w-4 text-primary-500" />
            {isKo ? '시스템 구성도' : 'System Architecture'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            {isKo ? '통합 원격 전원 관리' : 'Integrated Remote Power Management'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600"
          >
            {isKo
              ? '고속도로 ITS 장비와 RPMS 서버의 실시간 연동 구조'
              : 'Real-time integration between highway ITS equipment and RPMS server'}
          </motion.p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="mt-16">
          <div className="relative mx-auto max-w-5xl">
            {/* Central Server */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mx-auto mb-16 flex flex-col items-center"
            >
              {/* Text above the icon */}
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                {isKo ? 'RPMS 서버' : 'RPMS Server'}
              </h3>
              <p className="mb-4 text-sm text-slate-500">
                {isKo ? '웹 대시보드 & TCP 서버' : 'Web Dashboard & TCP Server'}
              </p>

              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 to-gray-500/20 blur-xl" />

                <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-2xl shadow-primary-500/30">
                  <ServerStackIcon className="h-16 w-16 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Connection Lines to RPMS Devices */}
            <div className="relative">
              {/* Connection SVG - starts from outside the primary box */}
              <svg
                className="absolute left-1/2 top-0 h-24 w-full -translate-x-1/2"
                viewBox="0 0 800 100"
                preserveAspectRatio="none"
                style={{ marginTop: '-6rem' }}
              >
                {/* 4 lines branching from center top to each RPMS unit */}
                {[100, 300, 500, 700].map((x, i) => (
                  <motion.path
                    key={i}
                    d={`M 400 0 Q ${x} 50 ${x} 100`}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  />
                ))}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#005B23" />
                    <stop offset="100%" stopColor="#003050" />
                  </linearGradient>
                </defs>
              </svg>

              {/* RPMS Devices Row */}
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {[1, 2, 3, 4].map((unit) => (
                  <motion.div
                    key={unit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: unit * 0.15 }}
                    className="group relative"
                  >
                    {/* RPMS Unit Card */}
                    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-lg transition-all hover:border-primary-300 hover:shadow-xl">
                      {/* Unit Header */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                            <CubeIcon className="h-5 w-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">RPMS-4P</p>
                            <p className="text-[10px] text-slate-400">Unit #{unit}</p>
                          </div>
                        </div>
                        <motion.div
                          className="h-2 w-2 rounded-full bg-primary-400"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: unit * 0.3 }}
                        />
                      </div>

                      {/* Port Status Indicators */}
                      <div className="mb-3 grid grid-cols-4 gap-1">
                        {[1, 2, 3, 4].map((port) => {
                          const isOn = port <= 3;
                          return (
                            <div
                              key={port}
                              className={`flex h-6 items-center justify-center rounded text-[10px] font-medium ${
                                isOn
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              P{port}
                            </div>
                          );
                        })}
                      </div>

                      {/* Equipment connected */}
                      <div className="flex-1 space-y-1">
                        {equipmentData.slice(0, unit === 4 ? 2 : 3).map((eq, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 rounded bg-slate-50 px-2 py-1"
                          >
                            <eq.icon className="h-3 w-3 text-slate-500" />
                            <span className="text-[10px] text-slate-600">
                              {isKo ? eq.labelKo : eq.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* IP Address */}
                      <div className="mt-auto pt-3 text-center">
                        <span className="font-mono text-[10px] text-slate-400">
                          192.168.1.10{unit}
                        </span>
                      </div>
                    </div>

                    {/* Data flow animation */}
                    <motion.div
                      className="absolute -top-4 left-1/2 h-4 w-1 -translate-x-1/2 rounded-full bg-primary-400"
                      animate={{ y: [0, 16, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: unit * 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Client Devices */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex items-center justify-center gap-8"
            >
              {/* Internet Cloud */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <GlobeAltIcon className="h-6 w-6 text-slate-600" />
                  </div>
                  <span className="mt-2 text-xs text-slate-500">Internet</span>
                </div>

                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-2 rounded-full bg-slate-300"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop */}
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
                  <ComputerDesktopIcon className="h-8 w-8 text-white" />
                </div>
                <span className="mt-2 text-xs font-medium text-slate-700">
                  {isKo ? '관제센터' : 'Control Center'}
                </span>
              </div>

              {/* Mobile */}
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg">
                  <DevicePhoneMobileIcon className="h-8 w-8 text-white" />
                </div>
                <span className="mt-2 text-xs font-medium text-slate-700">
                  {isKo ? '현장 모니터링' : 'Field Monitoring'}
                </span>
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary-400" />
                <span className="text-xs text-slate-600">{isKo ? '온라인' : 'Online'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <span className="text-xs text-slate-600">{isKo ? '오프라인' : 'Offline'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded bg-gradient-to-r from-primary-400 to-gray-400" />
                <span className="text-xs text-slate-600">{isKo ? 'TCP/IP 연결' : 'TCP/IP Connection'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-2 w-1 rounded-full bg-slate-300" />
                  ))}
                </div>
                <span className="text-xs text-slate-600">{isKo ? '웹 접속' : 'Web Access'}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
