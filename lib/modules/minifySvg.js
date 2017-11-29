const reshapeParser = require('reshape-parser')
const SVGO = require('svgo')
const svgo = new SVGO()

module.exports = (node, ctx) => {
  return new Promise((resolve, reject) => {
    const rendered = ctx.generator([node])()
    svgo.optimize(rendered, ({ error, data }) => {
      if (error) reject(new Error(error))
      resolve(reshapeParser(data, ctx))
    })
  })
}
