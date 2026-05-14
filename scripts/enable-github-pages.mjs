/**
 * Включает или обновляет GitHub Pages (legacy: ветка + каталог).
 *
 * Цель по умолчанию: main + /docs (см. workflow). Переопределение:
 * PAGES_SOURCE_BRANCH, PAGES_SOURCE_PATH (например gh-pages + /).
 *
 * В CI: secret PAGES_PAT → GITHUB_TOKEN (GITHUB_TOKEN workflow POST /pages не вызывает).
 * См.: https://github.com/actions/configure-pages/issues/40
 *
 * Локально: GITHUB_TOKEN=ghp_xxx npm run pages:enable (classic PAT с правом repo)
 */
const repoFull = process.env.GITHUB_REPOSITORY || 'rinat3636/avtomagazin'
const [owner, repo] = repoFull.split('/')
if (!owner || !repo) {
  console.error('Неверный GITHUB_REPOSITORY:', repoFull)
  process.exit(1)
}

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('Укажите GITHUB_TOKEN (в Actions передаётся workflow).')
  process.exit(1)
}

const api = `https://api.github.com/repos/${owner}/${repo}/pages`
const baseHeaders = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}
const jsonHeaders = { ...baseHeaders, 'Content-Type': 'application/json' }

const branch = process.env.PAGES_SOURCE_BRANCH || 'main'
const pathRaw = process.env.PAGES_SOURCE_PATH || '/docs'
const path = pathRaw.startsWith('/') ? pathRaw : `/${pathRaw}`
const target = { branch, path }
const bodyLegacy = JSON.stringify({
  build_type: 'legacy',
  source: target,
})

async function getPages() {
  const res = await fetch(api, { headers: baseHeaders })
  const text = await res.text()
  return { res, text }
}

async function putPages() {
  const res = await fetch(api, { method: 'PUT', headers: jsonHeaders, body: bodyLegacy })
  const text = await res.text()
  return { res, text }
}

async function postPages() {
  const res = await fetch(api, { method: 'POST', headers: jsonHeaders, body: bodyLegacy })
  const text = await res.text()
  return { res, text }
}

const { res: getRes, text: getText } = await getPages()

if (getRes.ok) {
  let data
  try {
    data = JSON.parse(getText)
  } catch {
    console.error('Не удалось разобрать ответ GET /pages')
    process.exit(1)
  }
  const branch = data.source?.branch
  const path = data.source?.path ?? '/'
  if (branch === target.branch && path === target.path) {
    console.log('GitHub Pages уже настроен:', branch, path)
    process.exit(0)
  }
  console.log('Обновление источника Pages с', branch, path, '→', target.branch, target.path)
  const { res: putRes, text: putText } = await putPages()
  if (putRes.status === 204 || putRes.ok) {
    console.log('GitHub Pages обновлён.')
    process.exit(0)
  }
  console.error(putRes.status, putText)
  process.exit(1)
}

if (getRes.status === 404) {
  const { res: postRes, text: postText } = await postPages()
  if (postRes.status === 201) {
    console.log('GitHub Pages включён:', target.branch, target.path)
    process.exit(0)
  }
  if (postRes.status === 409) {
    const { res: putRes, text: putText } = await putPages()
    if (putRes.status === 204 || putRes.ok) {
      console.log('GitHub Pages обновлён (после 409 на POST).')
      process.exit(0)
    }
    console.error(putRes.status, putText)
    process.exit(1)
  }
  console.error(postRes.status, postText)
  if (postRes.status === 422) {
    console.error('Проверьте, что источник уже существует (например ветка', target.branch, 'и каталог', target.path, ').')
  }
  process.exit(1)
}

console.error(getRes.status, getText)
process.exit(1)
