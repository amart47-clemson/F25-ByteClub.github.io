import React, { useContext, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../App.jsx'

export default function CategoryDetail() {
  const { name } = useParams()          // e.g. "Groceries"
  const navigate = useNavigate()
  const { state } = useContext(AppContext) || {}

  // safety guards in case state is undefined for some reason
  const budgets = state?.budgets || {}
  const txns = state?.transactions || []

  // get this category's budget data
  const categoryBudget = budgets[name]

  // get recent transactions for this category
  const relatedTxns = useMemo(() => {
    if (!Array.isArray(txns)) return []
    return txns.filter(txn => txn.category === name)
  }, [txns, name])

  // if this category doesn't exist, show a friendly error instead of crashing
  if (!categoryBudget) {
    return (
      <div className="container" style={{ paddingTop: '24px' }}>
        <div className="card" style={{ maxWidth: 600 }}>
          <button
            className="btn"
            onClick={() => navigate('/')}
            style={{ fontSize: 14, marginBottom: 16, background: '#fff' }}
          >
            ← Back to Dashboard
          </button>

          <h2 className="h" style={{ marginBottom: 8 }}>Category Not Found</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>
            We couldn’t find a budget category called “{name}”.
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            This usually means the dashboard doesn’t have data for that category name.
          </p>
        </div>
      </div>
    )
  }

  // compute progress info
  const spent = categoryBudget.spent ?? 0
  const limit = categoryBudget.limit ?? 0
  const pct = limit === 0 ? 0 : Math.min(100, Math.round((spent / limit) * 100))
  const remaining = limit - spent

  const statusColor =
    pct >= 100
      ? 'var(--danger)'
      : pct >= 90
      ? 'var(--warn)'
      : 'var(--ok)'

  return (
    <div className="container" style={{ paddingTop: '24px' }}>
      <div className="card" style={{ maxWidth: 800, marginBottom: 24 }}>
        <button
          className="btn"
          onClick={() => navigate('/')}
          style={{ fontSize: 14, marginBottom: 16, background: '#fff' }}
        >
          ← Back to Dashboard
        </button>

        <h2 className="h" style={{ marginBottom: 4 }}>
          {name} Overview
        </h2>
        <div
          style={{
            fontSize: 14,
            color: 'var(--muted)',
            marginBottom: 16,
          }}
        >
          This shows how {name} is performing against its budget this week,
          plus your recent activity.
        </div>

        {/* Budget Summary Card */}
        <div
          className="card"
          style={{
            border: '1px solid var(--border)',
            marginBottom: 16,
          }}
        >
          <div className="kpi" style={{ fontSize: 14 }}>
            <strong>{name} Budget</strong>
            <span>
              ${spent.toFixed(0)} / ${limit.toFixed(0)}
            </span>
          </div>

          <div className="progress" style={{ height: 10 }}>
            <div
              style={{
                width: pct + '%',
                background: statusColor,
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              color: 'var(--muted)',
              marginTop: 6,
            }}
          >
            <span>{pct}% used</span>
            <span>
              {remaining >= 0
                ? `$${remaining.toFixed(0)} left`
                : `$${Math.abs(remaining).toFixed(0)} over`}
            </span>
          </div>
        </div>

        {/* Transactions List */}
        <div
          className="card"
          style={{ border: '1px solid var(--border)', marginBottom: 16 }}
        >
          <div className="h" style={{ fontSize: 14, marginBottom: 8 }}>
            Recent {name} Activity
          </div>

          {relatedTxns.length === 0 ? (
            <div
              style={{
                fontSize: 13,
                color: 'var(--muted)',
                fontStyle: 'italic',
              }}
            >
              No recent transactions logged for {name}.
            </div>
          ) : (
            <div style={{ fontSize: 13 }}>
              {relatedTxns.map(txn => (
                <div
                  key={txn.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: 'var(--text)',
                      }}
                    >
                      {txn.merchant || 'Merchant'}
                    </div>
                    <div
                      style={{
                        color: 'var(--muted)',
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {txn.date || '—'}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    ${txn.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Future controls */}
        <div
          className="footer"
          style={{
            fontSize: 12,
            color: 'var(--muted)',
          }}
        >
          Coming soon: edit limit, pause spending alerts, or set goals just
          for {name}.
        </div>
      </div>
    </div>
  )
}