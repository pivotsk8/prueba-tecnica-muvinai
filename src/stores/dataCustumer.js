import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataCustumerStore = defineStore('dataCustumer', () => {
    const urlImage = ref("")
    const avatarImage = ref("")
    const modificationDataUser = ref(false)

    const modificationData = () => {
        modificationDataUser.value = !modificationDataUser.value;
    }

    return { urlImage, avatarImage, modificationData, modificationDataUser }
})