import { useEffect } from 'react'
import debounce from 'lodash-es/debounce'
import addEventListenerWrap from '@/libs/brower-utils/addEventListener'

// 기본 상태가 화면에서 마우스가 액션을 안하면 숨기고 다시 보여줌
export function HideMouse({ delay = 3000 }) {
  useEffect(() => {
    // isIdel의 상태는 state로 관리하면 상태가 변경시 다시 그려준다.
    // isIdle => addEventListener
    // isIdle => state change
    // isIdle => render
    // isIdle => addEventListener
    // 이런 상태가 변경이 된다.
    let isIdle = true
    const hideMouse = debounce(() => {
      isIdle = true
      document.documentElement.style.cursor = 'none'
    }, delay)

    const onMouseMovement = () => {
      if (isIdle) {
        isIdle = false
        document.documentElement.style.cursor = ''
      }
      hideMouse()
    }

    const unsubscribe = addEventListenerWrap(window, 'mousemove', onMouseMovement, { passive: true })
    return () => unsubscribe.remove()
  }, [delay])

  return null
}
