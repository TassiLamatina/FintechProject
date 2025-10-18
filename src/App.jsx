function App() {
  const container = {
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px",
    fontFamily: "-apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
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
  };

  return (
    <div style={container}>
      <header style={header}>
        <div>
          <div style={title}>IRA Snapshot</div>
          <div style={subtitle}>Step 1: basic shell + Connect button (stub).</div>
        </div>
        <button
          style={button}
          onClick={() => alert("Demo mode: this would start OAuth (PKCE) to Schwab.")}
        >
          Connect
        </button>
      </header>

      <main>
        <section style={card}>
          <h2 style={{ fontSize: 18, margin: 0, marginBottom: 8, fontWeight: 600 }}>
            Welcome
          </h2>
          <p style={{ margin: 0, color: "#334155" }}>
            If you can see this page and the Connect button pops an alert,
            your environment is good to go. Next we’ll add mock data and the first card.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
