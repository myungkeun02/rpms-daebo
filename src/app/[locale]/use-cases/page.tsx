import type { Metadata } from 'next';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import UseCasesHero from '@/components/use-cases/UseCasesHero';
import UseCasesGrid from '@/components/use-cases/UseCasesGrid';

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
  const { t } = await getTranslation(locale as Language, 'use-cases');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

const caseKeys = ['datacenter', 'factory', 'building', 'telecom', 'retail', 'research'] as const;

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'use-cases');

  const heroTranslations = {
    title: t('hero.title'),
    description: t('hero.description'),
  };

  const cases = caseKeys.map((key) => ({
    key,
    title: t(`cases.${key}.title`),
    description: t(`cases.${key}.description`),
    benefits: t(`cases.${key}.benefits`, { returnObjects: true }) as string[],
    result: t(`cases.${key}.result`),
  }));

  return (
    <div className="flex flex-col">
      <UseCasesHero translations={heroTranslations} />
      <UseCasesGrid cases={cases} />
    </div>
  );
}
