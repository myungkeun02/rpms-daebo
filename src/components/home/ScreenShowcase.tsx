'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';

interface ScreenShowcaseProps {
  locale: string;
}

export default function ScreenShowcase({ locale }: ScreenShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isKo = locale === 'ko';

  // Translations
  const t = useMemo(() => ({
    badge: 'Web Interface',
    title: isKo ? '직관적인 웹 대시보드' : 'Intuitive Web Dashboard',
    subtitle: isKo
      ? '어디서나 웹 브라우저로 장비 상태 확인 및 원격 제어'
      : 'Monitor equipment status and remote control from any web browser',
    screens: {
      dashboard: {
        title: isKo ? '대시보드' : 'Dashboard',
        description: isKo ? '전체 장비 상태를 한눈에 모니터링' : 'Monitor all equipment at a glance',
      },
      portControl: {
        title: isKo ? '포트 제어' : 'Port Control',
        description: isKo ? '개별 포트 ON/OFF 및 상태 확인' : 'Individual port ON/OFF and status',
      },
      thresholds: {
        title: isKo ? '임계값 설정' : 'Threshold Settings',
        description: isKo ? '온도/전압/전류 알람 임계값 관리' : 'Manage temperature/voltage/current alarm thresholds',
      },
      eventLogs: {
        title: isKo ? '이벤트 로그' : 'Event Logs',
        description: isKo ? '실시간 알람 및 이벤트 기록' : 'Real-time alarms and event history',
      },
    },
    labels: {
      allOn: isKo ? '전체 ON' : 'All ON',
      allOff: isKo ? '전체 OFF' : 'All OFF',
      recentEvents: isKo ? '최근 이벤트' : 'Recent Events',
      control: isKo ? '제어' : 'Control',
      alarm: isKo ? '알람' : 'Alarm',
      status: isKo ? '상태' : 'Status',
    },
  }), [isKo]);

  // Real screens based on actual RMS system
  const screens = useMemo(() => [
    {
      id: 1,
      title: t.screens.dashboard.title,
      description: t.screens.dashboard.description,
      gradient: 'from-slate-800 to-slate-900',
      content: (
        <div className="h-full p-4 text-white">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold">RPMS Dashboard</span>
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded bg-slate-700" />
              <div className="h-6 w-6 rounded bg-slate-700" />
            </div>
          </div>
          {/* Stats */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Total', value: '12', color: 'text-white' },
              { label: 'Online', value: '10', color: 'text-primary-400' },
              { label: 'Offline', value: '2', color: 'text-gray-600' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-slate-700/50 p-2 text-center">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          {/* Device List */}
          <div className="space-y-2">
            {['VMS-01', 'CCTV-A2', 'Detector-03'].map((device, i) => (
              <div key={device} className="flex items-center justify-between rounded bg-slate-700/30 p-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${i < 2 ? 'bg-primary-400' : 'bg-gray-600'}`} />
                  <span className="text-xs">{device}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className={`h-1.5 w-1.5 rounded-full ${j < 3 ? 'bg-primary-400' : 'bg-slate-500'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Events */}
          <div className="mt-4 rounded-lg bg-slate-700/30 p-3">
            <div className="mb-2 text-xs text-slate-400">{t.labels.recentEvents}</div>
            <div className="space-y-1">
              {[
                { type: 'success', msg: 'Port 1 ON - VMS-01' },
                { type: 'alert', msg: 'Temp Alert - 45°C' },
              ].map((e, i) => (
                <div key={i} className={`rounded px-2 py-1 text-[10px] ${e.type === 'alert' ? 'bg-primary-500/20 text-primary-300' : 'bg-primary-500/20 text-primary-300'}`}>
                  {e.msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: t.screens.portControl.title,
      description: t.screens.portControl.description,
      gradient: 'from-slate-800 to-slate-900',
      content: (
        <div className="h-full p-4 text-white">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">VMS-01</div>
              <div className="text-[10px] text-slate-400">192.168.1.100</div>
            </div>
            <div className="rounded bg-primary-500/20 px-2 py-0.5 text-xs text-primary-400">
              ONLINE
            </div>
          </div>
          {/* Port Table */}
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-1 text-center text-[8px] text-slate-400">
              <span>Port</span>
              <span>Status</span>
              <span>V</span>
              <span>A</span>
              <span>Control</span>
            </div>
            {[
              { port: 1, on: true, v: '223.4', a: '2.1' },
              { port: 2, on: true, v: '221.8', a: '1.8' },
              { port: 3, on: false, v: '0.0', a: '0.0' },
              { port: 4, on: true, v: '224.2', a: '3.2' },
            ].map((p) => (
              <div key={p.port} className="grid grid-cols-5 items-center gap-1 rounded bg-slate-700/30 p-2 text-center text-xs">
                <span className="font-mono">{p.port}</span>
                <span className={p.on ? 'text-primary-400' : 'text-slate-500'}>{p.on ? 'ON' : 'OFF'}</span>
                <span className="font-mono text-primary-400">{p.v}</span>
                <span className="font-mono text-gray-400">{p.a}</span>
                <div className={`mx-auto h-4 w-8 rounded-full ${p.on ? 'bg-primary-500' : 'bg-slate-600'} p-0.5`}>
                  <div className={`h-3 w-3 rounded-full bg-white transition-transform ${p.on ? 'translate-x-4' : ''}`} />
                </div>
              </div>
            ))}
          </div>
          {/* Batch Control */}
          <div className="mt-4 flex gap-2">
            <button className="flex-1 rounded bg-primary-500 py-2 text-xs font-medium">{t.labels.allOn}</button>
            <button className="flex-1 rounded bg-gray-600 py-2 text-xs font-medium">{t.labels.allOff}</button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: t.screens.thresholds.title,
      description: t.screens.thresholds.description,
      gradient: 'from-slate-800 to-slate-900',
      content: (
        <div className="h-full p-4 text-white">
          <div className="mb-4 text-sm font-semibold">Threshold Settings</div>
          {/* Temperature */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-slate-400">Temperature</span>
              <span className="font-mono text-gray-400">-10°C ~ 60°C</span>
            </div>
            <div className="relative h-2 rounded-full bg-slate-700">
              <div className="absolute left-[20%] right-[30%] h-full rounded-full bg-gradient-to-r from-primary-500 via-gray-500 to-primary-500" />
              <div className="absolute left-[20%] top-1/2 h-4 w-1 -translate-y-1/2 rounded bg-white" />
              <div className="absolute right-[30%] top-1/2 h-4 w-1 -translate-y-1/2 rounded bg-white" />
            </div>
          </div>
          {/* Voltage */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-slate-400">Voltage</span>
              <span className="font-mono text-primary-400">200V ~ 240V</span>
            </div>
            <div className="relative h-2 rounded-full bg-slate-700">
              <div className="absolute left-[25%] right-[20%] h-full rounded-full bg-primary-500" />
            </div>
          </div>
          {/* Current */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-slate-400">Current</span>
              <span className="font-mono text-gray-400">0A ~ 16A</span>
            </div>
            <div className="relative h-2 rounded-full bg-slate-700">
              <div className="absolute left-0 right-[40%] h-full rounded-full bg-gray-500" />
            </div>
          </div>
          {/* Event Enable */}
          <div className="rounded-lg bg-slate-700/30 p-3">
            <div className="mb-2 text-xs text-slate-400">Event Enable</div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((p) => (
                <div key={p} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-400">Port {p}</span>
                  <div className={`h-4 w-8 rounded-full ${p < 4 ? 'bg-primary-500' : 'bg-slate-600'} p-0.5`}>
                    <div className={`h-3 w-3 rounded-full bg-white ${p < 4 ? 'translate-x-4' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: t.screens.eventLogs.title,
      description: t.screens.eventLogs.description,
      gradient: 'from-slate-800 to-slate-900',
      content: (
        <div className="h-full p-4 text-white">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold">Event Logs</span>
            <div className="flex gap-1">
              {[t.labels.control, t.labels.alarm, t.labels.status].map((f) => (
                <span key={f} className="rounded bg-slate-700 px-2 py-0.5 text-[10px]">{f}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {[
              { time: '14:32:15', type: 'control', msg: 'Port 1 Remote ON', color: 'primary' },
              { time: '14:30:22', type: 'alarm', msg: 'Temp Over 45°C', color: 'primary' },
              { time: '14:28:05', type: 'status', msg: 'Status Poll Response', color: 'primary' },
              { time: '14:25:33', type: 'control', msg: 'Port 3 Remote OFF', color: 'gray' },
              { time: '14:22:10', type: 'alarm', msg: 'Voltage Under 200V', color: 'primary' },
              { time: '14:20:00', type: 'status', msg: 'Keep-Alive Received', color: 'slate' },
            ].map((e, i) => (
              <div key={i} className={`flex items-start gap-2 rounded bg-${e.color}-500/10 p-2`}>
                <div className={`mt-0.5 h-2 w-2 rounded-full bg-${e.color}-400`} />
                <div className="flex-1">
                  <div className="text-xs">{e.msg}</div>
                  <div className="text-[10px] text-slate-500">{e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ], [t]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [screens.length]);

  const getScreenStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff % screens.length) + screens.length) % screens.length;

    if (normalizedDiff === 0) {
      return { zIndex: 40, x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1 };
    } else if (normalizedDiff === 1) {
      return { zIndex: 30, x: 200, y: 20, scale: 0.85, rotateY: -15, opacity: 0.6 };
    } else if (normalizedDiff === screens.length - 1) {
      return { zIndex: 30, x: -200, y: 20, scale: 0.85, rotateY: 15, opacity: 0.6 };
    } else {
      return { zIndex: 10, x: 0, y: 50, scale: 0.7, rotateY: 0, opacity: 0.3 };
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-24 lg:py-32">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400 ring-1 ring-primary-500/20">
            {t.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {t.subtitle}
          </p>
        </FadeIn>

        {/* Screen carousel */}
        <div className="relative mt-16 h-[520px]" style={{ perspective: '1500px' }}>
          <div className="relative mx-auto h-full w-full max-w-lg">
            {screens.map((screen, index) => {
              const style = getScreenStyle(index);
              return (
                <motion.div
                  key={screen.id}
                  className="absolute left-1/2 top-1/2 w-[300px] cursor-pointer"
                  animate={{
                    x: style.x - 150,
                    y: style.y - 220,
                    scale: style.scale,
                    rotateY: style.rotateY,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => setCurrentIndex(index)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Monitor frame */}
                  <div className="overflow-hidden rounded-xl border-4 border-slate-700 bg-slate-800 shadow-2xl">
                    {/* Browser bar */}
                    <div className="flex h-7 items-center gap-2 bg-slate-700 px-3">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-500" />
                      </div>
                      <div className="flex-1 rounded bg-slate-600 px-2 py-0.5 text-center">
                        <span className="text-[8px] text-slate-400">rpms.anjsolution.com</span>
                      </div>
                    </div>
                    {/* Screen content */}
                    <div className={`h-[400px] bg-gradient-to-br ${screen.gradient}`}>
                      {screen.content}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="mt-8 flex justify-center gap-3">
          {screens.map((screen, index) => (
            <button
              key={screen.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Current screen info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-center"
          >
            <h3 className="text-xl font-semibold text-white">
              {screens[currentIndex].title}
            </h3>
            <p className="mt-1 text-slate-400">{screens[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
