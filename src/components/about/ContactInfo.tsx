'use client';

import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { FadeIn } from '@/components/ui/animations';

interface ContactInfoProps {
  translations: {
    title: string;
    address: string;
    phone: string;
    email: string;
    fax: string;
  };
  company: {
    address?: string;
    phone?: string;
    email?: string;
    fax?: string;
  };
}

export default function ContactInfo({ translations, company }: ContactInfoProps) {
  const contactItems = [
    { icon: MapPinIcon, label: translations.address, value: company.address, gradient: 'from-primary-500 to-primary-700' },
    { icon: PhoneIcon, label: translations.phone, value: company.phone, gradient: 'from-gray-700 to-gray-900' },
    { icon: PrinterIcon, label: translations.fax, value: company.fax, gradient: 'from-gray-600 to-gray-800' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/20 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gray-500/20 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-block rounded-md border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-300">
            LOCATION
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {translations.title}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Info - Vertical Layout */}
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col justify-center space-y-4">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-5 rounded-lg border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">{item.label}</p>
                    <p className="mt-0.5 text-lg font-semibold text-white">
                      {item.value || '-'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg ring-1 ring-white/10"
          >
            <iframe
              src="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EA%B4%91%ED%8F%89%EB%A1%9C%20280?c=15.00,0,0,0,dh"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="대보정보통신 위치 - 서울시 강남구 광평로 280 로즈데일 빌딩 6층"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
