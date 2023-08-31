<script setup>
import useImage from '@/composable/useImage'
import { useForm, useField } from 'vee-validate'
import { aptoValidationSchema as validationSchema } from '../validation/aptoDataSchema'

import useDataCustumer from '@/composable/useDataCustumer'

const {
    uploadModificationsCustumer,
    uploadAptoAprouval,
    custumer
} = useDataCustumer()
const { handleSubmit } = useForm({ validationSchema })
const aptoCaducidad = useField('aptoCaducidad')

const {
    uploadImage,
    image,
} = useImage()

const props = defineProps({
    dataCustumer: {
        type: Object
    },
    modificationCustumer: {
        type: Function
    }
})

const { apto } = props.dataCustumer;

const downloadPdf = async () => {
    try {
        const response = await fetch(apto);
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.download = 'documento.pdf';
        link.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar el PDF:', error);
    }
};

const submit = handleSubmit(async (values, check) => {
    const { aptoCaducidad } = values
    const data = { aptoCaducidad, check: check.evt }
    const checkAprouvalApto = check.evt ? "Aprobo" : "DesAprobado"

    await uploadAptoAprouval(data)
    await uploadModificationsCustumer("Apto", checkAprouvalApto);

})
</script>

<template>
    <VCard color="#1F7087" class="d-flex flex-column pa-3 h-10" theme="dark">
        <v-card-title class="text-h5">
            Apto Medico
        </v-card-title>

        <v-file-input accept=".doc,.docx,.xml,.pdf" prepend-icon="mdi-file-document" @change="uploadImage" />

        <div class="w-100" id="document-view">
            <iframe v-if="image" :src="image" frameborder="0" width="100%" height="500px"
                style="border: none; border-radius: 10px;" />

            <iframe v-else :src="props.dataCustumer?.apto" frameborder="0" width="100%" height="500px"
                style="border: none; border-radius: 10px;" />
        </div>

        <VForm>
            <VTextField label="Fecha Nacimiento" v-model="aptoCaducidad.value.value"
                :error-messages="aptoCaducidad.errorMessage.value" type="date" />
            <v-card-actions class="justify-space-evenly flex-wrap">
                <VBtn class="ms-2" variant="outlined" size="small" @click="props.modificationCustumer">
                    Subir Documento
                </VBtn>
                <VBtn class="ms-2" variant="outlined" size="small" @click="submit(true)">
                    Aprobar
                </VBtn>
                <VBtn class="ms-2" variant="outlined" size="small" @click="submit(false)">
                    DesAprobar
                </VBtn>
                <VBtn class="ms-2" variant="outlined" size="small" @click="downloadPdf">
                    Descargar
                </VBtn>
            </v-card-actions>
        </VForm>

    </VCard>
</template>

