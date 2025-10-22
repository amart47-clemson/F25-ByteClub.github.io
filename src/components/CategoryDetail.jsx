import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../App.jsx'

export default function CategoryDetail(){
  const { name } = useParams()
  const navigate = useNavigate()
  const { state, setState } = useContext(AppContext)
  const budgets = state.budgets || {}
  const detail = budgets[name] || {limit:0, spent:0}
  const tx = (state.transactions || []).filter(t => t.category === name)

  const adjust = (delta) => {
    setState(prev => ({
      ...prev,
      budgets: {
        ...prev.budgets,
        [name]: { ...prev.budgets[name], limit: Math.max(0, prev.budgets[name].limit + delta) }
      }
    }))
  }

  const percent = detail.limit ? Math.min(100, Math.round((detail.spent/detail.limit)*100)) : 0

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 8'}}>
        <h2 className="h">Category Detail — {name}</h2>
        <div className="card" style={{marginBottom:12}}>
          <div className="badge">Weekly Trend (Placeholder)</div>
        </div>
        <h3 className="h">Recent Transactions</h3>
        <div className="card">
          {(tx.length===0) && <div>No transactions yet.</div>}
          {tx.map(t => (
            <div key={t.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #eee'}}>
              <div>{t.merchant}</div>
              <div>{t.date}</div>
              <div>${t.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{gridColumn:'span 4'}}>
        <h3 className="h">Monthly Limit</h3>
        <div style={{fontSize:18, marginBottom:8}}>${detail.spent.toFixed(0)} / ${detail.limit.toFixed(0)}</div>
        <div className="progress" style={{marginBottom:12}}>
          <div style={{width: `${percent}%`}} />
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={() => adjust(25)}>+ $25</button>
          <button className="btn" onClick={() => adjust(-25)} disabled={detail.limit<=25}>- $25</button>
        </div>
        <div style={{marginTop:16}}>
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  )
}