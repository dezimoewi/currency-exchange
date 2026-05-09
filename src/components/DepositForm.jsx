import { useState } from "react";

export default function DepositForm({ onDeposit }) {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");

  const handleDeposit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Enter a valid amount");
      return;
    }
    onDeposit(currency, amt);
    setAmount("");
  };

  return (
    <div className="panel">
      <h2 className="panel-title">Add Funds</h2>
      <form onSubmit={handleDeposit} className="form">
        <div className="field">
          <label htmlFor="dep-currency">Currency</label>
          <select
            id="dep-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">🇺🇸 USD — US Dollar</option>
            <option value="EUR">🇪🇺 EUR — Euro</option>
            <option value="XAF">🇨🇲 XAF — CFA Franc</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="dep-amount">Amount</label>
          <input
            id="dep-amount"
            type="number"
            step="any"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <button type="submit" className="btn-primary">Deposit</button>
      </form>
    </div>
  );
}
