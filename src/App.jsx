import React, { useEffect } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import CategoryDetail from './components/CategoryDetail.jsx'
import SavingsGoal from './components/SavingsGoal.jsx'
import AddExpense from './components/AddExpense.jsx'
import PrivacySettings from './components/PrivacySettings.jsx'
import QRSection from './QRSection.jsx'
import useLocalState from './hooks/useLocalState.js'


export const AppContext = React.createContext(null)

export default function App() {
  const [state, setState] = useLocalState('sbf_state', {
    privacy: false,
    budgets: {
      Groceries: { limit: 400, spent: 280 },
      Dining: { limit: 150, spent: 135 },
      Utilities: { limit: 120, spent: 90 },
      Transport: { limit: 100, spent: 60 },
      'Fun Money': { limit: 80, spent: 45 }
    },
    savings: { goal: 5000, saved: 3000 },
    lastSync: Date.now(),
    transactions: [],
  })

useEffect(() => {
  if (!state.transactions || state.transactions.length === 0) {
    fetch('/data/mock_bank.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => setState(prev => ({ ...prev, transactions: data })))
      .catch(err => {
        console.error('Failed to load mock_bank.json', err)
        setState(prev => ({
          ...prev,
          transactions: [
            { id: 999, category: 'Dining', amount: 9.99, date: '2025-10-01', merchant: 'Fallback Cafe' }
          ]
        }))
      })
  }
}, [])

  const value = { state, setState }
  const location = useLocation()
  const isDashboard = location.pathname === '/'

  return (
    <AppContext.Provider value={value}>
      <div className="navbar">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/category/Dining">Category Detail</NavLink>
        <NavLink to="/savings">Savings & Goals</NavLink>
        <NavLink to="/add">Add Expense</NavLink>
        <NavLink to="/privacy">Privacy</NavLink>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:name" element={<CategoryDetail />} />
          <Route path="/savings" element={<SavingsGoal />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/privacy" element={<PrivacySettings />} />
        </Routes>
        {isDashboard && <QRSection />}
      </div>
    </AppContext.Provider>
  )
}