/** Monedas soportadas — ISO 4217 */
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'es-ES' },
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', locale: 'es-MX' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', locale: 'es-AR' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', locale: 'es-CO' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', locale: 'es-CL' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', locale: 'es-PE' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', locale: 'pt-BR' },
];

export const DEFAULT_CURRENCY = 'EUR';

export function getCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}