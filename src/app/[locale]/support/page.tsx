import type { Metadata } from 'next';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import SupportHero from '@/components/support/SupportHero';
import SupportContent from '@/components/support/SupportContent';

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
  const { t } = await getTranslation(locale as Language, 'support');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface DownloadItem {
  title: string;
  description: string;
  version: string;
  button: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'support');

  const heroTranslations = {
    title: t('hero.title'),
    description: t('hero.description'),
  };

  const downloadsData = {
    title: t('downloads.title'),
    description: t('downloads.description'),
    items: {
      software: t('downloads.items.software', { returnObjects: true }) as DownloadItem,
      manual: t('downloads.items.manual', { returnObjects: true }) as DownloadItem,
      datasheet: t('downloads.items.datasheet', { returnObjects: true }) as DownloadItem,
    },
  };

  const faqData = {
    title: t('faq.title'),
    items: t('faq.items', { returnObjects: true }) as FaqItem[],
  };

  const contactData = {
    title: t('contact.title'),
    description: t('contact.description'),
    email: t('contact.email'),
    phone: t('contact.phone'),
  };

  return (
    <div className="flex flex-col">
      <SupportHero translations={heroTranslations} />
      <SupportContent
        downloads={downloadsData}
        faq={faqData}
        contact={contactData}
      />
    </div>
  );
}
