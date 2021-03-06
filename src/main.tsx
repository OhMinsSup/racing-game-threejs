import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
//  react-three-fiber에 유용한 도우미 함수들을 사용할 수 있도록 확장합니다.
import { useGLTF, useTexture, useProgress } from '@react-three/drei'
import 'inter-ui'
import './styles.css'

import type { Dispatch, SetStateAction } from 'react'

import { useStore } from './store'
import { setupSession, unAuthenticateUser } from './data'
import { Keys } from './ui/Help'
import { Auth } from './ui/Auth'

const App = React.lazy(() => import('./App'))

/**
 * Texture - 표면에 적용하거나 반사 또는 굴절 맵으로 적용할 텍스처를 만듭니다.
 */
useTexture.preload('/textures/heightmap_1024.png')

// FIXME: this is a hack to get the gltf to load before the app starts
// https://github.com/pmndrs/drei/issues/189 - this is a bug in drei
const DECODERS = 'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'

/**
 * Pre-loading assets
 * 모델이 구성 요소 트리에 탑재되기 전에 미리 로드할 수 있도록 전역 공간에 자산을 미리 로드할 수 있습니다.
 * useLoader.preload(GLTFLoader, '/model.glb')
 * glTF(GL 전송 형식)는 3D 콘텐츠의 효율적인 전달 및 로드를 위한 개방형 형식 사양
 */
useGLTF.preload('/models/track-draco.glb', DECODERS)
useGLTF.preload('/models/chassis-draco.glb', DECODERS)
useGLTF.preload('/models/wheel-draco.glb', DECODERS)

// react 18에서 제공하는 동시성 모드를 사용하기 위해서 동시성 모드를 설정합니다.
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

function Ready({ setReady }: { setReady: Dispatch<SetStateAction<boolean>> }) {
  useEffect(() => {
    console.log('ready')
    return () => {
      console.log('unmounting')
      setReady(true)
    }
  }, [])

  console.log('rendering')

  return null
}

const Main = () => {
  const [ready, setReady] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [session, set] = useStore((state) => [state.session, state.set])
  const { progress } = useProgress()

  useEffect(() => {
    if (clicked && ready) set({ ready: true })
  }, [ready, clicked])

  useEffect(() => {
    setupSession(set)
  }, [])

  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>
        <App />
      </Suspense>
      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${clicked && 'clicked'}`}>
        <div className="stack">
          <div className="intro-keys">
            <Keys style={{ paddingBottom: 20 }} />
            <a
              className="continue-link"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                ready && setClicked(true)
              }}
            >
              {!ready ? <div>loading {progress.toFixed()} %</div> : 'Click to continue'}
            </a>
          </div>
          {session?.user?.aud !== 'authenticated' ? (
            <Auth />
          ) : (
            <div>
              Hello {session.user.user_metadata.full_name}
              <button className="logout" onClick={unAuthenticateUser}>
                Logout
              </button>{' '}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

ReactDOM.createRoot(rootElement).render(<Main />)
