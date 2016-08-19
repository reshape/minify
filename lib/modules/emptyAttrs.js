// https://www.w3.org/TR/html4/sgml/dtd.html#events
const removeAttrs = ['id', 'class', 'style', 'title', 'lang', 'dir', 'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmousemove', 'onmouseout', 'onkeypress', 'onkeydown', 'onkeyup']

module.exports = (node) => {
  if (!node.attrs) return node
  for (let attr in node.attrs) {
    if (removeAttrs.indexOf(attr) > -1) {
      const val = node.attrs[attr]
      if (val.length < 1 || val[0].content.match(/^\s*$/)) {
        delete node.attrs[attr]
      }
    }
  }
  return node
}
