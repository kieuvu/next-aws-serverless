const fetch = require('node-fetch');

export async function handler(event, _, callback) {
  const res = await fetch(
    "https://api.github.com/repos/vercel/next.js",
  );
  const repo = await res.json();

  return repo;
}
