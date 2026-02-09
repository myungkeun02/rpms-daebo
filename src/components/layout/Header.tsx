'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { cn } from '@/lib/cn';
import { mainNavigation } from '@/config/navigation';
import { siteConfig, type Locale } from '@/config/site';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalizedHref = (href: string) => {
    if (href === '/') return `/${locale}`;
    return `/${locale}${href}`;
  };
  const getLabel = (item: (typeof mainNavigation)[0]) =>
    locale === 'ko' ? item.labelKo : item.labelEn;

  const switchLocale = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(/^\/(ko|en)/, '');
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <Disclosure as="header" className="fixed top-0 left-0 right-0 z-50">
      {({ open }) => (
        <>
          <div
            className={cn(
              'transition-all duration-300',
              isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-white/80 backdrop-blur-sm'
            )}
          >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-14 items-center justify-between lg:h-16">
                {/* Logo */}
                <Link
                  href={getLocalizedHref('/')}
                  className="group flex items-center gap-2"
                >
                  <Image
                    src="/images/daeboLogo.png"
                    alt="DBCS"
                    width={626}
                    height={139}
                    priority
                    sizes="(min-width: 1024px) 162px, 144px"
                    className="h-8 w-auto transition-transform duration-200 group-hover:scale-105 lg:h-9"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-secondary lg:text-xl" style={{ fontFamily: 'var(--font-ibm-plex), sans-serif' }}>
                      RPMS
                    </span>
                    <span className="hidden text-[10px] font-medium tracking-wider text-gray-500 sm:block">
                      원격전원관리시스템
                    </span>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:items-center lg:gap-x-1">
                  {mainNavigation.map((item) => {
                    const href = getLocalizedHref(item.href);
                    // Fix: More precise active state detection
                    const isActive = item.href === '/'
                      ? pathname === href
                      : pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <Link
                        key={item.key}
                        href={href}
                        className={cn(
                          'relative px-3 py-1.5 text-sm font-medium transition-colors',
                          isActive ? 'text-primary-600' : 'text-gray-600 hover:text-secondary'
                        )}
                      >
                        {getLabel(item)}
                        <span
                          className={cn(
                            'absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded bg-primary-600 transition-all duration-300',
                            isActive ? 'w-6' : 'w-0'
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                  {/* Language Switcher */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center gap-1 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100">
                      <span className="uppercase">
                        {locale}
                      </span>
                      <ChevronDownIcon className="h-3 w-3 text-gray-500" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-150"
                      enterFrom="transform opacity-0 scale-95 -translate-y-1"
                      enterTo="transform opacity-100 scale-100 translate-y-0"
                      leave="transition ease-in duration-100"
                      leaveFrom="transform opacity-100 scale-100 translate-y-0"
                      leaveTo="transform opacity-0 scale-95 -translate-y-1"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-white p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={switchLocale('ko')}
                              className={cn(
                                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                                active ? 'bg-gray-100' : '',
                                locale === 'ko'
                                  ? 'font-medium text-primary-600'
                                  : 'text-gray-700'
                              )}
                            >
                              <span className="text-base">🇰🇷</span>
                              한국어
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={switchLocale('en')}
                              className={cn(
                                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                                active ? 'bg-gray-100' : '',
                                locale === 'en'
                                  ? 'font-medium text-primary-600'
                                  : 'text-gray-700'
                              )}
                            >
                              <span className="text-base">🇺🇸</span>
                              English
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* CTA Button - Desktop */}
                  <Link
                    href={getLocalizedHref('/contact')}
                    className="hidden rounded-md bg-primary-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-md hover:shadow-primary-600/30 sm:inline-flex"
                  >
                    {locale === 'ko' ? '문의하기' : 'Contact'}
                  </Link>

                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden">
                    <span className="sr-only">메뉴 열기</span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Disclosure.Panel className="border-t border-gray-100 bg-white shadow-xl lg:hidden">
              <div className="space-y-1 px-4 py-4">
                {mainNavigation.map((item) => {
                  const href = getLocalizedHref(item.href);
                  // Fix: More precise active state detection for mobile
                  const isActive = item.href === '/'
                    ? pathname === href
                    : pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Disclosure.Button
                      key={item.key}
                      as={Link}
                      href={href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-primary-600" />
                      )}
                      {getLabel(item)}
                    </Disclosure.Button>
                  );
                })}

                {/* Mobile CTA */}
                <div className="pt-3">
                  <Disclosure.Button
                    as={Link}
                    href={getLocalizedHref('/contact')}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-primary-700"
                  >
                    {locale === 'ko' ? '문의하기' : 'Contact Us'}
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
