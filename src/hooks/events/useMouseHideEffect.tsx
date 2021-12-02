import { useEffect } from 'react'
import debounce from 'lodash-es/debounce'

interface UseMouseHideEffectParams {
  delay?: number
}
const useMouseHideEffect = ({ delay = 3000 }: UseMouseHideEffectParams) => {
  useEffect(() => {
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

    // 함수내의 preventDefault를 사용하면 이벤트가 발생하지 않는다.
    window.addEventListener('mousemove', onMouseMovement, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMovement)
  }, [delay])

  return null
}

export default useMouseHideEffect
