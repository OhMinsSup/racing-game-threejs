import { useEffect, useRef } from 'react'
import { PositionalAudio } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { mutation } from '@/libs/cache'
import { useSettingValue } from '@/atoms/setting'

import type { PositionalAudio as PositionalAudioImpl } from 'three'

export const BrakeAudio = () => {
  const ref = useRef<PositionalAudioImpl>(null)
  const { brake, sound } = useSettingValue()

  useFrame(() => {
    if (mutation.speed <= 10 && ref.current?.isPlaying) ref.current.stop()
  })

  useEffect(() => {
    if (ref.current && sound) {
      const isBraking = brake && mutation.speed > 10
      if (isBraking && !ref.current.isPlaying) ref.current.play()
      if (!isBraking && ref.current.isPlaying) ref.current.stop()
    }
    return () => {
      if (ref.current && ref.current.isPlaying) ref.current.stop()
    }
  }, [brake, sound])

  return <PositionalAudio ref={ref} url="/sounds/tire-brake.mp3" distance={10} />
}
