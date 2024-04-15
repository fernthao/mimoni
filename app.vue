<template>
  <button class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-amber-400 text-black" @click="addGoal">
    <i class = "fa-solid fa-plus"></i>
    Add a saving goal
  </button>
  <button class="px-6 h-12 uppercase tracking-wider border-2 border-black bg-amber-100 text-black" @click="updateGoal">Update</button>
  <div>{{ goals }}</div>
  <button class="uppercase border-2 border-black text-black" @click="deleteGoal">Delete</button>
</template>

<script setup>
  import { ref } from 'vue';

  //add goal -> CREATE
  async function addGoal(){
    const { addGoal } = await $fetch('/api/goals',{
      method: 'POST',
      body: {
        name: "Yay", 
        description: "To not screw up.", 
        saved: 645, 
        target: 1000
      }
    })
    getGoals();
  }

  //get goals -> READ
  const goals = ref([])
  async function getGoals() {
    const { data, pending, error, refresh } = await useAsyncData(
      'goals',
      () => $fetch('/api/goals')
    )
    goals.value = data.value
  }
  getGoals();

  //update goal -> UPDATE
  async function updateGoal(){
    const { updateGoal } = await $fetch('/api/goals',{
      method: 'PUT',
      body: {
        name: "Yay", 
        description: "Wut", 
        saved: 550, 
        target: 1000
      }
    })
    getGoals();
  }

  //delete goal -> DELETE
  async function deleteGoal(){
    const { deleteGoal } = await $fetch('/api/goals',{
      method: "DELETE",
      body: {
        name: "Yay"
      }
    })
    getGoals();
  }

</script>