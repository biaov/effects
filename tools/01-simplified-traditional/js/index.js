import { simplifiedTransformTraditional } from './utils.js'

const message = (value, type, el) => {
  el.classList.remove('error', 'success')
  type && el.classList.add(type)
  el.textContent = value
}

window.addEventListener('load', () => {
  const textarea = document.querySelector('.textarea')
  const buttons = document.querySelector('.buttons')
  const tips = document.querySelector('.tips')

  buttons.addEventListener('click', e => {
    if (!e.target.classList.contains('btn')) return
    const value = textarea.value
    if (!value) {
      message('请输入内容', 'error', tips)
      return
    }
    const { type } = e.target.dataset
    switch (type) {
      case 'simplified':
      case 'traditional': {
        const newValue = simplifiedTransformTraditional(value, type === 'traditional')
        textarea.value = newValue
        return
      }
      case 'clear':
        textarea.value = ''
        break
      case 'copy':
        navigator.clipboard.writeText(textarea.value).then(message.bind(null, '复制成功', 'success', tips)).catch(message.bind(null, '复制失败', 'error', tips))
        return
    }
    message('', '', tips)
  })
})
