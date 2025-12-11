import React, { useEffect, useRef } from 'react'
import { createEngineScene } from './game/engine'
import { PlayerController } from './game/playerController'
import HUD from './ui/HUD'
import PauseMenu from './ui/PauseMenu'
import { useGameStore } from './state/gameStore'

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const setPaused = useGameStore((s) => s.setPaused)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.warn('Canvas ref is null')
      return
    }
    let playerController: PlayerController | null = null
    let sceneDestroy: (() => void) | null = null

    createEngineScene(canvas).then(({ scene }) => {
      const cam = scene.activeCamera
      if (cam) {
        playerController = new PlayerController(cam)
        scene.onBeforeRenderObservable.add(() => playerController?.update())
      }
    })

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setPaused(true)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (sceneDestroy) sceneDestroy()
    }
  }, [setPaused])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#222' }}>
      <canvas ref={canvasRef} id="renderCanvas" style={{ width: '100%', height: '100%', display: 'block' }} />
      <HUD />
      <PauseMenu />
    </div>
  )
}

export default App
