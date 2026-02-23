<script lang="ts" setup>
import { ref } from "vue";
import CurrentRecord from "./components/CurrentRecord.vue";
import { useStore } from "./store";

const store = useStore();
</script>

<template>
    <div class="w-full px-5 bg-gray-100" v-if="!store.loading">
        <div class="grid h-screen gap-5">
            <CurrentRecord />
        </div>
    </div>
    <div v-else class="flex h-screen">
        <div class="p-5 m-auto rounded-lg">Widget laden...</div>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

html,
body,
#app {
    @apply h-screen w-screen bg-blue-50 overflow-x-hidden;
}
</style>
