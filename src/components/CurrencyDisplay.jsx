const currencyInfo = {
  USD: { flag: "🇺🇸", name: "US Dollar", symbol: "$" },
  EUR: { flag: "🇪🇺", name: "Euro", symbol: "€" },
  XAF: { flag: "🇨🇲", name: "CFA Franc", symbol: "XAF" },
};

export default function CurrencyDisplay({ balances, defaultCurrency }) {
  return (
    <div className="panel">
      <h2 className="panel-title">Wallets</h2>
      <div className="wallet-list">
        {Object.entries(balances).map(([currency, amount]) => {
          const info = currencyInfo[currency] || { flag: "💱", name: currency, symbol: currency };
          const isDefault = currency === defaultCurrency;
          return (
            <div className={`wallet-item ${isDefault ? "wallet-default" : ""}`} key={currency}>
              <div className="wallet-flag">{info.flag}</div>
              <div className="wallet-info">
                <span className="wallet-code">{currency}</span>
                <span className="wallet-name">{info.name}</span>
              </div>
              <div className="wallet-amount">
                {info.symbol}{amount.toFixed(2)}
              </div>
              {isDefault && <span className="badge-default">★</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
