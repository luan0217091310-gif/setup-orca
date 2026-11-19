import { describe, expect, it } from 'vitest'
import { clearLuffyBackground } from './luffy-background'

describe('clearLuffyBackground', () => {
  it('removes dark edge pixels while preserving enclosed ink and white character pixels', () => {
    const width = 5
    const pixels = new Uint8ClampedArray(width * width * 4)
    for (let i = 0; i < width * width; i++) pixels.set([15, 9, 28, 255], i * 4)
    for (let y = 1; y < 4; y++)
      for (let x = 1; x < 4; x++) pixels.set([255, 255, 255, 255], (y * width + x) * 4)
    pixels.set([10, 10, 10, 255], (2 * width + 2) * 4)
    clearLuffyBackground(pixels, width, width)
    expect(pixels[3]).toBe(0)
    expect(pixels[(1 * width + 1) * 4 + 3]).toBe(255)
    expect(pixels[(2 * width + 2) * 4 + 3]).toBe(255)
  })

  it('preserves existing partial transparency on bright details', () => {
    const pixels = new Uint8ClampedArray([245, 235, 255, 128])
    clearLuffyBackground(pixels, 1, 1)
    expect(pixels[3]).toBe(128)
  })
})
