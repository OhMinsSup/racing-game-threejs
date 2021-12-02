import { atom } from 'recoil'

// 컨트롤러 상태값
const controls = {
  backward: false,
  boost: false,
  brake: false,
  forward: false,
  honk: false,
  left: false,
  right: false,
}

// 카메라 시선 상태값 (Camera state) - 카메라의 시선을 정의하는 값이다.
export const cameras = ['DEFAULT', 'FIRST_PERSON', 'BIRD_EYE'] as const

const helpers = {
  editor: false,
  help: false,
  leaderboard: false,
  map: false,
  sound: false,
  camera: cameras[0],
}

// 컨트롤 타입
export type Controls = typeof controls

// 헬퍼 타입
export type Helpers = typeof helpers

// 컨트롤 타입 atom 생성
export const controlState = atom<Controls>({
  key: 'controlState',
  default: controls,
})

// helper 타입 atom 생성
export const helperState = atom<Helpers>({
  key: 'helperState',
  default: helpers,
})
