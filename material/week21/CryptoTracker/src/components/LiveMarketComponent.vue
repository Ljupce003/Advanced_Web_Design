<script setup>

import {useCoinsStore, BY_VOLUME, BY_PERCENTAGE,ASC_SORT,DESC_SORT} from "../store/coinsStore";

const coinStore = useCoinsStore();

function toggleByPercentage() {
  if (coinStore.sortBy !== BY_PERCENTAGE) {
    coinStore.sortBy = BY_PERCENTAGE
  } else coinStore.sortBy = ""
}

function toggleByVolume() {
  if (coinStore.sortBy !== BY_VOLUME) {
    coinStore.sortBy = BY_VOLUME
  } else coinStore.sortBy = ""
}

function toggleAsc() {
  if (coinStore.sortDirection !== ASC_SORT) {
    coinStore.sortDirection = ASC_SORT
  }
}

function toggleDesc() {
  if (coinStore.sortDirection !== DESC_SORT) {
    coinStore.sortDirection = DESC_SORT
  }
}

function toggleNoDirection() {
  if (coinStore.sortDirection !== "") {
    coinStore.sortDirection = ""
  }
}




</script>
<template>
  <div class="bg-[#1B2028] w-full rounded-[10px] p-[20px] mt-[20px] mb-[15px] mx-auto max-w-7xl">
    <div class="flex justify-between">
      <h1 class="text-white font-bold text-3xl">Live Market</h1>

<!--      TODO My Start-->
      <div class="flex gap-3 text-white">
<!--        <button type="button"-->
<!--                @click="toggleByPercentage()"-->
<!--                :class="['bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors' ,coinStore.sortBy === BY_PERCENTAGE ? 'opacity-10' : '']">-->
<!--          Sort By Change %-->
<!--        </button>-->
<!--        <button type="button"-->
<!--                @click="toggleByVolume()"-->
<!--                :class="['bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors' ,coinStore.sortBy === BY_VOLUME ? 'opacity-10' : '']">-->
<!--          Sort By Volume-->
<!--        </button>-->

        <input type="radio" name="sort" @click="toggleDesc()" > Descending
        <input type="radio" name="sort" @click="toggleAsc()" > Ascending
        <input type="radio" name="sort" @click="toggleNoDirection()" > No Direction
      </div>
<!--      TODO MY End-->


    </div>

    <div class="grid grid-cols-5 gap-4 mt-[20px] text-gray-400">
      <p>Coin</p>
      <p>Change</p>
      <p>Market Cap</p>
      <p>24h Volume</p>
      <p>Price</p>
    </div>
    <div class="max-h-[400px] overflow-y-scroll">
      <div v-for="coin in coinStore.coinDataTop50" class="grid grid-cols-5 gap-4 mt-[20px] text-gray-300">
        <p>{{ coin.name }}</p>
        <p :class="(coin.changePercent24Hr) < 0 ? 'font-bold text-red-500' : 'font-bold text-[#1ECB4F]'">
          {{ Number(coin.changePercent24Hr).toFixed(2) }}%</p>
        <p>${{ Number(coin.marketCapUsd).toFixed(0) }}M</p>
        <p>${{ Math.round(Number(coin.volumeUsd24Hr)).toLocaleString() }}M</p>
<!--        <p>${{ Number(coin.volumeUsd24Hr).toFixed(0) }}M</p>-->
        <p>${{ Number(coin.priceUsd).toFixed(4) }}</p>
      </div>
    </div>

    <div>

    </div>
  </div>
</template>