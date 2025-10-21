<script setup lang="ts">
const props = defineProps<{
  text: string,
  arr: string[],
  showT: boolean
}>();
</script>



<template>
  <p>
    The value inside the variable 'text' is: {{ text }}
  </p>

  <p v-for="str in arr">{{ str }}</p>

  <p v-if="showT">
    THis is shown only if 'showT' is true
  </p>

</template>

<style scoped>

</style>
