import { QRCodeCanvas } from 'qrcode.react'

export default function QRSection() {
  return (
    <div style={{
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      background: 'white',
      padding: 12,
      borderRadius: 12,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      textAlign: 'center'
    }}>
      <QRCodeCanvas value="https://your-team-site-url.com" size={128} />
      <div style={{ fontSize: 12, marginTop: 8, color: '#555' }}>
        Scan to view Smart Budget Frame
      </div>
    </div>
  )
}