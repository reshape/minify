module.exports = (node) => {
  if (node.type !== 'tag') return node
  removeAttr(node, 'form', 'method', 'get')
  removeAttr(node, 'input', 'type', 'text')
  removeAttr(node, 'button', 'type', 'submit')
  removeAttr(node, 'link', 'media', 'all')
  removeAttr(node, 'style', 'media', 'all')
  removeAttr(node, 'style', 'type', 'text/css')
  removeAttr(node, 'script', 'language', 'javascript')
  removeAttr(node, 'script', 'type', 'text/javascript')
  removeAttr(node, 'area', 'shape', 'rect')
  return node
}

function removeAttr (node, name, key, val) {
  if (node.name === name) {
    if (!node.attrs) return node
    for (let attr in node.attrs) {
      if (attr === key && node.attrs[attr][0].content === val) {
        delete node.attrs[attr]
      }
    }
  }
}
