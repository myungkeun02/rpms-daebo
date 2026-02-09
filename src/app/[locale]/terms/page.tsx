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
  const { t } = await getTranslation(locale as Language, 'terms');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

interface Article {
  title: string;
  content?: string;
  items?: string[];
}

interface Chapter {
  title: string;
  articles: Article[];
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'terms');

  const chapters = t('chapters', { returnObjects: true }) as Chapter[];

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
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className={chapterIndex > 0 ? 'mt-12' : ''}>
              {/* Chapter Title */}
              <h2 className="text-xl font-bold text-gray-900 border-b-2 border-primary-500 pb-2">
                {chapter.title}
              </h2>

              {/* Articles */}
              <div className="mt-6 space-y-6">
                {chapter.articles.map((article, articleIndex) => (
                  <div key={articleIndex}>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {article.title}
                    </h3>
                    {article.content && (
                      <p className="mt-2 text-gray-700 leading-relaxed">
                        {article.content}
                      </p>
                    )}
                    {article.items && article.items.length > 0 && (
                      <ul className="mt-2 space-y-2">
                        {article.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex text-gray-700">
                            <span className="mr-2 text-gray-400">{itemIndex + 1}.</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
