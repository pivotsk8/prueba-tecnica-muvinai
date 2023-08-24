<script setup>
import useImage from '@/composable/useImage'

const {
    uploadImage,
    image,
} = useImage()

defineProps({
    dataCustumer: {
        type: Object
    },
    modificationCustumer: {
        type: Function
    },
    downloadPdf: {
        type: Function
    },
})
</script>

<template>
    <v-card color="#1F7087" class="d-flex flex-column pa-3 h-10" theme="dark">
        <v-card-title class="text-h5">
            Apto Medico
        </v-card-title>

        <v-form>
            <v-file-input accept=".doc,.docx,.xml,.pdf" prepend-icon="mdi-file-document" @change="uploadImage" />

            <div class="w-100" id="document-view">
                <iframe v-if="image" :src="image" frameborder="0" width="100%" height="500px"
                    style="border: none; border-radius: 10px;" />

                <iframe v-else :src="dataCustumer?.apto" frameborder="0" width="100%" height="500px"
                    style="border: none; border-radius: 10px;" />
            </div>

            <v-card-actions class="justify-space-evenly flex-wrap">
                <v-btn class="ms-2" variant="outlined" size="small" @click="modificationCustumer">
                    Subir Documento
                </v-btn>
                <v-btn class="ms-2" variant="outlined" size="small">
                    Aprobar
                </v-btn>
                <v-btn class="ms-2" variant="outlined" size="small" @click="downloadPdf">
                    Descargar
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

