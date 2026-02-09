import type { Metadata } from 'next';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import FeaturesHero from '@/components/features/FeaturesHero';
import FeaturesGrid from '@/components/features/FeaturesGrid';

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
  const { t } = await getTranslation(locale as Language, 'features');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

const featureKeys = [
  'remoteControl',
  'monitoring',
  'scheduling',
  'alerts',
  'reporting',
  'security',
] as const;

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'features');

  const heroTranslations = {
    title: t('hero.title'),
    description: t('hero.description'),
  };

  const features = featureKeys.map((key) => ({
    key,
    title: t(`features.${key}.title`),
    description: t(`features.${key}.description`),
    details: t(`features.${key}.details`, { returnObjects: true }) as string[],
  }));

  return (
    <div className="flex flex-col">
      <FeaturesHero translations={heroTranslations} />
      <FeaturesGrid features={features} />
    </div>
  );
}
