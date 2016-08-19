const SVGO = require('svgo')
const svgo = new SVGO()

module.exports = (node, {parser, generator}) => {
  if (node.name !== 'svg') return node
  return new Promise((resolve, reject) => {
    const rendered = generator([node])()
    svgo.optimize(rendered, (res) => {
      resolve(parser(res.data))
    })
  })
}
