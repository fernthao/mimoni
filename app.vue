<template>
  <div class="dark:bg-amber-100">
    <div class="text-6xl uppercase font-semibold tracking-wider my-3 mx-2 bg-gradient-to-r from-amber-600 to-orange-300 bg-clip-text text-transparent hover:from-orange-300 hover:to-amber-600 inline-block" >
        <i class="fa-solid fa-fire"></i>
        Save For that sh<span class="text-4xl">&#x1F495;</span>t
    </div>
    <hr class="h-px mb-10 bg-amber-200 border-0 dark:bg-amber-700"></hr>
  </div>  
  <div class="m-5">
    <div><GoalDialog @goal-added="addGoal"/></div>
    
    <!--List of goals-->
    <table class="table-auto m-3 w-full text-left">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Progress</th>
          <th>Points</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-for="goal in goals">
        <tr>
          <td>{{ goal.name }}</td>
          <td>{{ goal.description }}</td>
          <td>{{ goal.saved }}/{{ goal.target }}</td>
          <td>{{ goal.target }}</td>
          <td>
            <Update :currentGoal="goal" @goal-editted="updateGoal"/>
            <button class="m-1 px-6 h-12 uppercase tracking-wider border-2 border-black bg-neutral-300 text-black" @click="deleteGoal(goal)">Drop</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>  
  <UNotifications />
</template>

<script setup>
  import { ref,  onMounted } from 'vue';
  import Update  from '../components/Update.vue';
  import GoalDialog from '../components/GoalDialog.vue';

  const toast = useToast()

  //add goal -> CREATE
  async function addGoal(goal){
    const { addGoal } = await $fetch('/api/goals',{
      method: 'POST',
      body: {
        name: goal.goalName, 
        description: goal.description, 
        saved: goal.saved, 
        target: goal.target
      }
    })
    getGoals();
    toast.add({title: "Added a new goal!", icon:"i-heroicons-check-circle", ui:{background: "bg-white dark:bg-green-950", ring: 'ring-1 ring-green-200 dark:ring-green-800'}})
  }

  //get goals -> READ
  const goals = ref();
  async function getGoals() {
    const { data, pending, error, refresh } = await useFetch('/api/goals')
    
    goals.value = data.value
  }
  onMounted(() => getGoals())

  //update goal -> UPDATE
  async function updateGoal(goal){
    const { updateGoal } = await $fetch('/api/goals',{
      method: 'PUT',
      body: {
        name: goal.name, 
        description: goal.description, 
        saved: goal.saved, 
        target: goal.target
      }
    })
    getGoals();
    toast.add({title: "Goal updated!", icon:"i-heroicons-check-circle", ui:{background: "bg-white dark:bg-green-950", ring: 'ring-1 ring-green-200 dark:ring-green-800'}})
  }

  //delete goal -> DELETE
  async function deleteGoal(goal){
    const { deleteGoal } = await $fetch('/api/goals',{
      method: "DELETE",
      body: {
        name: goal.name
      }
    })
    getGoals();
    toast.add({title: "Goal deleted!", icon:"i-heroicons-check-circle", ui:{background: "bg-white dark:bg-green-950", ring: 'ring-1 ring-green-200 dark:ring-green-800'}})
  }

</script>