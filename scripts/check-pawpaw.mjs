// Run Vite on port 5173 and Chrome with --headless --remote-debugging-port=9222.
// Then run: node scripts/check-pawpaw.mjs
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const tab = await (await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' })).json()
const ws = new WebSocket(tab.webSocketDebuggerUrl)
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }))
let id = 0
let emailDraftRequests = 0
const pending = new Map()
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data)
  if (m.method === 'Page.frameRequestedNavigation' && m.params.url.startsWith('mailto:')) emailDraftRequests++
  if (m.id) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(m.error) : p.resolve(m.result) }
})
const call = (method, params = {}) => new Promise((resolve, reject) => {
  pending.set(++id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => {
  const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, userGesture: true })
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails))
  return r.result.value
}
try {
  await call('Page.enable')
  for (const width of [1440,390]) {
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640})
    await call('Page.navigate',{url:'http://127.0.0.1:5173/#project-2'})
    await new Promise(r=>setTimeout(r,1000))
    assert.ok(await evaluate(`document.querySelector('h1').textContent === 'Baking PawPaw'`))
    assert.ok(await evaluate(`document.documentElement.scrollWidth <= innerWidth`))
    await evaluate(`Promise.all([...document.querySelectorAll('.project-case-study img')].map(im=>{im.loading='eager';return im.decode()}))`)
    assert.ok(await evaluate(`[...document.querySelectorAll('.project-case-study img')].every(im=>im.complete && im.naturalWidth>0)`))
    assert.ok(await evaluate(`document.body.textContent.includes('Chat with PawPaw') && document.body.textContent.includes('Bake with PawPaw') && document.body.textContent.includes('Hongbi A')`))
    assert.equal(await evaluate(`document.querySelectorAll('.case-deck-slide').length`),6)
    await evaluate(`document.querySelector('[aria-label="Next image"]').click()`)
    await new Promise(r=>setTimeout(r,700))
    assert.ok(await evaluate(`document.querySelector('.case-deck-track').scrollLeft > 100`),'Next must scroll the image deck')
    assert.ok(await evaluate(`document.documentElement.scrollWidth <= innerWidth`))
    const shot=await call('Page.captureScreenshot',{captureBeyondViewport:true})
    await writeFile(`/private/tmp/pawpaw-case-${width}.png`,Buffer.from(shot.data,'base64'))
  }
  console.log('PawPaw screenshots, separate features, carousel, and responsive layouts passed')
} finally { await call('Target.closeTarget',{targetId:tab.id}); ws.close() }
