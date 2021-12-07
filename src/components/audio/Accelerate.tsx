import { useEffect, useRef } from 'react'
import { PositionalAudio } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

import { useVehicleValue } from '@/atoms/vehicleState'
import { mutation } from '@/libs/cache'

import type { PositionalAudio as PositionalAudioImpl } from 'three'

// 구성 요소를 60fps로 다시 렌더링하는 반응 모션과 같은 라이브러리
const { lerp } = MathUtils

const AccelerateAudio = () => {
  const ref = useRef<PositionalAudioImpl>(null)
  const { maxSpeed } = useVehicleValue()

  const getVolume = () => (2 * mutation.speed) / maxSpeed

  // useFrame은 Fiber 렌더 루프의 모든 프레임에서 코드를 실행할 수 있는 Fiber 후크입니다.
  // 이것은 많은 용도를 가질 수 있지만 우리는 그것을 사용하여 애니메이션을 만드는 데 집중할 것입니다.
  useFrame((_, delta) => {
    // 이 루프는 애니메이션의 기본 빌딩 블록이며 useFrame에 전달하는 콜백은 매 프레임마다 실행되며 Fiber 장면의 상태를 포함하는 객체가 전달
    ref.current?.setVolume(getVolume())
    ref.current?.setPlaybackRate(lerp(ref.current.playbackRate, mutation.rpmTarget + 0.5, delta * 10))
  })

  useEffect(() => {
    if (ref.current && !ref.current.isPlaying) {
      ref.current.setVolume(getVolume())
      ref.current.play()
    }
    return () => {
      if (ref.current && ref.current.isPlaying) ref.current.stop()
    }
  }, [])

  // THREE.PositionalAudio의 래퍼입니다. 이것을 그룹이나 메쉬에 추가하여 카메라가 가까이 왔을 때 재생되는 사운드에 연결
  return <PositionalAudio ref={ref} url="/sounds/accelerate.mp3" loop distance={5} />
}

export default AccelerateAudio
