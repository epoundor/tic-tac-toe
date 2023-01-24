<script setup lang="ts">
import { type Ref, ref, computed, onMounted } from "vue";
import { socket } from "./socket";

type Board = string[][];
const player = ref("X");
const board: Ref<Board> = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

const CalculateWinner = (board: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

const winner = computed(() => CalculateWinner(board.value.flat()));

const MakeMove = (x: number, y: number) => {
  if (winner.value) return;

  if (board.value[x][y]) return;

  board.value[x][y] = player.value;

  player.value = player.value === "X" ? "O" : "X";
  console.log("deed");

  socket.emit("makeMove", board.value);
};

onMounted(() => {
  socket.on("makeMove", (b) => {
    console.log("makeMove");

    board.value = b;
  });
  socket.on("resetGame", (b) => {
    console.log("resetGame");

    board.value = b;
  });
});
const ResetGame = () => {
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player.value = "X";
  socket.emit("resetGame", board.value);
};
</script>

<template>
  <main class="pt-8 text-center">
    <h1 class="mb-8 text-3xl font-bold uppercase">Tic Tac Toe</h1>

    <h3 class="text-xl mb-4">Player {{ player }}'s turn</h3>

    <div class="flex flex-col items-center mb-8">
      <div v-for="(row, x) in board" :key="x" class="flex">
        <div
          v-for="(col, y) in row"
          :key="y"
          @click="MakeMove(x, y)"
          :class="`border border-white w-24 h-24 hover:bg-gray-700 flex items-center justify-center material-icons-outlined text-4xl cursor-pointer ${
            col === 'X' ? 'text-pink-500' : 'text-blue-400'
          }`"
        >
          {{ col === "X" ? "X" : col === "O" ? "O" : "" }}
        </div>
      </div>
    </div>

    <div class="text-center">
      <h2 v-if="winner" class="text-6xl font-bold mb-8">
        Player '{{ winner }}' wins!
      </h2>
      <button
        @click="ResetGame"
        class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300"
      >
        Reset
      </button>
    </div>
  </main>
</template>

<style>
body {
  @apply bg-gray-800 text-white;
}
</style>
