import { useEffect, useState } from 'react'
import { DEFAULT_LUFFY_GEAR5_DATA_URL } from './luffy-gear5-art'
import { removeLuffyBackgroundToTransparentPng } from './luffy-background'

export function LuffyCompanion({ paused }: { paused: boolean }): React.JSX.Element | null {
  const [cutout, setCutout] = useState<string | null>(null)
  useEffect(() => {
    let cancelled = false
    void removeLuffyBackgroundToTransparentPng(DEFAULT_LUFFY_GEAR5_DATA_URL)
      .then((url) => {
        if (!cancelled) setCutout(url)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])
  return cutout ? (
    <img
      className="bm-luffy-decor"
      src={cutout}
      alt=""
      aria-hidden
      draggable={false}
      data-paused={paused || undefined}
      width={78}
      height={78}
    />
  ) : null
}
