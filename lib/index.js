const util = require('reshape-plugin-util')
const path = require('path')
const modules = require('indx')(path.join(__dirname, 'modules'))

module.exports = function reshapeMinify ({
  collapseWhitespace = true,
  conservativeCollapse = false,
  aggressiveCollapse = false,
  removeComments = true,
  minifyCss = true,
  minifyJs = true,
  minifyJson = true,
  minifySvg = true
} = {}) {
  return function minifyPlugin (tree, ctx) {
    return util.modifyNodes(tree, () => true, node => {
      node = modules.collapseWhitespace(node, { conservativeCollapse, aggressiveCollapse })
      node = modules.booleanAttributes(node)
      node = modules.emptyAttrs(node)
      node = modules.redundantAttrs(node)

      if (removeComments) node = modules.removeComments(node)
      switch (node.name) {
        case 'style':
          if (minifyCss) node = modules.minifyCss(node)
          break
        case 'script':
          if (minifyJs) node = modules.minifyJs(node)
          if (minifyJson) node = modules.minifyJson(node)
          break
        case 'svg':
          if (minifySvg) node = modules.minifySvg(node, ctx)
          break
        default:
          break
      }

      return node
    })
  }
}
