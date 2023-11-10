/**
 * 圆球
 */
const useCircelBall = (option = {}) => {
  /**
   * 默认小球数量
   */
  const defaultNum = 99

  const { container, num = defaultNum, open = true } = option

  /**
   * 绘制满屏小球
   */
  const drawCircleBall = (canvas, num = defaultNum) => {
    /**
     * 设置 canvas 的 size
     */
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const ctx = canvas.getContext('2d')

    // 绘制小球
    class Ball {
      constructor() {
        this.x = this.random(0, canvas.width)
        this.y = this.random(0, canvas.height)
        this.color = this.rgb()
        this.r = this.random(1, 15) / 10
        this.opacity = Math.random()
        this.render()
      }

      /**
       * 绘制小球路径
       */
      render() {
        const { x, y, r, color, opacity } = this
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = opacity
        ctx.fill()
        ctx.restore()
      }

      /**
       * 随机生成颜色
       */
      rgb() {
        const { random } = this
        return 'rgb(' + random(30, 140) + ',' + random(80, 240) + ',' + 255 + ')'
      }

      /**
       * 范围随机数
       */
      random(min, max) {
        return Math.ceil(Math.random() * (max - min + 1) + min)
      }

      /**
       * 更新小球位置
       */
      update() {
        this.x = this.random(0, canvas.width)
        this.y = this.random(0, canvas.height)
        this.color = this.rgb()
        this.r = this.random(1, 15) / 10
        this.opacity = Math.random()
        this.render()
      }
    }

    /**
     * 开启小球绘制
     */
    const oBall = new Ball()
    for (let i = 0; i < num; i++) {
      oBall.update()
    }
  }

  /**
   * 绘制鼠标跟随特效
   */
  const drawBall = canvas => {
    /**
     * 设置 canvas 的 size
     */
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    const ctx = canvas.getContext('2d')

    // 绘制小球
    class Ball {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.color = this.rgb()
        this.r = 15
        this.opacity = 1
      }

      /**
       * 绘制小球路径
       */
      render() {
        const { x, y, r, color, opacity } = this
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = opacity
        ctx.fill()
        ctx.restore()
      }

      /**
       * 随机生成颜色
       */
      rgb() {
        const { random } = this
        return 'rgb(' + random(30, 140) + ',' + random(80, 240) + ',' + random(180, 250) + ')'
      }

      /**
       * 范围随机数
       */
      random(min, max) {
        return Math.ceil(Math.random() * (max - min + 1) + min)
      }
    }

    /**
     * 移动小球
     */
    class MoveBall extends Ball {
      constructor(x, y) {
        super(x, y)
        this.stepX = Math.floor(Math.random() * 5 + 1)
        this.stepY = Math.floor(Math.random() * 5 + 1)
        this.stepR = Math.floor(Math.random() * 5 + 1)
      }

      /**
       * 更新小球位置
       */
      update() {
        this.x += this.stepX
        this.y += this.stepY
        this.r -= this.stepR
        this.opacity -= 0.1
        if (this.r < 0 || this.opacity < 0) {
          this.r = 0
          this.opacity = 0
        }
      }
    }

    /**
     * 保存小球对象
     */
    const ballArr = []
    // 鼠标移动事件
    canvas.addEventListener('mousemove', ev => {
      const { offsetX, offsetY } = ev || window.event
      ballArr.push(new MoveBall(offsetX, offsetY))
    })

    /**
     * 定时执行绘制
     */
    let timer = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ballArr.forEach(elem => {
        elem.render()
        elem.update()
      })
    }, 50)
    timer = null
  }

  if (open && container) {
    drawCircleBall(container, num)
    drawBall(container)
  }

  return { drawCircleBall, drawBall }
}

const { drawCircleBall, drawBall } = useCircelBall({ open: false })
window.onload = () => {
  const [ball, circleBall] = document.querySelectorAll('.canvas')
  drawCircleBall(ball, 299)
  drawBall(circleBall)
}
