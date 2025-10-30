import textData from './text-data'

const checkChinese = value => /[19968-40869]+/.test(value.charCodeAt())

/**
 * 简体转繁体
 */
export const simplifiedToTraditional = value => {
  if (!value) return value
  value
    .split('')
    .map(value => {
      if (!checkChinese(value)) return value
      const item = textData.find(([simplified]) => simplified === value)
      if (!item) return value
      const traditional = item[1]
      return Array.isArray(traditional) ? traditional[0] : traditional
    })
    .join('')
}

/**
 * 繁体转简体
 */
export const traditionalToSimplified = value => {
  if (!value) return value
  value
    .split('')
    .map(value => {
      if (!checkChinese(value)) return value
      const item = textData.find(([_, traditional]) => (Array.isArray(traditional) ? traditional.includes(value) : traditional === value))
      if (!item) return value
      return item[0]
    })
    .join('')
}
