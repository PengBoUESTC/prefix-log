import { createPrefixLogAnsi, _log } from '../lib/index'

describe('createPrefixLogAnsi test', () => {
  test('base test', function createPrefixLogBaseTest() {
    const prefixLog = createPrefixLogAnsi('::', (...params) => {
      console.log(...params)
      return params
    })
    const str = prefixLog('ttt')
    expect(str).toMatchSnapshot()
  })
  test('object params test', function createPrefixLogBaseTest() {
    const prefixLog = createPrefixLogAnsi('::', (...params) => {
      console.log(...params)
      return params
    })
    const str = prefixLog({ a: 'test' })
    expect(str).toMatchSnapshot()
  })
})
describe('overWriteLog test', () => {
  test('base test', function overWriteLogTest() {
    console.log = createPrefixLogAnsi('::', (...params) => {
      _log(...params)
      return params
    })
    const result = console.log('test')
    expect(result).toMatchSnapshot()
  })
})
describe('patchLog test', () => {
  test('base test', function patchLogTest() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.xixi = createPrefixLogAnsi('::', (...params) => {
      _log(...params)
      return params
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = globalThis.xixi('test')
    expect(result).toMatchSnapshot()
  })
})