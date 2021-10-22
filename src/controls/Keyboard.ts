import { useEffect } from 'react'
import { cameras, useStore } from '../store'

interface KeyConfig extends KeyMap {
  keys?: string[]
}

interface KeyMap {
  fn: (pressed: boolean) => void
  up?: boolean
  pressed?: boolean
}

function useKeys(keyConfig: KeyConfig[]) {
  useEffect(() => {
    const keyMap = keyConfig.reduce<{ [key: string]: KeyMap }>((out, { keys, fn, up = true }) => {
      keys && keys.forEach((key) => (out[key] = { fn, pressed: false, up }))
      return out
    }, {})

    // 키 다운 이벤트인데 키가 눌려있지 않으면 호출하지 않는다.
    // 해당 이벤트는 KeyConfig에서 넘어는 키를 기준으로 값을 변경 => state 변경이 아닌 값 변경
    // fn이라는 함수를 실행하는데 해당 함수가 결과적으로 store에 있는 상태를 변경
    const downHandler = ({ key, target }: KeyboardEvent) => {
      if (!keyMap[key] || (target as HTMLElement).nodeName === 'INPUT') return
      const { fn, pressed, up } = keyMap[key]
      keyMap[key].pressed = true
      if (up || !pressed) fn(true)
    }

    // 키 업 이벤트인데 키가 눌려있지 않으면 호출하지 않는다.
    // 해당 이벤트는 KeyConfig에서 넘어는 키를 기준으로 값을 변경 => state 변경이 아닌 값 변경
    // fn이라는 함수를 실행하는데 해당 함수가 결과적으로 store에 있는 상태를 변경
    const upHandler = ({ key, target }: KeyboardEvent) => {
      if (!keyMap[key] || (target as HTMLElement).nodeName === 'INPUT') return
      const { fn, up } = keyMap[key]
      keyMap[key].pressed = false
      if (up) fn(false)
    }

    window.addEventListener('keydown', downHandler, { passive: true })
    window.addEventListener('keyup', upHandler, { passive: true })

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [keyConfig])
}

export function Keyboard() {
  const { reset, set } = useStore(({ actions: { reset }, set }) => ({ reset, set }))
  // 여기서 KeyArrayObject값을 통해서 하나로 정의된 값을 공통된 코드로
  // 상태 수정
  useKeys([
    // 위
    { keys: ['ArrowUp', 'w', 'W', 'z', 'Z'], fn: (forward) => set((state) => ({ controls: { ...state.controls, forward } })) },
    // 아래
    { keys: ['ArrowDown', 's', 'S'], fn: (backward) => set((state) => ({ controls: { ...state.controls, backward } })) },
    // 왼쪽
    { keys: ['ArrowLeft', 'a', 'A', 'q', 'Q'], fn: (left) => set((state) => ({ controls: { ...state.controls, left } })) },
    // 오른쪽
    { keys: ['ArrowRight', 'd', 'D'], fn: (right) => set((state) => ({ controls: { ...state.controls, right } })) },
    // 브레이크
    { keys: [' '], fn: (brake) => set((state) => ({ controls: { ...state.controls, brake } })) },
    // 엔진??
    { keys: ['h', 'H'], fn: (honk) => set((state) => ({ controls: { ...state.controls, honk } })) },
    // 부스터
    { keys: ['Shift'], fn: (boost) => set((state) => ({ controls: { ...state.controls, boost } })) },
    // 다시 시작
    { keys: ['r', 'R'], fn: reset, up: false },
    // 설정값 변경
    { keys: ['.'], fn: () => set((state) => ({ editor: !state.editor })), up: false },
    // 안내
    { keys: ['i', 'I'], fn: () => set((state) => ({ help: !state.help, leaderboard: false })), up: false },
    // 보드
    { keys: ['l', 'L'], fn: () => set((state) => ({ help: false, leaderboard: !state.leaderboard })), up: false },
    // 맵
    { keys: ['m', 'M'], fn: () => set((state) => ({ map: !state.map })), up: false },
    // 사운드
    { keys: ['u', 'U'], fn: () => set((state) => ({ sound: !state.sound })), up: false },
    // 카메라 위치
    {
      keys: ['c', 'C'],
      fn: () => set((state) => ({ camera: cameras[(cameras.indexOf(state.camera) + 1) % cameras.length] })),
      up: false,
    },
  ])
  return null
}
