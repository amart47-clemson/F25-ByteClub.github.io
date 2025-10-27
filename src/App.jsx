import React, { useEffect } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'

// screens
import LandingPage from './components/LandingPage.jsx'
import Dashboard from './components/Dashboard.jsx'
import CategoryDetail from './components/CategoryDetail.jsx'
import SavingsGoal from './components/SavingsGoal.jsx'
import AddExpense from './components/AddExpense.jsx'
import PrivacySettings from './components/PrivacySettings.jsx'
import QRSection from './QRSection.jsx'

// hook
import useLocalState from './hooks/useLocalState.js'

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
    savings: { goal: 5000, saved: 3000 },
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
  const inPrototype = path === '/frame' || path.startsWith('/frame/')
  const showQR = path === '/frame'

  return (
    <AppContext.Provider value={value}>
      {/* NAVIGATION BAR */}
      <div
        className="navbar"
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--card)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <NavLink to="/" style={{ textDecoration: 'none', color: 'var(--text)' }}>
          Overview
        </NavLink>

        {inPrototype && (
          <>
            <NavLink to="/frame" style={{ textDecoration: 'none', color: 'var(--text)' }}>
              Dashboard
            </NavLink>
            <NavLink to="/frame/savings" style={{ textDecoration: 'none', color: 'var(--text)' }}>
              Savings & Goals
            </NavLink>
            <NavLink to="/frame/add" style={{ textDecoration: 'none', color: 'var(--text)' }}>
              Add Expense
            </NavLink>
            <NavLink to="/frame/privacy" style={{ textDecoration: 'none', color: 'var(--text)' }}>
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
              to="/frame"
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

      {/* ROUTING */}
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/frame" element={<Dashboard />} />
          <Route path="/frame/category/:name" element={<CategoryDetail />} />
          <Route path="/frame/savings" element={<SavingsGoal />} />
          <Route path="/frame/add" element={<AddExpense />} />
          <Route path="/frame/privacy" element={<PrivacySettings />} />
        </Routes>

        {showQR && <QRSection />}
      </div>
    </AppContext.Provider>
  )
}