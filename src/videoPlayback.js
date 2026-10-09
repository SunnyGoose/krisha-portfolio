export async function playVideo(video, restart = false) {
  if (!video || (!restart && globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches)) return
  video.defaultMuted = true
  video.muted = true
  if (restart) video.currentTime = 0
  else if (video.ended || !video.paused) return

  try {
    await video.play()
    return true
  } catch (error) {
    if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
      console.error('Hero video playback failed:', error)
    }
    return false
  }
}
