module.exports = (node) => {
  if (node.type === 'comment') return false
  return node
}
