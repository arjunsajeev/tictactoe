let boardState = Array.from(new Array(9).keys())

const player = 'X',
  ai = 'O'

const board = document.querySelector('.board')
const messageEl = document.querySelector('.message')
messageEl.querySelector('button').addEventListener('click', handleReset)

// Game

function handleReset() {
  messageEl.style.visibility = 'hidden'
  messageEl.classList.remove('success', 'failure')
  board.classList.remove('animated', 'wobble')
  clearBoard()
  start()
}

function start() {
  board.addEventListener('click', handleBoardClick)
  render()
}

function handleGameEnd() {
  if (hasWon(boardState, player)) {
    displaySuccessMessage('You won. You saved the world.')
    return true
  } else if (hasWon(boardState, ai)) {
    board.classList.add('animated', 'wobble')
    displayFailureMessage('You lost. Skynet is taking over.')
    return true
  } else if (isBoardFull(boardState)) {
    displayMessage('Tie. The war is not over yet')
    return true
  }
  return false
}

// Board

const isBoardFull = board => getAvailableSpots(board).length === 0

function clearBoard() {
  boardState = Array.from(new Array(9).keys())
}

function handleBoardClick(e) {
  if (e.target.textContent === 'X' || e.target.textContent === 'O') {
    return
  }
  let { id } = e.target
  boardState[id] = player
  render()
  if (handleGameEnd()) {
    render()
    return
  }
  const aiMove = minmax(boardState.slice(), ai)
  boardState[aiMove.index] = ai
  console.log('AI MOVE :' + aiMove.index)
  render()
  handleGameEnd()
}

function updateCell(index, content) {
  document.getElementById(index).textContent = content
}

function getCellByIndex(index) {
  return document.getElementById(index)
}

function render() {
  boardState.forEach((cell, i) => {
    cell = typeof cell === 'number' ? '' : cell
    updateCell(i, cell)
  })
  console.log('Rendered')
}

start()

//displayMessage

function displayMessage(message, type = 'info') {
  board.removeEventListener('click', handleBoardClick, false)
  messageEl.querySelector('p').textContent = message
  messageEl.classList.add(type)
  messageEl.style.visibility = 'visible'
}

function displaySuccessMessage(message) {
  displayMessage(message, 'success')
}

function displayFailureMessage(message) {
  displayMessage(message, 'failure')
}
