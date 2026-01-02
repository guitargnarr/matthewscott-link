import puppeteer from 'puppeteer'
import handler from 'serve-handler'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function prerender() {
  // Start a simple static server (no Vite dev scripts)
  const server = http.createServer((req, res) => {
    return handler(req, res, {
      public: path.join(__dirname, 'dist')
    })
  })

  await new Promise((resolve) => server.listen(4173, resolve))
  console.log('Static server running on http://localhost:4173')

  console.log('Starting pre-render...')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  // Load the page and wait for React to render
  await page.goto('http://localhost:4173', {
    waitUntil: 'networkidle0',
    timeout: 30000
  })

  // Wait for React content to render
  await page.waitForSelector('h1', { timeout: 10000 })
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Get the fully rendered HTML
  let html = await page.content()

  // Remove any Vite dev client scripts that might have been injected
  html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>\s*/g, '')

  // Write it back to index.html
  const indexPath = path.join(__dirname, 'dist', 'index.html')
  fs.writeFileSync(indexPath, html)

  console.log('Pre-rendered HTML saved to dist/index.html')
  console.log(`File size: ${(fs.statSync(indexPath).size / 1024).toFixed(2)} KB`)

  await browser.close()
  server.close()

  console.log('Pre-rendering complete!')
}

prerender().catch(err => {
  console.error('Pre-rendering failed:', err)
  process.exit(1)
})
