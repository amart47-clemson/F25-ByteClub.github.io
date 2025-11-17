// Utility to get the correct URL for QR codes
// Handles both local development and production

export function getQRUrl(path = '/frame/add') {
  const origin = window.location.origin
  const hostname = window.location.hostname
  const port = window.location.port || '5173'
  
  // If we're on localhost, we need to use the network IP
  // Check if accessed via network IP (not localhost/127.0.0.1)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Try to get the local network IP from localStorage (user can set it)
    const savedIP = localStorage.getItem('networkIP')
    if (savedIP) {
      return `http://${savedIP}:${port}${path}`
    }
    
    // Otherwise, return null to show instructions
    return null
  }
  
  // If accessed via network IP (e.g., 192.168.x.x), use that
  // This means the user accessed the site via their network IP
  if (hostname.match(/^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
    return `${origin}${path}`
  }
  
  // For production or other domains, use the origin
  return `${origin}${path}`
}

// Get network IP instructions
export function getNetworkIPInstructions() {
  // Try to detect the local IP (this is a best-effort approach)
  // The actual IP needs to be determined by the user
  return {
    message: "To use QR code on your phone:",
    steps: [
      "1. Make sure your phone is on the same WiFi network",
      "2. Find your computer's local IP address:",
      "   - Mac: System Settings > Network",
      "   - Windows: ipconfig in Command Prompt",
      "   - Linux: ip addr or ifconfig",
      "3. Access this site using: http://[YOUR-IP]:5173",
      "4. The QR code will then work on your phone"
    ]
  }
}

