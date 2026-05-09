import { useState, useEffect } from "react";
import { convert } from "./utils/exchangeRates";
import CurrencyDisplay from "./components/CurrencyDisplay";
import DepositForm from "./components/DepositForm";
import ExchangeForm from "./components/ExchangeForm";
import DefaultCurrencySelector from "./components/DefaultCurrencySelector";
import TotalBalance from "./components/TotalBalance";

const STORAGE_KEY = "fx-wallet-data";
const THEME_KEY = "fx-wallet-theme";

const initialBalances = {
  USD: 100,
  EUR: 500,
  XAF: 10000,
};

export default function App() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const parsed = stored ? JSON.parse(stored) : null;

  const [balances, setBalances] = useState(parsed?.balances || initialBalances);
  const [defaultCurrency, setDefaultCurrency] = useState(
    parsed?.defaultCurrency || "USD"
  );
  const [activeTab, setActiveTab] = useState("deposit");
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const saveToStorage = (newBalances, newDefault) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ balances: newBalances, defaultCurrency: newDefault })
    );
  };

  const handleDeposit = (currency, amount) => {
    const newBalances = {
      ...balances,
      [currency]: (balances[currency] || 0) + amount,
    };
    setBalances(newBalances);
    saveToStorage(newBalances, defaultCurrency);
  };

  const handleExchange = (fromCur, toCur, amount) => {
    const amountInTarget = convert(amount, fromCur, toCur);
    const newBalances = {
      ...balances,
      [fromCur]: balances[fromCur] - amount,
      [toCur]: (balances[toCur] || 0) + amountInTarget,
    };
    setBalances(newBalances);
    saveToStorage(newBalances, defaultCurrency);
  };

  const handleDefaultCurrencyChange = (currency) => {
    setDefaultCurrency(currency);
    saveToStorage(balances, currency);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">◈</span>
          <span className="brand-text">FX Wallet</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "deposit" ? "active" : ""}`}
            onClick={() => setActiveTab("deposit")}
          >
            <span className="nav-icon">↓</span>
            Deposit
          </button>
          <button
            className={`nav-item ${activeTab === "exchange" ? "active" : ""}`}
            onClick={() => setActiveTab("exchange")}
          >
            <span className="nav-icon">⇄</span>
            Exchange
          </button>
          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <span className="nav-icon">⚙</span>
            Settings
          </button>
        </nav>
        <button className="nav-item theme-toggle" onClick={toggleTheme}>
          <span className="nav-icon">{theme === "dark" ? "☀" : "☾"}</span>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h1 className="page-title">
            {activeTab === "deposit" && "Deposit Funds"}
            {activeTab === "exchange" && "Exchange Currency"}
            {activeTab === "settings" && "Preferences"}
          </h1>
          <DefaultCurrencySelector
            defaultCurrency={defaultCurrency}
            setDefaultCurrency={handleDefaultCurrencyChange}
          />
        </header>

        <section className="dashboard-grid">
          <div className="grid-left">
            <TotalBalance balances={balances} defaultCurrency={defaultCurrency} />
            <CurrencyDisplay balances={balances} defaultCurrency={defaultCurrency} />
          </div>
          <div className="grid-right">
            {activeTab === "deposit" && <DepositForm onDeposit={handleDeposit} />}
            {activeTab === "exchange" && (
              <ExchangeForm balances={balances} onExchange={handleExchange} />
            )}
            {activeTab === "settings" && (
              <div className="panel">
                <h2 className="panel-title">Default Currency</h2>
                <p className="panel-desc">
                  Your total balance and conversions will display in this currency.
                </p>
                <DefaultCurrencySelector
                  defaultCurrency={defaultCurrency}
                  setDefaultCurrency={handleDefaultCurrencyChange}
                  expanded
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}