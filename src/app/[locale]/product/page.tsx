import type { Metadata } from 'next';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import ProductHero from '@/components/product/ProductHero';
import ProductOverview from '@/components/product/ProductOverview';
import FeaturesSection from '@/components/product/FeaturesSection';
import SoftwareSection from '@/components/product/SoftwareSection';
import ApplicationsSection from '@/components/product/ApplicationsSection';
import ProductCTA from '@/components/product/ProductCTA';

export const dynamic = 'error';
export const revalidate = false;

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale as Language, 'product');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface Highlight {
  title: string;
  description: string;
}

interface FeatureItem {
  key: string;
  title: string;
  description: string;
  details: string[];
}

interface Capability {
  title: string;
  description: string;
}

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

interface ApplicationItem {
  title: string;
  description: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'product');

  // Hero translations
  const heroTranslations = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
  };

  // Overview translations
  const overviewTranslations = {
    badge: t('overview.badge'),
    title: t('overview.title'),
    description: t('overview.description'),
    highlights: t('overview.highlights', { returnObjects: true }) as Highlight[],
  };

  // Features translations
  const featuresTranslations = {
    badge: t('features.badge'),
    title: t('features.title'),
    description: t('features.description'),
    items: t('features.items', { returnObjects: true }) as FeatureItem[],
  };

  // Software translations
  const softwareTranslations = {
    badge: t('software.badge'),
    title: t('software.title'),
    description: t('software.description'),
    dashboard: {
      title: t('software.dashboard.title'),
      description: t('software.dashboard.description'),
      url: t('software.dashboard.url'),
    },
    sidebar: t('software.sidebar', { returnObjects: true }) as {
      title: string;
      subtitle: string;
      dashboard: string;
      devices: string;
      monitoring: string;
      events: string;
      settings: string;
      admin: string;
      adminRole: string;
    },
    welcome: t('software.welcome', { returnObjects: true }) as {
      hq: string;
      user: string;
      greeting: string;
      connected: string;
    },
    hqStatus: {
      title: t('software.hqStatus.title'),
      totalLabel: t('software.hqStatus.totalLabel'),
      items: t('software.hqStatus.items', { returnObjects: true }) as HQStatusItem[],
    },
    mapView: t('software.mapView', { returnObjects: true }) as {
      title: string;
      online: string;
      offline: string;
      unit: string;
    },
    treeView: {
      title: t('software.treeView.title'),
      online: t('software.treeView.online'),
      offline: t('software.treeView.offline'),
      headquarters: t('software.treeView.headquarters', { returnObjects: true }) as TreeHQ[],
    },
    portMonitor: {
      title: t('software.portMonitor.title'),
      voltage: t('software.portMonitor.voltage'),
      current: t('software.portMonitor.current'),
      temperature: t('software.portMonitor.temperature'),
      power: t('software.portMonitor.power'),
      allOn: t('software.portMonitor.allOn'),
      allOff: t('software.portMonitor.allOff'),
      ports: t('software.portMonitor.ports', { returnObjects: true }) as PortData[],
    },
    eventLog: {
      title: t('software.eventLog.title'),
      total: t('software.eventLog.total'),
      columns: t('software.eventLog.columns', { returnObjects: true }) as {
        time: string;
        type: string;
        device: string;
        hq: string;
        message: string;
      },
      events: t('software.eventLog.events', { returnObjects: true }) as EventData[],
      pagination: t('software.eventLog.pagination'),
    },
    deviceListView: {
      title: t('software.deviceListView.title'),
      total: t('software.deviceListView.total'),
      addDevice: t('software.deviceListView.addDevice'),
      columns: t('software.deviceListView.columns', { returnObjects: true }) as {
        hq: string;
        branch: string;
        deviceId: string;
        name: string;
        status: string;
        ip: string;
      },
      devices: t('software.deviceListView.devices', {
        returnObjects: true,
      }) as DeviceListItem[],
    },
    monitoringView: {
      title: t('software.monitoringView.title'),
      selectedDevice: t('software.monitoringView.selectedDevice'),
      sensors: t('software.monitoringView.sensors', { returnObjects: true }) as {
        tempLabel: string;
        tempValue: string;
        voltageLabel: string;
        voltageValue: string;
        currentLabel: string;
        currentValue: string;
      },
      offlineTitle: t('software.monitoringView.offlineTitle'),
      offlineDesc: t('software.monitoringView.offlineDesc'),
      offlineDevices: t('software.monitoringView.offlineDevices', {
        returnObjects: true,
      }) as OfflineDevice[],
    },
    settingsView: {
      title: t('software.settingsView.title'),
      tabs: t('software.settingsView.tabs', { returnObjects: true }) as {
        system: string;
        notifications: string;
        display: string;
      },
      system: t('software.settingsView.system', { returnObjects: true }) as {
        title: string;
        pendingTimeout: string;
        pendingValue: string;
        pollingInterval: string;
        pollingValue: string;
        allowUnregistered: string;
      },
      notifications: t('software.settingsView.notifications', {
        returnObjects: true,
      }) as {
        title: string;
        eventModal: string;
        alarmSound: string;
        volume: string;
        volumeValue: string;
      },
      display: t('software.settingsView.display', { returnObjects: true }) as {
        title: string;
        pageSize: string;
        pageSizeValue: string;
        dashboardEvents: string;
        dashboardEventsValue: string;
      },
    },
    capabilities: t('software.capabilities', { returnObjects: true }) as Capability[],
    note: t('software.note'),
  };

  // Applications translations
  const applicationsTranslations = {
    badge: t('applications.badge'),
    title: t('applications.title'),
    description: t('applications.description'),
    items: t('applications.items', { returnObjects: true }) as ApplicationItem[],
  };

  // CTA translations
  const ctaTranslations = {
    title: t('cta.title'),
    description: t('cta.description'),
    button: t('cta.button'),
  };

  return (
    <div className="flex flex-col">
      <ProductHero translations={heroTranslations} />
      <ProductOverview translations={overviewTranslations} />
      <FeaturesSection translations={featuresTranslations} />
      <SoftwareSection translations={softwareTranslations} />
      <ApplicationsSection translations={applicationsTranslations} />
      <ProductCTA locale={locale} translations={ctaTranslations} />
    </div>
  );
}
