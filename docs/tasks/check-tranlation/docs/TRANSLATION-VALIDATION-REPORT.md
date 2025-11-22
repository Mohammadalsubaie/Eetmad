# Comprehensive Translation Validation Report

Generated: 2025-11-21T12:52:12.621Z

## Summary

- **Total Files Scanned**: 572
- **Files Using Translations**: 243
- **Total Translation Calls**: 2000
- **Missing Keys**: 2
- **Namespace Errors**: 0
- **Dynamic Key Issues**: 265
- **Total Errors**: 2
- **Total Warnings**: 302

## ❌ Errors (2)

These issues **must** be fixed as they prevent translations from working:

### missing_key (2)

- **app/[locale]/(client)/messages/page.tsx:73** - Missing translation key: pages.messages.active (missing in: ar, en)
  ```
  {t('active')}
  ```

- **app/[locale]/(client)/messages/page.tsx:89** - Missing translation key: pages.messages.archived (missing in: ar, en)
  ```
  {t('archived')}
  ```

## ⚠️ Warnings (302)

These issues should be reviewed but may not prevent translations from working:

### dynamic_key (265)

- **app/[locale]/(admin)/admin/analytics/page.tsx:59** - Dynamic translation key: t(`analytics.currency.million`) - cannot fully validate
  ```
  return `${(value / 1000000).toFixed(1)}${t('analytics.currency.million')}`;
  ```

- **app/[locale]/(admin)/admin/analytics/page.tsx:61** - Dynamic translation key: t(`analytics.currency.thousand`) - cannot fully validate
  ```
  return `${(value / 1000).toFixed(0)}${t('analytics.currency.thousand')}`;
  ```

- **app/[locale]/(admin)/admin/analytics/page.tsx:72** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/edit/page.tsx:95** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/edit/page.tsx:96** - Dynamic translation key: tPages(`categories.title`) - cannot fully validate
  ```
  { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/edit/page.tsx:114** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/edit/page.tsx:115** - Dynamic translation key: tPages(`categories.title`) - cannot fully validate
  ```
  { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/page.tsx:33** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/page.tsx:34** - Dynamic translation key: tPages(`categories.title`) - cannot fully validate
  ```
  { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/page.tsx:51** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/categories/[id]/page.tsx:52** - Dynamic translation key: tPages(`categories.title`) - cannot fully validate
  ```
  { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
  ```

- **app/[locale]/(admin)/admin/categories/new/page.tsx:76** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/categories/new/page.tsx:77** - Dynamic translation key: tPages(`categories.title`) - cannot fully validate
  ```
  { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
  ```

- **app/[locale]/(admin)/admin/categories/page.tsx:23** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/dashboard/page.tsx:26** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/dashboard/page.tsx:43** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/dashboard/page.tsx:57** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/disputes/[id]/page.tsx:17** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/disputes/[id]/page.tsx:18** - Dynamic translation key: tPages(`disputes.title`) - cannot fully validate
  ```
  { label: tPages('disputes.title'), href: `/${locale}/admin/disputes` },
  ```

- **app/[locale]/(admin)/admin/disputes/page.tsx:24** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/offers/page.tsx:24** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/payments/[id]/page.tsx:34** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/payments/[id]/page.tsx:35** - Dynamic translation key: tPages(`payments.title`) - cannot fully validate
  ```
  { label: tPages('payments.title'), href: `/${locale}/admin/payments` },
  ```

- **app/[locale]/(admin)/admin/payments/[id]/page.tsx:52** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/payments/[id]/page.tsx:53** - Dynamic translation key: tPages(`payments.title`) - cannot fully validate
  ```
  { label: tPages('payments.title'), href: `/${locale}/admin/payments` },
  ```

- **app/[locale]/(admin)/admin/payments/[id]/page.tsx:72** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/payments/[id]/page.tsx:73** - Dynamic translation key: tPages(`payments.title`) - cannot fully validate
  ```
  { label: tPages('payments.title'), href: `/${locale}/admin/payments` },
  ```

- **app/[locale]/(admin)/admin/payments/page.tsx:24** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/projects/page.tsx:24** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```

- **app/[locale]/(admin)/admin/reports/page.tsx:22** - Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  ```
  { label: tPages('admin.title'), href: `/${locale}/admin` },
  ```


... and 235 more

### hardcoded_arabic (1)

- **app/[locale]/(admin)/admin/settings/page.tsx** - Found 1 potential hardcoded Arabic text(s)
  - Line 132: "منصة اعتماد"
### unknown_namespace (36)

- **components/features/admin/AdminDashboardRevenue.tsx:57** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {stats.totalRevenue.toLocaleString('ar-SA')} {t('common.currency')}
  ```

- **components/features/admin/AdminDashboardStats.tsx:20** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  value={stats.totalUsers.toLocaleString('ar-SA')}
  ```

- **components/features/admin/AdminDashboardStats.tsx:28** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  value={stats.totalSuppliers.toLocaleString('ar-SA')}
  ```

- **components/features/admin/AdminDashboardStats.tsx:36** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  value={stats.activeRequests.toLocaleString('ar-SA')}
  ```

- **components/features/admin/AdminDashboardStats.tsx:44** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  value={stats.activeProjects.toLocaleString('ar-SA')}
  ```

- **components/features/admin/DisputesTableColumns.tsx:92** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(dispute.createdAt).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/OffersTableColumns.tsx:47** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {offer.proposedPrice.toLocaleString('ar-SA')} ر.س
  ```

- **components/features/admin/OffersTableColumns.tsx:71** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(offer.createdAt).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/PaymentsTableColumns.tsx:49** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {payment.amount.toLocaleString('ar-SA')} ر.س
  ```

- **components/features/admin/PaymentsTableColumns.tsx:53** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {t('payments.labels.netAmount')}: {payment.netAmount.toLocaleString('ar-SA')} ر.س
  ```

- **components/features/admin/PaymentsTableColumns.tsx:80** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(payment.createdAt).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/ProjectsTableColumns.tsx:50** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {project.totalAmount.toLocaleString('ar-SA')} ر.س
  ```

- **components/features/admin/ProjectsTableColumns.tsx:74** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(project.expectedEndDate).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/ReportsTableColumns.tsx:61** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(report.createdAt).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/RequestsTableColumns.tsx:47** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {request.budgetMin?.toLocaleString('ar-SA') ?? 0} -{' '}
  ```

- **components/features/admin/RequestsTableColumns.tsx:48** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {request.budgetMax?.toLocaleString('ar-SA') ?? 0} ر.س
  ```

- **components/features/admin/RequestsTableColumns.tsx:60** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(request.deadline).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/ReviewsTableColumns.tsx:74** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(review.createdAt).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/UserAccountInfo.tsx:40** - Translation call with unknown namespace: toLocaleDateString('en-US')
  ```
  {new Date(user.createdAt).toLocaleDateString('en-US')}
  ```

- **components/features/admin/UserAccountInfo.tsx:48** - Translation call with unknown namespace: toLocaleDateString('en-US')
  ```
  {new Date(user.updatedAt).toLocaleDateString('en-US')}
  ```

- **components/features/admin/UserAccountInfo.tsx:56** - Translation call with unknown namespace: toLocaleDateString('en-US')
  ```
  {new Date(user.lastLoginAt).toLocaleDateString('en-US')}
  ```

- **components/features/admin/UserPersonalInfo.tsx:41** - Translation call with unknown namespace: toLocaleDateString('en-US')
  ```
  {new Date(user.dateOfBirth).toLocaleDateString('en-US')}
  ```

- **components/features/admin/UserStats.tsx:36** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  value={user.walletBalance.toLocaleString('ar-SA')}
  ```

- **components/features/admin/VerificationTableColumns.tsx:66** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {new Date(doc.submittedAt).toLocaleDateString('ar-SA')}
  ```

- **components/features/admin/VerificationTableColumns.tsx:76** - Translation call with unknown namespace: toLocaleDateString('ar-SA')
  ```
  {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('ar-SA') : '-'}
  ```

- **components/features/categories/CategoryTimestampsSection.tsx:42** - Translation call with unknown namespace: toLocaleDateString('en-US')
  ```
  {new Date(category.createdAt).toLocaleDateString('en-US')}
  ```

- **components/features/categories/CategoryTimestampsSection.tsx:50** - Translation call with unknown namespace: toLocaleDateString('en-US')
  ```
  {new Date(category.updatedAt).toLocaleDateString('en-US')}
  ```

- **components/features/payments/PaymentOverviewCard.tsx:58** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {payment.amount.toLocaleString('ar-SA')} {t('common.currency')}
  ```

- **components/features/payments/PaymentOverviewCard.tsx:81** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {payment.netAmount.toLocaleString('ar-SA')} {t('common.currency')}
  ```

- **components/features/payments/PaymentOverviewCard.tsx:96** - Translation call with unknown namespace: toLocaleString('ar-SA')
  ```
  {payment.platformFee.toLocaleString('ar-SA')} {t('common.currency')}
  ```


... and 6 more


## 📋 File-by-File Breakdown

### app/[locale]/(admin)/admin/analytics/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 19
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 59: Dynamic translation key: t(`analytics.currency.million`) - cannot fully validate
  - ⚠️ Line 61: Dynamic translation key: t(`analytics.currency.thousand`) - cannot fully validate
  - ⚠️ Line 72: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/categories/[id]/edit/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 95: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 96: Dynamic translation key: tPages(`categories.title`) - cannot fully validate
  - ⚠️ Line 114: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 115: Dynamic translation key: tPages(`categories.title`) - cannot fully validate

### app/[locale]/(admin)/admin/categories/[id]/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 33: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 34: Dynamic translation key: tPages(`categories.title`) - cannot fully validate
  - ⚠️ Line 51: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 52: Dynamic translation key: tPages(`categories.title`) - cannot fully validate

### app/[locale]/(admin)/admin/categories/new/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 76: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 77: Dynamic translation key: tPages(`categories.title`) - cannot fully validate

### app/[locale]/(admin)/admin/categories/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 23: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/dashboard/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 26: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 43: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 57: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/disputes/[id]/page.tsx

- **Namespaces Used**: pages
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 17: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 18: Dynamic translation key: tPages(`disputes.title`) - cannot fully validate

### app/[locale]/(admin)/admin/disputes/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/offers/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/payments/[id]/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 6

  - ⚠️ Line 34: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 35: Dynamic translation key: tPages(`payments.title`) - cannot fully validate
  - ⚠️ Line 52: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 53: Dynamic translation key: tPages(`payments.title`) - cannot fully validate
  - ⚠️ Line 72: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 73: Dynamic translation key: tPages(`payments.title`) - cannot fully validate

### app/[locale]/(admin)/admin/payments/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/projects/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/reports/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 22: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/requests/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/reviews/[id]/edit/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 85: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 86: Dynamic translation key: tPages(`reviews.title`) - cannot fully validate
  - ⚠️ Line 104: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 105: Dynamic translation key: tPages(`reviews.title`) - cannot fully validate

### app/[locale]/(admin)/admin/reviews/[id]/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 33: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 34: Dynamic translation key: tPages(`reviews.title`) - cannot fully validate
  - ⚠️ Line 51: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 52: Dynamic translation key: tPages(`reviews.title`) - cannot fully validate

### app/[locale]/(admin)/admin/reviews/new/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 74: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 75: Dynamic translation key: tPages(`reviews.title`) - cannot fully validate

### app/[locale]/(admin)/admin/reviews/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/settings/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 59: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/suppliers/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/users/[id]/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 59: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 60: Dynamic translation key: tPages(`users.title`) - cannot fully validate

### app/[locale]/(admin)/admin/users/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 27: Dynamic translation key: tPages(`admin.title`) - cannot fully validate
  - ⚠️ Line 41: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/admin/verification/page.tsx

- **Namespaces Used**: admin, pages
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 38: Dynamic translation key: tPages(`admin.title`) - cannot fully validate

### app/[locale]/(admin)/layout.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/contracts/[id]/clauses/page.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 19
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 60: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 78: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 95: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/contracts/[id]/edit/page.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 10
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 26: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 44: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 59: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/contracts/[id]/page.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 31
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 42: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 56: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 85: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/contracts/[id]/sign/page.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 10
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 29: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 47: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 62: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/contracts/[id]/versions/page.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 20
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 29: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 47: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 72: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/contracts/new/page.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 22: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/contracts/page.tsx

- **Namespaces Used**: pages.contracts, pages
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/disputes/[id]/page.tsx

- **Namespaces Used**: pages.disputes
- **Translation Calls**: 31
- **Errors**: 0
- **Warnings**: 5

  - ⚠️ Line 83: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 97: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 120: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 164: Dynamic translation key: t(`category.${dispute.category}`) - cannot fully validate
  - ⚠️ Line 173: Dynamic translation key: t(`priority.${dispute.priority}`) - cannot fully validate

### app/[locale]/(client)/disputes/new/page.tsx

- **Namespaces Used**: pages.disputes
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 22: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/disputes/page.tsx

- **Namespaces Used**: pages.disputes
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/messages/[id]/page.tsx

- **Namespaces Used**: pages.messages
- **Translation Calls**: 17
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 80: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 94: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/messages/new/page.tsx

- **Namespaces Used**: pages.messages
- **Translation Calls**: 16
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 62: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/messages/page.tsx

- **Namespaces Used**: pages.messages, pages
- **Translation Calls**: 6
- **Errors**: 2
- **Warnings**: 0

  - ❌ Line 73: Missing translation key: pages.messages.active (missing in: ar, en)
  - ❌ Line 89: Missing translation key: pages.messages.archived (missing in: ar, en)

### app/[locale]/(client)/messages/settings/page.tsx

- **Namespaces Used**: pages.messages
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 32: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/milestones/[id]/edit/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 26: Dynamic translation key: t(`milestonesSection.title`) - cannot fully validate
  - ⚠️ Line 44: Dynamic translation key: t(`milestonesSection.title`) - cannot fully validate
  - ⚠️ Line 59: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 61: Dynamic translation key: t(`milestonesSection.title`) - cannot fully validate

### app/[locale]/(client)/milestones/[id]/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 28
- **Errors**: 0
- **Warnings**: 5

  - ⚠️ Line 58: Dynamic translation key: t(`milestonesSection.title`) - cannot fully validate
  - ⚠️ Line 72: Dynamic translation key: t(`milestonesSection.title`) - cannot fully validate
  - ⚠️ Line 89: Dynamic translation key: t(`milestonesSection.currency`) - cannot fully validate
  - ⚠️ Line 96: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 98: Dynamic translation key: t(`milestonesSection.title`) - cannot fully validate

### app/[locale]/(client)/milestones/new/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 31: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 33: Dynamic translation key: t(`milestonesSection.title`) - cannot fully validate

### app/[locale]/(client)/notifications/[id]/page.tsx

- **Namespaces Used**: pages.notifications
- **Translation Calls**: 17
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 50: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 64: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 81: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 123: Dynamic translation key: t(`type.${notification.type}`) - cannot fully validate

### app/[locale]/(client)/notifications/page.tsx

- **Namespaces Used**: pages.notifications, pages
- **Translation Calls**: 10
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/notifications/settings/page.tsx

- **Namespaces Used**: pages.notifications
- **Translation Calls**: 23
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 40: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/payments/[id]/page.tsx

- **Namespaces Used**: pages.payments
- **Translation Calls**: 30
- **Errors**: 0
- **Warnings**: 5

  - ⚠️ Line 40: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 54: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 81: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 127: Dynamic translation key: t(`type.${payment.paymentType}`) - cannot fully validate
  - ⚠️ Line 165: Dynamic translation key: t(`method.${payment.paymentMethod}`) - cannot fully validate

### app/[locale]/(client)/payments/history/page.tsx

- **Namespaces Used**: pages.payments
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 25: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 42: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 56: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/payments/initiate/page.tsx

- **Namespaces Used**: pages.payments
- **Translation Calls**: 27
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 62: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/payments/page.tsx

- **Namespaces Used**: pages.payments
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/payments/wallet/page.tsx

- **Namespaces Used**: pages.payments
- **Translation Calls**: 17
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 65: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 186: Dynamic translation key: t(`transactionType.${transaction.type}`) - cannot fully validate
  - ⚠️ Line 208: Dynamic translation key: t(`status.${transaction.status}`) - cannot fully validate

### app/[locale]/(client)/profile/edit/page.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 31
- **Errors**: 0
- **Warnings**: 6

  - ⚠️ Line 116: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 116: Dynamic translation key: t(`edit`) - cannot fully validate
  - ⚠️ Line 127: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 127: Dynamic translation key: t(`edit`) - cannot fully validate
  - ⚠️ Line 135: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 135: Dynamic translation key: t(`edit`) - cannot fully validate

### app/[locale]/(client)/profile/page.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 25
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 76: Dynamic translation key: t(`userType.${profile.userType}`) - cannot fully validate

### app/[locale]/(client)/profile/settings/page.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 31
- **Errors**: 0
- **Warnings**: 7

  - ⚠️ Line 133: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 133: Dynamic translation key: t(`settings`) - cannot fully validate
  - ⚠️ Line 143: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 143: Dynamic translation key: t(`settings`) - cannot fully validate
  - ⚠️ Line 279: Dynamic translation key: t(`notifications.${key}`) - cannot fully validate
  - ⚠️ Line 301: Dynamic translation key: t(`notifications.${key}`) - cannot fully validate
  - ⚠️ Line 323: Dynamic translation key: t(`notifications.${key}`) - cannot fully validate

### app/[locale]/(client)/projects/[id]/cancel/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 18
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 45: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 63: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 78: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/projects/[id]/complete/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 16
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 37: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 55: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 70: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/projects/[id]/delivery/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 20
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 52: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 70: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 85: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/projects/[id]/milestones/page.tsx

- **Namespaces Used**: pages.projects, pages
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 54: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 72: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/projects/[id]/page.tsx

- **Namespaces Used**: pages.projects, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 31: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 48: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 70: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/projects/[id]/start/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 15
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 37: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 55: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 70: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/projects/page.tsx

- **Namespaces Used**: pages.projects, pages
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/requests/[id]/edit/page.tsx

- **Namespaces Used**: pages.requests, pages
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 27: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 45: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 68: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/requests/[id]/offers/page.tsx

- **Namespaces Used**: pages.offers, pages
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 32: Dynamic translation key: tPages(`requests.title`) - cannot fully validate

### app/[locale]/(client)/requests/[id]/page.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 28: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 42: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 62: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/requests/my-requests/page.tsx

- **Namespaces Used**: pages.requests, pages
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 21: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/requests/new/page.tsx

- **Namespaces Used**: pages.requests, pages
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 20: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 20: Dynamic translation key: tPages(`new.title`) - cannot fully validate

### app/[locale]/(client)/requests/page.tsx

- **Namespaces Used**: pages.requests, pages
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/reviews/[id]/page.tsx

- **Namespaces Used**: pages.reviews
- **Translation Calls**: 28
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 106: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 120: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 155: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 200: Dynamic translation key: t(`type.${review.reviewType}`) - cannot fully validate

### app/[locale]/(client)/reviews/new/page.tsx

- **Namespaces Used**: pages.reviews
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 33: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/reviews/page.tsx

- **Namespaces Used**: pages.reviews
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/suppliers/[id]/page.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 18
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 25: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 36: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 44: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 170: Dynamic translation key: t(`primary`) - cannot fully validate

### app/[locale]/(client)/suppliers/[id]/portfolio/page.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 24: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 42: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 59: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(client)/suppliers/me/edit/page.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 19
- **Errors**: 0
- **Warnings**: 6

  - ⚠️ Line 63: Dynamic translation key: t(`myProfile`) - cannot fully validate
  - ⚠️ Line 63: Dynamic translation key: t(`edit`) - cannot fully validate
  - ⚠️ Line 74: Dynamic translation key: t(`myProfile`) - cannot fully validate
  - ⚠️ Line 74: Dynamic translation key: t(`edit`) - cannot fully validate
  - ⚠️ Line 82: Dynamic translation key: t(`myProfile`) - cannot fully validate
  - ⚠️ Line 82: Dynamic translation key: t(`edit`) - cannot fully validate

### app/[locale]/(client)/suppliers/me/page.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 20
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/suppliers/page.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(client)/users/[id]/page.tsx

- **Namespaces Used**: pages.users
- **Translation Calls**: 19
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 74: Dynamic translation key: t(`userType.${user.userType}`) - cannot fully validate

### app/[locale]/(main)/dashboard/page.tsx

- **Namespaces Used**: pages.dashboard
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(public)/about/page.tsx

- **Namespaces Used**: biddingPlatform, pages
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(public)/browse-suppliers/[id]/page.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 33: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 50: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(public)/browse-suppliers/page.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(public)/categories/[slug]/page.tsx

- **Namespaces Used**: pages.categories
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 53: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 68: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(public)/categories/page.tsx

- **Namespaces Used**: pages.categories
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(public)/contact/page.tsx

- **Namespaces Used**: pages.contact, pages
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(public)/faq/page.tsx

- **Namespaces Used**: pages.faq, pages
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 102: Dynamic translation key: t(`items.${key}.question`) - cannot fully validate
  - ⚠️ Line 105: Dynamic translation key: t(`items.${key}.summary`) - cannot fully validate
  - ⚠️ Line 141: Dynamic translation key: t(`items.${key}.answer`) - cannot fully validate

### app/[locale]/(public)/how-it-works/page.tsx

- **Namespaces Used**: biddingPlatform.sections.gettingStarted, pages
- **Translation Calls**: 28
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(public)/privacy/page.tsx

- **Namespaces Used**: pages
- **Translation Calls**: 18
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(public)/terms/page.tsx

- **Namespaces Used**: pages.terms, pages
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(supplier)/offers/[id]/edit/page.tsx

- **Namespaces Used**: pages.offers, pages
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 27: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 45: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 68: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(supplier)/offers/[id]/page.tsx

- **Namespaces Used**: pages.offers, pages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 30: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 47: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 72: Dynamic translation key: t(`title`) - cannot fully validate

### app/[locale]/(supplier)/offers/new/page.tsx

- **Namespaces Used**: pages.offers, pages
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 22: Dynamic translation key: t(`title`) - cannot fully validate
  - ⚠️ Line 22: Dynamic translation key: tPages(`new.title`) - cannot fully validate

### app/[locale]/(supplier)/offers/page.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(supplier)/portfolio/page.tsx

- **Namespaces Used**: pages.portfolio, pages
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(supplier)/stats/page.tsx

- **Namespaces Used**: pages.stats
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 27: Dynamic translation key: t(`currency`) - cannot fully validate

### app/[locale]/(supplier)/supplier-profile/edit/page.tsx

- **Namespaces Used**: pages.supplierProfile, pages
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(supplier)/supplier-profile/setup/page.tsx

- **Namespaces Used**: pages.supplierSetup, pages
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### app/[locale]/(supplier)/supplier-projects/[id]/page.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/AdminDashboardActivity.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/AdminDashboardAlerts.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/AdminDashboardPerformance.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/AdminDashboardRevenue.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 57: Translation call with unknown namespace: toLocaleString('ar-SA')

### components/features/admin/AdminDashboardStats.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 20: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 28: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 36: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 44: Translation call with unknown namespace: toLocaleString('ar-SA')

### components/features/admin/CategoriesTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/DisputesTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 92: Translation call with unknown namespace: toLocaleDateString('ar-SA')
  - ⚠️ Line 122: Dynamic translation key: t(`disputes.statuses.${dispute.status}`) - cannot fully validate

### components/features/admin/OffersTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 47: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 71: Translation call with unknown namespace: toLocaleDateString('ar-SA')

### components/features/admin/PaymentsTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 14
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 49: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 53: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 69: Dynamic translation key: t(`payments.methods.${payment.paymentMethod}`) - cannot fully validate
  - ⚠️ Line 80: Translation call with unknown namespace: toLocaleDateString('ar-SA')

### components/features/admin/ProjectsTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 14
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 50: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 74: Translation call with unknown namespace: toLocaleDateString('ar-SA')

### components/features/admin/ReportsTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 46: Dynamic translation key: t(`reports.reasons.${report.reason}`) - cannot fully validate
  - ⚠️ Line 61: Translation call with unknown namespace: toLocaleDateString('ar-SA')
  - ⚠️ Line 91: Dynamic translation key: t(`reports.statuses.${report.status}`) - cannot fully validate

### components/features/admin/RequestsTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 47: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 48: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 60: Translation call with unknown namespace: toLocaleDateString('ar-SA')

### components/features/admin/ReviewsTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 74: Translation call with unknown namespace: toLocaleDateString('ar-SA')

### components/features/admin/SuppliersTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/UserAccountInfo.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 40: Translation call with unknown namespace: toLocaleDateString('en-US')
  - ⚠️ Line 48: Translation call with unknown namespace: toLocaleDateString('en-US')
  - ⚠️ Line 56: Translation call with unknown namespace: toLocaleDateString('en-US')

### components/features/admin/UserAddressInfo.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/UserBasicInfo.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 76: Dynamic translation key: t(`users.types.${user.userType}`) - cannot fully validate

### components/features/admin/UserContactInfo.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/UserPersonalInfo.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 41: Translation call with unknown namespace: toLocaleDateString('en-US')

### components/features/admin/UserStats.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 21: Dynamic translation key: t(`users.detail.stats.reviews`) - cannot fully validate
  - ⚠️ Line 36: Translation call with unknown namespace: toLocaleString('ar-SA')

### components/features/admin/UserVerificationInfo.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/UsersTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 14
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/VerificationStats.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/VerificationTableColumns.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 66: Translation call with unknown namespace: toLocaleDateString('ar-SA')
  - ⚠️ Line 76: Translation call with unknown namespace: toLocaleDateString('ar-SA')
  - ⚠️ Line 101: Dynamic translation key: t(`verification.statuses.${doc.status}`) - cannot fully validate

### components/features/admin/charts/MonthlyRevenueChart.tsx

- **Namespaces Used**: admin.analytics.charts.monthlyRevenue
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/charts/ProjectsByCategoryChart.tsx

- **Namespaces Used**: admin.analytics.charts.projectsByCategory
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/admin/charts/UserGrowthChart.tsx

- **Namespaces Used**: admin.analytics.charts.userGrowth
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/auth/ForgotPasswordForm.tsx

- **Namespaces Used**: auth
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 0

### components/features/auth/LoginForm.tsx

- **Namespaces Used**: auth
- **Translation Calls**: 12
- **Errors**: 0
- **Warnings**: 0

### components/features/auth/RegisterForm.tsx

- **Namespaces Used**: auth
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 0

### components/features/auth/RegisterFormFields.tsx

- **Namespaces Used**: auth
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 0

### components/features/auth/ResetPasswordForm.tsx

- **Namespaces Used**: auth
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 0

### components/features/auth/UserTypeSelector.tsx

- **Namespaces Used**: auth.register.userType
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 97: Dynamic translation key: t(`${item.titleKey}.title`) - cannot fully validate
  - ⚠️ Line 100: Dynamic translation key: t(`${item.titleKey}.description`) - cannot fully validate

### components/features/auth/VerifyEmailForm.tsx

- **Namespaces Used**: auth
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 227: Dynamic translation key: t(`verifyEmail.resendButton`) - cannot fully validate

### components/features/categories/CategoryCard.tsx

- **Namespaces Used**: pages.categories
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/categories/CategoryDescriptionSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/categories/CategoryFormFields.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### components/features/categories/CategoryHeader.tsx

- **Namespaces Used**: pages.categories
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/categories/CategoryInfoSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### components/features/categories/CategoryOverviewCard.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/categories/CategoryTimestampsSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 42: Translation call with unknown namespace: toLocaleDateString('en-US')
  - ⚠️ Line 50: Translation call with unknown namespace: toLocaleDateString('en-US')

### components/features/categories/SubcategoriesList.tsx

- **Namespaces Used**: pages.categories
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/contact/ContactForm.tsx

- **Namespaces Used**: pages.contact
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### components/features/contracts/ContractCard.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 10
- **Errors**: 0
- **Warnings**: 0

### components/features/contracts/ContractForm.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 16
- **Errors**: 0
- **Warnings**: 0

### components/features/contracts/ContractSigning.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 14
- **Errors**: 0
- **Warnings**: 0

### components/features/contracts/ContractsList.tsx

- **Namespaces Used**: pages.contracts
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/dashboard/DashboardHeader.tsx

- **Namespaces Used**: pages.dashboard
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/dashboard/DashboardOverviewStats.tsx

- **Namespaces Used**: pages.dashboard
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/dashboard/DashboardRecentActivity.tsx

- **Namespaces Used**: pages.dashboard
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/dashboard/DashboardStatistics.tsx

- **Namespaces Used**: pages.dashboard
- **Translation Calls**: 10
- **Errors**: 0
- **Warnings**: 0

### components/features/disputes/DisputeCard.tsx

- **Namespaces Used**: pages.disputes
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 108: Dynamic translation key: t(`priority.${dispute.priority}`) - cannot fully validate
  - ⚠️ Line 117: Dynamic translation key: t(`category.${dispute.category}`) - cannot fully validate

### components/features/disputes/DisputeForm.tsx

- **Namespaces Used**: pages.disputes
- **Translation Calls**: 23
- **Errors**: 0
- **Warnings**: 0

### components/features/disputes/DisputesList.tsx

- **Namespaces Used**: pages.disputes
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/faq/FAQItem.tsx

- **Namespaces Used**: faq
- **Translation Calls**: 0
- **Errors**: 0
- **Warnings**: 0

### components/features/faq/FAQList.tsx

- **Namespaces Used**: faq
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/home/AudienceSection.tsx

- **Namespaces Used**: biddingPlatform.sections.audience
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 98: Dynamic translation key: t(`segments.${segment.key}.tagline`) - cannot fully validate
  - ⚠️ Line 101: Dynamic translation key: t(`segments.${segment.key}.title`) - cannot fully validate
  - ⚠️ Line 110: Dynamic translation key: t(`segments.${segment.key}.description`) - cannot fully validate
  - ⚠️ Line 138: Dynamic translation key: t(`segments.${segment.key}.items.${itemKey}`) - cannot fully validate

### components/features/home/CTASection.tsx

- **Namespaces Used**: home.cta
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/home/ExploreCategoriesSection.tsx

- **Namespaces Used**: biddingPlatform.sections.exploreCategories
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 119: Dynamic translation key: t(`items.${category.key}.title`) - cannot fully validate
  - ⚠️ Line 125: Dynamic translation key: t(`items.${category.key}.description`) - cannot fully validate
  - ⚠️ Line 135: Dynamic translation key: t(`items.${category.key}.stat`) - cannot fully validate

### components/features/home/FAQSection.tsx

- **Namespaces Used**: pages.faq
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 98: Dynamic translation key: t(`items.${key}.question`) - cannot fully validate
  - ⚠️ Line 101: Dynamic translation key: t(`items.${key}.summary`) - cannot fully validate
  - ⚠️ Line 137: Dynamic translation key: t(`items.${key}.answer`) - cannot fully validate

### components/features/home/GettingStartedSection.tsx

- **Namespaces Used**: biddingPlatform.sections.gettingStarted
- **Translation Calls**: 10
- **Errors**: 0
- **Warnings**: 7

  - ⚠️ Line 90: Dynamic translation key: t(`cards.${card.key}.tagline`) - cannot fully validate
  - ⚠️ Line 96: Dynamic translation key: t(`cards.${card.key}.title`) - cannot fully validate
  - ⚠️ Line 112: Dynamic translation key: t(`cards.${card.key}.badge`) - cannot fully validate
  - ⚠️ Line 120: Dynamic translation key: t(`cards.${card.key}.description`) - cannot fully validate
  - ⚠️ Line 143: Dynamic translation key: t(`cards.${card.key}.steps.${stepKey}.order`) - cannot fully validate
  - ⚠️ Line 150: Dynamic translation key: t(`cards.${card.key}.steps.${stepKey}.title`) - cannot fully validate
  - ⚠️ Line 156: Dynamic translation key: t(`cards.${card.key}.steps.${stepKey}.description`) - cannot fully validate

### components/features/home/HeroSection.tsx

- **Namespaces Used**: home.hero
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### components/features/home/PlatformOverviewSection.tsx

- **Namespaces Used**: biddingPlatform.sections.platformOverview
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 126: Dynamic translation key: t(`mainCard.highlights.${highlight}`) - cannot fully validate
  - ⚠️ Line 171: Dynamic translation key: t(`features.${feature.key}.title`) - cannot fully validate
  - ⚠️ Line 177: Dynamic translation key: t(`features.${feature.key}.description`) - cannot fully validate

### components/features/home/ProjectBenefitsSection.tsx

- **Namespaces Used**: biddingPlatform.sections.projectBenefits
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 62: Dynamic translation key: t(`items.${benefit.key}.title`) - cannot fully validate
  - ⚠️ Line 63: Dynamic translation key: t(`items.${benefit.key}.description`) - cannot fully validate

### components/features/home/StatsSection.tsx

- **Namespaces Used**: home.stats
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 0

### components/features/home/SuccessStoriesSection.tsx

- **Namespaces Used**: biddingPlatform.sections.successStories
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 110: Dynamic translation key: t(`stories.${story.key}.title`) - cannot fully validate
  - ⚠️ Line 118: Dynamic translation key: t(`stories.${story.key}.description`) - cannot fully validate
  - ⚠️ Line 137: Dynamic translation key: t(`stories.${story.key}.${story.statLabelKey}`) - cannot fully validate

### components/features/home/TestimonialsSection.tsx

- **Namespaces Used**: home.testimonials
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/home/TransparencySection.tsx

- **Namespaces Used**: biddingPlatform.sections.transparency
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 3

  - ⚠️ Line 125: Dynamic translation key: t(`mainCard.points.${point}`) - cannot fully validate
  - ⚠️ Line 167: Dynamic translation key: t(`features.${feature.key}.title`) - cannot fully validate
  - ⚠️ Line 173: Dynamic translation key: t(`features.${feature.key}.description`) - cannot fully validate

### components/features/messages/ConversationCard.tsx

- **Namespaces Used**: pages.messages
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 121: Dynamic translation key: t(`status.${conversation.status}`) - cannot fully validate

### components/features/messages/ConversationsList.tsx

- **Namespaces Used**: pages.messages
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/messages/MessageBubble.tsx

- **Namespaces Used**: pages.messages
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/messages/MessageInput.tsx

- **Namespaces Used**: pages.messages
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/notifications/NotificationCard.tsx

- **Namespaces Used**: pages.notifications
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 60: Dynamic translation key: t(`minutesAgo`) - cannot fully validate
  - ⚠️ Line 62: Dynamic translation key: t(`hoursAgo`) - cannot fully validate
  - ⚠️ Line 64: Dynamic translation key: t(`daysAgo`) - cannot fully validate
  - ⚠️ Line 189: Dynamic translation key: t(`type.${notification.type}`) - cannot fully validate

### components/features/notifications/NotificationsList.tsx

- **Namespaces Used**: pages.notifications
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### components/features/offers/OfferActions.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/offers/OfferCard.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 38: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 86: Dynamic translation key: t(`status.${offer.status}`) - cannot fully validate

### components/features/offers/OfferContentSection.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 0
- **Errors**: 0
- **Warnings**: 0

### components/features/offers/OfferForm.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### components/features/offers/OfferFormFields.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 17
- **Errors**: 0
- **Warnings**: 0

### components/features/offers/OfferHeader.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 51: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 74: Dynamic translation key: t(`status.${offer.status}`) - cannot fully validate

### components/features/offers/OfferStats.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/offers/OffersList.tsx

- **Namespaces Used**: pages.offers
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/payments/PaymentCard.tsx

- **Namespaces Used**: pages.payments
- **Translation Calls**: 12
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 125: Dynamic translation key: t(`type.${payment.paymentType}`) - cannot fully validate
  - ⚠️ Line 151: Dynamic translation key: t(`method.${payment.paymentMethod}`) - cannot fully validate

### components/features/payments/PaymentFailureSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/payments/PaymentInfoSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 40: Dynamic translation key: t(`payments.types.${payment.paymentType}`) - cannot fully validate
  - ⚠️ Line 48: Dynamic translation key: t(`payments.stages.${payment.paymentStage}`) - cannot fully validate

### components/features/payments/PaymentNotesSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/payments/PaymentOverviewCard.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 14
- **Errors**: 0
- **Warnings**: 4

  - ⚠️ Line 58: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 81: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 96: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 111: Dynamic translation key: t(`payments.methods.${payment.paymentMethod}`) - cannot fully validate

### components/features/payments/PaymentProjectSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/payments/PaymentTransactionSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ChangePasswordFields.tsx

- **Namespaces Used**: pages.profile.security
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ChangePasswordForm.tsx

- **Namespaces Used**: pages.profile.security
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileAccountInfo.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 54: Dynamic translation key: t(`sections.accountInfo.userTypes.${user.userType}`) - cannot fully validate

### components/features/profile/ProfileAddressSection.tsx

- **Namespaces Used**: pages.profile.edit
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileBasicInfoSection.tsx

- **Namespaces Used**: pages.profile.edit
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileCompanyInfo.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileCompanySection.tsx

- **Namespaces Used**: pages.profile.edit
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileContactInfo.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 9
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileEditForm.tsx

- **Namespaces Used**: pages.profile.edit
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileHeader.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileInfoCard.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileSecurityLink.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileSocialSection.tsx

- **Namespaces Used**: pages.profile.edit
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/profile/ProfileStats.tsx

- **Namespaces Used**: pages.profile
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/projects/MilestoneCard.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 16
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 84: Translation call with unknown namespace: toLocaleString('ar-SA')
  - ⚠️ Line 98: Translation call with unknown namespace: toLocaleDateString('en-US')

### components/features/projects/MilestoneForm.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 14
- **Errors**: 0
- **Warnings**: 0

### components/features/projects/ProjectActions.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/projects/ProjectCard.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 38: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 92: Dynamic translation key: t(`status.${project.status}`) - cannot fully validate

### components/features/projects/ProjectHeader.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 75: Dynamic translation key: t(`status.${project.status}`) - cannot fully validate
  - ⚠️ Line 86: Dynamic translation key: t(`status.${project.status}`) - cannot fully validate

### components/features/projects/ProjectMilestonesList.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 24: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 60: Dynamic translation key: t(`milestoneStatus.${milestone.status}`) - cannot fully validate

### components/features/projects/ProjectMilestonesSummary.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 41: Translation call with unknown namespace: toLocaleString('ar-SA')

### components/features/projects/ProjectPaymentInfo.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 15: Dynamic translation key: t(`currency`) - cannot fully validate

### components/features/projects/ProjectStats.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 24: Dynamic translation key: t(`currency`) - cannot fully validate

### components/features/projects/ProjectsList.tsx

- **Namespaces Used**: pages.projects
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/requests/RequestActions.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/requests/RequestCard.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 6

  - ⚠️ Line 39: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 42: Dynamic translation key: t(`budgetMin`) - cannot fully validate
  - ⚠️ Line 42: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 45: Dynamic translation key: t(`budgetMax`) - cannot fully validate
  - ⚠️ Line 45: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 88: Dynamic translation key: t(`status.${request.status}`) - cannot fully validate

### components/features/requests/RequestDescription.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/requests/RequestDetailsCard.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/requests/RequestFilters.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 11
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 139: Dynamic translation key: t(`status.${status}`) - cannot fully validate

### components/features/requests/RequestForm.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/requests/RequestFormFields.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 17
- **Errors**: 0
- **Warnings**: 0

### components/features/requests/RequestHeader.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 6

  - ⚠️ Line 38: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 41: Dynamic translation key: t(`budgetMin`) - cannot fully validate
  - ⚠️ Line 41: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 44: Dynamic translation key: t(`budgetMax`) - cannot fully validate
  - ⚠️ Line 44: Dynamic translation key: t(`currency`) - cannot fully validate
  - ⚠️ Line 67: Dynamic translation key: t(`status.${request.status}`) - cannot fully validate

### components/features/requests/RequestSearch.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/requests/RequestsList.tsx

- **Namespaces Used**: pages.requests
- **Translation Calls**: 4
- **Errors**: 0
- **Warnings**: 0

### components/features/reviews/ReviewCard.tsx

- **Namespaces Used**: pages.reviews
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 92: Dynamic translation key: t(`type.${review.reviewType}`) - cannot fully validate

### components/features/reviews/ReviewEngagementSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 56: Translation call with unknown namespace: toLocaleDateString('en-US')
  - ⚠️ Line 65: Translation call with unknown namespace: toLocaleDateString('en-US')

### components/features/reviews/ReviewForm.tsx

- **Namespaces Used**: pages.reviews
- **Translation Calls**: 15
- **Errors**: 0
- **Warnings**: 0

### components/features/reviews/ReviewFormFields.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 13
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 107: Dynamic translation key: t(`reviews.form.rating`) - cannot fully validate

### components/features/reviews/ReviewInfoSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 8
- **Errors**: 0
- **Warnings**: 2

  - ⚠️ Line 40: Dynamic translation key: t(`reviews.types.${review.reviewType}`) - cannot fully validate
  - ⚠️ Line 72: Dynamic translation key: t(`reviews.statuses.${review.status}`) - cannot fully validate

### components/features/reviews/ReviewOverviewCard.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### components/features/reviews/ReviewResponseSection.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/reviews/ReviewsList.tsx

- **Namespaces Used**: pages.reviews
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/supplier/PortfolioManager.tsx

- **Namespaces Used**: pages.portfolio
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 0

### components/features/supplier/ProfileEditForm.tsx

- **Namespaces Used**: pages.supplierProfile
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/features/supplier/ProfileSetupWizard.tsx

- **Namespaces Used**: pages.supplierSetup
- **Translation Calls**: 12
- **Errors**: 0
- **Warnings**: 0

### components/features/suppliers/SupplierCard.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/suppliers/SupplierCategories.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/suppliers/SupplierCertifications.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/suppliers/SupplierHeader.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 2
- **Errors**: 0
- **Warnings**: 0

### components/features/suppliers/SupplierPortfolio.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/suppliers/SupplierSearchBar.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 0

### components/features/suppliers/SupplierStats.tsx

- **Namespaces Used**: pages.suppliers
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/features/terms/TermsContent.tsx

- **Namespaces Used**: pages.terms
- **Translation Calls**: 12
- **Errors**: 0
- **Warnings**: 0

### components/shared/admin/AdminDataTable.tsx

- **Namespaces Used**: admin
- **Translation Calls**: 3
- **Errors**: 0
- **Warnings**: 0

### components/shared/dev/PageNavigator.tsx

- **Namespaces Used**: dev
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 0

### components/shared/dev/ThemeSwitcher.tsx

- **Namespaces Used**: dev
- **Translation Calls**: 5
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 125: Translation call with unknown namespace: toggleGroup('Themes')

### components/shared/layouts/Footer.tsx

- **Namespaces Used**: footer
- **Translation Calls**: 20
- **Errors**: 0
- **Warnings**: 0

### components/shared/layouts/Header.tsx

- **Namespaces Used**: nav
- **Translation Calls**: 6
- **Errors**: 0
- **Warnings**: 0

### components/shared/layouts/Navbar.tsx

- **Namespaces Used**: nav
- **Translation Calls**: 7
- **Errors**: 0
- **Warnings**: 5

  - ⚠️ Line 18: Dynamic translation key: t(`home`) - cannot fully validate
  - ⚠️ Line 19: Dynamic translation key: t(`about`) - cannot fully validate
  - ⚠️ Line 20: Dynamic translation key: t(`requests`) - cannot fully validate
  - ⚠️ Line 21: Dynamic translation key: t(`suppliers`) - cannot fully validate
  - ⚠️ Line 22: Dynamic translation key: t(`contact`) - cannot fully validate

### components/shared/navigation/Breadcrumbs.tsx

- **Namespaces Used**: common
- **Translation Calls**: 1
- **Errors**: 0
- **Warnings**: 1

  - ⚠️ Line 26: Dynamic translation key: t(`home`) - cannot fully validate

