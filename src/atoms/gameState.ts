import { atom, useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil'

interface GameState {
  start: number
  checkpoint: number
  bestCheckpoint: number
  finished: number
}

export const gameState = atom<GameState>({
  key: 'gameState',
  default: {
    start: 0,
    bestCheckpoint: 0,
    checkpoint: 0,
    finished: 0,
  },
})

// 게임 설정에 대한 상태를 가져오는 함수
export function useGameState() {
  return useRecoilState(gameState)
}

// 게임 설정에 대한 상태값을 가져오는 함수
export function useGameStateValue() {
  return useRecoilValue(gameState)
}

// 게임 설정을 초기화하는 함수
export function useResetGameState() {
  return useResetRecoilState(gameState)
}
