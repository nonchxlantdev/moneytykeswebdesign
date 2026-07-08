import { cpSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const distDir = process.argv[2] ?? 'dist'
const indexPath = join(distDir, 'index.html')
const routes = ['plans', 'faq', 'our-story', 'terms', 'privacy']

cpSync(indexPath, join(distDir, '404.html'))

for (const route of routes) {
  const routeDir = join(distDir, route)
  mkdirSync(routeDir, { recursive: true })
  cpSync(indexPath, join(routeDir, 'index.html'))
}

console.log(`SPA fallback: 404.html + ${routes.length} route folders in ${distDir}`)
