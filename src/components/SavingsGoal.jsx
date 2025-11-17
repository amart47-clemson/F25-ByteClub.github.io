import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'

function goalStatus(pct) {
  if (pct < 50) return 'danger'   
  if (pct < 75) return 'warn'     
  return 'ok'                     
}

export default function SavingsGoal() {
  const { state, setState } = useContext(AppContext)

  // Make sure values are numbers to avoid any string issues
  const goal = Number(state.savings.goal) || 0
  const saved = Number(state.savings.saved) || 0

  // Calculate percentages safely
  const rawPct = goal > 0 ? (saved / goal) * 100 : 0
  const pct = Math.min(100, Math.round(rawPct))  
  const status = goalStatus(rawPct)

  const remaining = goal - saved 

  // Add savings
  const add = (amt) => {
    setState(prev => ({
      ...prev,
      savings: {
        ...prev.savings,
        saved: Number(prev.savings.saved) + amt
      }
    }))
  }

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: 'span 8' }}>
        <h2 className="h" style={{ marginBottom: 24 }}>Savings Goal — Vacation Fund</h2>

        {/* Colored progress bar */}
        <div className={`progress ${status}`} style={{ marginBottom: 16, height: 14 }}>
          <div className="bar" style={{ width: `${pct}%` }} />
        </div>

        <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom: 24, flexWrap: 'wrap' }}>
          <strong style={{ fontSize: 16 }}>{pct}% complete</strong>
          <span style={{ fontSize: 15, color: 'var(--text)' }}>— ${saved.toFixed(0)} / ${goal.toFixed(0)}</span>

          {/* Show over or remaining amount */}
          <span style={{ marginLeft:'auto', color:'var(--muted)', fontSize:14, fontWeight: 500 }}>
            {remaining >= 0
              ? `$${remaining.toFixed(0)} left`
              : `Over by $${Math.abs(remaining).toFixed(0)}`}
          </span>
        </div>

        {/* Add savings buttons */}
        <div style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => add(50)} style={{ minWidth: 100 }}>+ $50</button>
          <button className="btn" onClick={() => add(100)} style={{ minWidth: 100 }}>+ $100</button>
          <button className="btn" onClick={() => add(250)} style={{ minWidth: 100 }}>+ $250</button>
        </div>

        <div className="card" style={{ marginTop: 24, padding: '16px 20px' }}>
          <div className="badge" style={{ fontSize: 13 }}>Goal Timeline (Placeholder)</div>
        </div>
      </div>

      {/* Recent contributions */}
      <div className="card" style={{ gridColumn: 'span 4' }}>
        <h3 className="h2" style={{ marginBottom: 20 }}>Recent Contributions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center', padding:'12px 0', borderBottom:'1px solid var(--border)', fontSize: 14 }}>
            <div style={{ fontWeight: 500 }}>Auto-transfer</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>10/10</div>
            <div style={{ fontWeight: 600 }}>$250</div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems: 'center', padding:'12px 0', fontSize: 14 }}>
            <div style={{ fontWeight: 500 }}>Manual deposit</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>10/05</div>
            <div style={{ fontWeight: 600 }}>$100</div>
          </div>
        </div>
      </div>
    </div>
  )
}