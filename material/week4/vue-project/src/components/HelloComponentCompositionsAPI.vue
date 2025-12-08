<script setup>

import {computed, ref} from "vue";

let n_user = ref("Jack")

function calculate() {
  return 2 + 3
}

let concatValue = computed({
  get: () => {
    return n_user.value + "_c_value_" + calculate()
  },
})
</script>

<template>
  <p>Hello {{ n_user }}</p>

  <p>What is 2 + 3?</p>
  <p>It is {{ calculate() }}</p>

  <p>Computed value is:</p><p>{{ concatValue }}}</p>
</template>

<style scoped>

</style>