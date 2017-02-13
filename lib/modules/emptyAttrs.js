// https://www.w3.org/TR/html4/sgml/dtd.html#events
const removeAttrs = ['id', 'class', 'style', 'title', 'lang', 'dir', 'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmousemove', 'onmouseout', 'onkeypress', 'onkeydown', 'onkeyup']

module.exports = (node) => {
  // If the node has no attributes, nothing to do
  if (!node.attrs) return node
  // Check each attribute in the node
  for (let attr in node.attrs) {
    // Check if attribute is on the delete list (removeAttrs)
    if (removeAttrs.indexOf(attr) > -1) {
      // Check each attribute node. If they're ALL empty, delete the whole node
      // If one has content, leave everything
      const val = node.attrs[attr]
      if (val.every(checkVal => checkVal.content.match(/^\s*$/))) {
        delete node.attrs[attr]
      }
    }
  }
  return node
}
