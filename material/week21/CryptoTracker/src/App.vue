<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
import {useCoinsStore} from './store/coinsStore'
import {onMounted, watch} from 'vue';


const coinStore = useCoinsStore()
onMounted(() => {
  coinStore.fetchCoins()
})

watch(
    () => coinStore.sortBy, () => coinStore.fetchCoins()
)

watch(
    () => coinStore.sortDirection, () => coinStore.fetchCoins()
)



</script>

<template>

  <NavbarComponent/>
  <router-view></router-view>
</template>

