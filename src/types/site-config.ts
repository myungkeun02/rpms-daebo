export interface CompanyConfig {
  name: string;
  nameEn: string;
  registrationNumber?: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface LogoConfig {
  url: string;
  darkUrl?: string;
  width: number;
  height: number;
}

export interface FooterConfig {
  address: string;
  phone: string;
  email: string;
  fax?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface SeoConfig {
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  ogImage?: string;
}

export interface SiteConfig {
  company: CompanyConfig;
  theme: ThemeConfig;
  logo: LogoConfig;
  footer: FooterConfig;
  seo: SeoConfig;
}

export type SiteConfigKey = keyof SiteConfig;
