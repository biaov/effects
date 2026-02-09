import { compressCode } from './utils.js'

const message = (value, type, el) => {
  el.classList.remove('error', 'success')
  type && el.classList.add(type)
  el.textContent = value
}

window.addEventListener('load', () => {
  const textarea = document.querySelector('.textarea')
  const buttons = document.querySelector('.buttons')
  const tips = document.querySelector('.tips')

  buttons.addEventListener('click', async e => {
    if (!e.target.classList.contains('btn')) return
    const value = textarea.value
    if (!value) {
      message('请输入内容', 'error', tips)
      return
    }
    const { type } = e.target.dataset
    switch (type) {
      case 'compress': {
        const newValue = await compressCode(value)
        textarea.value = newValue
        return
      }
      case 'clear':
        textarea.value = ''
        break
      case 'copy':
        navigator.clipboard
          .writeText(textarea.value)
          .then(message.bind(null, '复制成功', 'success', tips))
          .catch(message.bind(null, '复制失败', 'error', tips))
        return
    }
    message('', '', tips)
  })
})
