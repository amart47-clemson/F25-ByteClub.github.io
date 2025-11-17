import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { getQRUrl, getNetworkIPInstructions } from './utils/getQRUrl.js'

export default function QRSection({ url, label = 'Scan to open', path = '/frame/add' }) {
  const [networkIP, setNetworkIP] = useState(localStorage.getItem('networkIP') || '')
  const [inputIP, setInputIP] = useState('')
  
  // If no URL provided, try to generate one
  const qrUrl = url || getQRUrl(path)
  const instructions = getNetworkIPInstructions()
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const port = window.location.port || '5173'
  
  const handleSaveIP = () => {
    if (inputIP.trim()) {
      localStorage.setItem('networkIP', inputIP.trim())
      setNetworkIP(inputIP.trim())
      setInputIP('')
      // Reload to regenerate QR code
      window.location.reload()
    }
  }
  
  // If we're on localhost and couldn't generate a URL, show instructions
  if (!qrUrl && isLocalhost) {
    return (
      <div
        style={{
          background: 'white',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'left',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '12px',
            color: 'var(--text)',
          }}
        >
          {instructions.message}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--muted)',
            lineHeight: '1.6',
            marginBottom: '16px',
          }}
        >
          {instructions.steps.map((step, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              {step}
            </div>
          ))}
        </div>
        
        {networkIP ? (
          <div style={{ marginTop: '16px', padding: '12px', background: '#dcfce7', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: '#166534' }}>
              QR Code will use: {networkIP}
            </div>
            <QRCodeCanvas value={`http://${networkIP}:${port}${path}`} size={120} />
            <button
              onClick={() => {
                localStorage.removeItem('networkIP')
                setNetworkIP('')
                window.location.reload()
              }}
              style={{
                marginTop: '8px',
                padding: '6px 12px',
                fontSize: '11px',
                background: '#fee2e2',
                border: '1px solid #dc2626',
                borderRadius: '6px',
                color: '#991b1b',
                cursor: 'pointer',
              }}
            >
              Clear IP
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--text)' }}>
              Or enter your computer's IP address:
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputIP}
                onChange={(e) => setInputIP(e.target.value)}
                placeholder="e.g., 192.168.1.100"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  fontSize: '12px',
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSaveIP()}
              />
              <button
                onClick={handleSaveIP}
                style={{
                  padding: '8px 16px',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div
      style={{
        background: 'white',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        border: '1px solid var(--border)',
      }}
    >
      <QRCodeCanvas value={qrUrl} size={160} />
      <div
        style={{
          fontSize: '13px',
          marginTop: '12px',
          color: 'var(--text)',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '11px',
          marginTop: '4px',
          color: 'var(--muted)',
          wordBreak: 'break-all',
        }}
      >
        {qrUrl}
      </div>
      {isLocalhost && (
        <div
          style={{
            fontSize: '10px',
            marginTop: '8px',
            padding: '8px',
            background: '#fef3c7',
            borderRadius: '6px',
            color: '#92400e',
            lineHeight: '1.4',
          }}
        >
          Make sure your phone is on the same WiFi network
        </div>
      )}
    </div>
  )
}