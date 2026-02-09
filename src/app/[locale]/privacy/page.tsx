import type { Metadata } from 'next';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';

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
  const { t } = await getTranslation(locale as Language, 'privacy');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface Section {
  title: string;
  content?: string;
  items: string[];
}

interface Agency {
  name: string;
  url: string;
  phone: string;
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'privacy');

  const sections = t('sections', { returnObjects: true }) as Section[];
  const tocItems = t('toc.items', { returnObjects: true }) as string[];
  const agencies = t('contact.agencies', { returnObjects: true }) as Agency[];

  return (
    <div className="min-h-screen bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('title')}
          </h1>
        </div>

        {/* Content */}
        <div className="mt-12 rounded-lg bg-white p-8 shadow-sm">
          {/* Intro */}
          <p className="text-gray-700 leading-relaxed">
            {t('intro')}
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            {t('description')}
          </p>

          {/* Table of Contents */}
          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('toc.title')}</h2>
            <ol className="mt-4 list-decimal list-inside space-y-2 text-gray-700">
              {tocItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="mt-8 space-y-8">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-primary-500 pl-4">
                  {section.title}
                </h2>
                {section.content && (
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                )}
                {section.items.length > 0 && (
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 rounded-lg bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('contact.title')}</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {t('contact.content')}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {agencies.map((agency, index) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-medium text-gray-900">{agency.name}</p>
                  <p className="mt-1 text-sm text-gray-600">{agency.url}</p>
                  <p className="text-sm text-gray-600">{agency.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
