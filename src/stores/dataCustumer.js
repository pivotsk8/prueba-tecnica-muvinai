import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDataCustumerStore = defineStore('dataCustumer', () => {
    const urlImage = ref("")
    const modificationDataUser = ref(false)

    const modificationData = () => {
        console.log("holis", modificationDataUser.value)
        modificationDataUser.value = !modificationDataUser.value;
    }

    return { urlImage, modificationData, modificationDataUser }
})