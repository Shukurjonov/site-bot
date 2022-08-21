const getIcon = (type) => {
  if (type === 'stadium') return '⚽';
  if (type === 'workout center') return '🏋️'
}

module.exports = { getIcon }