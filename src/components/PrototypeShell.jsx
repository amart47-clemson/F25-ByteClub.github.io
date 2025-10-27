import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import QRSection from '../QRSection.jsx'

export default function PrototypeShell() {
  const location = useLocation()

  // Dashboard "home" for the prototype is /prototype
  const isDashboard =
    location.pathname === '/prototype' ||
    location.pathname === '/prototype/'

  return (
    <div className="prototype-shell">
      {/* top nav inside the prototype space */}
      <div className="navbar prototype-nav">
        <NavLink to="/prototype">Dashboard</NavLink>
        <NavLink to="/prototype/category/Dining">Category Detail</NavLink>
        <NavLink to="/prototype/savings">Savings & Goals</NavLink>
        <NavLink to="/prototype/add">Add Expense</NavLink>
        <NavLink to="/prototype/privacy">Privacy</NavLink>

        <NavLink to="/" style={{ marginLeft: 'auto', fontWeight: 500 }}>
          ← Back to Overview
        </NavLink>
      </div>

      {/* main content area where child routes render */}
      <div className="container prototype-container">
        <Outlet />

        {/* only show QR on the prototype dashboard */}
        {isDashboard && <QRSection />}
      </div>
    </div>
  )
}