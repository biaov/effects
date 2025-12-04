;(function (chinese) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  chinese = chinese.split('')

  const fontSize = 10
  const columns = canvas.width / fontSize
  const drops = []

  for (let x = 0; x < columns; x++) {
    drops[x] = 1
  }

  setInterval(function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#0F0'
    ctx.font = fontSize + 'px Arial'
    for (let i = 0; i < drops.length; i++) {
      const text = chinese[Math.floor(Math.random() * chinese.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
      drops[i]++
    }
  }, 50)

  const body = document.querySelector('body')
  body.appendChild(canvas)
})("0123456789qwertyuiopasdfghjklzxcvbnm,./;'[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?")
