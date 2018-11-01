[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/teambit/relsym/tree/master.svg?style=svg)](https://circleci.com/gh/teambit/relsym/tree/master)

# relsym
A small utility that converts absolute symlinks to relative ones. Similar to [symlinks](https://github.com/brandt/symlinks) but in node.js.

### install
`npm install relsym` / 
`yarn add relsym`
### usage
Accepts either a folder or a symlink. If it receives a folder, it recursively converts all symlinks inside it.
```javascript
const relsym = require('relsym')
relsym('/path/to/my/folder')
// tada!
```

### use with care
This utility mutates the folder or file it is given. If you find a bug, please report it - or better yet, contribute a fix!

### contributing
Yes please!

### license
Apache License, Version 2.0
