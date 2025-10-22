import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'

export default function PrivacySettings(){
  const { state, setState } = useContext(AppContext)

  const toggle = () => setState(prev => ({ ...prev, privacy: !prev.privacy }))

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 12'}}>
        <h2 className="h">Privacy Mode & Settings</h2>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <button className="btn" onClick={toggle}>
            Privacy Mode: {state.privacy ? 'On' : 'Off'}
          </button>
          <div className="badge">Blurs amounts; shows status only</div>
        </div>
      </div>
      <div className="card" style={{gridColumn:'span 6'}}>
        <h3 className="h">Bank Link</h3>
        <div>Mock: Connected</div>
        <div className="badge">Simulated connection for M3</div>
      </div>
      <div className="card" style={{gridColumn:'span 6'}}>
        <h3 className="h">Companion App Pairing</h3>
        <div>QR Code Placeholder</div>
      </div>
    </div>
  )
}