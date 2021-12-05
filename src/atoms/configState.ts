import { atom, useRecoilState, useRecoilValue } from 'recoil'

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

// helper 설정을 위한 값
const helpers = {
  editor: false,
  help: false,
  leaderboard: false,
  map: false,
  sound: false,
  camera: cameras[0] as typeof cameras[number],
}

// 컨트롤 타입
export type Controls = typeof controls

// 헬퍼 타입
export type Helpers = typeof helpers

// 컨트롤 타입 atom 생성
export const controlsState = atom<Controls>({
  key: 'controlsState',
  default: controls,
})

// controls 타입 상태변경 함수
export function useControlsState() {
  return useRecoilState(controlsState)
}

// controls 타입 값 사용 함수
export function useControlsValue() {
  return useRecoilValue(controlsState)
}

// helper 타입 atom 생성
export const helpersState = atom<Helpers>({
  key: 'helpersState',
  default: helpers,
})

// helper 타입 상태변경 함수
export function useHelpersState() {
  return useRecoilState(helpersState)
}

// helper 타입 값 사용 함수
export function useHelpersValue() {
  return useRecoilValue(helpersState)
}
