import React, { useEffect } from 'react'
import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom'

// screens
import LandingPage from './components/LandingPage.jsx'
import Dashboard from './components/Dashboard.jsx'
import CategoryDetail from './components/CategoryDetail.jsx'
import SavingsGoal from './components/SavingsGoal.jsx'
import AddExpense from './components/AddExpense.jsx'
import PrivacySettings from './components/PrivacySettings.jsx'

// hook
import useLocalState from './hooks/useLocalState.js'

// single source of truth for prototype root
const DASH = '/frame'

// global app context
export const AppContext = React.createContext(null)

export default function App() {
  const [state, setState] = useLocalState('sbf_state', {
    privacy: false,
    budgets: {
      Groceries: { limit: 400, spent: 280 },
      Dining: { limit: 150, spent: 135 },
      Utilities: { limit: 120, spent: 90 },
      Transport: { limit: 100, spent: 60 },
      'Fun Money': { limit: 80, spent: 45 },
    },
    savings: { goal: 5000, saved: 2500 },
    lastSync: Date.now(),
    transactions: [],
  })

  // seed transactions
  useEffect(() => {
    if (!state.transactions || state.transactions.length === 0) {
      fetch('/data/mock_bank.json')
        .then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`)
          return r.json()
        })
        .then(data =>
          setState(prev => ({
            ...prev,
            transactions: data,
          }))
        )
        .catch(err => {
          console.error('Failed to load mock_bank.json', err)
          setState(prev => ({
            ...prev,
            transactions: [
              {
                id: 999,
                category: 'Dining',
                amount: 9.99,
                date: '2025-10-01',
                merchant: 'Fallback Cafe',
              },
            ],
          }))
        })
    }
  }, [])

  const value = { state, setState }

  const location = useLocation()
  const path = location.pathname
  const inPrototype = path === DASH || path.startsWith(`${DASH}/`)

  return (
    <AppContext.Provider value={value}>
      {/* Navigation Bar */}
      <div className="navbar">
        <NavLink to="/" style={{ textDecoration: 'none', color: 'var(--text)' }}>
          Overview
        </NavLink>

        {inPrototype && (
          <>
            <NavLink to={DASH} style={{ textDecoration: 'none', color: 'var(--text)' }}>
              Dashboard
            </NavLink>
            <NavLink to={`${DASH}/savings`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
              Savings & Goals
            </NavLink>
            <NavLink to={`${DASH}/add`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
              Add Expense
            </NavLink>
            <NavLink to={`${DASH}/privacy`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
              Privacy
            </NavLink>
          </>
        )}

        <div style={{ marginLeft: 'auto' }}>
          {inPrototype ? (
            <NavLink
              to="/"
              style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 12px',
                background: '#fff',
                fontSize: '14px',
                textDecoration: 'none',
                color: 'var(--text)',
                fontWeight: 600,
              }}
            >
              ← Back to Overview
            </NavLink>
          ) : (
            <NavLink
              to={DASH}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px 12px',
                background: '#fff',
                fontSize: '14px',
                textDecoration: 'none',
                color: 'var(--text)',
                fontWeight: 600,
              }}
            >
              Launch Prototype →
            </NavLink>
          )}
        </div>
      </div>

      {/* Routing */}
      <div className="container">
        <Routes>
          {/* Public overview */}
          <Route path="/" element={<LandingPage />} />

          {/* redirects to keep old links working */}
          <Route path="/category/:name" element={<Navigate to={`${DASH}/category/:name`} replace />} />
          <Route path="/savings"        element={<Navigate to={`${DASH}/savings`} replace />} />
          <Route path="/add"            element={<Navigate to={`${DASH}/add`} replace />} />
          <Route path="/privacy"        element={<Navigate to={`${DASH}/privacy`} replace />} />

          {/* Prototype routes */}
          <Route path={DASH} element={<Dashboard />} />
          <Route path={`${DASH}/category/:name`} element={<CategoryDetail />} />
          <Route path={`${DASH}/savings`} element={<SavingsGoal />} />
          <Route path={`${DASH}/add`} element={<AddExpense />} />
          <Route path={`${DASH}/privacy`} element={<PrivacySettings />} />
          <Route
            path="*"
            element={<Navigate to={path.startsWith(DASH) ? DASH : '/'} replace />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}