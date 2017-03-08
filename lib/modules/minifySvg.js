const reshapeParser = require('reshape-parser')
const SVGO = require('svgo')
const svgo = new SVGO()

module.exports = (node, ctx) => {
  if (node.name !== 'svg') return node
  return new Promise((resolve, reject) => {
    const rendered = ctx.generator([node])()
    svgo.optimize(rendered, (res) => {
      resolve(reshapeParser(res.data, ctx))
    })
  })
}
