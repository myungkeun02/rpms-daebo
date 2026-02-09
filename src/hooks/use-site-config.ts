import type { SiteConfig } from '@/types/site-config';

// Hardcoded site config for DBCS
export const siteConfig: SiteConfig = {
  company: {
    name: '대보정보통신',
    nameEn: 'DBCS Co., Ltd.',
    registrationNumber: '',
  },
  theme: {
    primaryColor: '#005B23',  // Green - PANTONE 3537C
    secondaryColor: '#003050', // Blue - PANTONE 450C
    accentColor: '#FFFFFF',
  },
  logo: {
    url: '/images/daeboLogo.png',
    darkUrl: '/images/daeboLogo.png',
    width: 150,
    height: 40,
  },
  footer: {
    address: '서울시 강남구 광평로 280 로즈데일 빌딩 6층',
    phone: '02-3470-7700',
    email: '',
    fax: '02-3470-7719',
  },
  seo: {
    defaultTitle: 'RPMS - 원격전원관리시스템',
    titleTemplate: '%s | 대보정보통신',
    description: '대보정보통신의 원격전원관리시스템',
  },
};

// Simple hook to get site config (no Supabase, just returns hardcoded config)
export function useSiteConfig() {
  return {
    data: siteConfig,
    isLoading: false,
    error: null,
  };
}

// Hook to get a specific config value
export function useSiteConfigValue<K extends keyof SiteConfig>(key: K) {
  return {
    data: siteConfig[key],
    isLoading: false,
    error: null,
  };
}

export { siteConfig as defaultSiteConfig };
