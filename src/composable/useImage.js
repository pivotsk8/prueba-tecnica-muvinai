import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile, useStorageFileUrl } from 'vuefire'
import { uid } from 'uid'
import { computed, watch } from 'vue'

export default function useImage() {
    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage, `/apto/${uid()}`)
    const { url, upload } = useStorageFile(storageRefPath)

    const uploadImage = (e) => {
        const data = e.target.files[0];
        data ? upload(data) : null
    }

    const downloadFile = () => {
        try {
            const mountainFileRef = storageRef(storage, '/apto/006af8ad15d')
            const {
                url,
            } = useStorageFileUrl(mountainFileRef)

            watch(url, (newUrl) => {
                if (newUrl) {
                    window.open(newUrl);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }


    const image = computed(() => url.value ? url.value : null)

    return {
        uploadImage,
        image,
        downloadFile
    }
}
