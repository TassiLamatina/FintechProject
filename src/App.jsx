// src/App.jsx

// Weekend project vibes: pretending I’m talking to Schwab’s API
// but really it’s just fake data I stapled together.

import { useState, useEffect } from "react";
import { getBalances, getContributions, getMarketPulse } from "./api";
 // <-- my "fake Schwab API"

function App() {
  // React state: keeps track of balances + contributions after "fetching"
  const [balances, setBalances] = useState(null);
  const [contributions, setContributions] = useState(null);
  const [marketPulse, setMarketPulse] = useState(null);

  // useEffect = “run this when the component shows up”
useEffect(() => {
  (async () => {
    const b = await getBalances();
    const c = await getContributions();
    const m = await getMarketPulse(); // 👈 new line

    setBalances(b);
    setContributions(c);
    setMarketPulse(m); // 👈 new line
  })();
}, []);

  // inline styles because CSS files are too serious for a weekend hack
 const container = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "24px",
  fontFamily:
    "-apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  color: "#000", 
  lineHeight: 1.5,
  background: "#f8fafc",
};

  const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  };

  const title = { fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em" };
  const subtitle = { fontSize: "14px", color: "#64748b" };

  const button = {
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  };

  const card = {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    marginBottom: "16px",
  };

  return (
    <div style={container}>
      {/* Header */}
      <header style={header}>
        <div>
          <div style={title}>IRA Snapshot</div>
          <div style={subtitle}>
            Weekend prototype: Connect button doesn’t *really* connect yet
          </div>
        </div>
        <button
          style={button}
          onClick={() =>
            alert("Pretend this is Schwab OAuth. Right now it’s just a popup.")
          }
        >
          Connect
        </button>
      </header>

      <main>
        {/* Balances card */}
        <section style={card}>
          <h2 style={{ fontSize: 18, margin: 0, marginBottom: 8, fontWeight: 600 }}>
            Account Balances
          </h2>
          {balances ? (
            <div>
              <p>
                <strong>Total Value:</strong> ${balances.totalValue.toLocaleString()}
              </p>
              <p>
                <strong>Cash:</strong> ${balances.cash.toLocaleString()}
              </p>
              <ul>
                {balances.positions.map((pos) => (
                  <li key={pos.ticker}>
                    {pos.ticker} — {pos.qty} shares (${pos.marketValue})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading fake balances…</p>
          )}
        </section>

        {/* Contributions card */}
        <section style={card}>
          <h2 style={{ fontSize: 18, margin: 0, marginBottom: 8, fontWeight: 600 }}>
            YTD Contributions
          </h2>
          {contributions ? (
            <ul>
              {contributions.map((c, idx) => (
                <li key={idx}>
                  {c.date}: ${c.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading contributions…</p>
          )}
        </section>

        {/* Market Pulse card */}
<section style={card}>
  <h2 style={{ fontSize: 18, margin: 0, marginBottom: 8, fontWeight: 600 }}>
    Market Pulse
  </h2>
  {marketPulse ? (
    <ul>
      {marketPulse.map((item, idx) => (
        <li key={idx}>
          <strong>{item.ticker}</strong> ({item.change}) — {item.headline}
        </li>
      ))}
    </ul>
  ) : (
    <p>Loading market vibes…</p>
  )}
</section>
      </main>
    </div>
  );
}

export default App;
