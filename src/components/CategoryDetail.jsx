import React, { useContext, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../App.jsx'
import { getCategoryIcon } from '../utils/categoryIcons.js'

// map % used -> status class for colored bars
function statusClass(pct) {
  if (pct > 90) return 'danger'  // red
  if (pct >= 75) return 'warn'    // yellow
  return 'ok'                     // green
}

export default function CategoryDetail() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { state, setState } = useContext(AppContext) || {}
  const [reclassifyingId, setReclassifyingId] = useState(null)

  const budgets = state?.budgets || {}
  const txns = state?.transactions || []

  const categoryBudget = budgets[name]

  const relatedTxns = useMemo(() => {
    if (!Array.isArray(txns)) return []
    return txns.filter(txn => txn.category === name)
  }, [txns, name])

  // Handle reclassification
  function handleReclassify(txnId, newCategory) {
    const txn = txns.find(t => t.id === txnId)
    if (!txn) return

    const oldCategory = txn.category
    const amount = txn.amount

    // Update transaction category
    const updatedTransactions = txns.map(t =>
      t.id === txnId ? { ...t, category: newCategory } : t
    )

    // Update budgets: subtract from old category, add to new category
    const updatedBudgets = { ...budgets }
    
    // Subtract from old category
    if (updatedBudgets[oldCategory]) {
      updatedBudgets[oldCategory] = {
        ...updatedBudgets[oldCategory],
        spent: Math.max(0, updatedBudgets[oldCategory].spent - amount),
      }
    }

    // Add to new category
    if (updatedBudgets[newCategory]) {
      updatedBudgets[newCategory] = {
        ...updatedBudgets[newCategory],
        spent: (updatedBudgets[newCategory].spent || 0) + amount,
      }
    }

    setState(prev => ({
      ...prev,
      transactions: updatedTransactions,
      budgets: updatedBudgets,
      lastSync: Date.now(),
    }))

    setReclassifyingId(null)
  }

  // Handle deletion
  function handleDelete(txnId) {
    const txn = txns.find(t => t.id === txnId)
    if (!txn) return

    // Confirm deletion
    if (!window.confirm(`Delete expense "${txn.merchant || 'Transaction'}" for $${txn.amount.toFixed(2)}?`)) {
      return
    }

    const category = txn.category
    const amount = txn.amount

    // Remove transaction from array
    const updatedTransactions = txns.filter(t => t.id !== txnId)

    // Update budget: subtract amount from category
    const updatedBudgets = { ...budgets }
    if (updatedBudgets[category]) {
      updatedBudgets[category] = {
        ...updatedBudgets[category],
        spent: Math.max(0, updatedBudgets[category].spent - amount),
      }
    }

    setState(prev => ({
      ...prev,
      transactions: updatedTransactions,
      budgets: updatedBudgets,
      lastSync: Date.now(),
    }))
  }

  if (!categoryBudget) {
    return (
      <div className="container" style={{ paddingTop: 24 }}>
        <div className="card" style={{ maxWidth: 600 }}>
          <button
            className="btn"
            onClick={() => navigate('/frame')}
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

  const spent = categoryBudget.spent ?? 0
  const limit = categoryBudget.limit ?? 0
  const pctRaw = limit === 0 ? 0 : (spent / limit) * 100
  const pct = Math.min(100, Math.round(pctRaw))
  const remaining = limit - spent
  const barClass = statusClass(pctRaw)

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <div className="card" style={{ maxWidth: 800, marginBottom: 24 }}>
        <button
          className="btn"
          onClick={() => navigate('/frame')}
          style={{ fontSize: 14, marginBottom: 20, background: '#fff' }}
        >
          ← Back to Dashboard
        </button>

        <h2 className="h" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '24px' }}>{getCategoryIcon(name)}</span>
          {name} Overview
        </h2>
        <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.5 }}>
          This shows how {name} is performing against its budget this week, plus your recent activity.
        </div>

        {/* Budget Summary Card */}
        <div className="card" style={{ border: '1px solid var(--border)', marginBottom: 20, padding: '20px' }}>
          <div className="kpi" style={{ marginBottom: 14 }}>
            <strong>{name} Budget</strong>
            <span>${spent.toFixed(0)} / ${limit.toFixed(0)}</span>
          </div>

          <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>Adjust Weekly Limit:</label>
            <input
              type="number"
              value={limit}
              min="0"
              onChange={(e) => {
                const newLimit = Number(e.target.value)
                setState(prev => ({
                  ...prev,
                  budgets: {
                    ...prev.budgets,
                    [name]: { ...prev.budgets[name], limit: newLimit }
                  }
                }))
              }}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                width: 120,
                fontSize: 14,
              }}
            />
          </div>

          {/* colored progress bar */}
          <div
            className={`progress ${barClass}`}
            style={{ height: 12, marginBottom: 10 }}
            role="progressbar"
            aria-label={`${name} budget usage`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div className="bar" style={{ width: `${pct}%` }} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 14,
              color: 'var(--text)',
              fontWeight: 500,
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
        <div className="card" style={{ border: '1px solid var(--border)', marginBottom: 16, padding: '20px' }}>
          <div className="h2" style={{ marginBottom: 16 }}>
            Recent {name} Activity
          </div>

          {relatedTxns.length === 0 ? (
            <div style={{ fontSize: 14, color: 'var(--muted)', fontStyle: 'italic', padding: '16px 0', textAlign: 'center' }}>
              No recent transactions logged for {name}.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {relatedTxns.map((txn, index) => (
                <div
                  key={txn.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: index < relatedTxns.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15, marginBottom: 4 }}>
                      {txn.merchant || 'Merchant'}
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                      {txn.date || '—'}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, marginRight: 12, fontSize: 15, color: 'var(--text)' }}>
                    ${txn.amount.toFixed(2)}
                  </div>
                  {reclassifyingId === txn.id ? (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleReclassify(txn.id, e.target.value)
                          }
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: '1px solid var(--border)',
                          fontSize: 13,
                          background: '#fff',
                          cursor: 'pointer',
                        }}
                        autoFocus
                      >
                        <option value="">Select category...</option>
                        {Object.keys(budgets)
                          .filter(cat => cat !== txn.category)
                          .map(cat => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                      </select>
                      <button
                        onClick={() => setReclassifyingId(null)}
                        className="btn"
                        style={{
                          padding: '8px 12px',
                          fontSize: 13,
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                      <button
                        onClick={() => setReclassifyingId(txn.id)}
                        className="btn"
                        style={{
                          padding: '8px 12px',
                          fontSize: 13,
                        }}
                        title="Reclassify this expense"
                      >
                        Move
                      </button>
                      <button
                        onClick={() => handleDelete(txn.id)}
                        className="btn"
                        style={{
                          padding: '8px 12px',
                          fontSize: 13,
                          background: '#fee2e2',
                          borderColor: '#dc2626',
                          color: '#991b1b',
                        }}
                        title="Delete this expense"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fecaca'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fee2e2'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="footer" style={{ fontSize: 12, color: 'var(--muted)' }}>
          Coming soon: edit limit, pause spending alerts, or set goals just for {name}.
        </div>
      </div>
    </div>
  )
}