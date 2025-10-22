import React, { useContext, useState } from 'react'
import { AppContext } from '../App.jsx'

const categories = ["Groceries","Dining","Utilities","Transport","Fun Money","Other"]

export default function AddExpense(){
  const { state, setState } = useContext(AppContext)
  const [display, setDisplay] = useState("0.00")
  const [category, setCategory] = useState(categories[0])

  const press = (v) => {
    if (v === '⌫') {
      setDisplay(d => d.length <= 1 ? "0" : d.slice(0,-1))
    } else if (v === '.') {
      setDisplay(d => d.includes('.') ? d : d + '.')
    } else {
      setDisplay(d => (d === "0.00" || d === "0") ? String(v) : d + String(v))
    }
  }

  const save = () => {
    const amt = parseFloat(display)
    if (isNaN(amt) || amt <= 0) return
    const tx = {
      id: Date.now(),
      category,
      amount: amt,
      date: new Date().toISOString().slice(0,10),
      merchant: "Manual Entry"
    }
    setState(prev => ({
      ...prev,
      transactions: [...(prev.transactions||[]), tx],
      budgets: {
        ...prev.budgets,
        [category]: {
          ...prev.budgets[category],
          spent: (prev.budgets[category]?.spent || 0) + amt,
          limit: prev.budgets[category]?.limit || 100
        }
      }
    }))
    setDisplay("0.00")
  }

  const layout = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"],
    [".","0","⌫"]
  ]

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 6'}}>
        <h2 className="h">Add Expense</h2>
        <div className="card" style={{textAlign:'center', marginBottom:12}}>
          <div style={{fontSize:32, fontWeight:700}}>${display}</div>
        </div>
        <div className="keypad">
          {layout.flat().map((k,i) => (
            <button className="keypad-btn" key={i} onClick={() => press(k)}>{k}</button>
          ))}
        </div>
      </div>
      <div className="card" style={{gridColumn:'span 6'}}>
        <h3 className="h">Category</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8}}>
          {categories.map(c => (
            <button key={c} className="btn" style={{borderColor: c===category ? '#111' : ''}} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <div style={{marginTop:16}}>
          <button className="btn" onClick={save}>Save Expense</button>
        </div>
      </div>
    </div>
  )
}