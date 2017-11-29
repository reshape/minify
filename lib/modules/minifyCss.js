const cssnano = require('cssnano')

module.exports = (node) => {
  if (!node.content || !node.content.length) return node
  return cssnano
    .process(node.content[0].content)
    .then((res) => { node.content[0].content = res.css; return node })
    .catch(err => { throw err })
}
