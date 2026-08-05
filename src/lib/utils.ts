import type { ApiRecord } from "@/types/site";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function textFrom(value: unknown, fallback = "") {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

export function boolFrom(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  return fallback;
}

export function arrayFrom(value: unknown) {
  if (Array.isArray(value)) return value;
  return [];
}

export function pickString(record: ApiRecord, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = textFrom(record[key]);
    if (value) return value;
  }
  return fallback;
}

export function pickArray(record: ApiRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value.map((item) => textFrom(item)).filter(Boolean);
    }
  }
  return [];
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
