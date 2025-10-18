// src/api.js
// Weekend hack: pretending I have Schwab API creds. I do not. 😅
// So we mock. Clean shapes, easy to swap for real endpoints later.

// --- Fake balances (please don't retire off these numbers) ---
const mockBalances = {
  totalValue: 52340.55, // living the medium life
  cash: 1200.25,        // emergency burrito fund
  positions: [
    { ticker: "AAPL", qty: 10, marketValue: 1900 },  // Apple: keeps doctors + boredom away
    { ticker: "MSFT", qty: 5, marketValue: 1700 },   // Clippy, but profitable
    { ticker: "VTI", qty: 12, marketValue: 2800 },   // Index fund = adulting
  ],
};

// --- Fake contribution history (aka: when I remembered to save) ---
const mockContributions = [
  { date: "2025-01-15", amount: 500 },   // new year, new me
  { date: "2025-03-20", amount: 1000 },  // responsible streak
  { date: "2025-07-10", amount: 2000 },  // tax refund flex 💪
];

// Flag for demo mode. Flip to false when wiring real fetch calls.
const useMocks = true;

// Public API: looks like a real data layer, smells like a real data layer.
export async function getBalances() {
  if (useMocks) return mockBalances;
  // TODO: return fetch('/api/accounts', { credentials: 'include' }).then(r => r.json());
}

export async function getContributions() {
  if (useMocks) return mockContributions;
  // TODO: return fetch('/api/transactions?type=contribution&year=2025', { credentials: 'include' }).then(r => r.json());
}

// --- Fake Market Pulse (random stocks, weekend fantasy edition) ---
const mockMarketPulse = [
  { ticker: "TSLA", change: "+2.3%", headline: "Elon tweets something wild again 🚀" },
  { ticker: "AMZN", change: "-0.8%", headline: "Prime Day hangover sale slump" },
  { ticker: "NVDA", change: "+5.6%", headline: "AI hype train still full speed ahead 🤖" },
];

// Public API for Market Pulse
export async function getMarketPulse() {
  if (useMocks) return mockMarketPulse;
  // TODO: replace with fetch('/api/market/pulse').then(r => r.json());
}
