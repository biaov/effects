import textData from './text-data.js'

/**
 * 检查是否为中文字符
 */
const checkChinese = value => {
  const code = value.charCodeAt()
  if (!code) return false
  return code >= 19968 && code <= 40869
}

/**
 * 简体转繁体
 */
const simplifiedToTraditional = value => {
  if (!checkChinese(value)) return value
  const item = textData.find(([simplified]) => simplified === value)
  if (!item) return value
  const traditional = item[1]
  return Array.isArray(traditional) ? traditional[0] : traditional
}

/**
 * 繁体转简体
 */
const traditionalToSimplified = value => {
  if (!checkChinese(value)) return value
  const item = textData.find(([_, traditional]) => (Array.isArray(traditional) ? traditional.includes(value) : traditional === value))
  if (!item) return value
  return item[0]
}

/**
 * 简体=>繁体
 * 简体<=繁体
 * to: simplified | traditional
 */
export const simplifiedTransformTraditional = (value, toTraditional = false) => {
  if (!value) return value
  return value
    .split('')
    .map(toTraditional ? simplifiedToTraditional : traditionalToSimplified)
    .join('')
}
