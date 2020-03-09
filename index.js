const path = require('path')
const fs = require('fs')

module.exports = function relsym (target) {
  const lstat = fs.lstatSync(target)
  const isSymlink = lstat.isSymbolicLink()
  const isDir = lstat.isDirectory()
  if (isSymlink) {
    const containingFolder = path.dirname(target)
    const linkTarget = fs.readlinkSync(target)
    const realTarget = fs.realpathSync(path.resolve(containingFolder, linkTarget))
    const rel = path.relative(containingFolder, realTarget)
    fs.unlinkSync(target)
    fs.symlinkSync(rel, target)
  } else if (isDir) {
    const files = fs.readdirSync(target)
    files.forEach(file => {
      relsym(path.join(target, file))
    })
  }
}
