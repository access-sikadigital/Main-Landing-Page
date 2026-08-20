/**
 * Resolves a path in `public/` against the deployment's base path.
 *
 * This page is served under `/house-demolition/` on the shared domain, so a
 * string like "/images/hero.jpg" written straight into markup would resolve
 * against the ROOT of go.demobros.com.au — the parent Vercel project, which has
 * no such file. Vite rewrites the URLs it generates itself (bundles, CSS,
 * imported assets), but it cannot rewrite a plain string in our source, and
 * these are plain strings.
 *
 * `import.meta.env.BASE_URL` is the `base` from vite.config.ts, inlined at build
 * time on both the client and the SSR bundle, so there is one source of truth
 * for the path and nothing to keep in sync by hand.
 */
export function asset(path: string): string {
  // BASE_URL always carries a trailing slash ("/house-demolition/", or "/" when
  // the app is served from the root); trimming both sides avoids "//images".
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/** The app's own root, for links that should return to the top of THIS page. */
export const HOME_PATH = import.meta.env.BASE_URL;
