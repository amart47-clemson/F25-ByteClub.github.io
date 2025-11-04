import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="landing-root">
      {/* HERO / INTRO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Smart Budget Frame</h1>
            <p className="tagline">
              A shared, always-visible household budgeting display that keeps everyone
              on the same page — without spreadsheets, guilt, or surprise overspending.
            </p>

            <div className="hero-actions">
              <NavLink to="/prototype" className="primary-btn">
                View Interactive Prototype →
              </NavLink>
              <a
                className="ghost-btn"
                href="/Milestone2.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
            </div>

            <div className="hero-bullets">
              <div className="bullet">
                <div className="dot dot-green" />
                <span>Live budget status for the whole household</span>
              </div>
              <div className="bullet">
                <div className="dot dot-yellow" />
                <span>Auto-updates from recent purchases</span>
              </div>
              <div className="bullet">
                <div className="dot dot-red" />
                <span>Warnings when a category is near limit</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="frame-preview">
              <div className="frame-header">
                <span className="frame-title">Groceries</span>
                <span className="frame-amount">$250 / $300</span>
              </div>
              <div className="frame-bar">
                <div className="frame-bar-fill" />
              </div>
              <div className="frame-row">
                Dining Out <span className="warn">Over budget +$25</span>
              </div>
              <div className="frame-row">
                Utilities <span>On track</span>
              </div>
              <div className="frame-row">
                Savings Goal <span>60% funded</span>
              </div>
            </div>

            <p className="frame-caption">
              Concept: a physical “budget frame” on the counter. Budget info is ambient,
              shared, and non-judgmental.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section className="problem">
        <div className="section-inner">
          <h2>Why this matters</h2>
          <p className="problem-text">
            Households overspend because it’s hard to see money in real time.
            Purchases happen in little bursts — groceries, takeout, Target runs —
            and by the time someone “sits down to budget,” the money’s already gone.
          </p>
          <p className="problem-text">
            From Milestone 1 interviews: people forget to log expenses, lose receipts,
            and only talk about money when there's already a problem.
            From Studio 2 feedback: visibility and shared accountability are critical.
          </p>

          <div className="problem-grid">
            <div className="problem-card">
              <h3>Shared, not solo</h3>
              <p>
                Everyone in the household can see where the money’s going —
                not just whoever “does the finances.”
              </p>
            </div>

            <div className="problem-card">
              <h3>Passive awareness</h3>
              <p>
                Budget status sits in the kitchen / living space like a calendar or whiteboard.
                You don’t have to remember to open an app.
              </p>
            </div>

            <div className="problem-card">
              <h3>Low friction</h3>
              <p>
                No jargon. No “financial advisor mode.” Just categories, limits,
                and green/yellow/red status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR THREE CONCEPTS */}
      <section className="iterations">
        <div className="section-inner">
          <h2>Explored Concepts (Milestone 3)</h2>

          <div className="concepts-grid">
            <div className="concept-card">
              <h4>1. Voice-Assisted Budgeting</h4>
              <p className="concept-desc">
                “Alexa, log $40 for groceries.”
                Hands-free capture for busy parents and users with low vision.
                Students liked the accessibility, but worried about accuracy and privacy.
              </p>
            </div>

            <div className="concept-card">
              <h4>2. Smartwatch + Tap-to-Pay Alerts</h4>
              <p className="concept-desc">
                Budget feedback right at checkout —
                “This dinner leaves $17 in Dining Out.”
                Classmates loved the portability, but we flagged technical risk:
                Apple/Google Pay doesn't easily allow pre-purchase warnings.
              </p>
            </div>

            <div className="concept-card chosen">
              <h4>3. Smart Budget Frame (Chosen)</h4>
              <p className="concept-desc">
                A shared display in the home that updates automatically, shows category
                health (green / yellow / red), and tracks savings goals.
                This was described as “the most practical for families”
                and “the most collaborative.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM / COURSE INFO */}
      <section className="team">
        <div className="section-inner">
          <h2>Team ByteClub — CPSC 4140/6140 (Fall 2025)</h2>
          <ul className="team-list">
            <li>Anthony Martino</li>
            <li>Xander Facey</li>
            <li>Ross Nebitt</li>
            <li>Drew Labrador</li>
            <li>Zachary Wooten</li>
          </ul>

          <p className="footnote">
            Instructor: Dr. Plaue · This project incorporates feedback from Studio 2
            and will be evaluated with real users in Studio 3 / Milestone 4.
          </p>
        </div>
      </section>

      {/* FOOTER / MILESTONES */}
      <footer className="footer">
        <div className="section-inner footer-inner">
          <div className="footer-left">
            <div className="footer-title">Milestones</div>
            <a
              className="footer-link"
              href="/Milestone1.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Milestone 1 — Problem Space
            </a>
            <a
              className="footer-link"
              href="/Milestone2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Milestone 2 — Concept Alternatives
            </a>
            <a
              className="footer-link"
              href="/Milestone3.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Milestone 3 — Interactive Prototype
            </a>
          </div>

          <div className="footer-right">
            <NavLink to="/prototype" className="primary-btn small">
              Launch Prototype →
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  )
}