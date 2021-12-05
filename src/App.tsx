import { useState } from 'react'
import { Layers } from 'three'
import { Canvas } from '@react-three/fiber'
import { Physics, Debug } from '@react-three/cannon'
import { Sky, Environment, PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei'

import type { DirectionalLight } from 'three'

import { HideMouse, Keyboard } from './controls'
import { Cameras } from './effects'
import { Ramp, Track, Vehicle, Goal, Train, Heightmap } from './models'
import { angularVelocity, levelLayer, position, rotation, useStore } from './store'
import { Checkpoint, Clock, Speed, Minimap, Intro, Help, Editor, LeaderBoard, Finished } from './ui'
import { useToggle } from './useToggle'

const layers = new Layers()
layers.enable(levelLayer)

/**
 *  Three.js는 웹페이지에 3D 객체를 쉽게 렌더링하도록 도와주는 자바스크립트 3D 라이브러리입니다.
 *  대부분의 경우 Three.js는 3D 객체를 렌더링하는 데 WebGL을 사용합니다.
 *  때문에 Three.js = WebGL이라고 착각하기 쉽다.
 *  하지만 WebGL은 점, 선, 삼각형만을 그리는 아주 단순한 시스템입니다.
 *  WebGL로 직접 무언가를 만들려면 상당히 많은 양의 코드를 짜야 하죠.
 *  만약 씬(scenes), 광원, 그림자, 물체, 텍스처 등 3차원 세계를 구현한다면 머리도 꽤 복잡하겠거니와 코드 자체도 굉장히 복잡할 겁니다.
 *  Three.js는 이런 3D 요소들의 처리를 도와 직관적인 코드를 짤 수 있도록 해줍니다.
 *  @exmaple - https://threejs.org/manual/#ko/fundamentals
 */

export function App() {
  const [light, setLight] = useState<DirectionalLight>()
  const [actions, dpr, editor, shadows] = useStore((s) => [s.actions, s.dpr, s.editor, s.shadows])
  const { onCheckpoint, onFinish, onStart } = actions

  const ToggledCheckpoint = useToggle(Checkpoint, 'checkpoint')
  const ToggledDebug = useToggle(Debug, 'debug')
  const ToggledEditor = useToggle(Editor, 'editor')
  const ToggledFinished = useToggle(Finished, 'finished')
  const ToggledMap = useToggle(Minimap, 'map')
  const ToggledOrbitControls = useToggle(OrbitControls, 'editor')
  const ToggledStats = useToggle(Stats, 'stats')

  return (
    <Intro>
      {/* 먼저 Renderer가 있습니다. Three.js의 핵심 객체입니다. Renderer는 Scene과 Camera 객체를 넘겨 받아 카메라의 절두체(frustum) 안 3D 씬의 일부를 평면(2차원) 이미지로 렌더링합니다. */}
      {/* Canvas - Canvas 객체는 React Three Fiber Scene을 정의하기 시작하는 곳입니다. */}
      {/* Canvas에는 기본적으로 gl이라는 props가 있는데 해당 props는 Renderer를 콜백으로 넘겨준다. */}
      <Canvas key={`${dpr}${shadows}`} mode="concurrent" dpr={[1, dpr]} shadows={shadows} camera={{ position: [0, 5, 15], fov: 50 }}>
        {/* field of view(시야각) 거리에 따라 선형적으로 밀도가 높아집니다. */}
        <fog attach="fog" args={['white', 0, 500]} />
        <Sky sunPosition={[100, 10, 100]} distance={1000} />
        <ambientLight layers={layers} intensity={0.1} />
        {/* 광원을 추가해 그림자가 지도록 설정 */}
        {/* 
          위치(position)와 목표(target) 속성이 있습니다. 
          기본값은 0, 0, 0 입니다. 먼저 position 카메라보다 위치이동. 
          target은 기본값 0, 0, 0 (공간의 중앙을 비추도록) 어떤 값을 기준으로 보여줄지.
          여기서 중요한건 material 이다. MeshBasicMaterial은 광원에 반응하지 않는다. 광원에 반응하는 MeshPhongMaterial로 사용
        */}
        <directionalLight
          ref={setLight}
          layers={layers}
          position={[0, 50, 150]}
          intensity={1}
          shadow-bias={-0.001}
          shadow-mapSize={[4096, 4096]}
          shadow-camera-left={-150}
          shadow-camera-right={150}
          shadow-camera-top={150}
          shadow-camera-bottom={-150}
          castShadow
        />
        {/* 원근 카메라 */}
        {/* 
          fov는 field of view(시야각)의 줄임말입니다. 예제의 경우 수직면 75도로 설정했습니다. 
          알아둬야 할 건 Three.js의 대부분이 각도 단위로 호도(radians)를 사용하는데, 원근 카메라만 특이하게 도(degrees)를 인자로 받는다는 점입니다.
          aspect는 canvas의 가로 세로 비율입니다. 기본 설정으로 canvas의 크기는 300x150이니 비율도 300/150, 2로 설정했습니다.
          near와 far는 카메라 앞에 렌더링되는 공간 범위를 지정하는 요소입니다. 이 공간 바깥에 있는 요소는 화면에서 잘려나가며, 렌더링되지 않을 것입니다
        */}
        <PerspectiveCamera makeDefault={editor} fov={75} position={[0, 20, 20]} />
        <Physics broadphase="SAP" defaultContactMaterial={{ contactEquationRelaxation: 4, friction: 1e-3 }} allowSleep>
          <ToggledDebug scale={1.0001} color="white">
            <Vehicle angularVelocity={[...angularVelocity]} position={[...position]} rotation={[...rotation]}>
              {light && <primitive object={light.target} />}
              <Cameras />
            </Vehicle>
            <Train />
            <Ramp args={[30, 6, 8]} position={[2, -1, 168.55]} rotation={[0, 0.49, Math.PI / 15]} />
            <Heightmap elementSize={0.5085} position={[327 - 66.5, -3.3, -473 + 213]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
            <Goal args={[0.001, 10, 18]} onCollideBegin={onStart} rotation={[0, 0.55, 0]} position={[-27, 1, 180]} />
            <Goal args={[0.001, 10, 18]} onCollideBegin={onFinish} rotation={[0, -1.2, 0]} position={[-104, 1, -189]} />
            <Goal args={[0.001, 10, 18]} onCollideBegin={onCheckpoint} rotation={[0, -0.5, 0]} position={[-50, 1, -5]} />
          </ToggledDebug>
        </Physics>
        <Track />
        <Environment files="textures/dikhololo_night_1k.hdr" />
        <ToggledMap />
        <ToggledOrbitControls />
      </Canvas>
      <Clock />
      <ToggledEditor />
      <ToggledFinished />
      <Help />
      <Speed />
      <ToggledStats />
      <ToggledCheckpoint />
      <LeaderBoard />
      <HideMouse />
      <Keyboard />
    </Intro>
  )
}
