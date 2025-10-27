import { QRCodeCanvas } from 'qrcode.react'

export default function QRSection() {
  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        background: 'white',
        padding: '8px 10px 6px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        textAlign: 'center',
        transform: 'scale(0.8)',
        transformOrigin: 'bottom right',
        zIndex: 50,
      }}
    >
      <QRCodeCanvas value="https://your-team-site-url.com" size={96} />
      <div
        style={{
          fontSize: '0.75rem',
          marginTop: '4px',
          color: '#555',
          fontWeight: 500,
        }}
      >
        Scan to view Smart Budget Frame
      </div>
    </div>
  )
}