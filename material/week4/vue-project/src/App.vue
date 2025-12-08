<script setup>
import MyComponent from './components/MyComponent.vue';
import MyFormComponent from './components/MyFormComponent.vue';
import HelloComponentOptionsAPI from "@/components/HelloComponentOptionsAPI.vue";
import HelloComponentCompositionsAPI from "@/components/HelloComponentCompositionsAPI.vue";

</script>

<template>

<!--  <HelloComponentOptionsAPI ></HelloComponentOptionsAPI>-->
  <HelloComponentOptionsAPI n_user_p="Pete"></HelloComponentOptionsAPI>
  <HelloComponentCompositionsAPI></HelloComponentCompositionsAPI>
<MyComponent></MyComponent>
<br/>
<h2>Second Component</h2>
<br/>
<MyFormComponent></MyFormComponent>
</template>

<style scoped></style>
