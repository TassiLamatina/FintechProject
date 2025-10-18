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
  { date: "2025-07-10", amount: 2000 },  // tax refund flex 
];

// --- Fake Market Pulse (random stocks, weekend fantasy edition) ---
const mockMarketPulse = [
  { ticker: "TSLA", change: "+2.3%", headline: "Elon tweets something wild again 🚀" },
  { ticker: "IRA", change: "-0.8%", headline: "Roth still not a guy 👔" },
  { ticker: "ACH", change: "+5.6%", headline: "Still pending 🐢" },
];

// --- Fake Recent Activity (tiny timeline so it feels real) ---
const mockRecentActivity = [
  { id: "t-001", date: "2025-07-10", type: "contribution", amount: 2000, note: "Tax refund victory lap" },
  { id: "t-002", date: "2025-04-12", type: "dividend", amount: 42.12, note: "ETF sprinkled some pennies" },
  { id: "t-003", date: "2025-03-20", type: "contribution", amount: 1000, note: "Consistency > intensity" },
];

// Flag for demo mode. Flip to false when wiring real fetch calls.
const useMocks = true;

// Public API: looks like a real data layer, smells like a real data layer.
export async function getBalances() {
  if (useMocks) return mockBalances;
}

export async function getContributions() {
  if (useMocks) return mockContributions;
}

export async function getMarketPulse() {
  if (useMocks) return mockMarketPulse;
}

export async function getRecentActivity() {
  if (useMocks) return mockRecentActivity;
}
