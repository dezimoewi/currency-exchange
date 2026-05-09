import { convert } from "../utils/exchangeRates";

const currencySymbols = { USD: "$", EUR: "€", XAF: "XAF " };

export default function TotalBalance({ balances, defaultCurrency }) {
  const total = Object.entries(balances).reduce((acc, [cur, amount]) => {
    return acc + convert(amount, cur, defaultCurrency);
  }, 0);

  const symbol = currencySymbols[defaultCurrency] || defaultCurrency + " ";

  return (
    <div className="panel balance-hero">
      <span className="balance-label">Total Balance</span>
      <span className="balance-value">
        {symbol}{total.toFixed(2)}
      </span>
      <span className="balance-currency">{defaultCurrency}</span>
    </div>
  );
}
