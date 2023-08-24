import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile, useStorageFileUrl } from 'vuefire'
import { uid } from 'uid'
import { computed, watch } from 'vue'
import { useDataCustumerStore } from '../stores/dataCustumer'

export default function useImage() {
    const dataCustomer = useDataCustumerStore()
    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage, `/apto/${uid()}`)
    const { url, upload } = useStorageFile(storageRefPath)

    const uploadImage = (e) => {
        const data = e.target.files[0];
        data ? upload(data) : null
    }

    // const downloadFile = () => {
    //     try {
    //         const mountainFileRef = storageRef(storage, '/apto/006af8ad15d')
    //         const {
    //             url,
    //         } = useStorageFileUrl(mountainFileRef)

    //         watch(url, (newUrl) => {
    //             if (newUrl) {
    //                 window.open(newUrl);
    //             }
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const downloadFile = () => {
        watch(url.value, (newUrl) => {
            if (newUrl) {
                return window.open(newUrl);
            }
        })
    }


    const image = computed(() => url.value
        ? (url.value, dataCustomer.urlImage = url.value)
        : null
    )

    return {
        url,
        uploadImage,
        image,
        downloadFile
    }
}
