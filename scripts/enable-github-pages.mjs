/**
 * Включает GitHub Pages с источником «GitHub Actions» (один раз на репозиторий).
 * Запуск: GITHUB_TOKEN=ghp_xxx node scripts/enable-github-pages.mjs
 */
const owner = 'rinat3636'
const repo = 'avtomagazin'
const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('Укажите GITHUB_TOKEN (classic PAT с правом repo или admin:repo_hook).')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

const get = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, { headers })
if (get.ok) {
  console.log('GitHub Pages уже настроен:', await get.text())
  process.exit(0)
}

const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({ build_type: 'workflow' }),
})

const text = await res.text()
if (!res.ok) {
  console.error(res.status, text)
  process.exit(1)
}
console.log('GitHub Pages включён (источник: GitHub Actions).')
console.log(text)
