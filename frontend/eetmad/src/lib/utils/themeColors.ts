// src/lib/utils/themeColors.ts

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'destructive'
  | 'muted'
  | 'accent';

export const getColorClasses = (color: ThemeColor) => {
  const colorMap: Record<ThemeColor, { bg: string; text: string; hover: string; border: string }> =
    {
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        hover: 'hover:bg-primary/20',
        border: 'border-primary/20',
      },
      secondary: {
        bg: 'bg-secondary/10',
        text: 'text-secondary',
        hover: 'hover:bg-secondary/20',
        border: 'border-secondary/20',
      },
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        hover: 'hover:bg-success/20',
        border: 'border-success/20',
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        hover: 'hover:bg-warning/20',
        border: 'border-warning/20',
      },
      info: {
        bg: 'bg-info/10',
        text: 'text-info',
        hover: 'hover:bg-info/20',
        border: 'border-info/20',
      },
      destructive: {
        bg: 'bg-destructive/10',
        text: 'text-destructive',
        hover: 'hover:bg-destructive/20',
        border: 'border-destructive/20',
      },
      muted: {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        hover: 'hover:bg-muted/80',
        border: 'border-muted',
      },
      accent: {
        bg: 'bg-accent',
        text: 'text-accent-foreground',
        hover: 'hover:bg-accent/80',
        border: 'border-accent',
      },
    };

  return colorMap[color];
};
