import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import SpendChart from './SpendChart.jsx'
import { getCategoryIcon } from '../utils/categoryIcons.js'
import QRSection from '../QRSection.jsx'

function ratio(spent, limit) {
  if (!limit || limit === 0) return 0
  return spent / limit
}

function statusClass(pct) {
  if (pct >= 90) return 'danger'   // Red 
  if (pct >= 75) return 'warn'     // Yellow 
  return 'ok'                      // Green 
}

export default function Dashboard() {
  const { state } = useContext(AppContext) || {}
  const navigate = useNavigate()

  const budgets = state?.budgets || {}
  const privacy = state?.privacy || false

  // build alerts safely to avoid crashes
  const alerts = Object.entries(budgets)
    .map(([k, v]) => {
      const spent = v?.spent ?? 0
      const limit = v?.limit ?? 0
      const r = ratio(spent, limit)
      if (r > 1) return { type: 'danger', text: `${k} over budget` }
      if (r >= 0.75) return { type: 'warn', text: `${k} nearing limit` }
      return null
    })
    .filter(Boolean)

  return (
    <div className="grid">
      {/* LEFT SIDE: budget list */}
      <div className="card" style={{ gridColumn: 'span 8' }}>
        <h2 className="h" style={{ marginBottom: 20 }}>Household Dashboard — Week of Oct 12</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(budgets).map(([name, b]) => {
            const spent = b?.spent ?? 0
            const limit = b?.limit ?? 0
            const pct = limit === 0
              ? 0
              : Math.min(100, Math.round((spent / limit) * 100))

            return (
              <div
                key={name}
                className="card"
                style={{ 
                  marginBottom: 0, 
                  cursor: 'pointer',
                  padding: '16px 18px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => navigate(`/frame/category/${encodeURIComponent(name)}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9fafb'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <div className="kpi" style={{ marginBottom: 10 }}>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '20px' }}>{getCategoryIcon(name)}</span>
                    {name}
                  </strong>
                  <span>
                    {privacy
                      ? 'On Track / Near Limit'
                      : `$${spent.toFixed(0)} / $${limit.toFixed(0)}`}
                  </span>
                </div>

                <div className={`progress ${statusClass(pct)}`} style={{ margin: '6px 0' }}>
                  <div className="bar" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="footer" style={{ marginTop: 20, paddingTop: 16 }}>
          Last sync: 2m ago • Source: (Mock) Bank Link
        </div>
      </div>

      {/* RIGHT SIDE: alerts + breakdown */}
      <div className="card" style={{ gridColumn: 'span 4' }}>
        <h3 className="h2" style={{ marginBottom: 16 }}>Alerts</h3>

        <div style={{ marginBottom: 20 }}>
          {alerts.length === 0 && (
            <div className="alert ok" style={{ marginBottom: 0 }}>
              <span style={{ fontSize: '18px' }}>✓</span>
              <span>All categories on track</span>
            </div>
          )}

          {alerts.map((a, i) => (
            <div key={i} className={`alert ${a.type}`} style={{ marginBottom: i < alerts.length - 1 ? 12 : 0 }}>
              <span style={{ fontSize: '18px' }}>
                {a.type === 'danger' ? '⚠️' : a.type === 'warn' ? '⚡' : '✓'}
              </span>
              <span>{a.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <h4 className="h3" style={{ marginBottom: 14 }}>Spend Breakdown</h4>
          <SpendChart />
        </div>

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <h4 className="h3" style={{ marginBottom: 14 }}>Quick Access</h4>
          <QRSection 
            label="Scan to add expenses"
            path="/frame/add"
          />
        </div>
      </div>
    </div>
  )
}