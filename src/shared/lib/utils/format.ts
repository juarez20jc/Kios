import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/** Formatea número como moneda EUR (ajustable por locale) */
export function formatCurrency(
  amount: number,
  currency = 'EUR',
  locale = 'es-ES'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Formatea fecha corta: 15 ene 2024 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'd MMM yyyy', { locale: es });
}

/** Formatea fecha larga: lunes, 15 de enero de 2024 */
export function formatDateLong(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, "eeee, d 'de' MMMM 'de' yyyy", { locale: es });
}

/** Formatea mes/año: enero 2024 */
export function formatMonthYear(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMMM yyyy', { locale: es });
}

/** Tiempo relativo: hace 2 horas, hace 3 días */
export function formatRelative(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: es });
}

/** Formatea número con separadores de miles */
export function formatNumber(num: number, locale = 'es-ES', decimals = 0): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}