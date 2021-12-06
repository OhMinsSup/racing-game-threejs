import { useCallback } from 'react'
import { useGameState, useResetGameState } from '@/atoms/gameState'

// 게임 상태의 변경에 대한 action 생성
const useGameStatusAction = () => {
  const [state, setState] = useGameState()
  const resetState = useResetGameState()

  // 시작
  const onStart = useCallback(() => {
    setState((prev) => ({
      ...prev,
      finished: 0,
      start: Date.now(),
    }))
  }, [setState])

  // 종료
  const onFinish = useCallback(() => {
    const { start, finished } = state
    if (start && !finished) {
      setState((prev) => ({
        ...prev,
        finished: Date.now() - start,
      }))
    }
  }, [state, setState])

  // 체크 포인트
  const onCheckpoint = useCallback(() => {
    const { start } = state
    if (start) {
      const checkpoint = Date.now() - start
      setState((prev) => ({
        ...prev,
        checkpoint,
      }))
    }
  }, [state, setState])

  // 초기화
  const onReset = useCallback(() => {
    resetState()
  }, [resetState])

  return {
    onStart,
    onFinish,
    onCheckpoint,
    onReset,
  }
}

export default useGameStatusAction
