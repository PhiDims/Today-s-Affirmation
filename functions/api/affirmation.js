// GET /api/affirmation
// Shows the same affirmation as the Today's Affirmation app.
//
// How it works: the app keeps its affirmations in a list inside its page
// (const AFFIRMATIONS = [...]) and shows list[dayOfYear % list.length].
// This reads that list from the app's page and applies the same rule,
// using Nigerian time (Africa/Lagos, UTC+1), so the website and the app match.
//
// Optional: if "Affirmation data address" is set in /admin, that JSON address
// is used instead. If anything fails, the homepage keeps its fallback text.
import settings from "../../src/_data/settings.json";

const CACHE_SECONDS = 60 * 30;
const LAGOS_OFFSET_HOURS = 1;

export async function onRequestGet() {
  try {
    const result = (await fromJsonAddress()) || (await fromAppPage());
    if (!result) return new Response(null, { status: 204 });
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=600"
      }
    });
  } catch (e) {
    return new Response(null, { status: 204 });
  }
}

async function fromJsonAddress() {
  const url = String(settings.affirmation_api_url || "").trim();
  if (!/^https:\/\//.test(url)) return null;
  const res = await fetch(url, { headers: { Accept: "application/json" }, cf: { cacheTtl: 900, cacheEverything: true } });
  if (!res.ok) return null;
  const data = await res.json();
  const pick = (o) => o && (o.text || o.affirmation || o.quote || o.message || o.content);
  const text = typeof data === "string" ? data : pick(data) || pick(data && data.data) || pick(Array.isArray(data) ? data[0] : null);
  return text ? { text: String(text).trim() } : null;
}

async function fromAppPage() {
  const url = String(settings.affirmation_app_url || "").trim();
  if (!/^https:\/\//.test(url)) return null;
  const res = await fetch(url, { headers: { Accept: "text/html" }, cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true } });
  if (!res.ok) return null;
  const list = extractAffirmations(await res.text());
  if (!list.length) return null;
  const item = list[lagosDayOfYear(new Date()) % list.length];
  return { text: item.text, reflection: item.reflection || "", action: item.action || "" };
}

// Pull every {text, reflection, action} entry out of `const AFFIRMATIONS = [ ... ];`
export function extractAffirmations(html) {
  const start = html.indexOf("const AFFIRMATIONS");
  if (start < 0) return [];
  const open = html.indexOf("[", start);
  const close = html.indexOf("\n];", open);
  const block = html.slice(open + 1, close > 0 ? close : undefined);

  const items = [];
  // Each entry is an object literal {...}; split on top-level "{" at line start or after "},"
  const objects = block.match(/\{[^{}]*\}/g) || [];
  for (const obj of objects) {
    const text = field(obj, "text");
    if (text) items.push({ text, reflection: field(obj, "reflection"), action: field(obj, "action") });
  }
  return items;
}

function field(obj, name) {
  const re = new RegExp("(?:^|[,{\\s])" + name + "\\s*:\\s*(\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)'|`((?:[^`\\\\]|\\\\.)*)`)");
  const m = obj.match(re);
  if (!m) return "";
  const raw = m[2] ?? m[3] ?? m[4] ?? "";
  return raw.replace(/\\(["'`\\])/g, "$1").replace(/\\n/g, " ").trim();
}

// Same as the app's dayOfYear(): 1 on 1 January, using Nigerian local time.
export function lagosDayOfYear(now) {
  const local = new Date(now.getTime() + LAGOS_OFFSET_HOURS * 3600 * 1000);
  const y = local.getUTCFullYear();
  const today = Date.UTC(y, local.getUTCMonth(), local.getUTCDate());
  return Math.round((today - Date.UTC(y, 0, 0)) / 86400000);
}
