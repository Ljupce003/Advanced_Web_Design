<script setup lang="ts">
import MyComponent from "@/views/MyComponent.vue";
import {ref} from "vue";

let strArr = ["Qwerty1","Qwerty2","Qwerty3","Qwerty4","Qwerty5","Qwerty6","Qwerty7","Qwerty8","Qwerty9",]
const showPar = ref(true);

function toggle() {
  console.log('Parent toggled, before:', showPar.value)
  showPar.value = !showPar.value
  console.log('Parent toggled, after:', showPar.value)
}

</script>


<template>
<div>

  <button @click="toggle"> Click to show/hide element</button>
  <MyComponent text="MyText" :arr="strArr" :showT="showPar.value" />
</div>
</template>


<style scoped>

</style>
