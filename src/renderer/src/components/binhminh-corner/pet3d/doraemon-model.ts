import {
  BoxGeometry,
  Group,
  Mesh,
  MeshToonMaterial,
  SphereGeometry,
  type Texture,
  type Object3D
} from 'three'
import { DORAEMON_BASE_SCALE, DORAEMON_VOXEL_DATA } from '../doraemon-voxel-data'
import type { PetMood } from '../corner-logic'

export function createDoraemonModel(ramp: Texture): { model: Group; parts: Map<string, Mesh> } {
  const model = new Group()
  const parts = new Map<string, Mesh>()
  for (const part of DORAEMON_VOXEL_DATA) {
    const rounded = /head|face|eye|pupil|nose|body|belly|hand|foot|bell/.test(part.name)
    const geometry = rounded ? new SphereGeometry(0.5, 24, 16) : new BoxGeometry(1, 1, 1)
    geometry.scale(...part.size)
    const material = new MeshToonMaterial({ color: part.color, gradientMap: ramp })
    const mesh = new Mesh(geometry, material)
    mesh.name = part.name
    mesh.position.set(...part.position)
    if (part.rotation) mesh.rotation.set(...part.rotation)
    model.add(mesh)
    parts.set(part.name, mesh)
  }
  for (const side of [-1, 1]) {
    for (const line of [-1, 0, 1]) {
      const whisker = new Mesh(
        new BoxGeometry(0.27, 0.018, 0.018),
        new MeshToonMaterial({ color: '#222222', gradientMap: ramp })
      )
      whisker.position.set(side * 0.38, 0.6 + line * 0.11, 0.675)
      whisker.rotation.z = side * line * 0.17
      model.add(whisker)
    }
  }
  model.scale.setScalar(DORAEMON_BASE_SCALE)
  return { model, parts }
}

export function animateDoraemon(
  model: Object3D,
  parts: ReadonlyMap<string, Mesh>,
  frame: {
    time: number
    seconds: number
    mood: PetMood
    speed: number
    reacting: boolean
    baseY: number
    extent: number
  }
): void {
  const { time: t, seconds, mood, speed, reacting, baseY, extent } = frame
  const blade = parts.get('copter_blade')
  if (blade) blade.rotation.y += seconds * (mood === 'sleep' ? 1.5 : 12 + speed * 3)
  const blink = mood === 'sleep' || mood === 'tired' ? 0.1 : t % 3.4 < 0.14 ? 0.1 : 1
  for (const name of ['eye_left_white', 'eye_right_white', 'pupil_left', 'pupil_right']) {
    const eye = parts.get(name)
    if (eye) eye.scale.y = blink
  }
  const wave = Math.sin(t * (reacting || mood === 'alert' ? 10 : 2.2)) * (reacting ? 0.45 : 0.1)
  const left = parts.get('arm_left')
  const right = parts.get('arm_right')
  if (left) left.rotation.z = 0.28 + wave
  if (right) right.rotation.z = -0.28 - wave
  model.scale.set(
    DORAEMON_BASE_SCALE,
    DORAEMON_BASE_SCALE * (1 + 0.02 * Math.sin(t * 2.6)),
    DORAEMON_BASE_SCALE
  )
  model.position.y =
    baseY +
    Math.sin(t * 2.8) * extent * 0.025 +
    (reacting ? Math.abs(Math.sin(t * 6)) * extent * 0.06 : 0)
  model.rotation.y = -0.18 + Math.sin(t * 1.4) * 0.08
  model.rotation.x = mood === 'tired' || mood === 'sleep' ? 0.1 : 0
}
