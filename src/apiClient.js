// src/apiClient.js
// Added 401 handling + exponential backoff. Looks like a grown-up client now 😅

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function request(
  path,
  {
    method = "GET",
    headers = {},
    body,
    timeout = DEFAULT_TIMEOUT_MS,
    retries = MAX_RETRIES,
  } = {}
) {
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
      credentials: "include", // realistic for auth'd APIs
      signal: controller.signal,
    });

    // normalize non-OK responses
    if (!res.ok) {
      if (res.status === 401) {
        const err = new Error("Unauthorized");
        err.code = 401;
        throw err;
      }
      const message = `HTTP ${res.status}`;
      const err = new Error(message);
      err.code = res.status;
      try {
        err.payload = await res.json();
      } catch {
        err.payload = { message: await res.text().catch(() => message) };
      }
      throw err;
    }

    // parse JSON by default
    return res.json().catch(() => ({}));
  } catch (err) {
    // retry network-ish errors/timeouts/5xx
    const retriable =
      err.name === "AbortError" ||
      err.code === undefined ||
      (typeof err.code === "number" && err.code >= 500);

    if (retries > 0 && retriable) {
      const backoff = (MAX_RETRIES - retries + 1) * 400; // 400ms, 800ms
      await sleep(backoff);
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
