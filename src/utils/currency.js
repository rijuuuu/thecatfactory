/**
 * Formats a numeric value into Indian Rupee (₹) format with Indian digit grouping.
 * Example: 1499 -> ₹1,499
 * Example: 104599 -> ₹1,04,599
 */
export const formatINR = (amount, includeDecimals = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }

  const num = Number(amount);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0
  }).format(num);
};
