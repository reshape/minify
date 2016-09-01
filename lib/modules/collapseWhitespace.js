const skipElements = ['script', 'style', 'pre', 'textarea']

module.exports = (node, options = {}) => {
  // if it's an entirely empty node, either remove or collapse to a single space
  if (node.type === 'text' && node.content && node.content.match(/^\s+$/)) {
    if (options.conservativeCollapse) {
      node.content = ' '
      return node
    } else {
      return false
    }
  }

  // if it's not a tag, has no content, or is in the skip list, pass
  if (node.type !== 'tag') return node
  if (!node.content) return node
  if (skipElements.indexOf(node.name) > -1) return node

  // run through the contents and eliminate whitespace
  node.content = node.content.reduce((m, node) => {
    if (node.type !== 'text') { m.push(node); return m }
    if (!node.content) { m.push(node); return m }
    if (node.content.match(/^\s+$/)) return m
    node.content = node.content.replace(/\s+/g, ' ')
    if (options.aggressiveCollapse) node.content = node.content.trim()
    m.push(node); return m
  }, [])

  return node
}
