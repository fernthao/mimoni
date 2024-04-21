<template>
    <button class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-amber-400 text-black" @click="isOpen=true">
      <i class = "fa-solid fa-plus"></i>
      Add a saving goal
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
                            <div class="justify-self-start">Add goal</div> 
                            <button class="self-center ml-auto hover:text-amber-500"><i class="fa-solid fa-xmark" @click="isOpen=false"></i></button>
                        </div>
                            
                        <form @submit.prevent="submitted" class="space-y-6 mt-4" >
                            
                            <div>
                                <label for="goalName" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                                    Name *
                                </label>
                                <input v-model="goal.goalName" type="text" name="goalName" id="goalName" class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-white" placeholder="What are you saving for..." required />
                            </div>
                            <div>
                                <label for="description" class="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                                    Description
                                </label>
                                <input v-model="goal.description" type="text" name="description" id="description" placeholder="More details..." class="bg-amber-50 border border-amber-300 text-amber-900 text-sm focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-neutral-600 dark:border-amber-500 dark:placeholder-neutral-400 dark:text-white" />
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
function submitted() {
    emit('goalAdded', goal.value)
    setIsOpen(false)
}

</script>