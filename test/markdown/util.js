import fs from 'fs-extra'
import LRU from 'lru-cache'
import path from 'path'

const cache = LRU({ max: 1000 })

export function Md () {
  const md = require('markdown-it')({
    html: true,
    highlight: require('@/markdown/highlight.js')
  })
  return md
}

export async function getFragment (name) {
  let content = cache.get(name)
  if (content) {
    return content
  }
  const target = path.resolve(__dirname, `fragments/${name}.md`)
  content = await fs.readFile(target, 'utf-8')
  cache.set(name, content)
  return content
}
