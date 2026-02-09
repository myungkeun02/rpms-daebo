export interface NavItem {
  key: string;
  href: string;
  labelKo: string;
  labelEn: string;
}

export const mainNavigation: NavItem[] = [
  { key: 'home', href: '/', labelKo: '홈', labelEn: 'Home' },
  { key: 'product', href: '/product', labelKo: '제품 소개', labelEn: 'Product' },
  { key: 'specs', href: '/specs', labelKo: '기술 사양', labelEn: 'Specs' },
  { key: 'use-cases', href: '/use-cases', labelKo: '적용 사례', labelEn: 'Use Cases' },
  { key: 'about', href: '/about', labelKo: '회사소개', labelEn: 'About' },
  { key: 'support', href: '/support', labelKo: '기술지원', labelEn: 'Support' },
];

export const footerNavigation = {
  product: [
    { key: 'overview', href: '/product', labelKo: '제품 소개', labelEn: 'Product' },
    { key: 'specs', href: '/specs', labelKo: '기술 사양', labelEn: 'Specifications' },
    { key: 'use-cases', href: '/use-cases', labelKo: '적용 사례', labelEn: 'Use Cases' },
  ],
  support: [
    { key: 'download', href: '/support', labelKo: '다운로드', labelEn: 'Download' },
    { key: 'faq', href: '/support#faq', labelKo: 'FAQ', labelEn: 'FAQ' },
    { key: 'contact', href: '/contact', labelKo: '문의하기', labelEn: 'Contact' },
  ],
  company: [
    { key: 'privacy', href: '/privacy', labelKo: '개인정보처리방침', labelEn: 'Privacy Policy' },
    { key: 'terms', href: '/terms', labelKo: '이용약관', labelEn: 'Terms of Service' },
  ],
};
