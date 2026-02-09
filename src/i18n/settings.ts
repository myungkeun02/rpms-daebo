export const fallbackLng = 'ko';
export const languages = ['ko', 'en'] as const;
export const defaultNS = 'common';
export const cookieName = 'i18next';

export type Language = (typeof languages)[number];

export function getOptions(lng: Language = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
