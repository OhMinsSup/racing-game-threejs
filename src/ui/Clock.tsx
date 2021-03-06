import { useEffect, useRef } from 'react'
import { addEffect } from '@react-three/fiber'
import { useStore } from '../store'
import { readableTime } from './LeaderBoard'
import { getTargetElement } from '@/libs/brower-utils/dom'

const getTime = (finished: number, start: number) => {
  const time = start && !finished ? Date.now() - start : 0
  return `${readableTime(time)}`
}

export function Clock() {
  const ref = useRef<HTMLSpanElement>(null)
  const { finished, start } = useStore(({ finished, start }) => ({ finished, start }))

  let text = getTime(finished, start)

  useEffect(() => {
    let lastTime = 0
    return addEffect((time) => {
      const ele = getTargetElement(ref) as HTMLSpanElement
      if (!ele || time - lastTime < 100) return
      lastTime = time
      text = getTime(finished, start)
      if (ele.innerText !== text) ele.innerText = text
    })
  }, [finished, start])

  return (
    <div className="clock">
      <span ref={ref}>{text}</span>
    </div>
  )
}
