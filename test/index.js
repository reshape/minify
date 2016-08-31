const minify = require('..')
const path = require('path')
const reshape = require('reshape')
const {readFileSync} = require('fs')
const test = require('ava')
const fixtures = path.join(__dirname, 'fixtures')

test('aggressively collapses whitespace', (t) => {
  return compare(t, 'whitespace_aggressive', { aggressiveCollapse: true })
})

test('conservatively collapses whitespace', (t) => {
  return compare(t, 'whitespace_conservative', { conservativeCollapse: true })
})

test('collapses whitespace', (t) => compare(t, 'whitespace'))
test('collapses boolean attrs', (t) => compare(t, 'boolean_attrs'))
test('removes empty attrs', (t) => compare(t, 'empty_attrs'))
test('minifies css', (t) => compare(t, 'css'))
test('minifies js', (t) => compare(t, 'js'))
test('minifies json', (t) => compare(t, 'json'))
test('minifies svg', (t) => compare(t, 'svg'))
test('removes redundant attributes', (t) => compare(t, 'redundant_attr'))
test('removes comments', (t) => compare(t, 'comments'))
test('handles custom tags', (t) => compare(t, 'custom_tag'))

function compare (t, name, opts, log) {
  const input = readFileSync(path.join(fixtures, `${name}.html`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return reshape({ plugins: minify(opts) })
    .process(input)
    .tap((res) => log && console.log(res.output()))
    .then((res) => {
      t.is(res.output().trim(), expected.trim())
    })
}
