const currencies = ["USD", "EUR", "XAF"];
const currencyFlags = { USD: "🇺🇸", EUR: "🇪🇺", XAF: "🇨🇲" };

export default function DefaultCurrencySelector({ defaultCurrency, setDefaultCurrency, expanded }) {
  if (expanded) {
    return (
      <div className="currency-chips">
        {currencies.map((cur) => (
          <button
            key={cur}
            type="button"
            className={`chip ${cur === defaultCurrency ? "chip-active" : ""}`}
            onClick={() => setDefaultCurrency(cur)}
          >
            {currencyFlags[cur]} {cur}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="compact-selector">
      <select
        value={defaultCurrency}
        onChange={(e) => setDefaultCurrency(e.target.value)}
        aria-label="Default currency"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {currencyFlags[cur]} {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
