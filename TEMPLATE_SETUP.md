# 새 회사용 웹사이트 설정 가이드

이 템플릿을 새 회사용으로 변경할 때 수정해야 할 파일 목록입니다.

## 1. 필수 파일 교체

### 이미지 파일
| 파일 경로 | 설명 |
|----------|------|
| `public/images/logo.png` | 회사 로고 |
| `src/app/icon.png` | 파비콘 (브라우저 탭 아이콘) |
| `public/images/partners/` | 고객사/협력사 로고들 (partner_01.png ~ ) |
| `public/images/certificates/` | 인증서/면허 이미지들 (cert_01.jpg ~ ) |

---

## 2. 설정 파일 수정

### `src/config/site.ts`
```typescript
export const siteConfig = {
  name: '회사명',           // 변경
  nameEn: 'Company Name',  // 변경
  description: '...',       // 변경
  url: 'https://...',       // 변경
  company: {
    name: '(주)회사명',     // 변경
    nameEn: 'Company Co., Ltd.',
    address: '주소',        // 변경
    phone: '전화번호',      // 변경
    email: '이메일',        // 변경
    fax: '팩스',           // 변경
  },
};
```

---

## 3. 번역 파일 수정 (src/i18n/locales/)

### 한국어 (ko/)
| 파일 | 수정 내용 |
|------|----------|
| `common.json` | 회사명, 저작권 정보 |
| `home.json` | 메인 페이지 문구 |
| `about.json` | 회사 소개, 연혁, 비전/미션 |
| `product.json` | 제품 소개 내용 |
| `specs.json` | 기술 사양 |
| `support.json` | 기술지원 내용, 다운로드 파일 |
| `privacy.json` | 개인정보처리방침 (회사명 변경) |
| `terms.json` | 이용약관 (회사명 변경) |

### 영어 (en/)
- 위와 동일한 파일들 영문 버전

---

## 4. 컴포넌트 수정

### `src/components/layout/Footer.tsx`
- 회사 설명 문구
- 주소, 전화번호, 이메일

### `src/components/about/ContactInfo.tsx`
- 네이버 지도 URL (주소에 맞게)
- 주소, 연락처

### `src/components/about/PartnersSection.tsx`
- 고객사 로고 개수에 맞게 수정 (현재 36개)

### `src/components/about/CertificatesSection.tsx`
- 인증서 이미지 개수에 맞게 수정 (현재 16개)

---

## 5. 환경 변수

### `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 6. 설치 및 실행

```bash
# 패키지 설치
pnpm install

# 개발 서버
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start
```

---

## 7. 배포

Vercel에 연결하여 자동 배포 설정 권장
