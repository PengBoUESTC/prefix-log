const cache: Record<string, string> = {}
const _log = console.log.bind(console)
const randomNum = (str: string) => (Math.abs((str.charCodeAt(Math.floor(Math.random() * str.length)) - 40)) % 255) * 3

export const createPrefixLog = (spliter = '::') => {
  return (...args: Parameters<typeof _log>) => {
    try {
      throw new Error('prefix log')
    } catch(e) {
      const stack = (e as Error).stack?.split('\n')[2] || ''
      const callInfo = stack.match(/at(.*)\((.*)\)/)?.map(str => str.trim()) || []
      const [, handler = ''] = callInfo
      const prefixPatch = handler ? `${handler}${spliter}` : ''
      if (typeof args[0] !== 'string' && handler) {
        args.unshift(prefixPatch)
      }
      let prefix = args[0]
      prefix = prefix.startsWith(prefixPatch) ? prefix : `${prefixPatch} ${prefix}`

      const prefixList = prefix.split(spliter)
      prefix = prefixList.shift()
      let color = cache[prefix]
      if(!color) {
        const idx = Math.floor(Math.random() * 3)
        const bits = [randomNum(prefix).toString(16),randomNum(prefix).toString(16),randomNum(prefix).toString(16)]
        bits[idx] = Number(20).toString(16)
        color = `#${bits.join('')}`
        cache[prefix] = color
      }
      args[0] = `%c${prefix}${spliter}`
      args.splice(1, 0, `color: ${color}; font-weight: bold`)
      args.splice(2, 0, prefixList.join(spliter))

      _log(...args)
    }
  }
}

export const overWriteLog = () => {
  console.log = createPrefixLog()
}

export const prefixLog = createPrefixLog()

export const patchLog = (key = Symbol()) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  globalThis[key] = createPrefixLog()
  return key
}