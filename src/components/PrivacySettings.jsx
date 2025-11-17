import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'
import QRSection from '../QRSection.jsx'

export default function PrivacySettings(){
  const { state, setState } = useContext(AppContext)

  const toggle = () => setState(prev => ({ ...prev, privacy: !prev.privacy }))

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 12', marginBottom: 20}}>
        <h2 className="h" style={{ marginBottom: 20 }}>Privacy Mode & Settings</h2>
        <div style={{display:'flex', alignItems:'center', gap:16, flexWrap: 'wrap'}}>
          <button className="btn" onClick={toggle} style={{ minWidth: 180 }}>
            Privacy Mode: {state.privacy ? 'On' : 'Off'}
          </button>
          <div className="badge" style={{ fontSize: 13, padding: '6px 12px' }}>Blurs amounts; shows status only</div>
        </div>
      </div>
      <div className="card" style={{gridColumn:'span 6'}}>
        <h3 className="h2" style={{ marginBottom: 16 }}>Bank Link</h3>
        <div style={{ fontSize: 15, marginBottom: 12, fontWeight: 500 }}>Mock: Connected</div>
        <div className="badge" style={{ fontSize: 13, padding: '6px 12px' }}>Simulated connection for M3</div>
      </div>
      <div className="card" style={{gridColumn:'span 6'}}>
        <h3 className="h2" style={{ marginBottom: 16 }}>Companion App Pairing</h3>
        <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
          Scan this QR code with your phone to quickly access the expense tracker on mobile.
        </div>
        <QRSection 
          label="Scan to add expenses"
          path="/frame/add"
        />
      </div>
    </div>
  )
}