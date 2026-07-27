// Utilidad para combinar classNames — clsx + tailwind-merge
// Uso: cn('base-class', condition && 'conditional-class', { 'variant': true })
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Parameters<typeof clsx>): string {
  return twMerge(clsx(inputs));
}