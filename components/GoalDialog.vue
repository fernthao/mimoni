<template>
    <button class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-amber-400 text-black" @click="isOpen=true">
      <i class = "fa-solid fa-plus"></i>
      Add a saving goal
    </button>
    <Dialog  :open="isOpen" @close="setIsOpen">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div> 

        <!-- Full-screen container to center the panel                                                  -->
        <div class="fixed inset-0 flex w-screen items-center justify-center p-2">
            <DialogPanel class="w-1/2 p-2 bg-amber-100 border rounded-lg border-amber-200 shadow sm:p-6 md:p-8 dark:bg-neutral-800 dark:border-amber-700">
                <DialogTitle class="flex flex-row text-xl font-medium text-amber-900 dark:text-white">
                    <div class="justify-self-start">Add goal</div> 
                    <button class="self-center ml-auto hover:text-amber-500"><i class="fa-solid fa-xmark" @click="isOpen=false"></i></button>
                </DialogTitle>
                    
                <form @submit.prevent="submitted" class="space-y-6 mt-4" >
                    
                    <div>
                        <label for="goalName" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                            Name *
                        </label>
                        <input v-model="goal.goalName" type="text" name="goalName" id="goalName" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-white" placeholder="Saving goal" required />
                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                            Description
                        </label>
                        <input v-model="goal.description" type="text" name="description" id="description" placeholder="Describe your goal" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-white" />
                    </div>
                    <div>
                        <label for="amount" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                            Amount ($) *
                        </label>
                        <input v-model="goal.target" type="number" name="amount" id="amount" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:text-white" />
                    </div>
                    
                    <button type="submit" class="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:ring-amber-700">
                        Add goal
                    </button>
                </form>
            </DialogPanel>
        </div>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

const props = defineProps({goalList: Array})

const emit = defineEmits(['goalAdded'])

const isOpen = ref(false);
function setIsOpen(value) {
    isOpen.value = value
}

const goal = ref({
    goalName: "",
    description: "",
    saved: 0,
    target: 0,
})

function goalExisted(name) {
  for (let i = 0; i < props.goalList.length; i++) {
    if (props.goalList[i].name == name) return true;
  }
}
const toast = useToast()
function submitted() {
    if (goalExisted(goal.value.goalName)) {toast.add({title: "Goal existed", icon:"i-heroicons-x-circle", color:"red", ui:{background: "bg-white dark:bg-red-950", ring: 'ring-1 ring-red-200 dark:ring-red-800'}})}
    if (goal.value.goalName == '') {toast.add({title: "Goal name is required", icon:"i-heroicons-x-circle", color:"red", ui:{background: "bg-white dark:bg-red-950", ring: 'ring-1 ring-red-200 dark:ring-red-800'}})}
    if (goal.value.target == '') {toast.add({title: "Amount is required", icon:"i-heroicons-x-circle", color:"red", ui:{background: "bg-white dark:bg-red-950", ring: 'ring-1 ring-red-200 dark:ring-red-800'}})}
    if (goal.value.target <= 0) {toast.add({title: "Amount has to be positive", icon:"i-heroicons-x-circle", color:"red", ui:{background: "bg-white dark:bg-red-950", ring: 'ring-1 ring-red-200 dark:ring-red-800'}})}

    const valid =
        !goalExisted(goal.value.goalName) &&
        goal.value.goalName != '' &&
        goal.value.target != '' &&
        goal.value.target > 0;
    if (valid) {
        emit('goalAdded', goal.value)
        setIsOpen(false)
        goal.value = {
            goalName: "",
            description: "",
            saved: 0,
            target: 0,
        }
    }
}

</script>
