// PagesForward — Hash-based SPA Router

const routes = {};
let currentCleanup = null;

export function route(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = '#' + path;
}

function matchRoute(hash) {
  const path = hash.replace('#', '') || '/';

  // Exact match
  if (routes[path]) return { handler: routes[path], params: {} };

  // Pattern match (e.g., /book/:id)
  for (const pattern of Object.keys(routes)) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) continue;

    const params = {};
    let match = true;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }

    if (match) return { handler: routes[pattern], params };
  }

  return null;
}

async function handleRoute() {
  const app = document.getElementById('app');
  const hash = window.location.hash || '#/';

  // Cleanup previous page
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  const matched = matchRoute(hash);

  if (matched) {
    // Fade out
    app.classList.add('page-exit');
    await new Promise(r => setTimeout(r, 200));

    app.innerHTML = '';
    app.classList.remove('page-exit');
    app.classList.add('page-enter');

    const cleanup = await matched.handler(app, matched.params);
    if (typeof cleanup === 'function') currentCleanup = cleanup;

    // Remove animation class after it plays
    setTimeout(() => app.classList.remove('page-enter'), 400);
  } else {
    app.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;margin-top:var(--header-height);">
        <div>
          <h1 style="font-size:4rem;margin-bottom:1rem;">404</h1>
          <p style="color:var(--color-text-secondary);">Page not found</p>
          <a href="#/" class="btn btn--primary" style="margin-top:2rem;display:inline-flex;">Go Home</a>
        </div>
      </div>`;
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
