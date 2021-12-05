import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { controlsState, helpersState, cameras } from '@/atoms/configState'
import { useKeyboardControlEffect } from '@/hooks/events'

// key controls 이벤트 처리 함수
const useKeyControlsEffect = () => {
  const setControlsState = useSetRecoilState(controlsState)
  const setHelpersState = useSetRecoilState(helpersState)

  const resetControlsState = useResetRecoilState(controlsState)
  const resetHelpersState = useResetRecoilState(helpersState)

  const forwardFn = (forward: boolean) => setControlsState((prev) => ({ ...prev, forward }))

  const backwardFn = (backward: boolean) => setControlsState((prev) => ({ ...prev, backward }))

  const rightFn = (right: boolean) => setControlsState((prev) => ({ ...prev, right }))

  const leftFn = (left: boolean) => setControlsState((prev) => ({ ...prev, left }))

  const brakeFn = (brake: boolean) => setControlsState((prev) => ({ ...prev, brake }))

  const honkFn = (honk: boolean) => setControlsState((prev) => ({ ...prev, honk }))

  const boostFn = (boost: boolean) => setControlsState((prev) => ({ ...prev, boost }))

  const editorFn = () => setHelpersState((prev) => ({ ...prev, editor: !prev.editor }))

  const helpFn = () => setHelpersState((prev) => ({ ...prev, help: !prev.help, leaderboard: false }))

  const boardFn = () => setHelpersState((prev) => ({ ...prev, leaderboard: !prev.leaderboard, help: false }))

  const mapFn = () => setHelpersState((prev) => ({ ...prev, map: !prev.map }))

  const soundFn = () => setHelpersState((prev) => ({ ...prev, sound: !prev.sound }))

  const cameraFn = () => setHelpersState((prev) => ({ ...prev, camera: cameras[(cameras.indexOf(prev.camera) + 1) % cameras.length] }))

  const reset = () => {
    resetControlsState()
    resetHelpersState()
  }

  useKeyboardControlEffect([
    // 위로 이동
    { keys: ['ArrowUp', 'w', 'W', 'z', 'Z'], fn: forwardFn },
    // 아래
    { keys: ['ArrowDown', 's', 'S', 'x', 'X'], fn: backwardFn },
    // 왼쪽
    { keys: ['ArrowLeft', 'a', 'A', 'q', 'Q'], fn: leftFn },
    // 오른쪽
    { keys: ['ArrowRight', 'd', 'D'], fn: rightFn },
    // 브레이크
    { keys: [' ', 'Spacebar'], fn: brakeFn },
    // 엔진
    { keys: ['h', 'H'], fn: honkFn },
    // 부스터
    { keys: ['Shift'], fn: boostFn },
    // 다시 시작
    { keys: ['r', 'R'], fn: reset, up: false },
    // 설정값 변경
    { keys: ['.'], fn: editorFn, up: false },
    // 안내
    { keys: ['i', 'I'], fn: helpFn, up: false },
    // 보드
    { keys: ['l', 'L'], fn: boardFn, up: false },
    // 맵
    { keys: ['m', 'M'], fn: mapFn, up: false },
    // 사운드
    { keys: ['k', 'K'], fn: soundFn, up: false },
    // 카메라 위치
    {
      keys: ['c', 'C'],
      fn: cameraFn,
      up: false,
    },
  ])
}

export default useKeyControlsEffect
