import {defineStore} from 'pinia'
import { ref } from 'vue'
import CoinService from '../service/CoinService'

export const BY_VOLUME = "by_volume"
export const BY_PERCENTAGE = "by_percentage"
export const ASC_SORT = "ascending"
export const DESC_SORT = "descending"

export const useCoinsStore = defineStore('coin', ()=>{
    
    const coinDataTop50 = ref([])

    const sortBy = ref("")
    const sortDirection = ref("")

    const fetchCoins = async () => {
        try{
            const response = await CoinService.getCoins()
            const coins = response.data.data.slice(0, 50);


            if(sortBy.value === BY_VOLUME){
                console.log("By Volume")
                coins.sort((c1,c2) => (c2.volumeUsd24Hr - c1.volumeUsd24Hr))
            }else if(sortBy.value === BY_PERCENTAGE){
                //
                console.log("By Percentage")
                coins.sort((c1,c2) => (c2.changePercent24Hr - c1.changePercent24Hr))
            }
            else {
                // console.log(coins)
                console.log("By Nothing")

                if(sortDirection.value === ASC_SORT){
                    coins.sort((c1,c2) => (c1.changePercent24Hr - c2.changePercent24Hr))
                    console.log("Direction Ascending")
                }else if(sortDirection.value === DESC_SORT){
                    coins.sort((c1,c2) => (c2.changePercent24Hr - c1.changePercent24Hr))
                    console.log("Direction Descending")
                }
                else {
                    console.log("No Direction")
                }
            }




            coinDataTop50.value = coins
        }catch(error){
            console.error('Error fetching coins:',error)
        }
    }
    return {coinDataTop50, fetchCoins,sortBy,sortDirection}
})