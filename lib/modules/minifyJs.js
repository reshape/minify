const uglify = require('uglify-js')

module.exports = (node) => {
  // get rid of anything that's not a script
  if (node.name !== 'script') return node
  if (!node.content || !node.content.length) return node
  if (node.attrs && node.attrs.type && !node.attrs.type[0].content.match(/.*\/javascript/)) {
    return node
  }
  // go through each of the content nodes, concat any text nodes
  let hasCodeNodes = false
  const content = node.content.reduce((m, c) => {
    if (c.type === 'code') { hasCodeNodes = true; return m }
    m += c.content
    return m
  }, '')
  // if there are any code nodes, we don't want to minify since those
  // require a render later at runtime
  if (hasCodeNodes) return node
  // if not, we are good with only test content, so we minify and replace
  const min = uglify.minify(content).code
  node.content[0].content = min
  node.content.splice(1, node.content.length)
  return node
}
