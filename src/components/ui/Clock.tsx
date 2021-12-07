import React, { useEffect, useRef } from 'react'
import { addEffect } from '@react-three/fiber'
import { useGameStateValue } from '@/atoms/gameState'
import { getTime } from '@/utils/utils'

const Clock: React.FC = () => {
  const ref = useRef<HTMLSpanElement>(null)
  const { finished, start } = useGameStateValue()

  let text = getTime(finished, start)

  useEffect(() => {
    let lastTime = 0
    // 각 프레임이라고 하는 전역 렌더 콜백을 추가합니다.
    return addEffect((time) => {
      if (!ref.current || time - lastTime < 100) return
      lastTime = time
      text = getTime(finished, start)
      if (ref.current.innerText !== text) {
        ref.current.innerText = text
      }
    })
  }, [finished, start])

  return (
    <div className="clock">
      <span ref={ref}>{text}</span>
    </div>
  )
}

export default Clock
