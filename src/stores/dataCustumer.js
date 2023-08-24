import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataCustumerStore = defineStore('dataCustumer', () => {
    const urlImage = ref("")
    return { urlImage }
})