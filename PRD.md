# IRA Snapshot Prototype – Concept PRD

## Objective

Show how API-driven retirement account data can be transformed into a clear, user-friendly dashboard. This prototype simulates a Charles Schwab–style Open API integration (mock data only) to illustrate how technical capabilities map into product value.

---

## Problem Statement

Retirement account holders often face:

- **Fragmented data visibility** — balances, contributions, and activity scattered across multiple views.
- **Limited actionability** — APIs return raw numbers, but end users need context (“Am I on track this year?”).
- **Opaque error states** — session/auth errors often leave users guessing.

---

## Proposed Solution

A lightweight dashboard that aggregates IRA data into a single view. Using mocked Schwab-style endpoints, the app demonstrates:

- **Account Balances** — cash + positions breakdown.
- **YTD Contributions** — progress bar visualization vs. IRS annual limit.
- **Market Pulse** — quick context for positions and tickers.
- **Recent Activity** — contributions, dividends, interest, etc.
- **Auth Awareness** — “Connect” button and expired-session banners (simulated).

---

## User Stories

- _As a saver, I want to see YTD contributions so I know if I’m on track for the annual limit._
- _As a user, I want clear error handling (e.g., expired session) so I know when to reconnect._
- _As a PM, I want to show how data models map into UI so engineering can plan endpoints cleanly._

---

## Mock API Endpoints

The prototype uses **mock data only** — no real custodial connection. Functions are wired as if hitting a live API:

- `getBalances()` → returns total value, cash, positions.
- `getContributions()` → returns contributions array.
- `getMarketPulse()` → returns ticker + % change.
- `getRecentActivity()` → returns recent transactions.

> Includes `apiClient.js` with retry logic, timeout handling, and 401 error simulation to mirror real-world conditions.

---

## UX Considerations

- **Progress bar** for contributions → IRS limits made tangible.
- **Toast/banner for auth errors** → avoids silent failures.
- **Card layout** → modular, modern, easy to extend.
- **Mock-first design** → endpoints can be swapped with live custodial APIs (e.g., Schwab) without refactoring UI.

---

## Future Enhancements

- Toggle between mock and live API.
- Contribution pacing metric (avg per month vs. required).
- Accessible toasts (auto-dismiss + screen reader support).
- Deeper error handling (rate limits, retries, partial loads).
- Simple backend stub for Postman testing.

---

## Outcome

This prototype isn’t production-ready — it’s a **conversation artifact**. The goal is to:

- Illustrate how **APIs translate into user-facing value**.
- Show **product thinking across data, UX, and error handling**.
- Provide a foundation for discussing how Schwab (or similar custodians) could extend integrations into client-facing retirement products.

---

## Personal Note

While my day-to-day role is product management rather than coding, I built this prototype in a single afternoon to demonstrate how I think about **API-driven user experiences**. It’s intentionally lightweight, but it reflects my approach as a PM who can bridge **business goals, technical design, and user experience**.
