import { writeFileSync, readFileSync } from 'fs'
import { JSDOM } from 'jsdom'

// 19968
// 40869
// String.fromCharCode(40863, 40864, 40865, 40866, 40867, 40868, 40869, 40870)
// parseInt('4e00', 16)
// parseInt('9fa5', 16)

// fetch('https://www.hanyuguoxue.com/zidian/jianfan')
//   .then(res => res.text())
//   .then(res => {
//     writeFileSync('./jianfan.html', res)
//     const dom = new JSDOM(res).window.document
//     console.log(dom.querySelectorAll('zi-list-less'))
//     // console.log(dom.getElementsById('zi-list-less'))
//   })
const main = data => {
  const item = [
    ['一', '壹'],
    ['二', '贰'],
    ['三', '叁'],
    ['四', '肆'],
    ['五', '伍'],
    ['六', '陆'],
    ['七', '柒'],
    ['八', '捌'],
    ['九', '玖'],
    ['十', '拾']
  ]

  const addFn = liElems => {
    for (const el of liElems) {
      const jianti = el.querySelector('.jianti').textContent.trim()
      const fanti = el
        .querySelector('.fanti')
        .textContent.trim()
        .split(',')
        .map(txt => txt.trim())
      switch (jianti) {
        case '说':
          item.push([jianti, [fanti, '說']])
          return
      }

      item.push([jianti, fanti.length === 1 ? fanti[0] : fanti])
    }
  }
  const dom = new JSDOM(data).window.document
  for (const elem of dom.querySelectorAll('.content-card-body')) {
    addFn(elem.querySelectorAll('.zi-list-less li'))
    addFn(elem.querySelectorAll('.zi-list-jianfan li'))
  }

  writeFileSync('./jianfan.json', JSON.stringify(item, null, 2))
  console.log(min, max, '---item')
  // console.log(dom.getElementsByClassName('header-wrapper'))
}
main(readFileSync('./jianfan.html').toString())
