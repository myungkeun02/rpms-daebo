import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, type Locale } from '@/config/site';
import { footerNavigation } from '@/config/navigation';
import {
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface FooterProps {
  locale: Locale;
  translations: {
    company: string;
    product: string;
    support: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
}

export default function Footer({ locale, translations }: FooterProps) {
  const getLocalizedHref = (href: string) => `/${locale}${href}`;
  const getLabel = (item: { labelKo: string; labelEn: string }) =>
    locale === 'ko' ? item.labelKo : item.labelEn;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-gray-50">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href={getLocalizedHref('/')} className="inline-flex items-center gap-3">
              <Image
                src="/images/daeboLogo.png"
                alt="DBCS"
                width={626}
                height={139}
                sizes="216px"
                className="h-12 w-auto"
              />
              <div>
                <span className="text-2xl font-bold text-secondary" style={{ fontFamily: 'var(--font-ibm-plex), sans-serif' }}>RPMS</span>
                <p className="text-xs font-medium tracking-wider text-gray-500">
                  원격전원관리시스템
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-600">
              {locale === 'ko'
                ? 'RPMS는 원격으로 전원을 관리하고 모니터링할 수 있는 혁신적인 원격전원관리시스템입니다.'
                : 'RPMS is an innovative Remote Power Management System that enables remote power management and monitoring.'}
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                <span>서울시 강남구 광평로 280 로즈데일 빌딩 6층</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <PhoneIcon className="h-4 w-4 flex-shrink-0 text-secondary" />
                <a
                  href="tel:02-3470-7700"
                  className="transition-colors hover:text-gray-900"
                >
                  TEL: 02-3470-7700
                </a>
                <span className="text-gray-300">|</span>
                <span>FAX: 02-3470-7719</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <a
                  href="https://www.dbcs.co.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-600"
                >
                  대보정보통신 홈페이지
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                {translations.product}
              </h3>
              <ul className="mt-6 space-y-3">
                {footerNavigation.product.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={getLocalizedHref(item.href)}
                      className="group flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      <span className="mr-2 h-px w-0 bg-primary-600 transition-all group-hover:w-3" />
                      {getLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                {translations.support}
              </h3>
              <ul className="mt-6 space-y-3">
                {footerNavigation.support.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={getLocalizedHref(item.href)}
                      className="group flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      <span className="mr-2 h-px w-0 bg-primary-600 transition-all group-hover:w-3" />
                      {getLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                {translations.company}
              </h3>
              <ul className="mt-6 space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={getLocalizedHref(item.href)}
                      className="group flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                      <span className="mr-2 h-px w-0 bg-primary-600 transition-all group-hover:w-3" />
                      {getLabel(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              {translations.copyright.replace('{{year}}', String(currentYear))}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href={getLocalizedHref('/privacy')}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                {translations.privacy}
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href={getLocalizedHref('/terms')}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                {translations.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
