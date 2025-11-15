// frontend/eetmad/src/styles/theme/gradients.ts

// تدرجات الثيم الفاتح
export const lightThemeGradients = {
  gold: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)',
  primary: 'linear-gradient(135deg, #34656D 0%, #284E54 100%)',
  hero: 'linear-gradient(180deg, #334443 0%, #34656D 100%)',
  cta: 'linear-gradient(135deg, #34656D 0%, #334443 100%)',
} as const;

// تدرجات الثيم الغامق
export const darkThemeGradients = {
  gold: 'linear-gradient(135deg, #F7374F 0%, #88304E 100%)',
  primary: 'linear-gradient(135deg, #F7374F 0%, #88304E 100%)',
  hero: 'linear-gradient(180deg, #522546 0%, #88304E 100%)',
  cta: 'linear-gradient(135deg, #88304E 0%, #522546 100%)',
} as const;

// التدرج الافتراضي (الثيم الفاتح)
export const gradients = lightThemeGradients;

export type Gradients = typeof lightThemeGradients;
