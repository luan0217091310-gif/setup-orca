import { useEffect, useRef } from 'react'
import type { BinhMinhCornerSettings } from '../../../../shared/binhminh-corner-settings'
import { playDoraemonVoiceAndSfx, stopDoraemonSpeech } from './doraemon-audio'

export function useCompanionSoundEvents(
  settings: BinhMinhCornerSettings,
  finished: number,
  waiting: number,
  lateNight: boolean,
  active: boolean
): void {
  const previous = useRef({ finished, lateNight })
  const lastPlayed = useRef(0)
  useEffect(() => {
    const done = finished > previous.current.finished
    const night = lateNight && !previous.current.lateNight
    previous.current = { finished, lateNight }
    const pet = settings.pet
    if (!pet.sound || !pet.speech) stopDoraemonSpeech()
    if (
      pet.species !== 'doraemon' ||
      !pet.sound ||
      !active ||
      waiting > 0 ||
      (pet.muteLateNight && lateNight) ||
      Date.now() - lastPlayed.current < 15_000
    )
      return
    if (done || night) {
      lastPlayed.current = Date.now()
      playDoraemonVoiceAndSfx(done ? 'task_done' : 'late_night', pet.volume, pet.speech)
    }
  }, [settings, finished, waiting, lateNight, active])
}
