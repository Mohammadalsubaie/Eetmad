# Application Routes

**Generated:** 2025-11-23T19:26:01.974Z

## Summary

- **Total Routes:** 128
- **Internal Routes:** 81
- **Dynamic Routes:** 36
- **External Links:** 11

---

## Routes by Group

### Admin

| Path | Type | Source | File |
|------|------|--------|------|
| `/admin/categories` | 📄 Internal | router | app/[locale]/(admin)/admin/categories/new/page.tsx:66 |
| `/admin/reviews` | 📄 Internal | router | app/[locale]/(admin)/admin/reviews/new/page.tsx:64 |
| `admin/analytics` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/analytics/page.tsx |
| `admin/categories` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/categories/page.tsx |
| `admin/categories/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(admin)/admin/categories/[id] |
| `admin/categories/[id]/edit` | 🔄 Dynamic | filesystem | src/app/[locale]/(admin)/admin/categories/[id]/edit/page.tsx |
| `admin/categories/new` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/categories/new/page.tsx |
| `admin/dashboard` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/dashboard/page.tsx |
| `admin/disputes` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/disputes/page.tsx |
| `admin/disputes/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(admin)/admin/disputes/[id] |
| `admin/offers` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/offers/page.tsx |
| `admin/payments` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/payments/page.tsx |
| `admin/payments/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(admin)/admin/payments/[id] |
| `admin/projects` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/projects/page.tsx |
| `admin/reports` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/reports/page.tsx |
| `admin/requests` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/requests/page.tsx |
| `admin/reviews` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/reviews/page.tsx |
| `admin/reviews/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(admin)/admin/reviews/[id] |
| `admin/reviews/[id]/edit` | 🔄 Dynamic | filesystem | src/app/[locale]/(admin)/admin/reviews/[id]/edit/page.tsx |
| `admin/reviews/new` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/reviews/new/page.tsx |
| `admin/settings` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/settings/page.tsx |
| `admin/suppliers` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/suppliers/page.tsx |
| `admin/users` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/users/page.tsx |
| `admin/users/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(admin)/admin/users/[id] |
| `admin/verification` | 📄 Internal | filesystem | src/app/[locale]/(admin)/admin/verification/page.tsx |

### Auth

| Path | Type | Source | File |
|------|------|--------|------|
| `/forgot-password` | 📄 Internal | link | components/features/auth/LoginForm.tsx:176 |
| `/login` | 📄 Internal | link | components/shared/layouts/Header.tsx:155 |
| `/register` | 📄 Internal | link | components/features/auth/LoginForm.tsx:255 |
| `forgot-password` | 📄 Internal | filesystem | src/app/[locale]/(auth)/forgot-password/page.tsx |
| `login` | 📄 Internal | filesystem | src/app/[locale]/(auth)/login/page.tsx |
| `register` | 📄 Internal | filesystem | src/app/[locale]/(auth)/register/page.tsx |
| `reset-password` | 📄 Internal | filesystem | src/app/[locale]/(auth)/reset-password/page.tsx |
| `verify-email` | 📄 Internal | filesystem | src/app/[locale]/(auth)/verify-email/page.tsx |
| `verify-phone` | 📄 Internal | filesystem | src/app/[locale]/(auth)/verify-phone/page.tsx |

### Client

| Path | Type | Source | File |
|------|------|--------|------|
| `/projects` | 📄 Internal | router | app/[locale]/(client)/projects/[id]/page.tsx:49 |
| `/requests` | 📄 Internal | router | app/[locale]/(client)/requests/[id]/page.tsx:47 |
| `/requests/my-requests` | 📄 Internal | router | components/features/requests/RequestForm.tsx:96 |
| `/requests/new` | 📄 Internal | router | app/[locale]/(client)/requests/page.tsx:34 |
| `contracts` | 📄 Internal | filesystem | src/app/[locale]/(client)/contracts/page.tsx |
| `contracts/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/contracts/[id] |
| `contracts/[id]/clauses` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/contracts/[id]/clauses/page.tsx |
| `contracts/[id]/edit` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/contracts/[id]/edit/page.tsx |
| `contracts/[id]/sign` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/contracts/[id]/sign/page.tsx |
| `contracts/[id]/versions` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/contracts/[id]/versions/page.tsx |
| `contracts/new` | 📄 Internal | filesystem | src/app/[locale]/(client)/contracts/new/page.tsx |
| `disputes` | 📄 Internal | filesystem | src/app/[locale]/(client)/disputes/page.tsx |
| `disputes/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/disputes/[id] |
| `disputes/new` | 📄 Internal | filesystem | src/app/[locale]/(client)/disputes/new/page.tsx |
| `messages` | 📄 Internal | filesystem | src/app/[locale]/(client)/messages/page.tsx |
| `messages/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/messages/[id] |
| `messages/new` | 📄 Internal | filesystem | src/app/[locale]/(client)/messages/new/page.tsx |
| `messages/settings` | 📄 Internal | filesystem | src/app/[locale]/(client)/messages/settings/page.tsx |
| `milestones` | 📄 Internal | filesystem | src/app/[locale]/(client)/milestones/page.tsx |
| `milestones/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/milestones/[id] |
| `milestones/[id]/edit` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/milestones/[id]/edit/page.tsx |
| `milestones/new` | 📄 Internal | filesystem | src/app/[locale]/(client)/milestones/new/page.tsx |
| `notifications` | 📄 Internal | filesystem | src/app/[locale]/(client)/notifications/page.tsx |
| `notifications/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/notifications/[id] |
| `notifications/settings` | 📄 Internal | filesystem | src/app/[locale]/(client)/notifications/settings/page.tsx |
| `payments` | 📄 Internal | filesystem | src/app/[locale]/(client)/payments/page.tsx |
| `payments/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/payments/[id] |
| `payments/history` | 📄 Internal | filesystem | src/app/[locale]/(client)/payments/history/page.tsx |
| `payments/initiate` | 📄 Internal | filesystem | src/app/[locale]/(client)/payments/initiate/page.tsx |
| `payments/wallet` | 📄 Internal | filesystem | src/app/[locale]/(client)/payments/wallet/page.tsx |
| `projects` | 📄 Internal | filesystem | src/app/[locale]/(client)/projects/page.tsx |
| `projects/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/projects/[id] |
| `projects/[id]/cancel` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/projects/[id]/cancel/page.tsx |
| `projects/[id]/complete` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/projects/[id]/complete/page.tsx |
| `projects/[id]/delivery` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/projects/[id]/delivery/page.tsx |
| `projects/[id]/milestones` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/projects/[id]/milestones/page.tsx |
| `projects/[id]/start` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/projects/[id]/start/page.tsx |
| `requests` | 📄 Internal | filesystem | src/app/[locale]/(client)/requests/page.tsx |
| `requests/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/requests/[id] |
| `requests/[id]/edit` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/requests/[id]/edit/page.tsx |
| `requests/[id]/offers` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/requests/[id]/offers/page.tsx |
| `requests/my-requests` | 📄 Internal | filesystem | src/app/[locale]/(client)/requests/my-requests/page.tsx |
| `requests/new` | 📄 Internal | filesystem | src/app/[locale]/(client)/requests/new/page.tsx |
| `reviews` | 📄 Internal | filesystem | src/app/[locale]/(client)/reviews/page.tsx |
| `reviews/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/reviews/[id] |
| `reviews/new` | 📄 Internal | filesystem | src/app/[locale]/(client)/reviews/new/page.tsx |

### Main

| Path | Type | Source | File |
|------|------|--------|------|
| `/profile/edit` | 📄 Internal | router | components/features/profile/ProfileHeader.tsx:25 |
| `dashboard` | 📄 Internal | filesystem | src/app/[locale]/(main)/dashboard/page.tsx |
| `profile` | 📄 Internal | filesystem | src/app/[locale]/(client)/profile/page.tsx |
| `profile/edit` | 📄 Internal | filesystem | src/app/[locale]/(client)/profile/edit/page.tsx |
| `profile/settings` | 📄 Internal | filesystem | src/app/[locale]/(client)/profile/settings/page.tsx |

### Other

| Path | Type | Source | File |
|------|------|--------|------|
| `http://localhost:3000` | 🌐 External | external | lib/constants/config.ts:7 |
| `https://api.example.com` | 🌐 External | external | lib/utils/naming-validator.test-demo.ts:40 |
| `https://docs.google.com/forms/d/1NzAEs7uruIqcHz...` | 🌐 External | external | components/features/home/HeroSection.tsx:90 |
| `https://i.pravatar.cc/150?img=12` | 🌐 External | external | mocks/data/home.ts:22 |
| `https://i.pravatar.cc/150?img=14` | 🌐 External | external | mocks/data/home.ts:30 |
| `https://i.pravatar.cc/150?img=33` | 🌐 External | external | mocks/data/home.ts:45 |
| `https://i.pravatar.cc/150?img=45` | 🌐 External | external | mocks/data/home.ts:38 |
| `https://i.pravatar.cc/150?img=47` | 🌐 External | external | mocks/data/home.ts:492 |
| `https://i.pravatar.cc/150?img=48` | 🌐 External | external | mocks/data/home.ts:535 |
| `https://i.pravatar.cc/150?img=51` | 🌐 External | external | mocks/data/home.ts:513 |
| `https://i.pravatar.cc/150?img=52` | 🌐 External | external | mocks/data/home.ts:657 |

### Public

| Path | Type | Source | File |
|------|------|--------|------|
| `/categories` | 📄 Internal | link | app/[locale]/(public)/categories/[slug]/page.tsx:68 |
| `/privacy` | 📄 Internal | link | components/shared/layouts/Footer.tsx:319 |
| `/terms` | 📄 Internal | link | components/shared/layouts/Footer.tsx:285 |
| `about` | 📄 Internal | filesystem | src/app/[locale]/(public)/about/page.tsx |
| `browse-suppliers` | 📄 Internal | filesystem | src/app/[locale]/(public)/browse-suppliers/page.tsx |
| `browse-suppliers/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(public)/browse-suppliers/[id] |
| `categories` | 📄 Internal | filesystem | src/app/[locale]/(public)/categories/page.tsx |
| `categories/[slug]` | 🔄 Dynamic | filesystem | src/app/[locale]/(public)/categories/[slug] |
| `contact` | 📄 Internal | filesystem | src/app/[locale]/(public)/contact/page.tsx |
| `faq` | 📄 Internal | filesystem | src/app/[locale]/(public)/faq/page.tsx |
| `how-it-works` | 📄 Internal | filesystem | src/app/[locale]/(public)/how-it-works/page.tsx |
| `privacy` | 📄 Internal | filesystem | src/app/[locale]/(public)/privacy/page.tsx |
| `terms` | 📄 Internal | filesystem | src/app/[locale]/(public)/terms/page.tsx |

### Root

| Path | Type | Source | File |
|------|------|--------|------|
| `/` | 📄 Internal | filesystem,link | src/app/[locale]/page.tsx |

### Supplier

| Path | Type | Source | File |
|------|------|--------|------|
| `/offers` | 📄 Internal | router | components/features/offers/OfferForm.tsx:82 |
| `/offers/new` | 📄 Internal | router | app/[locale]/(supplier)/offers/page.tsx:45 |
| `/supplier-projects` | 📄 Internal | router | app/[locale]/(supplier)/supplier-projects/[id]/page.tsx:54 |
| `offers` | 📄 Internal | filesystem | src/app/[locale]/(supplier)/offers/page.tsx |
| `offers/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(supplier)/offers/[id] |
| `offers/[id]/edit` | 🔄 Dynamic | filesystem | src/app/[locale]/(supplier)/offers/[id]/edit/page.tsx |
| `offers/new` | 📄 Internal | filesystem | src/app/[locale]/(supplier)/offers/new/page.tsx |
| `portfolio` | 📄 Internal | filesystem | src/app/[locale]/(supplier)/portfolio/page.tsx |
| `stats` | 📄 Internal | filesystem | src/app/[locale]/(supplier)/stats/page.tsx |
| `supplier-profile/edit` | 📄 Internal | filesystem | src/app/[locale]/(supplier)/supplier-profile/edit/page.tsx |
| `supplier-profile/setup` | 📄 Internal | filesystem | src/app/[locale]/(supplier)/supplier-profile/setup/page.tsx |
| `supplier-projects/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(supplier)/supplier-projects/[id] |

### Suppliers

| Path | Type | Source | File |
|------|------|--------|------|
| `suppliers` | 📄 Internal | filesystem | src/app/[locale]/(client)/suppliers/page.tsx |
| `suppliers/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/suppliers/[id] |
| `suppliers/[id]/portfolio` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/suppliers/[id]/portfolio/page.tsx |
| `suppliers/me` | 📄 Internal | filesystem | src/app/[locale]/(client)/suppliers/me/page.tsx |
| `suppliers/me/edit` | 📄 Internal | filesystem | src/app/[locale]/(client)/suppliers/me/edit/page.tsx |

### Users

| Path | Type | Source | File |
|------|------|--------|------|
| `users/[id]` | 🔄 Dynamic | filesystem | src/app/[locale]/(client)/users/[id] |

## External Links

| URL | Source File |
|-----|-------------|
| https://i.pravatar.cc/150?img=12 | mocks/data/home.ts:22 |
| https://i.pravatar.cc/150?img=14 | mocks/data/home.ts:30 |
| https://i.pravatar.cc/150?img=45 | mocks/data/home.ts:38 |
| https://i.pravatar.cc/150?img=33 | mocks/data/home.ts:45 |
| https://i.pravatar.cc/150?img=47 | mocks/data/home.ts:492 |
| https://i.pravatar.cc/150?img=51 | mocks/data/home.ts:513 |
| https://i.pravatar.cc/150?img=48 | mocks/data/home.ts:535 |
| https://i.pravatar.cc/150?img=52 | mocks/data/home.ts:657 |
| https://api.example.com | lib/utils/naming-validator.test-demo.ts:40 |
| http://localhost:3000 | lib/constants/config.ts:7 |
| https://docs.google.com/forms/d/1NzAEs7uruIqcHz0NvVa-xstUp14G1hNig0jzmoyUomQ/edit | components/features/home/HeroSection.tsx:90 |

