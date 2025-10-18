// src/App.jsx

// Hi 👋 Welcome to the "IRA Snapshot" prototype
// Disclaimer: Not financial advice, just vibes.
// The goal: pretend we’re talking to the Schwab API,
// but really it’s just mock data + imagination.

import { useState, useEffect } from "react";
import { getBalances, getContributions } from "./api"; // my "fake Schwab friend"

// This is the main React component for the app
function App() {
  // state = basically React’s way of remembering stuff between renders
  const [balances, setBalances] = useState(null);
  const [contributions, setContributions] = useState(null);

  // pretend this is a data-fetching mission 🚀
  useEffect(() => {
    (async () => {
      const b = await getBalances();
      const c = await getContributions();
      setBalances(b);
      setContributions(c);
    })();
  }, []);

  // a bunch of styles inline, because why not… CSS files are too mainstream
  const container = {
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px",
    fontFamily:
      "-apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    color: "#0f172a",
    lineHeight: 1.4,
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
      {/* Header section: basically my fake Schwab dashboard top bar */}
      <header style={header}>
        <div>
          <div style={title}>IRA Snapshot</div>
          <div style={subtitle}>
            Step 1: basic shell + Connect button (spoiler: it does nothing).
          </div>
        </div>
        <button
          style={button}
          onClick={() =>
            alert("Demo mode: this would start OAuth (PKCE) to Schwab. Maybe someday.")
          }
        >
          Connect
        </button>
      </header>

      {/* Main dashboard */}
      <main>
        {/* Balance card — where the fake money lives */}
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
            <p>Loading fake data…</p>
          )}
        </section>

        {/* Contributions card — aka when I remembered to deposit something */}
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
            <p>Still faking it…</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
