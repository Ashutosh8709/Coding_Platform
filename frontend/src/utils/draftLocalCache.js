const STORAGE_KEY = "draftCache";
const MAX_DRAFTS = 30;

function getCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { drafts: {} };
  } catch {
    return { drafts: {} };
  }
}

function saveCache(cache) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn("Local draft storage full");
  }
}

export function getLocalDraft(problemId, lang) {
  const cache = getCache();
  const key = `${problemId}_${lang}`;
  return cache.drafts[key]?.code || null;
}

export function saveLocalDraft(problemId, lang, code) {
  const cache = getCache();
  const drafts = cache.drafts;

  const key = `${problemId}_${lang}`;
  drafts[key] = {
    code,
    updatedAt: Date.now(),
  };

  const sorted = Object.entries(drafts)
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
    .slice(0, MAX_DRAFTS);

  cache.drafts = Object.fromEntries(sorted);

  saveCache(cache);
}

export function removeLocalDraft(problemId, lang) {
  const cache = getCache();
  const key = `${problemId}_${lang}`;

  delete cache.drafts[key];

  saveCache(cache);
}
