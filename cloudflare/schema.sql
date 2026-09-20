PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  admin INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

CREATE TABLE IF NOT EXISTS asks (
  id TEXT PRIMARY KEY,
  body TEXT NOT NULL,
  whatsthat TEXT NOT NULL,
  language TEXT NOT NULL,
  author_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS asks_author_id_idx ON asks(author_id);

CREATE TABLE IF NOT EXISTS guesses (
  id TEXT PRIMARY KEY,
  ask_id TEXT NOT NULL REFERENCES asks(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT '',
  comment TEXT NOT NULL DEFAULT '',
  author_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  rating_positive INTEGER NOT NULL DEFAULT 0,
  rating_negative INTEGER NOT NULL DEFAULT 0,
  is_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS guesses_ask_id_idx ON guesses(ask_id);

CREATE TABLE IF NOT EXISTS alerts (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ask_id TEXT NOT NULL REFERENCES asks(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, ask_id)
);

-- Curated starter catalogue. Stable IDs make this seed safe to run repeatedly.
INSERT OR IGNORE INTO asks (id, body, whatsthat, language, created_at) VALUES
  ('seed-js-map', 'const doubled = numbers.map(number => number * 2);', 'map', 'javascript', '2026-09-20T09:00:00.000Z'),
  ('seed-js-destructuring', 'const { name, email } = user;', '{ name, email }', 'javascript', '2026-09-20T09:05:00.000Z'),
  ('seed-js-await', 'const response = await fetch(''/api/items'');', 'await', 'javascript', '2026-09-20T09:10:00.000Z'),
  ('seed-css-fr', '.gallery { display: grid; grid-template-columns: repeat(3, 1fr); }', '1fr', 'css', '2026-09-20T09:15:00.000Z'),
  ('seed-html-aria-label', '<button aria-label="Close menu">×</button>', 'aria-label', 'html', '2026-09-20T09:20:00.000Z'),
  ('seed-sql-inner-join', 'SELECT p.title, u.name FROM posts p INNER JOIN users u ON u.id = p.user_id;', 'INNER JOIN', 'sql', '2026-09-20T09:25:00.000Z'),
  ('seed-react-deps', 'useEffect(() => { document.title = title; }, [title]);', '[title]', 'javascript', '2026-09-20T09:30:00.000Z'),
  ('seed-js-optional-chaining', 'const city = customer?.address?.city ?? ''Unknown'';', '?.', 'javascript', '2026-09-20T09:35:00.000Z'),
  ('seed-html-alt', '<img src="chart.png" alt="Revenue grew by 18% in 2025">', 'alt', 'html', '2026-09-20T09:40:00.000Z'),
  ('seed-css-container', '.card { container-type: inline-size; } @container (min-width: 30rem) { .title { font-size: 2rem; } }', '@container', 'css', '2026-09-20T09:45:00.000Z');

INSERT OR IGNORE INTO guesses (
  id, ask_id, body, source, comment, rating_positive, rating_negative, is_verified, created_at
) VALUES
  ('seed-answer-js-map', 'seed-js-map', 'Array.prototype.map()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', 'Creates a new array by transforming every item.', 12, 0, 1, '2026-09-20T10:00:00.000Z'),
  ('seed-answer-js-destructuring', 'seed-js-destructuring', 'object destructuring', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', 'Extracts named properties into variables.', 9, 0, 1, '2026-09-20T10:05:00.000Z'),
  ('seed-answer-js-await', 'seed-js-await', 'await operator', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await', 'Pauses the surrounding async function until the promise settles.', 11, 0, 1, '2026-09-20T10:10:00.000Z'),
  ('seed-answer-css-fr', 'seed-css-fr', 'fractional grid unit', 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex_value', 'Represents one share of the available grid space.', 8, 0, 1, '2026-09-20T10:15:00.000Z'),
  ('seed-answer-html-aria-label', 'seed-html-aria-label', 'accessible name', 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label', 'Provides a label when no visible text labels the control.', 10, 0, 1, '2026-09-20T10:20:00.000Z'),
  ('seed-answer-sql-inner-join', 'seed-sql-inner-join', 'inner join', 'https://developer.mozilla.org/en-US/docs/Glossary/SQL', 'Keeps rows that have matching values in both tables.', 7, 0, 1, '2026-09-20T10:25:00.000Z'),
  ('seed-answer-react-deps', 'seed-react-deps', 'effect dependency array', 'https://react.dev/reference/react/useEffect', 'The effect runs again when title changes.', 13, 1, 1, '2026-09-20T10:30:00.000Z'),
  ('seed-answer-js-optional-chaining', 'seed-js-optional-chaining', 'optional chaining', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining', 'Stops safely and returns undefined when an intermediate value is nullish.', 14, 0, 1, '2026-09-20T10:35:00.000Z');

-- Second curated collection: modern JavaScript, CSS and semantic HTML.
INSERT OR IGNORE INTO asks (id, body, whatsthat, language, created_at) VALUES
  ('seed-js-promise-all', 'const [profile, posts] = await Promise.all([getProfile(), getPosts()]);', 'Promise.all', 'javascript', '2026-09-21T09:00:00.000Z'),
  ('seed-js-spread', 'const settings = { ...defaults, ...preferences };', '...', 'javascript', '2026-09-21T09:05:00.000Z'),
  ('seed-js-nullish', 'const pageSize = options.pageSize ?? 20;', '??', 'javascript', '2026-09-21T09:10:00.000Z'),
  ('seed-js-abort-signal', 'const response = await fetch(url, { signal: controller.signal });', 'signal', 'javascript', '2026-09-21T09:15:00.000Z'),
  ('seed-js-object-entries', 'for (const [key, value] of Object.entries(config)) { console.log(key, value); }', 'Object.entries', 'javascript', '2026-09-21T09:20:00.000Z'),
  ('seed-css-minmax', '.layout { grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); }', 'minmax', 'css', '2026-09-21T09:25:00.000Z'),
  ('seed-css-clamp', '.title { font-size: clamp(2rem, 5vw, 4rem); }', 'clamp', 'css', '2026-09-21T09:30:00.000Z'),
  ('seed-css-aspect-ratio', '.video { width: 100%; aspect-ratio: 16 / 9; }', 'aspect-ratio', 'css', '2026-09-21T09:35:00.000Z'),
  ('seed-css-layer', '@layer reset, base, components, utilities;', '@layer', 'css', '2026-09-21T09:40:00.000Z'),
  ('seed-html-loading-lazy', '<img src="landscape.webp" alt="Mountain landscape" loading="lazy">', 'loading="lazy"', 'html', '2026-09-21T09:45:00.000Z'),
  ('seed-html-details', '<details><summary>Show keyboard shortcuts</summary><p>Press ? for help.</p></details>', '<details>', 'html', '2026-09-21T09:50:00.000Z'),
  ('seed-html-inert', '<main inert>...</main>', 'inert', 'html', '2026-09-21T09:55:00.000Z');

INSERT OR IGNORE INTO guesses (
  id, ask_id, body, source, comment, rating_positive, rating_negative, is_verified, created_at
) VALUES
  ('seed-answer-js-promise-all', 'seed-js-promise-all', 'Promise.all()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all', 'Runs independent asynchronous operations concurrently and fulfills when every input fulfills.', 16, 0, 1, '2026-09-21T10:00:00.000Z'),
  ('seed-answer-js-spread', 'seed-js-spread', 'object spread syntax', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax', 'Copies enumerable properties into a new object; later properties override earlier ones.', 12, 0, 1, '2026-09-21T10:05:00.000Z'),
  ('seed-answer-js-nullish', 'seed-js-nullish', 'nullish coalescing operator', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing', 'Uses the right-hand value only when the left-hand value is null or undefined.', 15, 0, 1, '2026-09-21T10:10:00.000Z'),
  ('seed-answer-js-abort-signal', 'seed-js-abort-signal', 'AbortSignal', 'https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal', 'Lets an AbortController cancel the fetch request when it is no longer needed.', 9, 0, 1, '2026-09-21T10:15:00.000Z'),
  ('seed-answer-js-object-entries', 'seed-js-object-entries', 'Object.entries()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries', 'Returns an array of the object own enumerable key-value pairs.', 10, 0, 1, '2026-09-21T10:20:00.000Z'),
  ('seed-answer-css-minmax', 'seed-css-minmax', 'CSS minmax()', 'https://developer.mozilla.org/en-US/docs/Web/CSS/minmax', 'Defines a grid track whose size stays between a minimum and a maximum.', 13, 0, 1, '2026-09-21T10:25:00.000Z'),
  ('seed-answer-css-clamp', 'seed-css-clamp', 'CSS clamp()', 'https://developer.mozilla.org/en-US/docs/Web/CSS/clamp', 'Constrains a preferred responsive value between a minimum and a maximum.', 14, 0, 1, '2026-09-21T10:30:00.000Z'),
  ('seed-answer-css-aspect-ratio', 'seed-css-aspect-ratio', 'aspect-ratio property', 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio', 'Gives the element a preferred width-to-height ratio.', 11, 0, 1, '2026-09-21T10:35:00.000Z'),
  ('seed-answer-html-loading-lazy', 'seed-html-loading-lazy', 'native lazy loading', 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading', 'Defers loading an off-screen image until it approaches the viewport.', 12, 0, 1, '2026-09-21T10:40:00.000Z'),
  ('seed-answer-html-details', 'seed-html-details', 'disclosure widget', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details', 'Creates a native expandable section controlled by its summary.', 10, 0, 1, '2026-09-21T10:45:00.000Z');
