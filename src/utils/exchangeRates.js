// src/utils/exchangeRates.js
export const rates = {
  USD: 1,
  EUR: 1.24,
  XAF: 0.0017,
};

export function convert(amount, fromCurrency, toCurrency) {
  const amountInUSD = amount * rates[fromCurrency];
  return amountInUSD / rates[toCurrency];
}
