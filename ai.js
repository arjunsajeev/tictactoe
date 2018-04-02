const humanPlayer = 'X'
const aiPlayer = 'O'

const getAvailableSpots = board =>
  board.filter(spot => spot != 'X' && spot != 'O')

const hasWon = (board, player) =>
  (board[0] == player && board[1] == player && board[2] == player) ||
  (board[3] == player && board[4] == player && board[5] == player) ||
  (board[6] == player && board[7] == player && board[8] == player) ||
  (board[0] == player && board[3] == player && board[6] == player) ||
  (board[1] == player && board[4] == player && board[7] == player) ||
  (board[2] == player && board[5] == player && board[8] == player) ||
  (board[0] == player && board[4] == player && board[8] == player) ||
  (board[2] == player && board[4] == player && board[6] == player)

function minmax(board, player) {
  // Check terminal states
  let availableSpots = getAvailableSpots(board)
  if (hasWon(board, humanPlayer)) {
    return {
      score: -10
    }
  } else if (hasWon(board, aiPlayer)) {
    return {
      score: 10
    }
  } else if (availableSpots.length === 0) {
    return {
      score: 0
    }
  }

  // Collect moves
  let moves = []

  for (let i = 0; i < availableSpots.length; i++) {
    let move = {}
    move.index = availableSpots[i]
    board[availableSpots[i]] = player

    // Call minmax as the opponent
    if (player === aiPlayer) {
      let result = minmax(board, humanPlayer)
      move.score = result.score
    } else {
      let result = minmax(board, aiPlayer)
      move.score = result.score
    }

    // Reset board
    board[availableSpots[i]] = move.index

    moves.push(move)
  }

  let bestMove
  if (player === aiPlayer) {
    let bestScore = -10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 10000
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove]
}
