import { minify } from 'https://unpkg.com/html-minifier-next@5.0.3/dist/htmlminifier.esm.bundle.js'

window.process = window.process || {
  env: {
    NODE_ENV: 'production'
  },
  browser: true
}

/**
 * HTML 基础压缩（去注释、多余空白、可选标签简化等）
 */
const minifyHTML = html =>
  minify(html, {
    collapseWhitespace: true, // 合并连续空白
    conservativeCollapse: false, // 更激进合并
    removeComments: true, // 删除所有注释
    removeOptionalTags: true, // 移除可选结束标签（如 </p>、</li>）
    removeRedundantAttributes: true, // 移除默认属性（如 type="text"）
    removeAttributeQuotes: true, // 去掉不必要的引号
    useShortDoctype: true, // 用 <!doctype html>
    minifyJS: true, // 压缩 <script> 内 JS
    minifyCSS: true, // 压缩 <style> 内 CSS
    processConditionalComments: true // 处理条件注释（可选）
    // sortAttributes: true,               // 属性排序（可选）
    // sortClassName: true                 // class 排序（可选）
  })

/**
 * CSS 基础压缩
 */
const minifyCSS = css => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // 去多行注释
    .replace(/\/\/.*$/gm, '') // 去单行注释（虽 CSS 少用）
    .replace(/\s*([{}:;,])\s*/g, '$1') // 符号两边空格去掉
    .replace(/;}/g, '}') // 去规则末尾
    .replace(/\s+/g, ' ') // 多空格 → 单
    .trim()
}

/**
 * JS 基础压缩（非常有限，仅去注释 + 空格，**不安全**用于复杂代码）
 */
const minifyJS = js => Terser.minify_sync(js).code

/**
 * 检测代码类型（HTML、CSS、JavaScript）
 */
const detectType = code => {
  const t = code.trim()
  if (!t) return 'html'

  if (/<[!a-z][\s\S]*>/i.test(t) || t.startsWith('<!')) return 'html'
  if (/\b(function|const|let|var|class|return|import|export)\b/.test(t)) return 'js'
  if (/{[^}]*}/.test(t) && /[:;}]/.test(t)) return 'css'
  return 'html'
}

/**
 * 压缩代码
 */
export const compressCode = async value => {
  switch (detectType(value)) {
    case 'html':
      return await minifyHTML(value)
    case 'css':
      return minifyCSS(value)
    case 'js':
      return minifyJS(value)
  }
}
