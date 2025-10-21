import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/** Build URLs that respect Vite's base (e.g. /react/) */
function withBase(p: string) {
  return new URL(p, window.location.origin + import.meta.env.BASE_URL).toString();
}

/** Guard against HTML responses (404 rewrites) */
async function fetchJson(url: string) {
  const res = await fetch(url, { cache: 'no-cache' });
  const text = await res.text();
  if (!res.ok || text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
    throw new Error(`Expected JSON but got HTML/HTTP ${res.status} at ${url}`);
  }
  return JSON.parse(text);
}

/** CHANGE THIS to match your generated filenames: 'en', 'en_GB', 'pt_PT', etc. */
const DEFAULT_LANG = 'en_GB'; // or "en" if your script outputs en.json

const langUrl = withBase(`locale/langs/${DEFAULT_LANG}.json`);
const translations = await fetchJson(langUrl);

void i18n.use(initReactI18next).init({
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
  resources: {
    [DEFAULT_LANG]: { translation: translations },
  },
});

export default i18n;
