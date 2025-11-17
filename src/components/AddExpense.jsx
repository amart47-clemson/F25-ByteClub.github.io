import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App.jsx'
import { getCategoryIcon } from '../utils/categoryIcons.js'

export default function AddExpense() {
  const navigate = useNavigate()
  const { state, setState } = useContext(AppContext)

  // form fields
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Groceries')
  const [description, setDescription] = useState('') 
  const [date, setDate] = useState(() => {
    const d = new Date()
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })

  // add expense handler
  function handleSubmit(e) {
    e.preventDefault()

    const amtNum = parseFloat(amount)
    if (isNaN(amtNum) || amtNum <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    // build new transaction object
    const newTxn = {
      id: Date.now(), 
      category,
      amount: amtNum,
      date,
      merchant: description || 'Unlabeled Purchase', 
    }

    // update transactions array
    const nextTransactions = [newTxn, ...(state.transactions || [])]

    // also update budget "spent" for that category
    const nextBudgets = { ...state.budgets }
    if (nextBudgets[category]) {
      nextBudgets[category] = {
        ...nextBudgets[category],
        spent: nextBudgets[category].spent + amtNum,
      }
    }

    setState(prev => ({
      ...prev,
      transactions: nextTransactions,
      budgets: nextBudgets,
      lastSync: Date.now(),
    }))

    // reset form
    setAmount('')
    setDescription('')
    navigate('/frame')
  }

  return (
    <div className="container" style={{ paddingTop: 24, maxWidth: 520 }}>
      <div className="card" style={{ border: '1px solid var(--border)' }}>
        <button
          className="btn"
          style={{ fontSize: 14, marginBottom: 20, background: '#fff' }}
          onClick={() => navigate('/frame')}
        >
          ← Back to Dashboard
        </button>

        <h2 className="h" style={{ marginBottom: 10 }}>
          Add Expense
        </h2>
        <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.5 }}>
          Log something you (or a roommate / family member) just spent. This updates the shared budget.
        </div>

        <form onSubmit={handleSubmit} style={{ fontSize: 14, color: 'var(--text)' }}>
          {/* Amount */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 14,
                color: 'var(--text)',
              }}
            >
              Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: '#fff',
                fontSize: 15,
                transition: 'border-color 0.2s ease',
              }}
              placeholder="e.g. 42.50"
              onFocus={(e) => e.target.style.borderColor = '#9ca3af'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 14,
                color: 'var(--text)',
              }}
            >
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: '#fff',
                fontSize: 15,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#9ca3af'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            >
              {Object.keys(state.budgets).map(cat => (
                <option key={cat} value={cat}>
                  {getCategoryIcon(cat)} {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description / Merchant (NEW FIELD) */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 14,
                color: 'var(--text)',
              }}
            >
              Description / Where was this?
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="ex: Publix groceries, Uber to airport, dinner at Thai Place"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: '#fff',
                fontSize: 15,
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#9ca3af'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>
              This will show up in your category view under "Recent Activity".
            </div>
          </div>

          {/* Date */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: 8,
                fontSize: 14,
                color: 'var(--text)',
              }}
            >
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: '#fff',
                fontSize: 15,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#9ca3af'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn"
            style={{
              width: '100%',
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              padding: '14px 20px',
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1f2937'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Add to Budget
          </button>
        </form>

        <div
          className="footer"
          style={{
            marginTop: 24,
            fontSize: 13,
            color: 'var(--muted)',
            lineHeight: 1.5,
          }}
        >
          This simulates a "manual log." In the real system, most expenses would auto-import from the bank.
        </div>
      </div>
    </div>
  )
}