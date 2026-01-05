<script setup>
import {ref, onMounted, computed, reactive, watch} from "vue";
import {Line} from "vue-chartjs";
import ChartService from "../service/chartService";
import {Chart, registerables} from "chart.js";
import {useCoinsStore} from "../store/coinsStore";

Chart.register(...registerables);

const coinsStore = useCoinsStore();

const topCoins = computed(() => {
  return [...coinsStore.coinDataTop50]
      .sort((a, b) => parseFloat(b.volumeUsd24Hr) - parseFloat(a.volumeUsd24Hr))
      .slice(0, 4);
});


const coinColors2 = ref({});
const colors = [
  "rgba(75, 192, 192, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 99, 132, 0.5)",
  "rgba(255, 206, 86, 0.5)",
];


const selectionOptions = ["1DAY", "7DAY", "1MTH"];

const props = defineProps({
  "interval": {
    type: String,
    required: false,
    default: "1DAY"
  }
});

const selectedCoinData = ref(props.interval);
// const selectedCoinData = ref("1DAY");

const chartData = ref({});

const chartUpdateTime = ref("");
// const showChart = ref(false);

const chartOptions = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: true,
  },
  plugins: {
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: true,
      callbacks: {
        label: function (context) {
          return `Price: $${formatPrice(context.parsed.y)}`;
        },
      },
    },
  },
  scales: {
    x: {display: false},
    y: {display: true},
  },
};

const fetchChartData = async () => {
  let changed = false
  for (const coin of topCoins.value) {
    try {
      const response = await ChartService.getChart(coin.id, selectedCoinData.value);

      const chartArray = response.data?.data;

      // console.log(chartArray)

      if (chartArray && chartArray.length > 0) {
        // console.log(chartArray) // TODO Print Chart Array
        const prices = chartArray.map((entry) => ({
          date: new Date(entry.date).toLocaleTimeString(),
          price: parseFloat(entry.priceUsd),
        }));

        // console.log(prices) // TODO Print Price Array

        chartData.value[coin.id] = {
          labels: prices.map((entry) => entry.date),
          datasets: [
            {
              label: `${coin.symbol} Цена во USD`,
              backgroundColor: coinColors2.value[coin.id].backgroundColor,
              borderColor: coinColors2.value[coin.id].borderColor,
              borderWidth: 2,
              fill: true,
              data: prices.map((entry) => entry.price),
            },
          ],
        };
        // chartData.value = {...chartData.value}


        if (!changed)
          changed = true


        // console.log(chartData)
      } else {
        console.error(`There is no chartArray data for ${coin.id}`);
        // console.log(`There is no chartArray data for ${coin.id}`);
      }
    } catch (error) {
      console.error("Error fetching chart data for " + coin.id, error);
      // console.log("Error fetching chart data for " + coin.id, error);
    }
  }
  // console.log(selectedCoinData.value)

  // if (changed) {
  //   let new_d = new Date()
  //   chartUpdateTime.value = new_d.getFullYear() + "/" + String(new_d.getMonth()).padStart(2, "0") + "/" + String(new_d.getDate()).padStart(2, "0") + " - " + String(new_d.getHours()).padStart(2, "0") + ":" + String(new_d.getMinutes()).padStart(2, "0") + ":" + String(new_d.getSeconds()).padStart(2, "0")
  // }

  // console.log("Data fetched") // TODO print fetch
};

onMounted(() => {
  topCoins.value.forEach((coin, index) => {
    coinColors2.value[coin.id] = {
      backgroundColor: colors[index],
      borderColor: colors[index].replace("0.5", "1"),
    };
  });

  fetchChartData();
});


// () => topCoins.value is better for more sensitivity
watch(
    topCoins,
    (newCoins) => {
      if (newCoins.length > 0) {
        // coins are loaded, now fetch chart data
        topCoins.value.forEach((coin, index) => {
          coinColors2.value[coin.id] = {
            backgroundColor: colors[index],
            borderColor: colors[index].replace("0.5", "1"),
          };
        });
        fetchChartData();
      }
    }
);

watch(
    selectedCoinData,
    () => {
      topCoins.value.forEach((coin, index) => {
        coinColors2.value[coin.id] = {
          backgroundColor: colors[index],
          borderColor: colors[index].replace("0.5", "1"),
        };
      });
      fetchChartData()
    })

function formatPrice(price) {
  if (price >= 1.01) return price.toFixed(2)

  const [_, decimals] = price.toString().split(".")
  if (!decimals) return price.toFixed(2)

  const firstNonZeroIndex = decimals.search(/[^0]/)

  if (firstNonZeroIndex >= 4) {
    return price.toFixed(8)
  } else if (firstNonZeroIndex >= 2) {
    return price.toFixed(4)
  } else {
    return price.toFixed(2)
  }
}


</script>

<template>


  <!--  <div className="w-full my-1">-->
  <!--    <input type="checkbox" v-model="showChart">-->
  <!--  </div>-->

  <!--  <div v-if="showChart" className="bg-[#1B2028] rounded-[10px] p-[20px] w-[1000px] flex flex-wrap justify-around">-->


  <div className="bg-[#1B2028] rounded-[10px] p-[20px] w-[1000px] flex flex-wrap justify-around">
    <h1 className="font-bold text-white w-full text-center  text-3xl mb-2">
      Today's most popular coins chart
    </h1>

    <div className="w-full flex justify-center mb-10">
      <!--      <select @change="updateChart($event.target.value)" className=" p-2 rounded bg-gray-700 text-white">-->

      <select v-model="selectedCoinData" className=" p-2 rounded bg-gray-700 text-white">

        <option v-for="selOpt of selectionOptions" :value="selOpt" :key="selOpt">
          {{ selOpt.slice(0, 1) + " " + selOpt.slice(1) }}
        </option>

      </select>
    </div>

    <div v-for="coin in topCoins" :key="coin.id" className="w-[45%] mb-6">
      <h2 class="text-white font-bold text-center mb-2">{{ coin.symbol }} Price</h2>
      <Line
          v-if="chartData[coin.id] && chartData[coin.id].labels.length > 0"
          :data="chartData[coin.id]"
          :options="chartOptions"
      />
      <p v-else class="text-white text-center">
        Error fetching chart data for {{ coin.symbol }}
      </p>


    </div>

<!--    <p v-if="chartUpdateTime" className="text-center text-gray-400 w-full">Last updated {{ chartUpdateTime }}</p>-->
  </div>
</template>
