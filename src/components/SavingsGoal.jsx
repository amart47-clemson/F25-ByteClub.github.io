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
        <h2 className="h">Savings Goal — Vacation Fund</h2>

        {/* Colored progress bar */}
        <div className={`progress ${status}`} style={{ margin: '12px 0', height: 12 }}>
          <div className="bar" style={{ width: `${pct}%` }} />
        </div>

        <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
          <strong>{pct}% complete</strong>
          <span>— ${saved.toFixed(0)} / ${goal.toFixed(0)}</span>

          {/* Show over or remaining amount */}
          <span style={{ marginLeft:'auto', color:'var(--muted)', fontSize:13 }}>
            {remaining >= 0
              ? `$${remaining.toFixed(0)} left`
              : `Over by $${Math.abs(remaining).toFixed(0)}`}
          </span>
        </div>

        {/* Add savings buttons */}
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => add(50)}>+ $50</button>
          <button className="btn" onClick={() => add(100)}>+ $100</button>
          <button className="btn" onClick={() => add(250)}>+ $250</button>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="badge">Goal Timeline (Placeholder)</div>
        </div>
      </div>

      {/* Recent contributions */}
      <div className="card" style={{ gridColumn: 'span 4' }}>
        <h3 className="h">Recent Contributions</h3>
        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #eee' }}>
            <div>Auto-transfer</div><div>10/10</div><div>$250</div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #eee' }}>
            <div>Manual deposit</div><div>10/05</div><div>$100</div>
          </div>
        </div>
      </div>
    </div>
  )
}