// ── Server-only environment constants ────────────────────────
// These are NOT prefixed with NEXT_PUBLIC_ so they stay server-side only.

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME ?? "";
export const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? "";

export const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET ?? "rewear-secret-key";
