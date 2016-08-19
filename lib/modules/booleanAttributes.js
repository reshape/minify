// https://github.com/kangax/html-minifier/issues/63#issuecomment-37763316
const booleanAttrs = ['allowFullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls', 'declare', 'default', 'defaultChecked', 'defaultMuted', 'defaultSelected', 'defer', 'disabled', 'draggable', 'enabled', 'formNoValidate', 'hidden', 'indeterminate', 'inert', 'isMap', 'itemScope', 'loop', 'multiple', 'muted', 'noHref', 'noResize', 'noShade', 'noValidate', 'noWrap', 'open', 'pauseOnExit', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', 'selected', 'sortable', 'spellcheck', 'translate', 'trueSpeed', 'typeMustMatch', 'visible']

module.exports = (node) => {
  if (!node.attrs) return node
  for (let attr in node.attrs) {
    if (booleanAttrs.indexOf(attr) > -1) node.attrs[attr] = []
  }
  return node
}
