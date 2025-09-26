<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Tic Tac Toe</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Game History Sidebar -->
        <div class="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold text-gray-700">Game History</h2>
            <UButton
              v-if="gameHistory.length > 0"
              @click="clearAllHistory"
              color="red"
              variant="ghost"
              size="sm"
            >
              Clear All
            </UButton>
          </div>

          <div v-if="gameHistory.length === 0" class="text-gray-500 text-center py-8">
            No games played yet
          </div>

          <div v-else class="space-y-3 max-h-96 overflow-y-auto">
            <div
              v-for="(game, index) in gameHistory"
              :key="game.id"
              class="bg-gray-50 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <div class="font-medium">
                  Game #{{ gameHistory.length - index }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ game.winner === 'draw' ? 'Draw' : `${game.winner} won` }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ new Date(game.date).toLocaleDateString() }}
                </div>
              </div>
              <UButton
                @click="deleteGame(game.id)"
                color="red"
                variant="ghost"
                size="xs"
                icon="i-heroicons-trash"
              />
            </div>
          </div>
        </div>

        <!-- Game Area -->
        <div class="lg:w-2/3">
          <!-- Player Selection -->
          <div v-if="!gameStarted" class="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 class="text-2xl font-semibold mb-6">Choose Your Symbol</h2>
            <div class="flex justify-center gap-4">
              <UButton
                @click="startGame('X')"
                size="xl"
                class="text-2xl px-8 py-4"
                color="primary"
              >
                Play as X
              </UButton>
              <UButton
                @click="startGame('O')"
                size="xl"
                class="text-2xl px-8 py-4"
                color="green"
              >
                Play as O
              </UButton>
            </div>
          </div>

          <!-- Game Board -->
          <div v-else class="bg-white rounded-lg shadow-lg p-8">
            <div class="text-center mb-6">
              <div class="text-lg font-medium text-gray-700 mb-2">
                You are playing as: <span class="font-bold text-2xl">{{ playerSymbol }}</span>
              </div>
              <div class="text-xl font-semibold" :class="gameStatusColor">
                {{ gameStatus }}
              </div>
            </div>

            <!-- Tic Tac Toe Grid -->
            <div class="grid grid-cols-3 gap-2 max-w-md mx-auto mb-6">
              <button
                v-for="(cell, index) in board"
                :key="index"
                @click="makeMove(index)"
                :disabled="cell !== '' || gameOver"
                class="w-24 h-24 bg-gray-100 border-2 border-gray-300 rounded-lg text-4xl font-bold hover:bg-gray-200 disabled:cursor-not-allowed transition-colors"
                :class="{
                  'hover:bg-blue-100': cell === '' && !gameOver,
                  'bg-blue-50': cell === playerSymbol,
                  'bg-red-50': cell === computerSymbol
                }"
              >
                {{ cell }}
              </button>
            </div>

            <!-- Game Controls -->
            <div class="text-center">
              <UButton
                @click="resetGame"
                size="lg"
                color="gray"
                class="mr-4"
              >
                New Game
              </UButton>
              <UButton
                @click="backToSelection"
                size="lg"
                variant="outline"
              >
                Change Symbol
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Audio element for win sound -->
    <audio ref="winAudio" preload="auto">
      <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUcBTaH0fLNeSsFJnPD7+OZRA0PVbHm7q9ZEAA=" type="audio/wav" />
    </audio>
  </div>
</template>

<script setup lang="ts">
interface GameRecord {
  id: string;
  winner: string;
  date: string;
  playerSymbol: string;
}

// Reactive state
const gameStarted = ref(false)
const playerSymbol = ref('')
const computerSymbol = ref('')
const board = ref<string[]>(Array(9).fill(''))
const currentPlayer = ref('')
const gameOver = ref(false)
const winner = ref('')
const gameHistory = ref<GameRecord[]>([])
const winAudio = ref<HTMLAudioElement>()

// Computed properties
const gameStatus = computed(() => {
  if (!gameStarted.value) return ''
  if (gameOver.value) {
    if (winner.value === 'draw') return "It's a draw!"
    if (winner.value === playerSymbol.value) return 'You won! 🎉'
    return 'Computer won! 🤖'
  }
  return currentPlayer.value === playerSymbol.value ? 'Your turn' : 'Computer thinking...'
})

const gameStatusColor = computed(() => {
  if (!gameOver.value) return 'text-blue-600'
  if (winner.value === playerSymbol.value) return 'text-green-600'
  if (winner.value === 'draw') return 'text-yellow-600'
  return 'text-red-600'
})

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
]

// Load game history from cookies on mount
onMounted(() => {
  loadGameHistory()
})

// Functions
function startGame(symbol: string) {
  playerSymbol.value = symbol
  computerSymbol.value = symbol === 'X' ? 'O' : 'X'
  currentPlayer.value = 'X' // X always goes first
  gameStarted.value = true
  gameOver.value = false
  winner.value = ''
  board.value = Array(9).fill('')

  // If player chose O, computer makes first move
  if (playerSymbol.value === 'O') {
    nextTick(() => {
      setTimeout(makeComputerMove, 500)
    })
  }
}

function makeMove(index: number) {
  if (board.value[index] !== '' || gameOver.value || currentPlayer.value !== playerSymbol.value) return

  board.value[index] = playerSymbol.value

  if (checkWinner()) {
    gameOver.value = true
    winner.value = playerSymbol.value
    playWinSound()
    saveGameResult()
  } else if (board.value.every(cell => cell !== '')) {
    gameOver.value = true
    winner.value = 'draw'
    saveGameResult()
  } else {
    currentPlayer.value = computerSymbol.value
    setTimeout(makeComputerMove, 500)
  }
}

function makeComputerMove() {
  if (gameOver.value) return

  // Simple AI: try to win, block player, or random move
  let move = findBestMove()
  if (move === -1) {
    const emptyCells = board.value.map((cell, index) => cell === '' ? index : -1).filter(i => i !== -1)
    move = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  }

  if (move !== undefined && move !== -1) {
    board.value[move] = computerSymbol.value

    if (checkWinner()) {
      gameOver.value = true
      winner.value = computerSymbol.value
      saveGameResult()
    } else if (board.value.every(cell => cell !== '')) {
      gameOver.value = true
      winner.value = 'draw'
      saveGameResult()
    } else {
      currentPlayer.value = playerSymbol.value
    }
  }
}

function findBestMove(): number {
  // Check if computer can win
  for (let i = 0; i < 9; i++) {
    if (board.value[i] === '') {
      board.value[i] = computerSymbol.value
      if (checkWinner()) {
        board.value[i] = ''
        return i
      }
      board.value[i] = ''
    }
  }

  // Check if computer needs to block player
  for (let i = 0; i < 9; i++) {
    if (board.value[i] === '') {
      board.value[i] = playerSymbol.value
      if (checkWinner()) {
        board.value[i] = ''
        return i
      }
      board.value[i] = ''
    }
  }

  return -1
}

function checkWinner(): boolean {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination
    return board.value[a] !== '' &&
           board.value[a] === board.value[b] &&
           board.value[b] === board.value[c]
  })
}

function playWinSound() {
  if (winAudio.value) {
    winAudio.value.play().catch(() => {
      // Fallback: create a simple beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    })
  }
}

function resetGame() {
  board.value = Array(9).fill('')
  currentPlayer.value = 'X'
  gameOver.value = false
  winner.value = ''

  if (playerSymbol.value === 'O') {
    nextTick(() => {
      setTimeout(makeComputerMove, 500)
    })
  }
}

function backToSelection() {
  gameStarted.value = false
  playerSymbol.value = ''
  computerSymbol.value = ''
  board.value = Array(9).fill('')
  currentPlayer.value = ''
  gameOver.value = false
  winner.value = ''
}

function saveGameResult() {
  const gameRecord: GameRecord = {
    id: Date.now().toString(),
    winner: winner.value,
    date: new Date().toISOString(),
    playerSymbol: playerSymbol.value
  }

  gameHistory.value.unshift(gameRecord)
  saveGameHistory()
}

function deleteGame(gameId: string) {
  gameHistory.value = gameHistory.value.filter(game => game.id !== gameId)
  saveGameHistory()
}

function clearAllHistory() {
  gameHistory.value = []
  saveGameHistory()
}

function saveGameHistory() {
  if (process.client) {
    document.cookie = `tictactoe_history=${JSON.stringify(gameHistory.value)}; path=/; max-age=${365 * 24 * 60 * 60}`
  }
}

function loadGameHistory() {
  if (process.client) {
    const cookies = document.cookie.split(';')
    const historyCookie = cookies.find(cookie => cookie.trim().startsWith('tictactoe_history='))

    if (historyCookie) {
      try {
        const historyData = historyCookie.split('=')[1]
        gameHistory.value = JSON.parse(decodeURIComponent(historyData))
      } catch (error) {
        console.error('Error loading game history:', error)
        gameHistory.value = []
      }
    }
  }
}
</script>
