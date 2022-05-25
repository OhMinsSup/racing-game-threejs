import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
// Buffer-geometry short-cut for cylinder.
import { useCylinder } from '@react-three/cannon'

import { useStore } from '../../store'

import type { CylinderProps } from '@react-three/cannon'
import type { Mesh, MeshStandardMaterial, Object3D } from 'three'
import type { GLTF } from 'three-stdlib'

interface WheelGLTF extends GLTF {
  nodes: {
    /* Manually typed meshes names */
    Mesh_14: Mesh
    Mesh_14_1: Mesh
  }
  materials: {
    /* Manually typed meshes names */
    'Material.002': MeshStandardMaterial
    'Material.009': MeshStandardMaterial
  }
}

interface WheelProps extends CylinderProps {
  leftSide?: boolean
}

export const Wheel = forwardRef<Object3D, WheelProps>(({ leftSide, ...props }, ref) => {
  // 휠의 radius 정보를 얻어온다.
  const { radius } = useStore((state) => state.wheelInfo)
  // useLoader 및 GLTFLoader를 사용하는 편리한 후크이며
  // 기본적으로 압축된 모델에 대해서만 로드되는 CDN 로드 draco 바이너리
  const { nodes, materials } = useGLTF('/models/wheel-draco.glb') as WheelGLTF
  // 휠의 크기를 구한다.
  const scale = radius / 0.34

  // 실린더용 버퍼 형상(BufferGeometry) 바로 가기.
  // https://threejs.org/docs/index.html#api/en/core/BufferGeometry
  // https://github.com/pmndrs/use-cannon#readme
  useCylinder(
    () => ({
      mass: 50,
      type: 'Kinematic',
      material: 'wheel',
      collisionFilterGroup: 0,
      rotation: [Math.PI / 2, 0, Math.PI / 3],
      args: [radius, radius, 0.5, 16],
      ...props,
    }),
    ref,
    [radius],
  )
  return (
    <>
      {/* @ts-ignore */}
      <group ref={ref} dispose={null}>
        <group scale={scale}>
          <group scale={leftSide ? -1 : 1}>
            <mesh castShadow geometry={nodes.Mesh_14.geometry} material={materials['Material.002']} />
            <mesh castShadow geometry={nodes.Mesh_14_1.geometry} material={materials['Material.009']} />
          </group>
        </group>
      </group>
    </>
  )
})
