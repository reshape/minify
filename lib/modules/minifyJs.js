const uglify = require('uglify-js')

module.exports = (node) => {
  if (node.name !== 'script') return node
  if (!node.content || !node.content.length) return node
  if (node.attrs && node.attrs.type && !node.attrs.type[0].content.match(/.*\/javascript/)) {
    return node
  }
  const min = uglify.minify(node.content[0].content, { fromString: true }).code
  node.content[0].content = min
  return node
}
