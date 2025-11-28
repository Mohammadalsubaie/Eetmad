import type { ReactNode } from 'react';

export interface Column<T> {
  key: string | keyof T;
  header: string;
  render?: (item: T) => ReactNode;
}
