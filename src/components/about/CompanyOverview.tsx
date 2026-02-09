'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/animations';
import { CalendarIcon, UsersIcon, TrophyIcon, BriefcaseIcon, BuildingOffice2Icon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/cn';

interface TimelineItem {
  period: 'yesterday' | 'today' | 'tomorrow';
  title: string;
  subtitle: string;
  items: string[];
}

interface CompanyInfo {
  name: string;
  founded: string;
  ceo: string;
  employees: string;
  creditRating: string;
  capital: string;
  revenue: string;
  mainBusiness: string;
}

interface CompanyOverviewProps {
  translations: {
    sectionTitle: string;
    sectionSubtitle: string;
    tagline: string;
    timelineTitle: string;
    timeline: TimelineItem[];
    companyInfo: CompanyInfo;
    labels: {
      name: string;
      founded: string;
      ceo: string;
      employees: string;
      creditRating: string;
      capital: string;
      revenue: string;
      mainBusiness: string;
    };
  };
}

const periodColors = {
  yesterday: {
    bg: 'bg-gradient-to-br from-slate-600 to-slate-800',
    border: 'border-slate-500',
    text: 'text-slate-400',
    accent: 'text-slate-300',
    dot: 'bg-slate-500',
  },
  today: {
    bg: 'bg-gradient-to-br from-primary-600 to-primary-800',
    border: 'border-primary-500',
    text: 'text-primary-400',
    accent: 'text-primary-300',
    dot: 'bg-primary-500',
  },
  tomorrow: {
    bg: 'bg-gradient-to-br from-secondary to-secondary-dark',
    border: 'border-secondary',
    text: 'text-blue-400',
    accent: 'text-blue-300',
    dot: 'bg-secondary',
  },
};

export default function CompanyOverview({ translations }: CompanyOverviewProps) {
  const { companyInfo, labels } = translations;

  const infoItems = [
    { icon: BuildingOffice2Icon, label: labels.name, value: companyInfo.name },
    { icon: CalendarIcon, label: labels.founded, value: companyInfo.founded },
    { icon: UsersIcon, label: labels.ceo, value: companyInfo.ceo },
    { icon: UsersIcon, label: labels.employees, value: companyInfo.employees },
    { icon: TrophyIcon, label: labels.creditRating, value: companyInfo.creditRating },
    { icon: CurrencyDollarIcon, label: labels.capital, value: companyInfo.capital },
    { icon: CurrencyDollarIcon, label: labels.revenue, value: companyInfo.revenue },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center">
          <span className="inline-block rounded-md bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700">
            OVERVIEW
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {translations.sectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {translations.sectionSubtitle}
          </p>
        </FadeIn>

        {/* Tagline */}
        <FadeIn delay={0.1}>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white px-8 py-6 shadow-lg">
              <span className="text-4xl font-bold text-secondary">DAEBO</span>
              <span className="text-sm font-medium tracking-wider text-gray-500">Communication & Systems</span>
              <span className="mt-2 bg-gradient-to-r from-primary-600 to-secondary bg-clip-text text-xl font-semibold text-transparent">
                Digital Transformation Partner
              </span>
              <p className="mt-2 text-gray-600">{translations.tagline}</p>
            </div>
          </div>
        </FadeIn>

        {/* Timeline: Yesterday, Today, Tomorrow */}
        <div className="mt-16">
          <FadeIn delay={0.2}>
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
              {translations.timelineTitle}
            </h3>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3">
            {translations.timeline.map((item, index) => {
              const colors = periodColors[item.period];
              return (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative h-full"
                >
                  <div className={cn(
                    'relative h-full overflow-hidden rounded-2xl p-6 text-white shadow-xl transition-transform hover:scale-[1.02]',
                    colors.bg
                  )}>
                    {/* Period Label */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-sm font-medium uppercase tracking-wider opacity-70">
                        {item.period === 'yesterday' ? 'Yesterday' : item.period === 'today' ? 'Today' : 'Tomorrow'}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl font-bold leading-tight">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm font-medium opacity-80">
                      {item.subtitle}
                    </p>

                    {/* Items */}
                    <ul className="mt-6 space-y-3">
                      {item.items.map((text, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                          <span className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="opacity-90">{text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Company Info Card */}
        <FadeIn delay={0.4}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 bg-gradient-to-r from-primary-600 to-secondary px-6 py-4">
              <h3 className="text-lg font-semibold text-white">{translations.sectionTitle}</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex h-full items-start gap-3 rounded-lg bg-gray-50 p-4"
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">{item.label}</p>
                      <p className="mt-0.5 font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Main Business */}
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <BriefcaseIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">{labels.mainBusiness}</p>
                    <p className="mt-0.5 text-sm text-gray-700">{companyInfo.mainBusiness}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
