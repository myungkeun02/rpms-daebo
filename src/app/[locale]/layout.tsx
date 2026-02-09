import type { Metadata } from 'next';
import { IBM_Plex_Sans_KR } from 'next/font/google';
import { languages, type Language } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/providers';

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans-kr',
});

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === 'ko';

  return {
    title: {
      template: `%s | ${siteConfig.name}`,
      default: isKo
        ? 'RPMS - 원격전원관리시스템 | 대보정보통신'
        : 'RPMS - Remote Power Management System | DBCS',
    },
    description: isKo
      ? '대보정보통신의 RPMS는 원격으로 전원을 관리하고 모니터링할 수 있는 시스템입니다. ITS, CCTV, VDS 등 교통 및 정보통신 분야의 전문 솔루션을 제공합니다.'
      : "DBCS RPMS enables remote power management and monitoring. We provide professional solutions in transportation and ICT including ITS, CCTV, and VDS.",
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        ko: `${siteConfig.url}/ko`,
        en: `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isKo ? 'ko_KR' : 'en_US',
      siteName: siteConfig.name,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Language;
  const { t } = await getTranslation(locale, 'common');

  const footerTranslations = {
    company: t('footer.company'),
    product: t('footer.product'),
    support: t('footer.support'),
    legal: t('footer.legal'),
    privacy: t('footer.privacy'),
    terms: t('footer.terms'),
    copyright: t('footer.copyright'),
  };

  return (
    <html lang={locale} className={ibmPlexSansKR.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Providers>
          <Header locale={locale} />
          <main className="pt-16">{children}</main>
          <Footer locale={locale} translations={footerTranslations} />
        </Providers>
      </body>
    </html>
  );
}
