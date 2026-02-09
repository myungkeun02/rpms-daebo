export const siteConfig = {
  name: '대보정보통신',
  nameEn: 'DBCS',
  description: 'RPMS - Remote Power Management System (원격전원관리시스템)',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dbcs.co.kr',
  defaultLocale: 'ko' as const,
  locales: ['ko', 'en'] as const,
  theme: {
    primaryColor: '#005B23',  /* Green - PANTONE 3537C - RGB(0, 91, 35) */
    secondaryColor: '#003050', /* Blue - PANTONE 450C - RGB(0, 48, 80) */
    accentColor: '#FFFFFF',
  },
  company: {
    name: '대보정보통신',
    nameEn: 'DBCS Co., Ltd.',
    address: '서울시 강남구 광평로 280 로즈데일 빌딩 6층',
    phone: '02-3470-7700',
    email: '',
    fax: '02-3470-7719',
    website: 'https://www.dbcs.co.kr/',
  },
  social: {
    github: '',
    linkedin: '',
  },
};

export type Locale = (typeof siteConfig.locales)[number];
