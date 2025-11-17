// Category icon mapping
export function getCategoryIcon(categoryName) {
  const name = categoryName.toLowerCase()
  
  if (name.includes('groc') || name.includes('food') || name.includes('shop')) {
    return '🛒' // Shopping cart / grocery bag
  }
  if (name.includes('din') || name.includes('restaurant') || name.includes('eat')) {
    return '🍽️' // Dining
  }
  if (name.includes('util') || name.includes('electric') || name.includes('power') || name.includes('water') || name.includes('gas')) {
    return '💡' // Utilities / lightbulb
  }
  if (name.includes('transport') || name.includes('car') || name.includes('uber') || name.includes('taxi') || name.includes('gas')) {
    return '🚗' // Car / transport
  }
  if (name.includes('fun') || name.includes('entertain') || name.includes('hobby') || name.includes('game')) {
    return '🎮' // Fun / entertainment
  }
  if (name.includes('saving') || name.includes('goal')) {
    return '💰' // Money / savings
  }
  if (name.includes('health') || name.includes('medical') || name.includes('doctor')) {
    return '🏥' // Health
  }
  if (name.includes('home') || name.includes('rent') || name.includes('mortgage')) {
    return '🏠' // Home
  }
  if (name.includes('cloth') || name.includes('apparel')) {
    return '👕' // Clothing
  }
  if (name.includes('travel') || name.includes('vacation') || name.includes('trip')) {
    return '✈️' // Travel
  }
  
  // Default icon
  return '📊'
}

