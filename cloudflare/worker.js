const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' }
const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'Content-Type, Authorization, token',
  'access-control-expose-headers': 'Authorization'
}

const encoder = new TextEncoder()

function json (value, status = 200, headers = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { ...JSON_HEADERS, ...CORS_HEADERS, ...headers }
  })
}

function empty (status = 204) {
  return new Response(null, { status, headers: CORS_HEADERS })
}

function textValue (value, maxLength, fallback = '') {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : fallback
}

function base64Url (bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function randomToken () {
  return base64Url(crypto.getRandomValues(new Uint8Array(32)))
}

async function passwordHash (password, salt = base64Url(crypto.getRandomValues(new Uint8Array(16)))) {
  const iterations = 120000
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations },
    key,
    256
  )
  return `pbkdf2$${iterations}$${salt}$${base64Url(new Uint8Array(bits))}`
}

async function passwordMatches (password, stored) {
  const [, , salt] = String(stored).split('$')
  if (!salt) return false
  return (await passwordHash(password, salt)) === stored
}

async function createSession (db, userId) {
  const token = randomToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  await db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').bind(token, userId, expiresAt).run()
  return token
}

async function sessionUser (request, db) {
  const token = request.headers.get('token') || request.headers.get('authorization')
  if (!token) return null
  return db.prepare(`
    SELECT u.id, u.username, u.email, u.admin
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?
  `).bind(token.replace(/^Bearer\s+/i, ''), new Date().toISOString()).first()
}

function formatAsk (row) {
  return {
    _id: row.id,
    body: row.body,
    whatsthat: row.whatsthat,
    language: row.language,
    author: row.author_id,
    authorName: row.author_name || 'Anonymous',
    time: row.created_at
  }
}

function formatGuess (row) {
  return {
    _id: row.id,
    ask: row.ask_id,
    body: row.body,
    source: row.source,
    comment: row.comment,
    author: row.author_id,
    authorName: row.author_name || 'Anonymous',
    rating_positive: row.rating_positive,
    rating_negative: row.rating_negative,
    isVerified: Boolean(row.is_verified),
    time: row.created_at
  }
}

async function readBody (request) {
  try {
    return await request.json()
  } catch {
    return {}
  }
}

async function getAsk (db, id) {
  const row = await db.prepare(`
    SELECT a.*, u.username AS author_name
    FROM asks a LEFT JOIN users u ON u.id = a.author_id
    WHERE a.id = ?
  `).bind(id).first()
  return row ? formatAsk(row) : null
}

async function handleAuth (request, env, path) {
  if (path === '/auth/signup' && request.method === 'POST') {
    const body = await readBody(request)
    const username = textValue(body.username, 30)
    const email = textValue(body.email, 160).toLowerCase()
    const password = typeof body.password === 'string' ? body.password : ''
    if (!username || !email || password.length < 8) return json({ error: 'Please provide a username, email and a password of at least 8 characters.' }, 400)

    const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ? OR username = ?').bind(email, username).first()
    if (existing) return json({ error: 'This email or username is already registered.' }, 409)

    const id = crypto.randomUUID()
    try {
      await env.DB.prepare('INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)')
        .bind(id, username, email, await passwordHash(password)).run()
    } catch {
      return json({ error: 'This email or username is already registered.' }, 409)
    }
    return json({ token: await createSession(env.DB, id) }, 201)
  }

  if (path === '/auth/signin' && request.method === 'POST') {
    const body = await readBody(request)
    const email = textValue(body.email, 160).toLowerCase()
    const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first()
    if (!user || !(await passwordMatches(String(body.password || ''), user.password_hash))) {
      return json({ error: 'Unknown email or password.' }, 401)
    }
    return json({ token: await createSession(env.DB, user.id) })
  }

  if (path === '/auth/verify-session' && request.method === 'GET') {
    return json({ success: Boolean(await sessionUser(request, env.DB)) })
  }

  if (path === '/auth/me' && request.method === 'GET') {
    const user = await sessionUser(request, env.DB)
    if (!user) return json({ error: 'Invalid or expired session.' }, 401)

    const asks = (await env.DB.prepare('SELECT * FROM asks WHERE author_id = ? ORDER BY created_at DESC').bind(user.id).all()).results
    const formattedAsks = []
    for (const ask of asks) {
      const guesses = (await env.DB.prepare('SELECT id FROM guesses WHERE ask_id = ?').bind(ask.id).all()).results
      formattedAsks.push({ ...formatAsk(ask), guess: guesses.map(({ id }) => ({ _id: id })) })
    }
    const alerts = (await env.DB.prepare('SELECT ask_id AS id FROM alerts WHERE user_id = ?').bind(user.id).all()).results
    return json({
      _id: user.id,
      username: user.username,
      email: user.email,
      admin: Boolean(user.admin),
      ask: formattedAsks,
      alert: alerts.map(({ id }) => ({ _id: id }))
    })
  }

  return null
}

async function handleAsks (request, env, path) {
  if (path === '/ask/' && request.method === 'GET') {
    const rows = (await env.DB.prepare(`
      SELECT a.*, u.username AS author_name
      FROM asks a LEFT JOIN users u ON u.id = a.author_id
      ORDER BY a.created_at DESC
    `).all()).results
    return json(rows.map(formatAsk))
  }

  if (path === '/ask/' && request.method === 'POST') {
    const body = await readBody(request)
    const id = crypto.randomUUID()
    const ask = {
      id,
      body: textValue(body.body, 20000),
      whatsthat: textValue(body.whatsthat, 100),
      language: textValue(body.language, 40, 'javascript'),
      author: textValue(body.author, 80) || null
    }
    if (!ask.body || !ask.whatsthat) return json({ error: 'Code and selected term are required.' }, 400)
    await env.DB.prepare('INSERT INTO asks (id, body, whatsthat, language, author_id) VALUES (?, ?, ?, ?, ?)')
      .bind(ask.id, ask.body, ask.whatsthat, ask.language, ask.author).run()
    return json({ newAsk: await getAsk(env.DB, id) }, 201)
  }

  const searchMatch = path.match(/^\/ask\/guess\/(.+)$/)
  if (searchMatch && request.method === 'GET') {
    const term = decodeURIComponent(searchMatch[1]).trim().toLowerCase()
    const rows = (await env.DB.prepare(`
      SELECT DISTINCT a.*, u.username AS author_name
      FROM asks a
      LEFT JOIN users u ON u.id = a.author_id
      LEFT JOIN guesses g ON g.ask_id = a.id
      WHERE lower(g.body) = ? OR lower(a.whatsthat) = ?
      ORDER BY a.created_at DESC
    `).bind(term, term).all()).results
    return json(rows.map(formatAsk))
  }

  const askMatch = path.match(/^\/ask\/([^/]+)$/)
  if (askMatch && request.method === 'GET') {
    const ask = await getAsk(env.DB, askMatch[1])
    return ask ? json(ask) : json({ error: 'Question not found.' }, 404)
  }

  return null
}

async function handleGuesses (request, env, path) {
  if (path === '/guess' && request.method === 'GET') {
    const rows = (await env.DB.prepare(`
      SELECT g.*, u.username AS author_name
      FROM guesses g LEFT JOIN users u ON u.id = g.author_id
      ORDER BY g.created_at DESC
    `).all()).results
    return json(rows.map(formatGuess))
  }

  if (path === '/guess' && request.method === 'POST') {
    const body = await readBody(request)
    const guess = {
      id: crypto.randomUUID(),
      ask: textValue(body.ask, 80),
      body: textValue(body.body, 100),
      source: textValue(body.source, 500),
      comment: textValue(body.comment, 500),
      author: textValue(body.author, 80) || null
    }
    if (!guess.ask || !guess.body) return json({ error: 'Question and answer are required.' }, 400)
    if (!(await getAsk(env.DB, guess.ask))) return json({ error: 'Question not found.' }, 404)
    await env.DB.prepare('INSERT INTO guesses (id, ask_id, body, source, comment, author_id) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(guess.id, guess.ask, guess.body, guess.source, guess.comment, guess.author).run()
    const saved = await env.DB.prepare('SELECT * FROM guesses WHERE id = ?').bind(guess.id).first()
    return json(formatGuess(saved), 201)
  }

  const byAskMatch = path.match(/^\/guess\/ask\/([^/]+)$/)
  if (byAskMatch && request.method === 'GET') {
    const rows = (await env.DB.prepare(`
      SELECT g.*, u.username AS author_name
      FROM guesses g LEFT JOIN users u ON u.id = g.author_id
      WHERE g.ask_id = ?
      ORDER BY g.is_verified DESC, (g.rating_positive - g.rating_negative) DESC, g.created_at DESC
    `).bind(byAskMatch[1]).all()).results
    return json(rows.map(formatGuess))
  }

  const guessMatch = path.match(/^\/guess\/([^/]+)$/)
  if (guessMatch && request.method === 'PUT') {
    const body = await readBody(request)
    const guess = await env.DB.prepare('SELECT id FROM guesses WHERE id = ?').bind(guessMatch[1]).first()
    if (!guess) return json({ error: 'Answer not found.' }, 404)
    if (body.rating_positive) {
      await env.DB.prepare('UPDATE guesses SET rating_positive = rating_positive + 1 WHERE id = ?').bind(guess.id).run()
    } else if (body.rating_negative) {
      await env.DB.prepare('UPDATE guesses SET rating_negative = rating_negative + 1 WHERE id = ?').bind(guess.id).run()
    } else if (typeof body.isVerified === 'boolean') {
      await env.DB.prepare('UPDATE guesses SET is_verified = ? WHERE id = ?').bind(body.isVerified ? 1 : 0, guess.id).run()
    }
    return json({ success: true })
  }

  return null
}

async function handleAlerts (request, env, path) {
  const match = path.match(/^\/user\/(addalert|removealert)\/([^/]+)$/)
  if (!match || request.method !== 'PUT') return null
  const body = await readBody(request)
  const askId = textValue(body.alert, 80)
  if (!askId) return json({ error: 'Question is required.' }, 400)
  if (match[1] === 'addalert') {
    await env.DB.prepare('INSERT OR IGNORE INTO alerts (user_id, ask_id) VALUES (?, ?)').bind(match[2], askId).run()
  } else {
    await env.DB.prepare('DELETE FROM alerts WHERE user_id = ? AND ask_id = ?').bind(match[2], askId).run()
  }
  return json({ success: true })
}

export default {
  async fetch (request, env) {
    if (request.method === 'OPTIONS') return empty()
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/{2,}/g, '/')

    try {
      if (path === '/' || path === '/health') return json({ service: 'whatsthat-api', status: 'ok' })
      return await handleAuth(request, env, path) ||
        await handleAsks(request, env, path) ||
        await handleGuesses(request, env, path) ||
        await handleAlerts(request, env, path) ||
        json({ error: 'Not found.' }, 404)
    } catch (error) {
      console.error(error)
      return json({ error: 'The service could not complete this request.' }, 500)
    }
  }
}

