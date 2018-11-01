const path = require('path')
const test = require('tape')
const fs = require('fs')
const os = require('os')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const relsym = require('../')

test('can recursively convert absolute to relative symlinks', t => {
  t.plan(2)
  const sandbox = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`)
  try {
    const firstTarget = path.join(sandbox, 'foo', 'bar', 'first-target')
    const secondTarget = path.join(sandbox, 'bar', 'foo', 'second-target')
    const firstLink = path.join(sandbox, 'first-target')
    const secondLink = path.join(sandbox, 'foo', 'bar', 'second-target')
    mkdirp.sync(firstTarget)
    mkdirp.sync(secondTarget)
    fs.symlinkSync(firstTarget, firstLink)
    fs.symlinkSync(secondTarget, secondLink)
    relsym(sandbox)

    t.equals(fs.readlinkSync(firstLink), 'foo/bar/first-target')
    t.equals(fs.readlinkSync(secondLink), '../../bar/foo/second-target')

    rimraf.sync(sandbox)
    t.end()
  } catch (e) {
    t.fail(e.message)
    rimraf.sync(sandbox)
    t.end()
  }
})

test('can convert absolute to relative single file', t => {
  t.plan(1)
  const sandbox = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`)
  try {
    const firstTarget = path.join(sandbox, 'foo', 'bar', 'first-target')
    const firstLink = path.join(sandbox, 'first-target')
    mkdirp.sync(firstTarget)
    fs.symlinkSync(firstTarget, firstLink)
    relsym(firstLink)

    t.equals(fs.readlinkSync(firstLink), 'foo/bar/first-target')

    rimraf.sync(sandbox)
    t.end()
  } catch (e) {
    t.fail(e.message)
    rimraf.sync(sandbox)
    t.end()
  }
})

test('properly handles invalid input', t => {
  t.plan(1)
  t.throws(() => relsym('foo'), /ENOENT/, 'descriptive error thrown')
})
