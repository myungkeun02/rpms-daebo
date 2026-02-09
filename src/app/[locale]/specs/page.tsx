import type { Metadata } from 'next';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import SpecsContent from '@/components/specs/SpecsContent';

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
  const { t } = await getTranslation(locale as Language, 'specs');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

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

export default async function SpecsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'specs');

  const translations = {
    hero: {
      badge: t('hero.badge'),
      title: t('hero.title'),
      description: t('hero.description'),
    },
    unit: {
      badge: t('unit.badge'),
      title: t('unit.title'),
      description: t('unit.description'),
      specs: t('unit.specs', { returnObjects: true }) as SpecItem[],
      sensors: {
        title: t('unit.sensors.title'),
        items: t('unit.sensors.items', { returnObjects: true }) as SensorItem[],
      },
    },
    electrical: {
      badge: t('electrical.badge'),
      title: t('electrical.title'),
      description: t('electrical.description'),
      specs: t('electrical.specs', { returnObjects: true }) as SpecItem[],
      protection: {
        title: t('electrical.protection.title'),
        items: t('electrical.protection.items', { returnObjects: true }) as string[],
      },
    },
    physical: {
      badge: t('physical.badge'),
      title: t('physical.title'),
      description: t('physical.description'),
      specs: t('physical.specs', { returnObjects: true }) as SpecItem[],
    },
    protocol: {
      badge: t('protocol.badge'),
      title: t('protocol.title'),
      description: t('protocol.description'),
      items: t('protocol.items', { returnObjects: true }) as ProtocolItem[],
    },
  };

  return <SpecsContent translations={translations} />;
}
