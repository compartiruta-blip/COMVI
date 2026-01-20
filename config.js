// config.js
// Selección automática de entorno (DEV / PROD)
// Fuente única de verdad para todo el sitio

const DEV = {
  ENV: "dev",

  SUPABASE_URL: "https://koawnshgdqdqfkzppqpb.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_yPOsphY0cx4OWRVFQkdcSA_jnsxj30b",

  SITE_BASE_URL: "https://padrearregui.github.io/COMVI",

  TELEFONO_ADMIN: "5491158025832" // ← tu admin DEV (si querés el mismo, dejalo igual)
};

const PROD = {
  ENV: "prod",

  SUPABASE_URL: "https://amwokcrudsupfkpgyxia.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_ZuUe5CTChHQwW5M3qldKqw_zU4MO0qM",

  SITE_BASE_URL: "https://comvi.ar",

  TELEFONO_ADMIN: "5491164003390"
};

// Regla simple y segura
function pickEnv() {
  const host = window.location.hostname.toLowerCase();

  // GitHub Pages → DEV
  if (host.includes("github.io")) return DEV;

  // Dominio real → PROD
  if (host === "comvi.ar" || host.endsWith(".comvi.ar")) return PROD;

  // Fallback defensivo
  return DEV;
}

window.COMVI_CONFIG = pickEnv();

// Debug opcional (podés borrar después)
console.log("COMVI ENV:", window.COMVI_CONFIG.ENV);
