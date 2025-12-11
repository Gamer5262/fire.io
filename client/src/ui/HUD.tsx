import React from 'react'
import { useGameStore } from '../state/gameStore'

export const HUD: React.FC = () => {
  const health = useGameStore((s) => s.health)
  const ammo = useGameStore((s) => s.ammo)
  return (
    <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', fontFamily: 'sans-serif' }}>
      <div>Health: {health}</div>
      <div>Ammo: {ammo}</div>
      <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
        <div style={{ width: 2, height: 20, background: 'white' }} />
        <div style={{ height: 2, width: 20, background: 'white', transform: 'translateY(-10px)' }} />
      </div>
    </div>
  )
}

export default HUD
