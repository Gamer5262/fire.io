import React from 'react'
import { useGameStore } from '../state/gameStore'

export const PauseMenu: React.FC = () => {
  const isPaused = useGameStore((s) => s.isPaused)
  const setPaused = useGameStore((s) => s.setPaused)
  if (!isPaused) return null
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', color: 'white' }}>
      <div style={{ padding: 20, borderRadius: 8, background: '#222' }}>
        <h2>Paused</h2>
        <button onClick={() => setPaused(false)}>Resume</button>
      </div>
    </div>
  )
}

export default PauseMenu
