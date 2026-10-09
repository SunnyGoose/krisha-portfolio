import assert from 'node:assert/strict'
import { playVideo } from '../src/videoPlayback.js'

let plays = 0
const video = {
  paused: true, ended: false, currentTime: 3,
  play() {
    assert.equal(this.muted, true)
    assert.equal(this.defaultMuted, true)
    plays++
    return Promise.resolve()
  },
}

assert.equal(await playVideo(video), true)
assert.equal(plays, 1)
assert.equal(video.currentTime, 3)
await playVideo(null)
globalThis.matchMedia = () => ({ matches: true })
await playVideo(video)
assert.equal(plays, 1)
delete globalThis.matchMedia
video.paused = false
await playVideo(video)
assert.equal(plays, 1)
video.paused = true
video.ended = true
await playVideo(video)
assert.equal(plays, 1)
await playVideo(video, true)
assert.equal(plays, 2)
assert.equal(video.currentTime, 0)
video.ended = false
for (const name of ['NotAllowedError', 'AbortError']) {
  video.play = () => Promise.reject(Object.assign(new Error(name), { name }))
  assert.equal(await playVideo(video), false)
}
console.log('Video playback checks passed')
