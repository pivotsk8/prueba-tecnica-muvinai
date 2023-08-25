<script setup>
import { useDataCustumerStore } from '../../stores/dataCustumer';
import { useForm, useField } from 'vee-validate'
import { custumerDataSchema as validationSchema } from '@/validation/custumerDataSchema'

//Validaciones
const { handleSubmit } = useForm({ validationSchema })
const email = useField('email')
const name = useField('name')
const lastName = useField('lastName')
const dni = useField('dni')
const phone = useField('phone')
const date = useField('date')



const submit = handleSubmit(() => {
    console.log('....submit')
    // dataStore.modificationData()
})

//store
const dataStore = useDataCustumerStore()

defineProps({
    dataCustumer: {
        type: Object
    },
    alta: {
        type: String
    },
    active: {
        type: String
    }
})
</script>
s
<template>
    <VCard color="#1F7087" theme="dark" class="d-flex flex-column flex-wrap">
        <VForm class="pa-2">
            <VAvatar class="ma-3" size="125" rounded="5">
                <v-img :src="dataCustumer?.photoPerfil" class="h-100" />
            </VAvatar>
            <VTextField label="Foto Perfil" type="file" />

            <VTextField label=" Nombre" v-model="name.value.value" :error-messages="name.errorMessage.value" />

            <VTextField label=" Apellido" v-model="lastName.value.value" :error-messages="lastName.errorMessage.value" />

            <VTextField label=" DNI" v-model="dni.value.value" :error-messages="dni.errorMessage.value" />

            <VTextField label=" Telefono" v-model="phone.value.value" :error-messages="phone.errorMessage.value" />

            <VTextField label=" Email" type="email" v-model="email.value.value"
                :error-messages="email.errorMessage.value" />

            <VTextField label=" Fecha Nacimiento" type="date" v-model="date.value.value"
                :error-messages="date.errorMessage.value" />

            <VCardActions class="justify-start flex-wrap">
                <VBtn class="ms-2" variant="outlined" size="small">
                    baja
                </VBtn>
                <VBtn class="ms-2" variant="outlined" size="small">
                    Invalidar acceso
                </VBtn>
                <VBtn class="ms-2" variant="outlined" size="small" @click="submit">
                    Guardar
                </VBtn>
            </VCardActions>
        </VForm>
    </VCard>
</template>    

