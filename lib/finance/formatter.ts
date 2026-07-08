/**
 * ============================================================================
 * TCD Finance Formatter
 * Database stores money in PAISE.
 * UI displays either Rupees or TCD Credits.
 * ============================================================================
 */

const PAISE_PER_RUPEE = 100;
const PAISE_PER_CREDIT = 10;

/**
 * Converts paise to rupees.
 * Example:
 * 100 -> ₹1.00
 * 1250 -> ₹12.50
 */
export function paiseToRupees(amount: number): number {
  return amount / PAISE_PER_RUPEE;
}

/**
 * Converts paise to formatted rupees.
 * Example:
 * 1250 -> ₹12.50
 */
export function formatRupees(amount: number): string {
  return `₹${(amount / PAISE_PER_RUPEE).toFixed(2)}`;
}

/**
 * Converts paise to TCD Credits.
 * Example:
 * 100 -> 10 Credits
 */
export function paiseToCredits(amount: number): number {
  return amount / PAISE_PER_CREDIT;
}

/**
 * Converts Credits back to paise.
 * Example:
 * 10 Credits -> 100 paise
 */
export function creditsToPaise(credits: number): number {
  return credits * PAISE_PER_CREDIT;
}

/**
 * Formats Credits.
 * Example:
 * 125 -> 125 Credits
 */
export function formatCredits(amount: number): string {
  return `${paiseToCredits(amount).toLocaleString()} Credits`;
}

/**
 * Formats large numbers.
 * Example:
 * 12500 -> 1,250 Credits
 */
export function formatCreditsCompact(amount: number): string {
  return `${paiseToCredits(amount).toLocaleString("en-IN")} Credits`;
}