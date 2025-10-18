// src/apiClient.js
// Adding timeout + retry logic so it feels closer to production

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function request(path, { method = "GET", headers = {}, body, timeout = DEFAULT_TIMEOUT_MS, retries = MAX_RETRIES } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
  } catch (err) {
    // retry on network errors / timeout
    if (retries > 0 && (err.name === "AbortError" || !err.code)) {
      await sleep(400);
      return request(path, { method, headers, body, timeout, retries: retries - 1 });
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}

export const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
