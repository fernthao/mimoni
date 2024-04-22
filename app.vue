<template>
  <div class="dark:bg-amber-100">
    <div class="w-fit text-6xl uppercase font-semibold tracking-wider my-3 mx-2 bg-gradient-to-r from-amber-600 to-orange-300 bg-clip-text text-transparent hover:from-orange-300 hover:to-amber-600 inline-block" >
        <i class="fa-solid fa-fire"></i>
        Save For that sh<span class="text-4xl">&#x1F495;</span>t
    </div>
    <hr class="h-px mb-10 bg-amber-200 border-0 dark:bg-amber-700"></hr>
  </div>  
  <div class="m-5">
    <div class="text-xl uppercase font-semibold tracking-wider my-3 mx-2 bg-gradient-to-r from-amber-600 to-orange-300 bg-clip-text text-transparent hover:from-orange-300 hover:to-amber-600 inline-block">
      Total points: {{ points }}
    </div>

    <div><GoalDialog :goalList="goals" @goal-added="addGoal"/></div>
    
    <!--List of goals-->
    <table class="table-auto m-3 mt-5 w-full text-left">
      <thead class="border-b border-neutral-500">
        <tr>
          <th class="p-4 border-r border-dotted border-neutral-500">Name</th>
          <th class="p-4 border-r border-dotted border-neutral-500">Description</th>
          <th class="p-4 border-r border-dotted border-neutral-500">Progress</th>
          <th class="p-4 border-r border-dotted border-neutral-500">Points</th>
          <th class="p-4 border-x border-dotted border-neutral-500">Status</th>
          <th class="p-4 ">Action</th>
        </tr>
      </thead>
      <tbody v-for="goal in goals" :key="goal.name">
        <tr class="border-b border-neutral-500">
          <td class="p-4 border-r border-dotted border-neutral-500">{{ goal.name }}</td>
          <td class="p-4 border-x border-dotted border-neutral-500">{{ goal.description }}</td>
          <td class="p-4 border-x border-dotted border-neutral-500">{{ goal.saved }}/{{ goal.target }}</td>
          <td class="p-4 border-x border-dotted border-neutral-500">{{ goal.target }}</td>
          
          <td class="p-4 border-x border-dotted border-neutral-500">
            <div v-if="goal.saved >= goal.target" class="w-44 rounded-lg flex items-center justify-center h-12 uppercase tracking-wider border-2 border-green-800 bg-green-500 text-white"> <i class="fa-solid fa-check pr-1"></i> Completed!</div>
            <div v-if="goal.saved < goal.target" class="w-44 rounded-lg flex items-center justify-center h-12 uppercase tracking-wider border-2 border-amber-800 bg-amber-500 text-white"> <i class="fa-solid fa-ellipsis pr-1"></i>Ongoing</div>
          </td>
          <td class="p-4 flex flex-row border-l border-dotted border-neutral-500" >
            <Update v-if="goal.saved < goal.target" :currentGoal="goal" @goal-editted="updateGoal"/>
            <button class="flex items-center justify-center w-1/2 px-6 h-12 uppercase font-semibold  tracking-wider border-2 border-black bg-neutral-300 text-black" @click.once="deleteGoal(goal)">
              Drop
            </button>
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
  const points = ref();
  async function getGoals() {
    const { data, pending, error, refresh } = await useFetch('/api/goals')
    
    goals.value = data.value
    let sum = 0;
    for (let i = 0; i < data.value.length; i++) {
        //if goal is completed
        if(data.value[i].saved >= data.value[i].target) {
          sum += data.value[i].target;
        }
    }
    points.value = sum;
  }
  onMounted(() =>{getGoals()})

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
    if (goal.saved >= goal.target) {
      toast.add({title: "Goal completed!", icon:"i-heroicons-check-circle", ui:{background: "bg-white dark:bg-green-950", ring: 'ring-1 ring-green-200 dark:ring-green-800'}})
    }
    else {
      toast.add({title: "Goal updated!", icon:"i-heroicons-check-circle", ui:{background: "bg-white dark:bg-green-950", ring: 'ring-1 ring-green-200 dark:ring-green-800'}})
    }
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