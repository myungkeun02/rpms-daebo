import type { Metadata } from 'next';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import { siteConfig } from '@/config/site';
import AboutHero from '@/components/about/AboutHero';
import CompanyOverview from '@/components/about/CompanyOverview';
import BusinessPhilosophy from '@/components/about/BusinessPhilosophy';
import HistoryTimeline from '@/components/about/HistoryTimeline';
import ContactInfo from '@/components/about/ContactInfo';

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
  const { t } = await getTranslation(locale as Language, 'about');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface TimelineItem {
  period: 'yesterday' | 'today' | 'tomorrow';
  title: string;
  subtitle: string;
  items: string[];
}

interface CompanyInfo {
  name: string;
  founded: string;
  ceo: string;
  employees: string;
  creditRating: string;
  capital: string;
  revenue: string;
  mainBusiness: string;
}

interface CoreValue {
  title: string;
  subtitle: string;
}

interface WorkingStandard {
  key: string;
  title: string;
  titleEn?: string;
  description: string;
}

interface HistoryItem {
  month: string;
  content: string;
}

interface HistoryEra {
  period: string;
  title: string;
  icon: 'rocket' | 'trending' | 'sparkles';
  years: Record<string, HistoryItem[]>;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'about');

  const heroTranslations = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
  };

  const companyOverviewTranslations = {
    sectionTitle: t('companyOverview.sectionTitle'),
    sectionSubtitle: t('companyOverview.sectionSubtitle'),
    tagline: t('companyOverview.tagline'),
    timelineTitle: t('companyOverview.timelineTitle'),
    timeline: t('companyOverview.timeline', { returnObjects: true }) as TimelineItem[],
    companyInfo: t('companyOverview.companyInfo', { returnObjects: true }) as CompanyInfo,
    labels: t('companyOverview.labels', { returnObjects: true }) as {
      name: string;
      founded: string;
      ceo: string;
      employees: string;
      creditRating: string;
      capital: string;
      revenue: string;
      mainBusiness: string;
    },
  };

  const businessPhilosophyTranslations = {
    sectionTitle: t('businessPhilosophy.sectionTitle'),
    sectionSubtitle: t('businessPhilosophy.sectionSubtitle'),
    vision: t('businessPhilosophy.vision', { returnObjects: true }) as { label: string; content: string },
    mission: t('businessPhilosophy.mission', { returnObjects: true }) as { label: string; content: string },
    coreValuesLabel: t('businessPhilosophy.coreValuesLabel'),
    coreValues: t('businessPhilosophy.coreValues', { returnObjects: true }) as CoreValue[],
    workingStandardsLabel: t('businessPhilosophy.workingStandardsLabel'),
    workingStandardsSubtitle: t('businessPhilosophy.workingStandardsSubtitle'),
    workingStandards: t('businessPhilosophy.workingStandards', { returnObjects: true }) as WorkingStandard[],
  };

  const historyEras = t('history.eras', { returnObjects: true }) as HistoryEra[];
  const historyTranslations = {
    title: t('history.title'),
    subtitle: t('history.subtitle'),
    decadeSuffix: t('history.decadeSuffix'),
    achievementsSuffix: t('history.achievementsSuffix'),
    yearsOfHistory: t('history.yearsOfHistory'),
    keyAchievements: t('history.keyAchievements'),
    moreItems: t('history.moreItems'),
    eras: historyEras,
  };

  const contactTranslations = {
    title: t('contact.title'),
    address: t('contact.address'),
    phone: t('contact.phone'),
    email: t('contact.email'),
    fax: t('contact.fax'),
  };

  return (
    <div className="flex flex-col">
      <AboutHero translations={heroTranslations} />
      <CompanyOverview translations={companyOverviewTranslations} />
      <BusinessPhilosophy translations={businessPhilosophyTranslations} />
      <HistoryTimeline translations={historyTranslations} />
      <ContactInfo translations={contactTranslations} company={siteConfig.company} />
    </div>
  );
}
