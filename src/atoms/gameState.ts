import { atom } from 'recoil'

interface GameState {
  start: number
  checkpoint: number
  finished: number
}

export const gameState = atom<GameState>({
  key: 'gameState',
  default: {
    start: 0,
    checkpoint: 0,
    finished: 0,
  },
})
