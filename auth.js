// auth.js
(function () {
  if (!window.COMVI_CONFIG) throw new Error("Falta config.js (window.COMVI_CONFIG).");

  const CFG = window.COMVI_CONFIG;

  // Cliente Supabase único para todo el sitio
  const sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, {
    auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: true }
  });

  async function requireAuth() {
    const { data: { session } } = await sb.auth.getSession();
    if (session) return session;

    // Guardar ruta completa (incluye /COMVI/...) para que callback redirija bien
    const here = location.pathname + location.search + location.hash;

    // Ir a login usando base absoluta (evita problemas de rutas)
    const loginUrl = `${COMVI_CONFIG.SITE_BASE_URL}/login.html?next=${encodeURIComponent(here)}`;
    location.replace(loginUrl);

  }

  async function signInGoogle(next) {
    if (next) {
      localStorage.setItem("comvi_next", next);
    } else {
      localStorage.removeItem("comvi_next");
    }

    // callback absoluto usando tu SITE_BASE_URL
    const redirectTo = next
      ? `${CFG.SITE_BASE_URL}/auth/callback.html?next=${encodeURIComponent(next)}`
      : `${CFG.SITE_BASE_URL}/auth/callback.html`;
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });
  }

  async function signOut() {
    await sb.auth.signOut();
  }

  window.COMVI_AUTH = { sb, requireAuth, signInGoogle, signOut };
})();
