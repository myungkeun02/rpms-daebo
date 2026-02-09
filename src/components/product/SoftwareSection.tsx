'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { FadeIn } from '@/components/ui/animations';
import {
  LayoutDashboard,
  Server,
  Activity,
  ScrollText,
  Settings,
  Building2,
  GitBranch,
  ChevronRight,
  ChevronDown,
  MapPin,
  Zap,
  Thermometer,
  AlertTriangle,
  Wifi,
  WifiOff,
  User,
  Power,
  BarChart3,
  Plus,
  RefreshCw,
  Search,
  Bell,
  Monitor,
  Volume2,
  Clock,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────

interface HQStatusItem {
  name: string;
  online: number;
  total: number;
}

interface TreeDevice {
  id: string;
  online: boolean;
}

interface TreeBranch {
  name: string;
  devices: TreeDevice[];
}

interface TreeHQ {
  name: string;
  branches: TreeBranch[];
}

interface PortData {
  voltage: string;
  current: string;
  temp: string;
  status: string;
}

interface EventData {
  time: string;
  type: string;
  typeKey: string;
  device: string;
  hq: string;
  message: string;
}

interface DeviceListItem {
  hq: string;
  branch: string;
  id: string;
  name: string;
  online: boolean;
  ip: string;
}

interface OfflineDevice {
  id: string;
  name: string;
  lastSeen: string;
}

interface SoftwareSectionProps {
  translations: {
    badge: string;
    title: string;
    description: string;
    dashboard: { title: string; description: string; url: string };
    sidebar: {
      title: string;
      subtitle: string;
      dashboard: string;
      devices: string;
      monitoring: string;
      events: string;
      settings: string;
      admin: string;
      adminRole: string;
    };
    welcome: { hq: string; user: string; greeting: string; connected: string };
    hqStatus: { title: string; totalLabel: string; items: HQStatusItem[] };
    mapView: { title: string; online: string; offline: string; unit: string };
    treeView: { title: string; online: string; offline: string; headquarters: TreeHQ[] };
    portMonitor: {
      title: string;
      voltage: string;
      current: string;
      temperature: string;
      power: string;
      allOn: string;
      allOff: string;
      ports: PortData[];
    };
    eventLog: {
      title: string;
      total: string;
      columns: { time: string; type: string; device: string; hq: string; message: string };
      events: EventData[];
      pagination: string;
    };
    deviceListView: {
      title: string;
      total: string;
      addDevice: string;
      columns: { hq: string; branch: string; deviceId: string; name: string; status: string; ip: string };
      devices: DeviceListItem[];
    };
    monitoringView: {
      title: string;
      selectedDevice: string;
      sensors: {
        tempLabel: string;
        tempValue: string;
        voltageLabel: string;
        voltageValue: string;
        currentLabel: string;
        currentValue: string;
      };
      offlineTitle: string;
      offlineDesc: string;
      offlineDevices: OfflineDevice[];
    };
    settingsView: {
      title: string;
      tabs: { system: string; notifications: string; display: string };
      system: {
        title: string;
        pendingTimeout: string;
        pendingValue: string;
        pollingInterval: string;
        pollingValue: string;
        allowUnregistered: string;
      };
      notifications: {
        title: string;
        eventModal: string;
        alarmSound: string;
        volume: string;
        volumeValue: string;
      };
      display: {
        title: string;
        pageSize: string;
        pageSizeValue: string;
        dashboardEvents: string;
        dashboardEventsValue: string;
      };
    };
    capabilities: Array<{ title: string; description: string }>;
    note: string;
  };
}

// ─── Constants ───────────────────────────────────────────

const mapMarkers = [
  { x: 50, y: 18, id: 'RPMS-001', online: true },
  { x: 55, y: 25, id: 'RPMS-004', online: true },
  { x: 45, y: 42, id: 'RPMS-006', online: true },
  { x: 42, y: 46, id: 'RPMS-007', online: false },
  { x: 62, y: 55, id: 'RPMS-009', online: true },
  { x: 60, y: 62, id: 'RPMS-012', online: false },
  { x: 35, y: 68, id: 'RPMS-013', online: true },
];

const eventTypeConfig: Record<string, { icon: typeof Zap; color: string; bg: string }> = {
  power: { icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  temp: { icon: Thermometer, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  offline: { icon: WifiOff, color: 'text-red-400', bg: 'bg-red-400/10' },
  online: { icon: Wifi, color: 'text-green-400', bg: 'bg-green-400/10' },
  status: { icon: Activity, color: 'text-gray-400', bg: 'bg-gray-400/10' },
};

const sidebarNavIcons = [LayoutDashboard, Server, Activity, ScrollText, Settings];

const viewTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

// ─── Main Component ─────────────────────────────────────

export default function SoftwareSection({ translations }: SoftwareSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const sidebarNavItems = [
    translations.sidebar.dashboard,
    translations.sidebar.devices,
    translations.sidebar.monitoring,
    translations.sidebar.events,
    translations.sidebar.settings,
  ];

  return (
    <section className="relative overflow-hidden bg-gray-900 py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center">
          <span className="inline-block rounded-md bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400 backdrop-blur-sm">
            {translations.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {translations.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            {translations.description}
          </p>
        </FadeIn>

        {/* ─── Dashboard App Frame ──────────────────────── */}
        <FadeIn delay={0.2} className="mt-16">
          <div className="relative mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-xl bg-gray-950 shadow-2xl ring-1 ring-white/10"
            >
              {/* Window Chrome */}
              <div className="flex items-center gap-3 border-b border-white/5 bg-gray-900 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs font-medium text-gray-400">
                    {translations.dashboard.title}
                  </span>
                </div>
                <div className="rounded bg-gray-800 px-3 py-0.5">
                  <span className="font-mono text-[10px] text-gray-500">
                    {translations.dashboard.url}
                  </span>
                </div>
              </div>

              {/* Sidebar + Content */}
              <div className="flex min-h-[600px] lg:min-h-[680px]">
                {/* Sidebar */}
                <div className="hidden w-48 flex-shrink-0 border-r border-white/5 bg-gray-900/50 md:flex md:flex-col">
                  <div className="border-b border-white/5 px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
                        <Power className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{translations.sidebar.title}</div>
                        <div className="text-[10px] text-gray-500">{translations.sidebar.subtitle}</div>
                      </div>
                    </div>
                  </div>

                  <nav className="flex-1 space-y-0.5 px-2 py-3">
                    {sidebarNavItems.map((item, i) => {
                      const Icon = sidebarNavIcons[i];
                      const isActive = i === activeTab;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveTab(i)}
                          className={cn(
                            'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-all',
                            isActive
                              ? 'border-l-2 border-primary-400 bg-primary-500/10 text-primary-400'
                              : 'border-l-2 border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {item}
                        </button>
                      );
                    })}
                  </nav>

                  <div className="border-t border-white/5 px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700">
                        <User className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-medium text-gray-300">
                          {translations.sidebar.admin}
                        </div>
                        <div className="text-[9px] text-gray-600">
                          {translations.sidebar.adminRole}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Tab Bar */}
                <div className="flex w-full flex-col md:hidden">
                  <div className="flex border-b border-white/5 bg-gray-900/50">
                    {sidebarNavItems.map((item, i) => {
                      const Icon = sidebarNavIcons[i];
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveTab(i)}
                          className={cn(
                            'flex flex-1 flex-col items-center gap-1 py-2.5 text-[9px] font-medium transition-colors',
                            i === activeTab
                              ? 'border-b-2 border-primary-400 text-primary-400'
                              : 'text-gray-600'
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {item}
                        </button>
                      );
                    })}
                  </div>
                  <MainContent activeTab={activeTab} translations={translations} />
                </div>

                {/* Desktop Content */}
                <div className="hidden flex-1 overflow-hidden md:block">
                  <MainContent activeTab={activeTab} translations={translations} />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -inset-4 -z-10 rounded-xl bg-gradient-to-r from-primary-500/20 to-primary-500/20 opacity-0 blur-2xl"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </FadeIn>

        {/* Capabilities 2x2 Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {translations.capabilities.map((capability, index) => (
            <FadeIn key={index} delay={0.6 + index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-6 ring-1 ring-white/10 transition-shadow hover:shadow-xl hover:shadow-primary-500/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-500/10">
                  <span className="text-2xl font-bold text-primary-400">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {capability.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Security Note */}
        <FadeIn delay={1} className="mt-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-3xl rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-6 ring-1 ring-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-500/10">
                <LockClosedIcon className="h-5 w-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-gray-300">
                  <span className="font-semibold text-white">보안 안내:</span>{' '}
                  {translations.note}
                </p>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Main Content Router ─────────────────────────────────

function MainContent({
  activeTab,
  translations,
}: {
  activeTab: number;
  translations: SoftwareSectionProps['translations'];
}) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <AnimatePresence mode="wait">
        {activeTab === 0 && (
          <motion.div key="dashboard" {...viewTransition} className="space-y-4 p-4 lg:p-5">
            <WelcomeBanner translations={translations.welcome} />
            <HQStatusCarousel translations={translations.hqStatus} />
            <div className="grid gap-4 lg:grid-cols-2">
              <MockDeviceMap translations={translations.mapView} />
              <MockDeviceTree translations={translations.treeView} />
            </div>
            <EventLogTable translations={translations.eventLog} />
          </motion.div>
        )}
        {activeTab === 1 && (
          <motion.div key="devices" {...viewTransition} className="p-4 lg:p-5">
            <DeviceListView translations={translations.deviceListView} mapView={translations.mapView} />
          </motion.div>
        )}
        {activeTab === 2 && (
          <motion.div key="monitoring" {...viewTransition} className="space-y-4 p-4 lg:p-5">
            <MonitoringView
              portMonitor={translations.portMonitor}
              monitoringView={translations.monitoringView}
            />
          </motion.div>
        )}
        {activeTab === 3 && (
          <motion.div key="events" {...viewTransition} className="p-4 lg:p-5">
            <EventLogFullView translations={translations.eventLog} />
          </motion.div>
        )}
        {activeTab === 4 && (
          <motion.div key="settings" {...viewTransition} className="p-4 lg:p-5">
            <SettingsView translations={translations.settingsView} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab 0: Dashboard View ───────────────────────────────

function WelcomeBanner({
  translations,
}: {
  translations: SoftwareSectionProps['translations']['welcome'];
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-800/40 p-4 ring-1 ring-white/5 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Building2 className="h-3 w-3" />
          <span className="font-medium text-gray-300">{translations.hq}</span>
          <span>{translations.user}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-white">{translations.greeting}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-gray-500" suppressHydrationWarning>
          2025.02.09 14:23:15
        </span>
        <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-medium text-green-400">{translations.connected}</span>
        </div>
      </div>
    </div>
  );
}

function HQStatusCarousel({
  translations,
}: {
  translations: SoftwareSectionProps['translations']['hqStatus'];
}) {
  const allOnline = translations.items.reduce((sum, i) => sum + i.online, 0);
  const allTotal = translations.items.reduce((sum, i) => sum + i.total, 0);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <BarChart3 className="h-3.5 w-3.5 text-gray-500" />
        <span className="text-xs font-medium text-gray-400">{translations.title}</span>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        <div className="flex-shrink-0 rounded-lg border border-primary-500/30 bg-primary-500/5 px-4 py-3">
          <div className="text-[10px] font-medium text-primary-400">{translations.totalLabel}</div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-lg font-bold text-white">{allOnline}</span>
            <span className="text-xs text-gray-500">/ {allTotal}</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${(allOnline / allTotal) * 100}%` }}
            />
          </div>
        </div>
        {translations.items.map((item, i) => {
          const ratio = item.total > 0 ? item.online / item.total : 0;
          const statusColor = ratio >= 0.8 ? 'bg-green-400' : ratio >= 0.5 ? 'bg-amber-400' : 'bg-red-400';
          return (
            <div key={i} className="flex-shrink-0 rounded-lg bg-gray-800/60 px-4 py-3 ring-1 ring-white/5">
              <div className="flex items-center gap-1.5">
                <div className={cn('h-1.5 w-1.5 rounded-full', statusColor)} />
                <span className="text-[10px] font-medium text-gray-400">{item.name}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-lg font-bold text-white">{item.online}</span>
                <span className="text-xs text-gray-500">/ {item.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockDeviceMap({ translations }: { translations: SoftwareSectionProps['translations']['mapView'] }) {
  return (
    <div className="rounded-lg bg-gray-800/50 ring-1 ring-white/5">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs font-medium text-gray-300">{translations.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-[10px] text-gray-500">{translations.online}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-[10px] text-gray-500">{translations.offline}</span>
          </div>
        </div>
      </div>
      <div className="relative h-[260px] overflow-hidden lg:h-[300px]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d="M 50 12 C 50 25, 48 35, 45 45 C 42 55, 55 60, 60 70 C 65 80, 62 88, 60 92" stroke="rgba(100,116,139,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
          <path d="M 45 45 C 40 55, 35 60, 32 72 C 30 78, 30 82, 30 88" stroke="rgba(100,116,139,0.25)" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
          <path d="M 45 42 C 55 40, 65 35, 78 30" stroke="rgba(100,116,139,0.25)" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
          <path d="M 44 15 C 48 13, 56 13, 58 18 C 60 22, 56 26, 50 26 C 44 26, 42 20, 44 15" stroke="rgba(100,116,139,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          {mapMarkers.map((m, i) => (
            <g key={i}>
              {m.online && (
                <circle cx={m.x} cy={m.y} r="3.5" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5">
                  <animate attributeName="r" values="2;5;2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={m.x} cy={m.y} r="2" fill={m.online ? '#22c55e' : '#ef4444'} stroke={m.online ? '#166534' : '#991b1b'} strokeWidth="0.5" />
              <text x={m.x + 4} y={m.y + 1} className="fill-gray-500" style={{ fontSize: '3px' }} fontFamily="monospace">{m.id}</text>
            </g>
          ))}
        </svg>
        <div className="absolute bottom-3 left-3 rounded bg-gray-900/80 px-2 py-1 backdrop-blur-sm">
          <span className="text-[10px] text-gray-400">{mapMarkers.length} {translations.unit}</span>
        </div>
      </div>
    </div>
  );
}

function MockDeviceTree({ translations }: { translations: SoftwareSectionProps['translations']['treeView'] }) {
  const [expandedHQs, setExpandedHQs] = useState<Set<number>>(new Set([0]));
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set(['0-0']));

  const toggleHQ = (idx: number) => {
    setExpandedHQs((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };
  const toggleBranch = (key: string) => {
    setExpandedBranches((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="rounded-lg bg-gray-800/50 ring-1 ring-white/5">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <Server className="h-3.5 w-3.5 text-gray-500" />
        <span className="text-xs font-medium text-gray-300">{translations.title}</span>
      </div>
      <div className="h-[260px] overflow-y-auto p-3 lg:h-[300px]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
        <div className="space-y-0.5">
          {translations.headquarters.map((hq, hqIdx) => {
            const hqOnline = hq.branches.reduce((s, b) => s + b.devices.filter((d) => d.online).length, 0);
            const hqTotal = hq.branches.reduce((s, b) => s + b.devices.length, 0);
            const isHQExp = expandedHQs.has(hqIdx);
            return (
              <div key={hqIdx}>
                <button onClick={() => toggleHQ(hqIdx)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors hover:bg-white/5">
                  {isHQExp ? <ChevronDown className="h-3 w-3 text-gray-500" /> : <ChevronRight className="h-3 w-3 text-gray-500" />}
                  <Building2 className="h-3.5 w-3.5 text-blue-400" />
                  <span className="flex-1 text-xs font-medium text-gray-200">{hq.name}</span>
                  <span className="rounded bg-gray-700/50 px-1.5 py-0.5 text-[10px] text-gray-400">{hqOnline}/{hqTotal}</span>
                </button>
                {isHQExp && hq.branches.map((branch, bIdx) => {
                  const bKey = `${hqIdx}-${bIdx}`;
                  const bOnline = branch.devices.filter((d) => d.online).length;
                  const isBExp = expandedBranches.has(bKey);
                  return (
                    <div key={bIdx} className="ml-5">
                      <button onClick={() => toggleBranch(bKey)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors hover:bg-white/5">
                        {isBExp ? <ChevronDown className="h-3 w-3 text-gray-600" /> : <ChevronRight className="h-3 w-3 text-gray-600" />}
                        <GitBranch className="h-3 w-3 text-gray-500" />
                        <span className="flex-1 text-[11px] text-gray-300">{branch.name}</span>
                        <span className="rounded bg-gray-700/50 px-1.5 py-0.5 text-[10px] text-gray-500">{bOnline}/{branch.devices.length}</span>
                      </button>
                      {isBExp && branch.devices.map((device, dIdx) => (
                        <div key={dIdx} className="ml-7 flex items-center gap-2 rounded px-2 py-1 transition-colors hover:bg-white/5">
                          <div className={cn('h-1.5 w-1.5 rounded-full', device.online ? 'bg-green-400' : 'bg-red-400')} />
                          <Server className="h-3 w-3 text-gray-600" />
                          <span className="flex-1 font-mono text-[11px] text-gray-400">{device.id}</span>
                          <span className={cn('rounded px-1.5 py-0.5 text-[9px] font-medium', device.online ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>
                            {device.online ? translations.online : translations.offline}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventLogTable({ translations }: { translations: SoftwareSectionProps['translations']['eventLog'] }) {
  return (
    <div className="rounded-lg bg-gray-800/50 ring-1 ring-white/5">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <ScrollText className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs font-medium text-gray-300">{translations.title}</span>
        </div>
        <span className="text-[10px] text-gray-500">{translations.total}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-gray-800/30">
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500">{translations.columns.time}</th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500">{translations.columns.type}</th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500">{translations.columns.device}</th>
              <th className="hidden px-3 py-2 text-left text-[10px] font-medium text-gray-500 sm:table-cell">{translations.columns.hq}</th>
              <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500">{translations.columns.message}</th>
            </tr>
          </thead>
          <tbody>
            {translations.events.map((event, i) => {
              const config = eventTypeConfig[event.typeKey] || eventTypeConfig.status;
              const EventIcon = config.icon;
              return (
                <tr key={i} className="border-b border-white/[0.02] transition-colors hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[11px] text-gray-500">{event.time}</td>
                  <td className="px-3 py-2">
                    <span className={cn('inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium', config.bg, config.color)}>
                      <EventIcon className="h-2.5 w-2.5" />
                      {event.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px] text-gray-400">{event.device}</td>
                  <td className="hidden px-3 py-2 text-[11px] text-gray-500 sm:table-cell">{event.hq}</td>
                  <td className="px-3 py-2 text-[11px] text-gray-400">{event.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2">
        <span className="text-[10px] text-gray-600">{translations.pagination}</span>
        <div className="flex gap-1">
          <div className="rounded bg-gray-700/30 px-2 py-0.5 text-[10px] text-gray-600">‹</div>
          <div className="rounded bg-primary-500/20 px-2 py-0.5 text-[10px] font-medium text-primary-400">1</div>
          <div className="rounded bg-gray-700/30 px-2 py-0.5 text-[10px] text-gray-600">2</div>
          <div className="rounded bg-gray-700/30 px-2 py-0.5 text-[10px] text-gray-600">3</div>
          <div className="rounded bg-gray-700/30 px-2 py-0.5 text-[10px] text-gray-600">›</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 1: Device List View ─────────────────────────────

function DeviceListView({
  translations,
  mapView,
}: {
  translations: SoftwareSectionProps['translations']['deviceListView'];
  mapView: SoftwareSectionProps['translations']['mapView'];
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{translations.title}</h3>
          <p className="text-[11px] text-gray-500">{translations.total}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 rounded-md bg-gray-800 px-2.5 py-1.5 ring-1 ring-white/5">
            <Search className="h-3 w-3 text-gray-500" />
            <span className="text-[10px] text-gray-600">Search...</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-primary-500/20 px-2.5 py-1.5 text-[10px] font-medium text-primary-400">
            <Plus className="h-3 w-3" />
            {translations.addDevice}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg ring-1 ring-white/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-gray-800/50">
              <th className="px-3 py-2.5 text-left text-[10px] font-medium text-gray-500">{translations.columns.hq}</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-medium text-gray-500">{translations.columns.branch}</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-medium text-gray-500">{translations.columns.deviceId}</th>
              <th className="hidden px-3 py-2.5 text-left text-[10px] font-medium text-gray-500 sm:table-cell">{translations.columns.name}</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-medium text-gray-500">{translations.columns.status}</th>
              <th className="hidden px-3 py-2.5 text-left text-[10px] font-medium text-gray-500 lg:table-cell">{translations.columns.ip}</th>
              <th className="px-2 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {translations.devices.map((device, i) => (
              <tr key={i} className="border-b border-white/[0.02] transition-colors hover:bg-white/[0.02]">
                <td className="px-3 py-2.5 text-[11px] text-gray-400">{device.hq}</td>
                <td className="px-3 py-2.5 text-[11px] text-gray-400">{device.branch}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Server className="h-3 w-3 text-gray-600" />
                    <span className="font-mono text-[11px] text-gray-300">{device.id}</span>
                  </div>
                </td>
                <td className="hidden px-3 py-2.5 text-[11px] text-gray-400 sm:table-cell">{device.name}</td>
                <td className="px-3 py-2.5">
                  <span className={cn('inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium',
                    device.online ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>
                    {device.online ? <Wifi className="h-2.5 w-2.5" /> : <WifiOff className="h-2.5 w-2.5" />}
                    {device.online ? mapView.online : mapView.offline}
                  </span>
                </td>
                <td className="hidden px-3 py-2.5 font-mono text-[10px] text-gray-500 lg:table-cell">{device.ip}</td>
                <td className="px-2 py-2.5">
                  <MoreHorizontal className="h-3.5 w-3.5 text-gray-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab 2: Monitoring View ──────────────────────────────

function MonitoringView({
  portMonitor,
  monitoringView,
}: {
  portMonitor: SoftwareSectionProps['translations']['portMonitor'];
  monitoringView: SoftwareSectionProps['translations']['monitoringView'];
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{monitoringView.title}</h3>
          <p className="text-[11px] text-gray-500">{monitoringView.selectedDevice}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1">
            <motion.div className="h-1.5 w-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] font-medium text-green-400">Online</span>
          </div>
          <div className="rounded bg-gray-800 p-1.5 ring-1 ring-white/5">
            <RefreshCw className="h-3 w-3 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Sensor Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-800/50 p-3 ring-1 ring-white/5">
          <div className="flex items-center gap-1.5">
            <Thermometer className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[10px] text-gray-500">{monitoringView.sensors.tempLabel}</span>
          </div>
          <div className="mt-1 text-lg font-bold text-white">{monitoringView.sensors.tempValue}</div>
        </div>
        <div className="rounded-lg bg-gray-800/50 p-3 ring-1 ring-white/5">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] text-gray-500">{monitoringView.sensors.voltageLabel}</span>
          </div>
          <div className="mt-1 text-lg font-bold text-white">{monitoringView.sensors.voltageValue}</div>
        </div>
        <div className="rounded-lg bg-gray-800/50 p-3 ring-1 ring-white/5">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[10px] text-gray-500">{monitoringView.sensors.currentLabel}</span>
          </div>
          <div className="mt-1 text-lg font-bold text-white">{monitoringView.sensors.currentValue}</div>
        </div>
      </div>

      {/* Port Cards */}
      <div className="rounded-lg bg-gray-800/50 ring-1 ring-white/5">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-300">{portMonitor.title}</span>
          </div>
          <div className="flex gap-1.5">
            <div className="rounded bg-primary-500/10 px-2 py-0.5 text-[10px] font-medium text-primary-400">{portMonitor.allOn}</div>
            <div className="rounded bg-gray-700/50 px-2 py-0.5 text-[10px] font-medium text-gray-500">{portMonitor.allOff}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
          {portMonitor.ports.map((port, i) => {
            const isWarning = parseFloat(port.temp) > 35;
            return (
              <div key={i} className="rounded-lg bg-gray-900/60 p-3 ring-1 ring-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-300">Port {i + 1}</span>
                  <div className="flex items-center gap-1">
                    <motion.div className="h-2 w-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                    <span className="text-[10px] font-medium text-green-400">{port.status}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <div className="h-4 w-8 rounded-full bg-primary-500/80 p-0.5">
                    <div className="ml-auto h-3 w-3 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-blue-400" />
                      <span className="text-[10px] text-gray-500">{portMonitor.voltage}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-white">{port.voltage}V</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-cyan-400" />
                      <span className="text-[10px] text-gray-500">{portMonitor.current}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-white">{port.current}A</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Thermometer className={cn('h-3 w-3', isWarning ? 'text-amber-400' : 'text-green-400')} />
                      <span className="text-[10px] text-gray-500">{portMonitor.temperature}</span>
                    </div>
                    <span className={cn('font-mono text-xs font-semibold', isWarning ? 'text-amber-400' : 'text-white')}>{port.temp}°C</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offline Devices */}
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
          <span className="text-xs font-medium text-red-400">{monitoringView.offlineTitle}</span>
          <span className="text-[10px] text-gray-500">— {monitoringView.offlineDesc}</span>
        </div>
        <div className="mt-3 space-y-2">
          {monitoringView.offlineDevices.map((d, i) => (
            <div key={i} className="flex items-center justify-between rounded bg-gray-900/40 px-3 py-2">
              <div className="flex items-center gap-2">
                <WifiOff className="h-3 w-3 text-red-400" />
                <span className="font-mono text-[11px] text-gray-300">{d.id}</span>
                <span className="text-[11px] text-gray-500">{d.name}</span>
              </div>
              <span className="font-mono text-[10px] text-gray-600">{d.lastSeen}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Tab 3: Event Log Full View ──────────────────────────

function EventLogFullView({ translations }: { translations: SoftwareSectionProps['translations']['eventLog'] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{translations.title}</h3>
          <p className="text-[11px] text-gray-500">{translations.total}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 rounded bg-green-500/10 px-2 py-1">
            <motion.div className="h-1.5 w-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] text-green-400">Auto-refresh</span>
          </div>
          <div className="rounded bg-gray-800 p-1.5 ring-1 ring-white/5">
            <RefreshCw className="h-3 w-3 text-gray-500" />
          </div>
        </div>
      </div>
      <EventLogTable translations={translations} />
    </div>
  );
}

// ─── Tab 4: Settings View ────────────────────────────────

function SettingsView({ translations }: { translations: SoftwareSectionProps['translations']['settingsView'] }) {
  const [activeSettingsTab, setActiveSettingsTab] = useState(0);
  const tabs = [translations.tabs.system, translations.tabs.notifications, translations.tabs.display];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">{translations.title}</h3>

      {/* Settings Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-800/50 p-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveSettingsTab(i)}
            className={cn(
              'flex-1 rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors',
              i === activeSettingsTab ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      {activeSettingsTab === 0 && (
        <div className="rounded-lg bg-gray-800/50 p-4 ring-1 ring-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-300">{translations.system.title}</span>
          </div>
          <div className="space-y-4">
            <SettingRow label={translations.system.pendingTimeout}>
              <div className="rounded bg-gray-700 px-2.5 py-1 text-[11px] text-gray-300">{translations.system.pendingValue}</div>
            </SettingRow>
            <SettingRow label={translations.system.pollingInterval}>
              <div className="rounded bg-gray-700 px-2.5 py-1 text-[11px] text-gray-300">{translations.system.pollingValue}</div>
            </SettingRow>
            <SettingRow label={translations.system.allowUnregistered}>
              <MockToggle checked={false} />
            </SettingRow>
          </div>
        </div>
      )}

      {activeSettingsTab === 1 && (
        <div className="rounded-lg bg-gray-800/50 p-4 ring-1 ring-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-300">{translations.notifications.title}</span>
          </div>
          <div className="space-y-4">
            <SettingRow label={translations.notifications.eventModal}>
              <MockToggle checked={true} />
            </SettingRow>
            <SettingRow label={translations.notifications.alarmSound}>
              <MockToggle checked={true} />
            </SettingRow>
            <SettingRow label={translations.notifications.volume}>
              <div className="flex items-center gap-2">
                <Volume2 className="h-3 w-3 text-gray-500" />
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-700">
                  <div className="h-full w-4/5 rounded-full bg-primary-500" />
                </div>
                <span className="text-[10px] text-gray-400">{translations.notifications.volumeValue}</span>
              </div>
            </SettingRow>
          </div>
        </div>
      )}

      {activeSettingsTab === 2 && (
        <div className="rounded-lg bg-gray-800/50 p-4 ring-1 ring-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-300">{translations.display.title}</span>
          </div>
          <div className="space-y-4">
            <SettingRow label={translations.display.pageSize}>
              <div className="rounded bg-gray-700 px-2.5 py-1 text-[11px] text-gray-300">{translations.display.pageSizeValue}</div>
            </SettingRow>
            <SettingRow label={translations.display.dashboardEvents}>
              <div className="rounded bg-gray-700 px-2.5 py-1 text-[11px] text-gray-300">{translations.display.dashboardEventsValue}</div>
            </SettingRow>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-[11px] text-gray-400">{label}</span>
      {children}
    </div>
  );
}

function MockToggle({ checked }: { checked: boolean }) {
  return (
    <div className={cn('h-4 w-8 rounded-full p-0.5', checked ? 'bg-primary-500/80' : 'bg-gray-600')}>
      <div className={cn('h-3 w-3 rounded-full bg-white shadow-sm transition-all', checked ? 'ml-auto' : 'ml-0')} />
    </div>
  );
}
