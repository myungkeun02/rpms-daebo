import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import { siteConfig } from '@/config/site';
import HeroSection from '@/components/home/HeroSection';
import WhatIsRPMS from '@/components/home/WhatIsRPMS';
import FeaturesSection from '@/components/home/FeaturesSection';
import ScreenShowcase from '@/components/home/ScreenShowcase';
import HardwareSpecsSection from '@/components/home/HardwareSpecsSection';
import ProtocolSection from '@/components/home/ProtocolSection';
import SystemArchitectureSection from '@/components/home/SystemArchitectureSection';
import UseCasesSection from '@/components/home/UseCasesSection';
import CTASection from '@/components/home/CTASection';

export const dynamic = 'error';
export const revalidate = false;

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'home');

  // Hero translations
  const heroTranslations = {
    subtitle: t('hero.subtitle'),
    title: t('hero.title'),
    description: t('hero.description'),
    ctaPrimary: t('hero.cta.primary'),
    ctaSecondary: t('hero.cta.secondary'),
  };

  // What is RPMS translations
  const whatIsRPMSTranslations = {
    badge: t('whatIsRPMS.badge'),
    title: t('whatIsRPMS.title'),
    subtitle: t('whatIsRPMS.subtitle'),
    description: t('whatIsRPMS.description'),
    highlights: {
      hardware: {
        title: t('whatIsRPMS.highlights.hardware.title'),
        description: t('whatIsRPMS.highlights.hardware.description'),
      },
      software: {
        title: t('whatIsRPMS.highlights.software.title'),
        description: t('whatIsRPMS.highlights.software.description'),
      },
      protocol: {
        title: t('whatIsRPMS.highlights.protocol.title'),
        description: t('whatIsRPMS.highlights.protocol.description'),
      },
    },
    targetEquipment: t('whatIsRPMS.targetEquipment'),
    equipment: t('whatIsRPMS.equipment', { returnObjects: true }) as string[],
  };

  // Features translations
  const features = ['remoteControl', 'monitoring', 'scheduling', 'alerts', 'security', 'performance'] as const;
  const featuresTranslations = {
    title: t('features.title'),
    subtitle: t('features.subtitle'),
    items: features.map((key) => ({
      key,
      title: t(`features.items.${key}.title`),
      description: t(`features.items.${key}.description`),
    })),
  };

  // Hardware specs translations
  const hardwareTranslations = {
    title: t('hardware.title'),
    subtitle: t('hardware.subtitle'),
    specs: {
      ports: t('hardware.specs.ports'),
      voltage: t('hardware.specs.voltage'),
      monitoring: t('hardware.specs.monitoring'),
      temperature: t('hardware.specs.temperature'),
      breaker: t('hardware.specs.breaker'),
      communication: t('hardware.specs.communication'),
    },
  };

  // Protocol translations
  const protocolTranslations = {
    title: t('protocol.title'),
    subtitle: t('protocol.subtitle'),
    features: {
      realtime: t('protocol.features.realtime'),
      keepalive: t('protocol.features.keepalive'),
      events: t('protocol.features.events'),
      control: t('protocol.features.control'),
    },
  };

  // Use cases translations
  const useCases = ['datacenter', 'factory', 'building', 'telecom'] as const;
  const useCasesTranslations = {
    title: t('useCases.title'),
    subtitle: t('useCases.subtitle'),
    items: useCases.map((key) => ({
      key,
      title: t(`useCases.items.${key}`),
    })),
    viewAll: t('useCases.viewAll'),
  };

  // CTA translations
  const ctaTranslations = {
    title: t('cta.title'),
    description: t('cta.description'),
    button: t('cta.button'),
    phoneLabel: t('cta.phoneLabel'),
    emailLabel: t('cta.emailLabel'),
    contact: {
      phone: siteConfig.company.phone || '',
      email: siteConfig.company.email || '',
    },
  };

  return (
    <div className="flex flex-col">
      <HeroSection locale={locale} translations={heroTranslations} />
      <WhatIsRPMS translations={whatIsRPMSTranslations} />
      <FeaturesSection translations={featuresTranslations} />
      <ScreenShowcase locale={locale} />
      <HardwareSpecsSection translations={hardwareTranslations} />
      <ProtocolSection translations={protocolTranslations} />
      <SystemArchitectureSection locale={locale} />
      <UseCasesSection locale={locale} translations={useCasesTranslations} />
      <CTASection locale={locale} translations={ctaTranslations} />
    </div>
  );
}
