import { useState } from "react";
import { convert } from "../utils/exchangeRates";

const currencies = ["USD", "EUR", "XAF"];
const currencyFlags = { USD: "🇺🇸", EUR: "🇪🇺", XAF: "🇨🇲" };

export default function ExchangeForm({ balances, onExchange }) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");

  const handleExchange = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);

    if (
      isNaN(amt) ||
      amt <= 0 ||
      fromCurrency === toCurrency ||
      balances[fromCurrency] < amt
    ) {
      alert("Check amount, currencies, and balance.");
      return;
    }

    onExchange(fromCurrency, toCurrency, amt);
    setAmount("");
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const preview = amount && parseFloat(amount) > 0
    ? convert(parseFloat(amount), fromCurrency, toCurrency).toFixed(2)
    : null;

  return (
    <div className="panel">
      <h2 className="panel-title">Convert</h2>
      <form onSubmit={handleExchange} className="form">
        <div className="exchange-pair">
          <div className="field">
            <label htmlFor="ex-from">From</label>
            <select
              id="ex-from"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {currencyFlags[cur]} {cur}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="swap-btn"
            onClick={swapCurrencies}
            title="Swap"
          >
            ⇄
          </button>

          <div className="field">
            <label htmlFor="ex-to">To</label>
            <select
              id="ex-to"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {currencyFlags[cur]} {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="ex-amount">Amount</label>
          <input
            id="ex-amount"
            type="number"
            step="any"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {preview && (
          <div className="preview-box">
            You'll receive ≈ <strong>{preview} {toCurrency}</strong>
          </div>
        )}

        <button type="submit" className="btn-primary">Exchange</button>
      </form>
    </div>
  );
}
