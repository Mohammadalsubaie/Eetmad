export * from './Badge/';
export * from './Button';
export * from './Card';
export * from './IconContainer';
export * from './Input';
export * from './Tag';

// New components with default exports
export { default as SectionBadge } from './SectionBadge';
export { default as SectionHeader } from './SectionHeader';
export { default as GradientIcon } from './GradientIcon';
export { default as FeatureCard } from './FeatureCard';

// Re-export types
export type { SectionBadgeProps } from './SectionBadge';
export type { SectionHeaderProps } from './SectionHeader';
export type { GradientIconProps } from './GradientIcon';
export type { FeatureCardProps } from './FeatureCard';
