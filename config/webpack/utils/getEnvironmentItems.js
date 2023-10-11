const getEnvironmentItems= (items) => {
  if (typeof items !== 'string') {
    return []
  }

  return items
    .split('\n')
    .reduce((items, item) => {
      if(item.startsWith('#') || !item.split('=')?.[0]) {
        return items
      }

      return [...items, item.split('=')?.[0]]
    }, [])
}

module.exports = {
  getEnvironmentItems
}