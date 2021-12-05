import { useEffect } from 'react'

interface KeyMap {
  fn: (pressed: boolean) => void
  up?: boolean
  pressed?: boolean
}

interface KeyConfig extends KeyMap {
  keys?: string[]
}

const useKeyboardControlEffect = (keyConfig: KeyConfig[]) => {
  useEffect(() => {
    const keyMap = keyConfig.reduce<{ [key: string]: KeyMap }>((out, { keys, fn, up = true }) => {
      keys?.forEach((key) => (out[key] = { fn, pressed: false, up }))
      return out
    }, {})

    // 키 다운 이벤트인데 키가 눌려있지 않으면 호출하지 않는다.
    // 해당 이벤트는 KeyConfig에서 넘어는 키를 기준으로 값을 변경 => state 변경이 아닌 값 변경
    // fn이라는 함수를 실행하는데 해당 함수가 결과적으로 store에 있는 상태를 변경
    const downHandler = (e: KeyboardEvent) => {
      const { key, target } = e
      const safeTarget = target as HTMLElement
      if (!keyMap[key] || safeTarget?.nodeName === 'INPUT') return
      const { fn, pressed, up } = keyMap[key]
      keyMap[key].pressed = true
      if (up || !pressed) fn(true)
    }

    // 키 업 이벤트인데 키가 눌려있지 않으면 호출하지 않는다.
    // 해당 이벤트는 KeyConfig에서 넘어는 키를 기준으로 값을 변경 => state 변경이 아닌 값 변경
    // fn이라는 함수를 실행하는데 해당 함수가 결과적으로 store에 있는 상태를 변경
    const upHandler = (e: KeyboardEvent) => {
      const { key, target } = e
      const safeTarget = target as HTMLElement
      if (!keyMap[key] || safeTarget?.nodeName === 'INPUT') return
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

export default useKeyboardControlEffect
