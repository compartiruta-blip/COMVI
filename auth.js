// auth.js
(function () {
  if (!window.COMVI) throw new Error("Falta config.js (window.COMVI).");

  const sb = window.supabase.createClient(COMVI.SUPABASE_URL, COMVI.SUPABASE_KEY, {
    auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: true }
  });

  async function requireAuth() {
    const { data: { session } } = await sb.auth.getSession();
    if (session) return session;

    const here = location.pathname.split("/").slice(-1)[0] + location.search + location.hash;
    location.replace(`login.html?next=${encodeURIComponent(here)}`);
    throw new Error("No auth");
  }

  async function signInGoogle() {
    const base = location.pathname.split("/")[1] ? `/${location.pathname.split("/")[1]}` : "";
    const redirectTo = `${location.origin}${base}/auth/callback.html`;
    await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
  }

  window.COMVI_AUTH = { sb, requireAuth, signInGoogle };
})();
