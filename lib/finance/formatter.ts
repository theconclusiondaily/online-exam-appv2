/**
 * ============================================================================
 * TCD Finance Formatter
 * ============================================================================
 *
 * Database stores money in PAISE.
 *
 * UI displays:
 * - ₹ Rupees
 * - TCD Credits
 * - Compact Numbers
 * - Percentages
 * - Dates
 *
 * ============================================================================
 */

const PAISE_PER_RUPEE = 100;
const PAISE_PER_CREDIT = 10;

/* ============================================================================
 * Conversions
 * ========================================================================== */

export function paiseToRupees(amount: number): number {
  return amount / PAISE_PER_RUPEE;
}

export function paiseToCredits(amount: number): number {
  return amount / PAISE_PER_CREDIT;
}

export function creditsToPaise(credits: number): number {
  return credits * PAISE_PER_CREDIT;
}

/* ============================================================================
 * Currency
 * ========================================================================== */

export function formatRupees(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(paiseToRupees(amount));
}

/* ============================================================================
 * Credits
 * ========================================================================== */

export function formatCredits(amount: number): string {
  return `${paiseToCredits(amount).toLocaleString("en-IN")} TCD Credits`;
}

export function formatCreditsCompact(amount: number): string {
  return `${new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(paiseToCredits(amount))} TCD Credits`;
}

/* ============================================================================
 * Numbers
 * ========================================================================== */

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/* ============================================================================
 * Percentage
 * ========================================================================== */

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

/* ============================================================================
 * Date
 * ========================================================================== */

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

/* ============================================================================
 * Relative Time
 * ========================================================================== */

export function formatRelativeTime(date: Date | string): string {
  const now = Date.now();
  const target = new Date(date).getTime();

  const diff = target - now;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (Math.abs(diff) < hour) {
    return rtf.format(Math.round(diff / minute), "minute");
  }

  if (Math.abs(diff) < day) {
    return rtf.format(Math.round(diff / hour), "hour");
  }

  return rtf.format(Math.round(diff / day), "day");
}