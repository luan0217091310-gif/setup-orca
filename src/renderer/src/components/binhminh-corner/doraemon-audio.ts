import { DORAEMON_VOICE_CLIPS } from './doraemon-voice-clips'

export type DoraemonSoundEvent = 'click' | 'agent_waiting' | 'late_night' | 'task_done'
export const DORAEMON_VOICE_LINES: Record<DoraemonSoundEvent, readonly string[]> = {
  click: [
    'Tớ là Doraemon đây! Cậu cần bảo bối gì nào?',
    'Hữu Luân cố lên nhé, code sắp xong rồi!',
    'Có tớ và Luffy ở đây đồng hành cùng cậu rồi!'
  ],
  agent_waiting: [
    'Này cậu ơi, agent đang chờ cậu trả lời kìa!',
    'Ting ting! Kiểm tra kết quả của agent ngay nhé!'
  ],
  late_night: [
    'Khuya lắm rồi đó, nghỉ ngơi thôi cậu ơi, để mai làm tiếp nhé!',
    'Đi ngủ sớm để giữ sức khỏe nha!'
  ],
  task_done: ['Tuyệt vời! Công việc đã hoàn thành rồi!']
}

let context: AudioContext | null = null
let suspendTimer: ReturnType<typeof setTimeout> | null = null
let spokenClip: HTMLAudioElement | null = null

export function stopDoraemonSpeech(): void {
  spokenClip?.pause()
  spokenClip = null
  globalThis.speechSynthesis?.cancel()
}

function speak(event: DoraemonSoundEvent, volume: number): void {
  stopDoraemonSpeech()
  const voices = globalThis.speechSynthesis?.getVoices() ?? []
  const voice = voices.find((candidate) => candidate.lang.toLowerCase().startsWith('vi'))
  const lines = DORAEMON_VOICE_LINES[event]
  const index = Math.floor(Math.random() * lines.length)
  const clips = DORAEMON_VOICE_CLIPS[event]
  if (!voice && clips?.length) {
    spokenClip = new Audio(clips[index % clips.length])
    spokenClip.volume = volume
    void spokenClip.play().catch(() => {})
    return
  }
  if (!globalThis.speechSynthesis) return
  const utterance = new SpeechSynthesisUtterance(lines[index])
  utterance.lang = 'vi-VN'
  utterance.volume = volume
  utterance.pitch = 1.35
  utterance.rate = 1.05
  if (voice) utterance.voice = voice
  globalThis.speechSynthesis.speak(utterance)
}

export function playDoraemonVoiceAndSfx(
  event: DoraemonSoundEvent = 'click',
  volume = 0.6,
  enableVoice = true
): void {
  const level = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0
  if (level === 0) return
  if (typeof globalThis.AudioContext === 'function') {
    context ??= new AudioContext()
    if (suspendTimer) clearTimeout(suspendTimer)
    const ctx = context
    void ctx.resume().catch(() => {})
    const notes =
      event === 'late_night' ? [659.25, 587.33, 523.25] : [1046.5, 1318.5, 1567.98, 2093]
    notes.forEach((frequency, index) => {
      const start = ctx.currentTime + index * 0.075
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      oscillator.type = 'triangle'
      oscillator.frequency.setValueAtTime(frequency, start)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(level * 0.18, start + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28)
      oscillator.connect(gain).connect(ctx.destination)
      oscillator.start(start)
      oscillator.stop(start + 0.29)
      oscillator.onended = () => {
        oscillator.disconnect()
        gain.disconnect()
      }
    })
    suspendTimer = setTimeout(() => {
      suspendTimer = null
      void ctx.suspend()
    }, 1200)
  }
  if (enableVoice) speak(event, level)
}
