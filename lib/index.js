const util = require('reshape-plugin-util')
const path = require('path')
const modules = require('indx')(path.join(__dirname, 'modules'))

module.exports = function reshapeMinify (opts = {}) {
  opts = Object.assign({
    collapseWhitespace: true,
    conservativeCollapse: false,
    aggressiveCollapse: false,
    removeComments: true,
    minifyCss: true,
    minifyJs: true,
    minifyJson: true,
    minifySvg: true,
    mergeScripts: false,
    mergeStyles: false
  }, opts)

  return function minifyPlugin (tree, ctx) {
    const scriptNodes = []
    const styleNodes = []
    return util.modifyNodes(tree, () => true, (node) => {
      node = modules.collapseWhitespace(node, opts)
      node = modules.booleanAttributes(node)
      node = modules.emptyAttrs(node)
      node = modules.redundantAttrs(node)
      if (opts.minifyCss) node = modules.minifyCss(node)
      if (opts.minifyJs) node = modules.minifyJs(node)
      if (opts.minifyJson) node = modules.minifyJson(node)
      if (opts.minifySvg) node = modules.minifySvg(node, ctx)
      if (opts.removeComments) node = modules.removeComments(node)
      if (opts.mergeScripts) modules.mergeScripts(node, scriptNodes)
      if (opts.mergeScripts) modules.mergeStyles(node, styleNodes)
      return node
    })
  }
}
