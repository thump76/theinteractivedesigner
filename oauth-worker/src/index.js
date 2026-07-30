/**
 * GitHub OAuth broker for Sveltia CMS.
 *
 * The CMS runs entirely in your browser and needs a GitHub token to commit.
 * It can't ask GitHub for one directly, because that would mean putting the
 * client secret in public JavaScript. This Worker is the only piece that
 * holds the secret. It does two things and nothing else:
 *
 *   /auth      sends you to GitHub to approve access
 *   /callback  swaps GitHub's one-time code for a token, hands it to the CMS
 *
 * No storage, no logging, no state beyond a signed cookie that lives for
 * ten minutes.
 */

const AUTHORIZE = 'https://github.com/login/oauth/authorize';
const TOKEN = 'https://github.com/login/oauth/access_token';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') return startAuth(url, env);
    if (url.pathname === '/callback') return finishAuth(request, url, env);

    return new Response('Not found', { status: 404 });
  },
};

function startAuth(url, env) {
  const state = crypto.randomUUID();
  const redirect = new URL(AUTHORIZE);

  redirect.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  redirect.searchParams.set('scope', url.searchParams.get('scope') || 'repo,user');
  redirect.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirect.toString(),
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
  });
}

async function finishAuth(request, url, env) {
  const code = url.searchParams.get('code');
  const returned = url.searchParams.get('state');
  const expected = readCookie(request.headers.get('Cookie'), 'oauth_state');

  if (!code) return fail('GitHub did not send an authorisation code. Start again from /admin.');
  if (!returned || returned !== expected) {
    return fail('That sign-in request expired or came from somewhere else. Start again from /admin.');
  }

  const res = await fetch(TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await res.json();

  if (data.error || !data.access_token) {
    return fail(`GitHub refused the token request: ${data.error_description || data.error || 'unknown reason'}`);
  }

  return handOver({ token: data.access_token, provider: 'github' });
}

/**
 * The CMS opened this page in a popup and is listening on window.opener.
 * The handshake it expects: we announce ourselves, it answers, we send
 * the token, we close.
 */
function handOver(payload) {
  const body = `<!doctype html><meta charset="utf-8"><title>Signing in…</title>
<body style="font:14px/1.5 system-ui;padding:2rem;color:#101418">
<p>Signed in. You can close this window if it doesn't close itself.</p>
<script>
(function () {
  var payload = ${JSON.stringify(JSON.stringify(payload))};
  function send(e) {
    window.removeEventListener('message', send);
    (window.opener || window.parent).postMessage(
      'authorization:github:success:' + payload,
      e.origin
    );
    setTimeout(function () { window.close(); }, 400);
  }
  window.addEventListener('message', send, false);
  (window.opener || window.parent).postMessage('authorizing:github', '*');
})();
<\/script>`;

  return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function fail(message) {
  const body = `<!doctype html><meta charset="utf-8"><title>Sign-in failed</title>
<body style="font:14px/1.5 system-ui;padding:2rem;color:#101418">
<p><strong>Sign-in failed.</strong></p><p>${escapeHtml(message)}</p>`;
  return new Response(body, { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function readCookie(header, name) {
  if (!header) return null;
  const hit = header.split(';').find((c) => c.trim().startsWith(`${name}=`));
  return hit ? hit.split('=')[1].trim() : null;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}
