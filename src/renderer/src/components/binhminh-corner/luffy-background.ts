/** Remove only dark background connected to an edge; preserve the character's interior ink. */
export function clearLuffyBackground(data: Uint8ClampedArray, width: number, height: number): void {
  const visited = new Uint8Array(width * height)
  const queue = new Uint32Array(width * height)
  let head = 0
  let tail = 0
  const push = (pixel: number): void => {
    if (pixel < 0 || pixel >= visited.length || visited[pixel]) return
    visited[pixel] = 1
    const offset = pixel * 4
    const r = data[offset]!,
      g = data[offset + 1]!,
      b = data[offset + 2]!
    const dark = Math.max(r, g, b) < 93
    const purple = b > r * 1.16 && b > g * 1.2 && (r + g + b) / 3 < 106
    if (data[offset + 3] === 0 || dark || purple) queue[tail++] = pixel
  }
  for (let x = 0; x < width; x++) {
    push(x)
    push((height - 1) * width + x)
  }
  for (let y = 0; y < height; y++) {
    push(y * width)
    push(y * width + width - 1)
  }
  while (head < tail) {
    const pixel = queue[head++]!
    data[pixel * 4 + 3] = 0
    if (pixel % width > 0) push(pixel - 1)
    if (pixel % width < width - 1) push(pixel + 1)
    push(pixel - width)
    push(pixel + width)
  }
}

const cutouts = new Map<string, Promise<string>>()
export function removeLuffyBackgroundToTransparentPng(imageSrc: string): Promise<string> {
  const previous = cutouts.get(imageSrc)
  if (previous) return previous
  const pending = new Promise<string>((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Canvas is unavailable')
        ctx.drawImage(image, 0, 0)
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
        clearLuffyBackground(pixels.data, canvas.width, canvas.height)
        ctx.putImageData(pixels, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      } catch (error) {
        reject(error)
      }
    }
    image.onerror = () => reject(new Error('Cannot decode Luffy artwork'))
    image.src = imageSrc
  })
  cutouts.set(imageSrc, pending)
  return pending
}
