import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'

export default function SpendChart() {
  const { state } = useContext(AppContext)

  // Turn budgets object into an array we can map over
  const rows = Object.entries(state.budgets).map(([name, data]) => {
    const pct = data.limit === 0 ? 0 : (data.spent / data.limit) * 100
    return {
      name,
      spent: data.spent,
      limit: data.limit,
      pct: Math.min(pct, 100) 
    }
  })

  return (
    <div className="spend-chart-root">
      {rows.map(row => (
        <div key={row.name} className="spend-row">
          <div className="spend-row-header">
            <span className="spend-name">{row.name}</span>
            <span className="spend-amt">
              ${row.spent} / ${row.limit}
            </span>
          </div>

          <div className="spend-bar-outer">
            <div
              className={
                'spend-bar-inner ' +
                (row.pct >= 90 ? 'danger' :
                 row.pct >= 75 ? 'warn' :
                 'ok')
              }
              style={{ width: row.pct + '%' }}
            />
          </div>

          <div className="spend-bar-label">
            {Math.round(row.pct)}%
            {row.pct > 100 ? ' (over)' : ''}
          </div>
        </div>
      ))}
    </div>
  )
}