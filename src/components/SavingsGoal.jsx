import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'

export default function SavingsGoal(){
  const { state, setState } = useContext(AppContext)
  const { goal, saved } = state.savings

  const pct = Math.min(100, Math.round((saved/goal)*100))

  const add = (amt) => {
    setState(prev => ({
      ...prev,
      savings: { ...prev.savings, saved: prev.savings.saved + amt }
    }))
  }

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 8'}}>
        <h2 className="h">Savings Goal — Vacation Fund</h2>
        <div className="progress" style={{margin:'12px 0'}}>
          <div style={{width:`${pct}%`}} />
        </div>
        <div><strong>{pct}% complete</strong> — ${saved.toFixed(0)} / ${goal.toFixed(0)}</div>
        <div style={{marginTop:12, display:'flex', gap:8}}>
          <button className="btn" onClick={() => add(50)}>+ $50</button>
          <button className="btn" onClick={() => add(100)}>+ $100</button>
          <button className="btn" onClick={() => add(250)}>+ $250</button>
        </div>
        <div className="card" style={{marginTop:16}}>
          <div className="badge">Goal Timeline (Placeholder)</div>
        </div>
      </div>
      <div className="card" style={{gridColumn:'span 4'}}>
        <h3 className="h">Recent Contributions</h3>
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #eee'}}>
            <div>Auto-transfer</div><div>10/10</div><div>$250</div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #eee'}}>
            <div>Manual deposit</div><div>10/05</div><div>$100</div>
          </div>
        </div>
      </div>
    </div>
  )
}