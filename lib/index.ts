const cache: Record<string, string> = {}
export const _log = console.log.bind(console)

export const createPrefixLog = (spliter = '::', log = _log) => {
  const randomNum = (str: string) => (Math.abs((str.charCodeAt(Math.floor(Math.random() * str.length)) - 40)) % 255) * 3
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

      return log(...args)
    }
  }
}

export const createPrefixLogAnsi = (spliter = '::', log = _log) => {
  const formatter = (open: string, str: string, close: string) => `${open}${str}${close}`
  const randomNum = (str: string) => (Math.abs((str.charCodeAt(Math.floor(Math.random() * str.length)) - 40)) % 255) * 3

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
        const bits = [randomNum(prefix),randomNum(prefix),randomNum(prefix)]
        bits[idx] = 200
        color = formatter(`\x1b[48;2;${bits.join(';')}m`, prefix, '\x1b[0m')
        cache[prefix] = color
      }
      prefixList.unshift(color)
      args[0] = prefixList.join(spliter)
      return log(...args)
    }
  }
}

export const overWriteLog = () => {
  console.log = createPrefixLog()
}

export const prefixLog = createPrefixLog()

export const patchLog = (key = '$prefixLog$') => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  globalThis[key] = createPrefixLog()
  return key
}