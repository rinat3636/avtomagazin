/**
 * Включает GitHub Pages с публикацией из ветки gh-pages (после первого деплоя workflow).
 * Запуск: GITHUB_TOKEN=ghp_xxx node scripts/enable-github-pages.mjs
 *
 * Для режима «GitHub Actions» (артефакт) используйте отдельную настройку в UI репозитория.
 */
const owner = 'rinat3636'
const repo = 'avtomagazin'
const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('Укажите GITHUB_TOKEN (PAT с правом repo).')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

const get = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, { headers })
if (get.ok) {
  const j = await get.json()
  console.log('GitHub Pages уже настроен:', j.source?.branch ?? j.build_type)
  process.exit(0)
}

// Ветка gh-pages должна существовать (после первого push из Actions).
const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, {
  method: 'POST',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    source: { branch: 'gh-pages', path: '/' },
  }),
})

const text = await res.text()
if (!res.ok) {
  console.error(res.status, text)
  if (res.status === 404) {
    console.error('Сначала дождитесь workflow «Deploy GitHub Pages» — он создаст ветку gh-pages.')
  }
  process.exit(1)
}
console.log('GitHub Pages включён: ветка gh-pages, каталог /')
console.log(text)
