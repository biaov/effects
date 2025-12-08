import { cpSync } from 'fs'
import { resolve } from 'path'

const outputDir = resolve(import.meta.dirname, 'dist')
const files = ['index.html', 'js', 'css/index.css']
files.forEach(name => {
  cpSync(resolve(import.meta.dirname, name), resolve(outputDir, name), { recursive: true })
})
