// Read-only integration probe. Credentials are supplied via environment and never recorded.
import fs from 'node:fs/promises';
const base = process.env.TRAINING_API_URL || 'http://127.0.0.1:8000';
if (!process.argv[2]) throw new Error('Provide the local API documentation path as the first argument.');
const doc = await fs.readFile(process.argv[2], 'utf8');
const login = await fetch(`${base}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: process.env.TRAINING_TEST_USER, password: process.env.TRAINING_TEST_PASSWORD }) });
const auth = await login.json();
if (!login.ok || !auth.token) throw new Error(`Login failed: ${login.status}`);
const routes = [...new Set([...doc.matchAll(/`(?:GET )?(\/[a-z][a-z-]*)`/g)].map(m => m[1]))].filter(p => !/^\/(new-|register|login|logout|change|reset|performance-evaluation$|available-)/.test(p));
const results = [];
for (const route of routes) {
  const start = performance.now();
  const response = await fetch(base + route, { headers: { Authorization: `Bearer ${auth.token}` } });
  const body = await response.json().catch(() => null);
  results.push({ route, status: response.status, ms: Math.round(performance.now() - start), count: Array.isArray(body) ? body.length : undefined });
  const tableLine = doc.split('\n').find(line => line.includes('`' + route + '`') && /\/:id/.test(line));
  const detail = tableLine?.match(/`(\/[a-z-]+)\/:id`/)?.[1];
  if (detail && Array.isArray(body) && body[0]?.id) {
    const route = `${detail}/${body[0].id}`;
    const start = performance.now();
    const response = await fetch(base + route, { headers: { Authorization: `Bearer ${auth.token}` } });
    results.push({ route, status: response.status, ms: Math.round(performance.now() - start) });
  }
}
await fs.writeFile('docs/backend-read-check.json', JSON.stringify({ timestamp: new Date().toISOString(), mode: 'authenticated read-only', results }, null, 2));
console.log(JSON.stringify(results));
if (results.some(r => r.status !== 200)) process.exitCode = 1;
