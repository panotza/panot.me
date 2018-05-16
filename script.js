document.onkeypress = getPrintableKey
document.onkeydown = getUniKey

const terminal = document.getElementById('terminal')
let lastLine = terminal.lastElementChild
let input = ''

function getPrintableKey (e) {
  if (e.key === 'Enter') return
  input = input + e.key
  updateScreen()
}

function getUniKey (e) {
  parseKey(e.key)
}

function updateScreen () {
  lastLine.innerHTML = input + '<span></span>'
  updateScroll()
}

function updateScroll () {
  terminal.scrollTop = terminal.scrollHeight
}

function parseKey (key) {
  switch (key) {
    case 'Enter':
      const inputArgs = input.split(' ')
      parseCmd(...inputArgs)
      input = ''
      break
    case 'Backspace':
      input = input.slice(0, input.length - 1)
      updateScreen()
      break
    case 'ArrowUp':
      // TODO: implement
      break
    default:
  }
}

function parseCmd (cmd, ...args) {
  switch (cmd) {
    case 'help':
      help(...args)
      break
    case 'ls':
      ls(...args)
      break
    case 'cat':
      cat(...args)
      break
    case '':
      println('')
      break
    default:
      output(`Unknow command ${cmd}`)
  }
}

function println (msg, isOutput = false) {
  lastLine.innerHTML = lastLine.innerHTML.replace('<span></span>', '')
  let newLine = document.createElement('div')
  newLine.innerHTML = msg
  if (isOutput) {
    newLine.className = 'output'
  }
  terminal.appendChild(newLine)
  lastLine = newLine
}

function output (msg) {
  println(msg, true)
  println('')
}

// cmd function
function help () {
  output(`
  <div class="help">
    <div>ls</div><div>list directory contents</div>
    <div>cat</div><div>concatenate and print files</div>
  </div>
`)
}

function cat (...args) {
  switch (args[0]) {
    case 'profile':
      output('name: Panot Wongkhot')
      break
    case 'contact':
      output('panot.wongkhot@gmail.com')
      break
    default:
      output('file not found.')
  }
}

function ls (...args) {
  output('profile contact projects')
}
