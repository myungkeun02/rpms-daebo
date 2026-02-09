'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ServerIcon,
  ChartBarIcon,
  ClockIcon,
  BellAlertIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  PowerIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const featureIcons = {
  remoteControl: ServerIcon,
  monitoring: ChartBarIcon,
  scheduling: ClockIcon,
  alerts: BellAlertIcon,
  reporting: DocumentChartBarIcon,
  security: ShieldCheckIcon,
};

const featureGradients = {
  remoteControl: 'from-primary-500 to-primary-600',
  monitoring: 'from-gray-500 to-gray-600',
  scheduling: 'from-gray-500 to-gray-600',
  alerts: 'from-primary-500 to-primary-600',
  reporting: 'from-gray-500 to-gray-600',
  security: 'from-primary-500 to-primary-600',
};

const featureBgs = {
  remoteControl: 'bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900',
  monitoring: 'bg-gradient-to-br from-slate-900 via-gray-950 to-slate-900',
  scheduling: 'bg-gradient-to-br from-slate-900 via-gray-950 to-slate-900',
  alerts: 'bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900',
  reporting: 'bg-gradient-to-br from-slate-900 via-gray-950 to-slate-900',
  security: 'bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900',
};

type FeatureKey = keyof typeof featureIcons;

interface FeaturesGridProps {
  features: {
    key: FeatureKey;
    title: string;
    description: string;
    details: string[];
  }[];
}

// Remote Control Animation
function RemoteControlAnimation() {
  const ports = [
    { id: 1, status: 'on', label: 'Server-01' },
    { id: 2, status: 'on', label: 'Router-A' },
    { id: 3, status: 'off', label: 'Switch-02' },
    { id: 4, status: 'on', label: 'NAS-01' },
  ];

  return (
    <div className="relative h-72 w-full rounded-lg bg-slate-800/50 p-6 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/20">
          <PowerIcon className="h-4 w-4 text-primary-400" />
        </div>
        <span className="text-sm font-medium text-white">Power Control Panel</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {ports.map((port, i) => (
          <motion.div
            key={port.id}
            className="rounded-lg border border-slate-600/50 bg-slate-700/50 p-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Port {port.id}</span>
              <motion.div
                className={`h-2 w-2 rounded-full ${port.status === 'on' ? 'bg-primary-400' : 'bg-slate-500'}`}
                animate={port.status === 'on' ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            </div>
            <p className="mt-1 text-sm font-medium text-white">{port.label}</p>
            <motion.button
              className={`mt-2 w-full rounded-lg py-1.5 text-xs font-medium transition-colors ${
                port.status === 'on'
                  ? 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
                  : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {port.status === 'on' ? 'ON' : 'OFF'}
            </motion.button>
          </motion.div>
        ))}
      </div>
      {/* Toggle animation effect */}
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md bg-primary-500/20 px-3 py-1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-2 w-2 rounded-full bg-primary-400" />
        <span className="text-xs text-primary-400">원격 제어 활성</span>
      </motion.div>
    </div>
  );
}

// Monitoring Animation
function MonitoringAnimation() {
  const data = [35, 52, 48, 70, 62, 55, 78, 65, 72, 58, 80, 75];

  return (
    <div className="relative h-72 w-full rounded-lg bg-slate-800/50 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500/20">
            <ChartBarIcon className="h-4 w-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-white">실시간 모니터링</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-gray-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-gray-400">Live</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: '전압', value: '223.5V', color: 'text-primary-400' },
          { label: '전류', value: '12.8A', color: 'text-gray-400' },
          { label: '전력', value: '2.86kW', color: 'text-gray-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-lg bg-slate-700/50 p-2 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-[10px] text-slate-400">{stat.label}</p>
            <motion.p
              className={`font-mono text-sm font-bold ${stat.color}`}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {stat.value}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-4 h-24 rounded-lg bg-slate-700/30 p-3">
        <div className="flex h-full items-end gap-1">
          {data.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-gray-500 to-gray-400"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Scheduling Animation
function SchedulingAnimation() {
  const schedules = [
    { time: '06:00', action: 'ON', device: 'Server-01', active: false },
    { time: '09:00', action: 'ON', device: 'All Devices', active: true },
    { time: '18:00', action: 'OFF', device: 'Office-Zone', active: false },
    { time: '22:00', action: 'OFF', device: 'Non-Essential', active: false },
  ];

  return (
    <div className="relative h-72 w-full rounded-lg bg-slate-800/50 p-6 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500/20">
          <ClockIcon className="h-4 w-4 text-gray-400" />
        </div>
        <span className="text-sm font-medium text-white">스케줄 관리</span>
      </div>

      <div className="mt-4 space-y-2">
        {schedules.map((schedule, i) => (
          <motion.div
            key={i}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              schedule.active
                ? 'border-gray-500/50 bg-gray-500/10'
                : 'border-slate-600/50 bg-slate-700/30'
            }`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-white">{schedule.time}</span>
              <div className={`rounded px-2 py-0.5 text-xs font-medium ${
                schedule.action === 'ON'
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'bg-primary-500/20 text-primary-400'
              }`}>
                {schedule.action}
              </div>
            </div>
            <span className="text-xs text-slate-400">{schedule.device}</span>
            {schedule.active && (
              <motion.div
                className="absolute right-2 h-1 w-1 rounded-full bg-gray-400"
                animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Current time indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-gray-500/20 px-4 py-1.5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-xs text-gray-400">현재: 09:15</span>
      </motion.div>
    </div>
  );
}

// Alerts Animation
function AlertsAnimation() {
  const alerts = [
    { type: 'warning', message: '과전류 감지 - Port 3', time: '2분 전' },
    { type: 'info', message: '자동 재시작 완료', time: '5분 전' },
    { type: 'success', message: '시스템 정상 복구', time: '10분 전' },
  ];

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'warning': return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
      case 'info': return 'border-primary-500/50 bg-primary-500/10 text-primary-400';
      case 'success': return 'border-primary-500/50 bg-primary-500/10 text-primary-400';
      default: return 'border-slate-500/50 bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="relative h-72 w-full rounded-lg bg-slate-800/50 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <BellAlertIcon className="h-4 w-4 text-primary-400" />
          </motion.div>
          <span className="text-sm font-medium text-white">알림 센터</span>
        </div>
        <span className="rounded-md bg-primary-500/20 px-2 py-0.5 text-xs font-medium text-primary-400">
          3 new
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {alerts.map((alert, i) => (
          <motion.div
            key={i}
            className={`rounded-lg border p-3 ${getAlertStyle(alert.type)}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15, type: 'spring' }}
          >
            <div className="flex items-start justify-between">
              <p className="text-sm">{alert.message}</p>
              <span className="text-[10px] text-slate-500">{alert.time}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification bell animation */}
      <motion.div
        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-500"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <span className="text-xs font-bold text-white">!</span>
      </motion.div>
    </div>
  );
}

// Reporting Animation
function ReportingAnimation() {
  return (
    <div className="relative h-72 w-full rounded-lg bg-slate-800/50 p-6 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500/20">
          <DocumentChartBarIcon className="h-4 w-4 text-gray-400" />
        </div>
        <span className="text-sm font-medium text-white">리포트 생성</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Mini chart */}
        <motion.div
          className="rounded-lg bg-slate-700/50 p-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">전력 사용량</span>
            <span className="text-xs text-gray-400">+12%</span>
          </div>
          <div className="flex items-end gap-0.5 h-12">
            {[30, 45, 55, 40, 60, 50, 70].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gray-500/60"
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ delay: 0.2 + i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Pie chart simulation */}
        <motion.div
          className="rounded-lg bg-slate-700/50 p-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs text-slate-400">장비 상태</span>
          <div className="mt-2 flex items-center justify-center">
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-primary-400"
              style={{ borderRightColor: 'rgb(239 68 68)', borderBottomColor: 'rgb(251 191 36)' }}
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Export buttons */}
      <div className="mt-4 flex gap-2">
        {['PDF', 'Excel', 'CSV'].map((format, i) => (
          <motion.button
            key={format}
            className="flex-1 rounded-lg bg-slate-700/50 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            {format}
          </motion.button>
        ))}
      </div>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <motion.div
            className="h-4 w-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10" />
            </svg>
          </motion.div>
          <span>리포트 생성 중...</span>
        </div>
      </motion.div>
    </div>
  );
}

// Security Animation
function SecurityAnimation() {
  const logs = [
    { action: '로그인 성공', user: 'admin', ip: '192.168.1.100' },
    { action: '설정 변경', user: 'operator', ip: '192.168.1.105' },
    { action: '접근 차단', user: 'unknown', ip: '10.0.0.55' },
  ];

  return (
    <div className="relative h-72 w-full rounded-lg bg-slate-800/50 p-6 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShieldCheckIcon className="h-4 w-4 text-primary-400" />
          </motion.div>
          <span className="text-sm font-medium text-white">보안 관리</span>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-primary-500/20 px-2 py-0.5">
          <CheckCircleIcon className="h-3 w-3 text-primary-400" />
          <span className="text-xs text-primary-400">보호됨</span>
        </div>
      </div>

      {/* Security status */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <motion.div
          className="rounded-lg bg-primary-500/10 p-3 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <p className="text-lg font-bold text-primary-400">256-bit</p>
          <p className="text-[10px] text-slate-400">암호화</p>
        </motion.div>
        <motion.div
          className="rounded-lg bg-primary-500/10 p-3 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-lg font-bold text-primary-400">2FA</p>
          <p className="text-[10px] text-slate-400">인증</p>
        </motion.div>
      </div>

      {/* Access logs */}
      <div className="mt-3 space-y-1.5">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between rounded bg-slate-700/30 px-2 py-1.5 text-xs"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className={log.action.includes('차단') ? 'text-primary-400' : 'text-slate-300'}>
              {log.action}
            </span>
            <span className="font-mono text-slate-500">{log.ip}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const featureAnimations: Record<FeatureKey, React.FC> = {
  remoteControl: RemoteControlAnimation,
  monitoring: MonitoringAnimation,
  scheduling: SchedulingAnimation,
  alerts: AlertsAnimation,
  reporting: ReportingAnimation,
  security: SecurityAnimation,
};

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="relative">
      {features.map((feature, index) => {
        const Icon = featureIcons[feature.key];
        const gradient = featureGradients[feature.key];
        const bg = featureBgs[feature.key];
        const Animation = featureAnimations[feature.key];
        const isEven = index % 2 === 0;

        return (
          <section
            key={feature.key}
            className={`relative min-h-screen overflow-hidden ${bg}`}
          >
            {/* Background effects */}
            <div className="absolute inset-0">
              <motion.div
                className={`absolute h-96 w-96 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-[120px]`}
                style={{ left: isEven ? '10%' : '60%', top: '20%' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
              <div className={`grid w-full items-center gap-12 lg:grid-cols-2 ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                {/* Content */}
                <motion.div
                  className={isEven ? '' : 'lg:col-start-2'}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 rounded-md border border-white/10 bg-gradient-to-r ${gradient} bg-opacity-20 px-4 py-1.5 backdrop-blur-sm`}>
                    <Icon className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">Feature {index + 1}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    {feature.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Details */}
                  <ul className="mt-8 space-y-3">
                    {feature.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${gradient}`} />
                        <span className="text-gray-400">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Animation */}
                <motion.div
                  className={isEven ? '' : 'lg:col-start-1'}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <Animation />
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator for first section */}
            {index === 0 && (
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-slate-500">스크롤하여 더 보기</span>
                  <div className="h-8 w-5 rounded-full border border-slate-600">
                    <motion.div
                      className="mx-auto mt-1 h-2 w-1 rounded-full bg-slate-400"
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </section>
        );
      })}
    </div>
  );
}
