const cssnano = require('cssnano')

module.exports = node =>
  new Promise((resolve, reject) => {
    if (!node.content || !node.content.length) resolve(node)

    cssnano
      .process(node.content[0].content)
      .then(({ css }) => {
        node.content[0].content = css
        resolve(node)
      })
      .catch(reject)
  })
