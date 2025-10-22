import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App.jsx'

function ratio(spent, limit){ return limit === 0 ? 0 : spent/limit }

export default function Dashboard(){
  const { state } = useContext(AppContext)
  const navigate = useNavigate()
  const { budgets, privacy } = state

  const alerts = Object.entries(budgets).map(([k,v]) => {
    const r = ratio(v.spent, v.limit)
    if (r > 1) return { type:'danger', text:`${k} over budget` }
    if (r >= 0.75) return { type:'warn', text:`${k} nearing limit` }
    return null
  }).filter(Boolean)

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 8'}}>
        <h2 className="h">Household Dashboard — Week of Oct 12</h2>
        {Object.entries(budgets).map(([name, b]) => {
          const r = ratio(b.spent, b.limit)
          const pct = Math.min(100, Math.round(r*100))
          return (
            <div key={name} className="card" style={{marginBottom:12, cursor:'pointer'}} onClick={() => navigate(`/category/${encodeURIComponent(name)}`)}>
              <div className="kpi">
                <strong>{name}</strong>
                <span>{privacy ? 'On Track / Near Limit' : `$${b.spent.toFixed(0)} / $${b.limit.toFixed(0)}`}</span>
              </div>
              <div className="progress"><div style={{width:`${pct}%`}}/></div>
            </div>
          )
        })}
        <div className="footer">
          Last sync: 2m ago • Source: (Mock) Bank Link
        </div>
      </div>
      <div className="card" style={{gridColumn:'span 4'}}>
        <h3 className="h">Alerts</h3>
        {alerts.length === 0 && <div className="alert ok">All categories on track</div>}
        {alerts.map((a, i) => (
          <div key={i} className={`alert ${a.type}`}>
            {a.text}
          </div>
        ))}
        <div className="card" style={{marginTop:12}}>
          <h4 className="h">Spend Breakdown</h4>
          <div className="badge">Chart Placeholder</div>
        </div>
      </div>
    </div>
  )
}