# reshape-minify

[![npm](https://img.shields.io/npm/v/reshape-minify.svg?style=flat-square)](https://npmjs.com/package/reshape-minify)
[![tests](https://img.shields.io/travis/reshape/minify.svg?style=flat-square)](https://travis-ci.org/reshape/minify?branch=master)
[![dependencies](https://img.shields.io/david/reshape/minify.svg?style=flat-square)](https://david-dm.org/reshape/minify)
[![coverage](https://img.shields.io/coveralls/reshape/minify.svg?style=flat-square)](https://coveralls.io/r/reshape/minify?branch=master)

A reshape plugin to minify html

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm install reshape-minify -S`

> **Note:** This project is compatible with node v6+ only

### Usage

Add it as a plugin to reshape:

```js
const reshape = require('reshape')
const minify = require('reshape-minify')

reshape({ plugins: minify(/* options */) })
  .process(someHtml)
  .then((res) => {
    console.log(res.output(/* locals */))
  })
```

#### Options

Options are passed in an object, all are optional.

| Name | Description | Default |
| ---- | ----------- | ------- |
| **collapseWhitespace** | Removes all extra whitespace | `true` |
| **conservativeCollapse** | Instead of fully removing excess whitespace, collapses down to a single space | `false` |
| **aggressiveCollapse** | More aggressive whitespace removal, trims all whitespace from beginning and ends of any text | `false` |
| **removeComments** | Removes all comments from the html | `true` |
| **minifyCss** | Minifies any CSS in `style` tags | `true` |
| **minifyJs** | Minifies any JS in `script` tags | `true` |
| **minifySvg** | Minifies any inline svg | `true` |
| **minifyJson** | Minifies any json in `script` tags with `*/json` as the type | `true` |

#### To-Do List

- [unquote attributes](https://github.com/kangax/html-minifier/blob/gh-pages/src/htmlminifier.js#L106)
- [remove trailing zeros on viewport meta](https://github.com/kangax/html-minifier/blob/gh-pages/src/htmlminifier.js#L301)
- [remove optional parent tags](https://github.com/kangax/html-minifier/blob/gh-pages/src/htmlminifier.js#L369)
- [minify urls](https://github.com/stevenvachon/relateurl)

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
