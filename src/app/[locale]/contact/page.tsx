'use client';

import { motion } from 'framer-motion';
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n/client';
import { siteConfig, type Locale } from '@/config/site';

// Deterministic floating particles for hydration consistency
const floatingParticles = [
  { left: 12, top: 18, duration: 4.2, delay: 0.4 },
  { left: 28, top: 72, duration: 3.8, delay: 1.1 },
  { left: 45, top: 35, duration: 4.5, delay: 0.7 },
  { left: 62, top: 88, duration: 3.5, delay: 1.5 },
  { left: 78, top: 22, duration: 4.8, delay: 0.2 },
  { left: 92, top: 55, duration: 3.2, delay: 1.8 },
  { left: 8, top: 65, duration: 4.0, delay: 0.9 },
  { left: 38, top: 12, duration: 4.6, delay: 1.3 },
  { left: 55, top: 78, duration: 3.6, delay: 0.5 },
  { left: 85, top: 42, duration: 4.3, delay: 1.6 },
];

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const { t } = useTranslation(locale, 'contact');

  const contactItems = [
    {
      icon: MapPinIcon,
      label: t('info.address'),
      value: siteConfig.company.address,
      gradient: 'from-primary-500 to-primary-700',
    },
    {
      icon: PhoneIcon,
      label: t('info.phone'),
      value: siteConfig.company.phone,
      gradient: 'from-gray-700 to-gray-900',
    },
    {
      icon: PrinterIcon,
      label: t('info.fax'),
      value: siteConfig.company.fax,
      gradient: 'from-gray-600 to-gray-800',
    },
    {
      icon: ClockIcon,
      label: t('info.hours'),
      value: t('info.hoursValue'),
      gradient: 'from-gray-700 to-black',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Glowing orbs */}
          <motion.div
            className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-primary-500/20 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-primary-600/20 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 91, 35, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 91, 35, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating elements */}
          {floatingParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-primary-400/50"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mx-auto inline-flex items-center gap-2 rounded-md border border-primary-400/30 bg-primary-500/10 px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium text-primary-300">CONTACT US</span>
            </motion.div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 lg:text-xl">
              {t('hero.description')}
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-32">
        {/* Background decoration */}
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-50 blur-3xl opacity-60" />
        <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-gray-100 blur-3xl opacity-60" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-md bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-600">
                {t('info.title')}
              </span>

              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                {siteConfig.company.name}
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                {siteConfig.company.nameEn}
              </p>

              <div className="mt-8 space-y-4">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-start gap-4 rounded-lg bg-gray-50 p-5 ring-1 ring-gray-100 transition-all hover:bg-white hover:shadow-lg hover:ring-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="mt-1 text-gray-600">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block rounded-md bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700">
                LOCATION
              </span>

              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                {t('location.title')}
              </h2>

              {/* Naver Map iframe */}
              <div className="mt-8 overflow-hidden rounded-lg ring-1 ring-gray-200 shadow-lg">
                <iframe
                  src="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EA%B4%91%ED%8F%89%EB%A1%9C%20280?c=15.00,0,0,0,dh"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="대보정보통신 위치 - 서울시 강남구 광평로 280"
                />
              </div>

              {/* Address summary */}
              <div className="mt-6 rounded-xl bg-gray-50 p-6">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-6 w-6 flex-shrink-0 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{siteConfig.company.address}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      로즈데일 빌딩 6층
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
