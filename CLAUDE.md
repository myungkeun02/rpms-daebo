# RPMS Website - Project Configuration

## Project Overview
RPMS(Remote Power Management System) 제품 소개 웹사이트
- 회사: 대보정보통신 (DBCS)
- 목적: RPMS 하드웨어/소프트웨어 제품 소개 및 마케팅
- 아키텍처: **SSG (Static Site Generation)** - 정적 사이트 생성

## Tech Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **Rendering**: SSG (Static Site Generation)
- **Language**: TypeScript 5.x
- **Node.js**: 22.x
- **Package Manager**: pnpm

### Styling & UI
- **CSS Framework**: Tailwind CSS 4.x
- **UI Components**: @headlessui/react (접근성 보장)
- **Icons**:
  - @heroicons/react (메인 아이콘)
  - lucide-react (추가 아이콘)
- **Animation**: Framer Motion

### State Management
- **Client State**: Zustand

### Internationalization (i18n)
- **Core**: i18next
- **React Integration**: react-i18next
- **Language Detection**: i18next-browser-languagedetector
- **Supported Locales**: ko (한국어), en (English)

### SEO Optimization
- **Metadata**: Next.js Metadata API
- **Sitemap**: next-sitemap (sitemap.xml 자동 생성)
- **Features**:
  - 다국어 메타데이터 자동 생성
  - Open Graph 및 Twitter Card 지원
  - 구조화된 sitemap.xml
  - robots.txt 자동 생성
  - Canonical URL 및 언어별 대체 링크 (hreflang)

### Testing & Quality
- **Test Framework**: Vitest
- **Testing Library**: React Testing Library
- **Linting**: ESLint + Prettier

### Deployment
- **Hosting**: Vercel (CDN 배포)
- **Domain**: dbcs.co.kr

## SSG Architecture

### 핵심 원칙
```typescript
// 모든 공개 페이지에 적용
export const dynamic = "error";  // SSG 강제, 동적 렌더링 시 빌드 에러
export const revalidate = false; // 정적 생성 (ISR 비활성화)
```

### generateStaticParams
모든 locale 경로를 빌드 타임에 사전 생성:
```typescript
export async function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}
```

## Project Structure

```
rpms-website/
├── src/
│   ├── app/
│   │   ├── [locale]/              # i18n 라우팅
│   │   │   ├── page.tsx           # 홈
│   │   │   ├── product/           # 제품 소개
│   │   │   ├── specs/             # 기술 사양
│   │   │   ├── features/          # 주요 기능
│   │   │   ├── use-cases/         # 적용 사례
│   │   │   ├── about/             # 회사 소개
│   │   │   ├── contact/           # 문의
│   │   │   ├── support/           # 기술지원
│   │   │   ├── privacy/           # 개인정보처리방침
│   │   │   ├── terms/             # 이용약관
│   │   │   └── layout.tsx
│   │   ├── api/                   # API Routes
│   │   │   └── contact/           # 문의 폼 API
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/                    # 공통 UI 컴포넌트
│   │   ├── home/                  # 홈페이지 섹션
│   │   ├── product/               # 제품 페이지 컴포넌트
│   │   ├── specs/                 # 스펙 페이지 컴포넌트
│   │   ├── features/              # 기능 페이지 컴포넌트
│   │   ├── about/                 # 회사소개 컴포넌트
│   │   ├── use-cases/             # 적용사례 컴포넌트
│   │   └── sections/              # 공통 섹션 컴포넌트
│   ├── lib/
│   │   └── utils.ts               # 유틸리티 함수
│   ├── hooks/
│   │   └── use-site-config.ts     # 사이트 설정 훅
│   ├── stores/
│   │   └── ui-store.ts            # UI 상태 스토어
│   ├── types/
│   │   └── site-config.ts         # 사이트 설정 타입
│   ├── i18n/
│   │   ├── index.ts               # i18next 설정
│   │   ├── settings.ts            # 언어 설정
│   │   └── locales/
│   │       ├── ko/                # 한국어 번역
│   │       └── en/                # 영어 번역
│   ├── config/
│   │   ├── site.ts                # 사이트 기본 설정
│   │   └── navigation.ts          # 네비게이션 설정
│   └── providers/
│       └── index.tsx              # Provider 컴포넌트
├── public/
│   └── images/                    # 정적 이미지
├── tests/
├── .env.local.example
├── next.config.ts
├── next-sitemap.config.js
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

## Dependencies

### Production
```json
{
  "dependencies": {
    "next": "^16.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "@headlessui/react": "^2.x",
    "@heroicons/react": "^2.x",
    "lucide-react": "^0.x",
    "i18next": "^25.x",
    "react-i18next": "^16.x",
    "i18next-browser-languagedetector": "^8.x",
    "i18next-resources-to-backend": "^1.x",
    "zustand": "^5.x",
    "framer-motion": "^12.x",
    "clsx": "^2.x",
    "tailwind-merge": "^3.x"
  }
}
```

### Development
```json
{
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^20.x",
    "@types/react": "^19.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^4.x",
    "eslint": "^9.x",
    "eslint-config-next": "^16.x",
    "prettier": "^3.x",
    "prettier-plugin-tailwindcss": "^0.x",
    "vitest": "^4.x",
    "@testing-library/react": "^16.x",
    "next-sitemap": "^4.x"
  }
}
```

## Commands

```bash
# Development
pnpm dev              # 개발 서버 실행
pnpm dev:lan          # LAN 접근 가능한 개발 서버
pnpm build            # 프로덕션 빌드 (SSG)
pnpm start            # 프로덕션 서버 실행
pnpm lint             # 린트 실행
pnpm lint:fix         # 린트 자동 수정
pnpm format           # Prettier 포맷
pnpm format:check     # 포맷 체크
pnpm test             # 테스트 실행
pnpm test:watch       # 테스트 워치 모드
pnpm test:coverage    # 테스트 커버리지
```

## Conventions

### File Naming
- 컴포넌트: PascalCase (`Header.tsx`, `HeroSection.tsx`)
- 유틸리티/훅: kebab-case (`use-site-config.ts`, `utils.ts`)
- 타입: kebab-case (`site-config.ts`)
- i18n 파일: kebab-case (`common.json`, `home.json`)

### Component Structure
```tsx
// 1. Imports
// 2. Types/Interfaces
// 3. Component
// 4. Export
```

### SSG Page Template
```tsx
// 모든 공개 페이지 템플릿
export const dynamic = "error";
export const revalidate = false;

export async function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ...
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  // ...
}
```

### Commit Message
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드, 설정 등
```

## Pages & Routes

| Route | Description | Rendering |
|-------|-------------|-----------|
| `/[locale]` | 홈페이지 | SSG |
| `/[locale]/product` | 제품 소개 | SSG |
| `/[locale]/specs` | 기술 사양 | SSG |
| `/[locale]/features` | 주요 기능 | SSG |
| `/[locale]/use-cases` | 적용 사례 | SSG |
| `/[locale]/about` | 회사 소개 | SSG |
| `/[locale]/contact` | 문의하기 | SSG |
| `/[locale]/support` | 기술지원/다운로드 | SSG |
| `/[locale]/privacy` | 개인정보처리방침 | SSG |
| `/[locale]/terms` | 이용약관 | SSG |
| `/sitemap.xml` | 사이트맵 | Static |
| `/robots.txt` | 로봇 설정 | Static |

## Site Configuration

사이트 설정은 `src/config/site.ts`에서 관리:

```typescript
export const siteConfig = {
  name: '대보정보통신',
  nameEn: 'DBCS',
  url: 'https://www.dbcs.co.kr',
  company: {
    name: '대보정보통신',
    nameEn: 'DBCS Co., Ltd.',
    address: '서울시 강남구 광평로 280 로즈데일 빌딩 6층',
    phone: '02-3470-7700',
    fax: '02-3470-7719',
    website: 'https://www.dbcs.co.kr/',
  },
  theme: {
    primaryColor: '#005B23',  /* Green - PANTONE 3537C */
    secondaryColor: '#003050', /* Blue - PANTONE 450C */
    accentColor: '#FFFFFF',
  },
};
```

## Performance Optimization

### 적용 기술
- **SSG**: 빌드 타임 정적 생성으로 TTFB 최소화
- **CDN**: Vercel Edge Network를 통한 글로벌 배포
- **Image Optimization**: Next.js Image 컴포넌트 자동 최적화
- **Code Splitting**: 페이지별 자동 코드 분할
- **Lazy Loading**: 이미지 및 컴포넌트 지연 로딩
- **Font Optimization**: next/font를 통한 폰트 최적화

### Lighthouse 목표
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Design System

### Colors
```
Primary: #005B23 (Green - PANTONE 3537C - RGB 0,91,35)
Secondary: #003050 (Blue - PANTONE 450C - RGB 0,48,80)
Accent: #FFFFFF (White)
```

### Typography
- Headings: Pretendard / Inter
- Body: Pretendard / Inter

### Breakpoints (Tailwind 기본)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Notes

- 모든 페이지는 SSG로 빌드 타임에 생성됩니다
- 콘텐츠 변경 시 재배포 필요
- 이미지 최적화는 Next.js Image 컴포넌트 사용
- SEO를 위해 각 페이지에 적절한 메타데이터 설정 필수
- @headlessui/react 컴포넌트는 접근성(a11y) 기본 제공
