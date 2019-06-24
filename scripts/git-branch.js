'use strict'
const fs = require('fs')
const path = require('path')
const util = require('util')

function parseBranch(buf) {
  const match = /ref: refs\/heads\/([^\n]+)/.exec(buf.toString())
  return match ? match[1] : null
}

function gitHeadPath(cwd) {
  const filepath = path.join(process.cwd(), '.git/HEAD')
  if (!fs.existsSync(filepath)) {
    throw new Error('.git/HEAD does not exist')
  }
  return filepath
}

const gitBranch = function() {
  return parseBranch(fs.readFileSync(gitHeadPath()))
}

module.exports = gitBranch
