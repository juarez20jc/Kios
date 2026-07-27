import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addDays,
  addMonths,
  subMonths,
  subYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  isWithinInterval,
  differenceInDays,
  differenceInMonths,
  subDays,
} from 'date-fns';

/** Inicio del día (00:00:00) */
export const dayStart = (date: Date) => startOfDay(date);

/** Fin del día (23:59:59.999) */
export const dayEnd = (date: Date) => endOfDay(date);

/** Inicio de la semana (lunes) */
export const weekStart = (date: Date) => startOfWeek(date, { weekStartsOn: 1 });

/** Fin de la semana (domingo) */
export const weekEnd = (date: Date) => endOfWeek(date, { weekStartsOn: 1 });

/** Inicio del mes */
export const monthStart = (date: Date) => startOfMonth(date);

/** Fin del mes */
export const monthEnd = (date: Date) => endOfMonth(date);

/** Inicio del año */
export const yearStart = (date: Date) => startOfYear(date);

/** Fin del año */
export const yearEnd = (date: Date) => endOfYear(date);

/** Suma días */
export const addDaysTo = (date: Date, days: number) => addDays(date, days);

/** Suma meses */
export const addMonthsTo = (date: Date, months: number) => addMonths(date, months);

/** Resta meses */
export const subMonthsFrom = (date: Date, months: number) => subMonths(date, months);

/** Resta años */
export const subYearsFrom = (date: Date, years: number) => subYears(date, years);

/** Array de días en un intervalo */
export const daysInRange = (start: Date, end: Date) =>
  eachDayOfInterval({ start: dayStart(start), end: dayEnd(end) });

/** Array de meses en un intervalo */
export const monthsInRange = (start: Date, end: Date) =>
  eachMonthOfInterval({ start: monthStart(start), end: monthEnd(end) });

/** Verifica si fecha está en intervalo */
export const dateInRange = (date: Date, start: Date, end: Date) =>
  isWithinInterval(date, { start: dayStart(start), end: dayEnd(end) });

/** Días entre dos fechas */
export const daysBetween = (start: Date, end: Date) =>
  differenceInDays(dayEnd(end), dayStart(start));

/** Meses entre dos fechas */
export const monthsBetween = (start: Date, end: Date) =>
  differenceInMonths(monthEnd(end), monthStart(start));

/** Rangos predefinidos para filtros */
export const dateRanges = {
  today: () => ({ start: dayStart(new Date()), end: dayEnd(new Date()) }),
  thisWeek: () => ({ start: weekStart(new Date()), end: weekEnd(new Date()) }),
  thisMonth: () => ({ start: monthStart(new Date()), end: monthEnd(new Date()) }),
  thisYear: () => ({ start: yearStart(new Date()), end: yearEnd(new Date()) }),
  last7Days: () => ({
    start: dayStart(subDays(new Date(), 6)),
    end: dayEnd(new Date()),
  }),
  last30Days: () => ({
    start: dayStart(subDays(new Date(), 29)),
    end: dayEnd(new Date()),
  }),
  lastMonth: () => {
    const last = subMonths(new Date(), 1);
    return { start: monthStart(last), end: monthEnd(last) };
  },
} as const;