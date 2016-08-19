module.exports = (node) => {
  if (node.name !== 'script') return node
  if (!node.attrs) return node
  if (!node.attrs.type) return node
  if (!node.attrs.type[0].content.match(/(\/|\+)json/)) return node
  node.content = node.content.map((c) => {
    c.content = JSON.stringify(JSON.parse(c.content))
    return c
  })
  return node
}
