// frontend/eetmad/src/styles/theme/gradients.ts

// تدرجات الثيم الفاتح - استخدام CSS variables
export const lightThemeGradients = {
  gold: 'linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%)',
  primary: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
  hero: 'linear-gradient(180deg, var(--color-secondary) 0%, var(--color-primary) 100%)',
  cta: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
} as const;

// تدرجات الثيم الغامق - استخدام CSS variables
export const darkThemeGradients = {
  gold: 'linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-dark) 100%)',
  primary: 'linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-dark) 100%)',
  hero: 'linear-gradient(180deg, var(--color-secondary) 0%, var(--color-accent-dark) 100%)',
  cta: 'linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-secondary) 100%)',
} as const;

// التدرج الافتراضي (الثيم الفاتح)
export const gradients = lightThemeGradients;

export type Gradients = typeof lightThemeGradients;
