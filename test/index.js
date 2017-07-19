const minify = require('..')
const path = require('path')
const reshape = require('reshape')
const {readFileSync} = require('fs')
const test = require('ava')
const fixtures = path.join(__dirname, 'fixtures')
const exp = require('reshape-expressions')
const evalCode = require('reshape-eval-code')

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
test.todo('minifies svg with alternate parser')
test('removes redundant attributes', (t) => compare(t, 'redundant_attr'))
test('removes comments', (t) => compare(t, 'comments'))
test('handles custom tags', (t) => compare(t, 'custom_tag'))
test('handles expressions in tags', (t) => compare(t, 'expressions_in_tags'))
test('minifies scripts that contain locals', (t) => compare(t, 'script_locals'))

test('doesn\'t minify scripts that have active expressions', (t) => {
  const name = 'script_expressions'
  const input = readFileSync(path.join(fixtures, `${name}.html`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return reshape({ plugins: [exp(), minify()] })
    .process(input)
    .then((res) => {
      t.is(res.output({ testContent: 'thisIsContent' }).trim(), expected.trim())
    })
})

function compare (t, name, opts, log) {
  const input = readFileSync(path.join(fixtures, `${name}.html`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')
  const locals = { testId: 'thisIsId', testClass: 'thisIsClass', testContent: 'thisIsContent' }

  return reshape({ plugins: [ exp(), evalCode(locals), minify(opts) ] })
    .process(input)
    .tap((res) => log && console.log(res.output()))
    .then((res) => {
      t.is(res.output().trim(), expected.trim())
    })
}
