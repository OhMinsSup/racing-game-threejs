// debug 모드
export const debug = false as const
export const dpr = 1.5 as const
// 현재 맵에 대한 layer level
export const levelLayer = 1 as const
// 최대 부스터 상태
export const maxBoost = 100 as const
export const position = [-110, 0.75, 220] as const
export const rotation = [0, Math.PI / 2 + 0.35, 0] as const
// 그림자 상태
export const shadows = true as const
export const stats = false as const

interface Mutation {
  boost: number
  rpmTarget: number
  sliding: boolean
  speed: number
  velocity: [number, number, number]
}

export const mutation: Mutation = {
  // Everything in here is mutated to avoid even slight overhead
  boost: maxBoost,
  rpmTarget: 0,
  sliding: false,
  speed: 0,
  velocity: [0, 0, 0],
}
