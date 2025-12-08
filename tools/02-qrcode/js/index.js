import { QRCode } from './qrcode.js'
import jsQR from './jsqr.js'
import Jimp from './jimp.js'

window.addEventListener('load', () => {
  /**
   * 输入框节点
   */
  const textarea = document.querySelector('.textarea')
  /**
   * 二维码图片节点
   */
  const qrcodeNode = document.querySelector('.qrcode')

  /**
   * 复制按钮节点
   */
  const copyBtn = document.querySelector('.button--copy')

  // 输入框内容变化时，生成二维码
  textarea.addEventListener('input', e => {
    const { value } = e.target
    if (!value) {
      qrcodeNode.src = ''
      return
    }

    QRCode.toDataURL(e.target.value, { width: 256, height: 256, margin: 2 }, (error, url) => {
      if (error) return
      qrcodeNode.src = url
    })
  })

  /**
   * 下载按钮节点
   */
  const downloadBtn = document.querySelector('.button--download')
  // 下载二维码图片
  downloadBtn.addEventListener('click', () => {
    if (!qrcodeNode.src) {
      alert('请先生成二维码')
      return
    }
    const a = document.createElement('a')
    a.href = qrcodeNode.src
    a.download = 'qrcode.png'
    a.click()
  })

  // 复制内容
  copyBtn.addEventListener('click', () => {
    if (!textarea.value) {
      alert('请先输入内容')
      return
    }
    textarea.select()
    navigator.clipboard.writeText(textarea.value)
  })
  // 解析二维码
  const parseBtn = document.querySelector('.button--parse .input')
  parseBtn.addEventListener('change', () => {
    const file = parseBtn.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async e => {
      try {
        const res = await Jimp.read(e.target.result)
        const { data, width, height } = res.bitmap
        const jsqrRes = await jsQR(data, width, height)
        textarea.value = jsqrRes.data
      } catch (error) {
        console.log(error)
        alert('解析失败')
      }
    }
  })

  // 扫描二维码
  const scanBtn = document.querySelector('.button--scan')
  const videoContainer = document.querySelector('.video-container')
  const video = videoContainer.querySelector('.video')
  const canvas = document.querySelector('.canvas')
  let timer = null
  /**
   * 扫描二维码内容
   */
  const scanQrcode = () => {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const jsqrRes = jsQR(imageData.data, canvas.width, canvas.height, { inversionAttempts: 'dontInvert' }) // 解析二维码内容
    if (jsqrRes) {
      textarea.value = jsqrRes.data
      videoContainer.style.display = 'none'
      cancelAnimationFrame(timer)
    } else {
      timer = requestAnimationFrame(scanQrcode)
    }
  }
  const handleScan = async () => {
    if (!navigator.mediaDevices) {
      alert('该浏览器不支持扫描二维码，请升级浏览器或者更换浏览器')
      return
    }
    try {
      videoContainer.style.display = 'flex'
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      video.srcObject = stream
      // video.src = './1.mp4' // 测试视频
      video.muted = true
      video.addEventListener('loadedmetadata', () => {
        video.play()
        scanQrcode()
      })
    } catch (error) {
      videoContainer.style.display = 'none'
      console.log(error)
      alert('扫描失败')
    }
  }
  scanBtn.addEventListener('click', handleScan) // 点击扫码
  // 测试
  // handleScan()
})
