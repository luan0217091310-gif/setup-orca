export type VoxelPart = {
  name: string
  size: [number, number, number]
  position: [number, number, number]
  color: string
  rotation?: [number, number, number]
}

export const DORAEMON_BASE_SCALE = 0.62
export const DORAEMON_VOXEL_DATA: readonly VoxelPart[] = [
  // --- ĐẦU TRÒN XANH & MẶT TRẮNG ---
  { name: 'head_main', size: [1.35, 1.15, 1.25], position: [0, 0.65, 0], color: '#0096E6' },
  { name: 'face_white', size: [1.1, 0.82, 0.14], position: [0, 0.56, 0.58], color: '#FFFFFF' },

  // --- MẮT TO & MŨI ĐỎ ---
  {
    name: 'eye_left_white',
    size: [0.32, 0.4, 0.16],
    position: [-0.18, 0.92, 0.61],
    color: '#FFFFFF'
  },
  {
    name: 'eye_right_white',
    size: [0.32, 0.4, 0.16],
    position: [0.18, 0.92, 0.61],
    color: '#FFFFFF'
  },
  { name: 'pupil_left', size: [0.12, 0.16, 0.2], position: [-0.13, 0.92, 0.64], color: '#1E1E1E' },
  { name: 'pupil_right', size: [0.12, 0.16, 0.2], position: [0.13, 0.92, 0.64], color: '#1E1E1E' },
  { name: 'nose_red', size: [0.22, 0.22, 0.22], position: [0, 0.72, 0.7], color: '#E60012' },
  { name: 'mouth_smile', size: [0.55, 0.14, 0.14], position: [0, 0.42, 0.64], color: '#E60012' },

  // --- VÒNG CỔ ĐỎ & CHUÔNG VÀNG ---
  { name: 'collar_red', size: [1.12, 0.14, 1.05], position: [0, 0.04, 0], color: '#E60012' },
  { name: 'bell_gold', size: [0.24, 0.24, 0.24], position: [0, 0.02, 0.58], color: '#FFD700' },

  // --- THÂN, BỤNG TRẮNG & TÚI THẦN KỲ ---
  { name: 'body_blue', size: [1.08, 0.88, 0.95], position: [0, -0.45, 0], color: '#0096E6' },
  { name: 'belly_white', size: [0.78, 0.64, 0.12], position: [0, -0.45, 0.45], color: '#FFFFFF' },
  { name: 'magic_pocket', size: [0.54, 0.3, 0.14], position: [0, -0.55, 0.48], color: '#FFFFFF' },

  // --- TAY TRÒN TRẮNG & CHÂN ---
  {
    name: 'arm_left',
    size: [0.3, 0.52, 0.3],
    position: [-0.66, -0.36, 0],
    color: '#0096E6',
    rotation: [0, 0, 0.28]
  },
  { name: 'hand_left', size: [0.34, 0.34, 0.34], position: [-0.74, -0.64, 0], color: '#FFFFFF' },
  {
    name: 'arm_right',
    size: [0.3, 0.52, 0.3],
    position: [0.66, -0.36, 0],
    color: '#0096E6',
    rotation: [0, 0, -0.28]
  },
  { name: 'hand_right', size: [0.34, 0.34, 0.34], position: [0.74, -0.64, 0], color: '#FFFFFF' },
  { name: 'foot_left', size: [0.44, 0.22, 0.6], position: [-0.28, -0.96, 0.08], color: '#FFFFFF' },
  { name: 'foot_right', size: [0.44, 0.22, 0.6], position: [0.28, -0.96, 0.08], color: '#FFFFFF' },

  // --- CHONG CHÓNG TRE TRÊN ĐẦU ---
  { name: 'copter_base', size: [0.2, 0.1, 0.2], position: [0, 1.26, 0], color: '#F4C430' },
  { name: 'copter_shaft', size: [0.06, 0.26, 0.06], position: [0, 1.4, 0], color: '#F4C430' },
  { name: 'copter_blade', size: [1.05, 0.05, 0.16], position: [0, 1.54, 0], color: '#F4C430' }
]
