<template>
  <button class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-amber-400 text-black">
    <i class = "fa-solid fa-plus"></i>
    Add a saving goal
  </button>
  <div>{{ goals }}</div>
</template>

<script setup>
  import { ref } from 'vue';

  const goals = ref([])

  //get goals
  const { data, pending, error, refresh } = await useAsyncData(
    'goals',
    () => $fetch('/api/goals')
  )
  goals.value = data.value
</script>