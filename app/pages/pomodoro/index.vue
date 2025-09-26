<template>
  <div class="flex flex-col items-center` min-h-screen bg-white">
    <h1 class="text-3xl font-bold mb-6">Pomodoro Timer</h1>
    <div class="mb-4 flex gap-2 items-center">
      <label for="duration" class="text-lg">Duration:</label>
      <select id="duration" v-model="selectedDuration" class="border rounded px-2 py-1">
        <option v-for="option in durationOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="text-5xl font-mono mb-6">{{ formattedTime }}</div>
    <div class="flex gap-4">
      <button @click="startTimer" :disabled="isRunning" class="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50">Start</button>
      <button @click="stopTimer" :disabled="!isRunning" class="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50">Stop</button>
      <button @click="resetTimer" class="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
    </div>
    <audio ref="audioRef" src="https://cdn.pixabay.com/audio/2022/10/16/audio_12bfe6b2b7.mp3" preload="auto"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const durationOptions = Array.from({ length: 60 }, (_, i) => {
  const sec = 60 - i
  return {
    value: sec,
    label: `${sec} ${sec === 1 ? 'second' : 'seconds'}`
  }
}).concat(
  Array.from({ length: 59 }, (_, i) => {
    const min = i + 2
    return {
      value: min * 60,
      label: `${min} minutes`
    }
  })
)

const selectedDuration = ref(1500) // default 25 min
const timeLeft = ref(selectedDuration.value)
const isRunning = ref(false)
let timer: number | null = null
const audioRef = ref<HTMLAudioElement | null>(null)

const formattedTime = computed(() => {
  const min = Math.floor(timeLeft.value / 60)
  const sec = timeLeft.value % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
})

watch(selectedDuration, (val) => {
  timeLeft.value = val
  stopTimer()
})

function startTimer() {
  if (isRunning.value || timeLeft.value <= 0) return
  isRunning.value = true
  timer = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      stopTimer()
      playSound()
    }
  }, 1000)
}

function stopTimer() {
  isRunning.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function resetTimer() {
  stopTimer()
  timeLeft.value = selectedDuration.value
}

function playSound() {
  if (audioRef.value) {
    audioRef.value.currentTime = 0
    audioRef.value.play()
  }
}
</script>

