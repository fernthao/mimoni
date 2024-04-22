<!-- <template>
    <button class="px-6 h-12 uppercase tracking-wider border-2 border-black bg-amber-100 text-black" @click="isOpen=true">
      Update
    </button>
    <Dialog  :open="isOpen" @close="setIsOpen">
        //The backdrop, rendered as a fixed sibling to the panel container 
        <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div> 

        //Full-screen container to center the panel                                                         
        <div class="fixed inset-0 flex w-screen items-center justify-center p-2">
            <DialogPanel class="w-1/2 p-2 bg-amber-100 border rounded-lg border-amber-200 shadow sm:p-6 md:p-8 dark:bg-neutral-800 dark:border-amber-700">
                <DialogTitle class="flex flex-row text-xl font-medium text-amber-900 dark:text-white">
                    <div class="justify-self-start">Update goal</div> 
                    <button class="self-center ml-auto hover:text-amber-500"><i class="fa-solid fa-xmark" @click="isOpen=false"></i></button>
                </DialogTitle>
                    
                <form @submit.prevent="submitted" class="space-y-6 mt-4" >
                    
                    <div>
                        <label for="goalName" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                            Name 
                        </label>
                        <input disabled v-model="goal.name" type="text" name="goalName" id="goalName" class="bg-amber-50 border border-amber-300 text-neutral-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-neutral-400" placeholder="Saving goal" required />
                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                            Description
                        </label>
                        <input v-model="goal.description" type="text" name="description" id="description" placeholder="Describe your goal" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-white" />
                    </div>
                    <div>
                        <label for="saved" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                            Amount saved ($) *
                        </label>
                        <input v-model="goal.saved" type="number" name="saved" id="saved" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:text-white" />
                    </div>
                    <div>
                        <label for="target" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                            Target amount ($) *
                        </label>
                        <input v-model="goal.target" type="number" name="target" id="target" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:text-white" />
                    </div>
                    
                    <button type="submit" class="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:ring-amber-700">
                        Update goal
                    </button>
                </form>
            </DialogPanel>
        </div>
    </Dialog>
</template> -->


<template>
    <button class="w-1/2 flex items-center justify-center px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-amber-400 text-black" @click="isOpen=true">
        Update
    </button>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="isOpen">
        <!--
            Background backdrop, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 bg-black bg-opacity-30 transition-opacity"> </div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <!--
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-amber-100 border-amber-200 dark:bg-neutral-800 dark:border-amber-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div class="flex flex-row text-xl font-medium text-amber-900 dark:text-white">
                            <div class="justify-self-start">Update goal</div> 
                            <button class="self-center ml-auto hover:text-amber-500"><i class="fa-solid fa-xmark" @click="closeDialog"></i></button>
                        </div>
                            
                        <form @submit.prevent="submitted" class="space-y-6 mt-4" >
                            <div>
                                <label for="goalName" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                                    Name 
                                </label>
                                <input disabled v-model="goal.name" type="text" name="goalName" id="goalName" class="bg-amber-50 border border-amber-300 text-neutral-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-neutral-400" placeholder="Saving goal" required />
                            </div>
                            <div>
                                <label for="description" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                                    Description
                                </label>
                                <input v-model="goal.description" type="text" name="description" id="description" placeholder="Describe your goal" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-white" />
                            </div>
                            <div>
                                <label for="saved" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                                    Amount saved ($) *
                                </label>
                                <input v-model="goal.saved" type="number" name="saved" id="saved" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:text-white" />
                            </div>
                            <div>
                                <label for="target" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                                    Target amount ($) *
                                </label>
                                <input v-model="goal.target" type="number" name="target" id="target" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:text-white" />
                            </div>
                            
                            <button type="submit" class="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:ring-amber-700">
                                Update goal
                            </button>
                        </form>                       
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
//import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

const emit = defineEmits(['goalEditted'])
const props = defineProps({currentGoal: Object})

const isOpen = ref(false);
function setIsOpen(value) {
    isOpen.value = value
}

const goal = ref({
    name: props.currentGoal.name,
    description: props.currentGoal.description,
    saved: props.currentGoal.saved,
    target: props.currentGoal.target
})

function closeDialog() {
    setIsOpen(false);
    goal.value = {
        name: props.currentGoal.name,
        description: props.currentGoal.description,
        saved: props.currentGoal.saved,
        target: props.currentGoal.target
    }
}

const toast = useToast()

function submitted() {
    const valid = goal.value.target !== '' && goal.value.saved !== '' && goal.value.target > 0 && goal.value.saved >= 0;
    if (goal.value.target <= 0) {toast.add({title: "Amount has to be positive", icon:"i-heroicons-check-circle", color:"red", ui:{background: "bg-white dark:bg-red-950", ring: 'ring-1 ring-red-200 dark:ring-red-800'}})}
    if (goal.value.saved < 0) {toast.add({title: "Amount has to be non-negative", icon:"i-heroicons-check-circle", color:"red", ui:{background: "bg-white dark:bg-red-950", ring: 'ring-1 ring-red-200 dark:ring-red-800'}})}
    if (goal.value.target === '' || goal.value.saved === '') {toast.add({title: "Amount is required", icon:"i-heroicons-check-circle", color:"red", ui:{background: "bg-white dark:bg-red-950", ring: 'ring-1 ring-red-200 dark:ring-red-800'}})}
    if(valid) {
        emit('goalEditted', goal.value);
        setIsOpen(false)
    }
}
</script>