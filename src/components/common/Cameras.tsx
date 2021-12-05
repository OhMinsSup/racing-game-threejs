import React from 'react'
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { useHelpersValue } from '@/atoms/configState'

const Cameras: React.FC = () => {
  const { camera, editor } = useHelpersValue()
  // Registers it as the default camera system-wide (default=false)
  const perspectiveValue = !editor && camera !== 'BIRD_EYE'
  const orthographicValue = !editor && camera === 'BIRD_EYE'

  return (
    <>
      {/* 
        이 투영 모드는 사람의 눈으로 보는 방식을 모방하여 설계되었습니다. 3D 장면을 렌더링하는데 가장 널리 쓰이는 투영 모드입니다. 
        https://threejs.org/docs/#api/ko/cameras/PerspectiveCamera
      */}
      <PerspectiveCamera makeDefault={perspectiveValue} fov={75} rotation={[0, Math.PI, 0]} position={[0, 10, -20]} />
      {/* 
        이 투영 모드에서는, 렌더링된 이미지에서 객체의 크기는 카메라와의 거리에 관계없이 일정하게 유지됩니다. 
        https://threejs.org/docs/#api/en/cameras/OrthographicCamera
      */}
      <OrthographicCamera makeDefault={orthographicValue} position={[0, 100, 0]} rotation={[(-1 * Math.PI) / 2, 0, Math.PI]} zoom={15} />
    </>
  )
}

export default Cameras
