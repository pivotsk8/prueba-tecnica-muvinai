<script setup>
import { watch } from 'vue'
import { useDataCustumerStore } from '../../stores/dataCustumer';
import { useForm, useField } from 'vee-validate'
import { custumerDataSchema as validationSchema } from '@/validation/custumerDataSchema'
import useDataCustumer from '@/composable/useDataCustumer'
import useImage from '@/composable/useImage'

const {
    uploadImage,
    avatarImage,
} = useImage()

//store
const dataStore = useDataCustumerStore()

const {
    custumer,
} = useDataCustumer()

defineProps({
    dataCustumer: {
        type: Object,
    },
    alta: {
        type: String
    },
    active: {
        type: String
    }
})

let timestamp;

//Validaciones
const { handleSubmit } = useForm({ validationSchema })
const email = useField('email')
const name = useField('name')
const lastName = useField('lastName')
const dni = useField('dni')
const phone = useField('phone')
const birthDate = useField('birthDate')

watch(custumer, (custumer) => {
    name.value.value = custumer.name,
        lastName.value.value = custumer.lastname,
        dni.value.value = custumer.dni,
        phone.value.value = custumer.phone,
        email.value.value = custumer.email,
        birthDate.value.value = custumer.birthdate,

        timestamp = custumer.birthdate;
    if (timestamp) {
        const milliseconds = timestamp.seconds * 1000;
        const date = new Date(milliseconds);
        birthDate.value.value = date.toISOString().split('T')[0];
    }
})

const submit = handleSubmit((values) => {
    console.log('....submit')
    //dataStore.modificationData()
})


</script>
s
<template>
    <VCard color="#1F7087" theme="dark" class="d-flex flex-column flex-wrap">
        <VForm class="pa-2">
            <VAvatar class="ma-3" size="125" rounded="5">
                <v-img v-if="avatarImage" :src="avatarImage" class="h-100" />
                <v-img v-else :src="dataCustumer?.photoPerfil" class="h-100" />
            </VAvatar>
            <VTextField label="Foto Perfil" type="file" accept=".jpg, .img" @change="uploadImage" />

            <VTextField label=" Nombre" v-model="name.value.value" :error-messages="name.errorMessage.value" />

            <VTextField label=" Apellido" v-model="lastName.value.value" :error-messages="lastName.errorMessage.value" />

            <VTextField label=" DNI" v-model="dni.value.value" :error-messages="dni.errorMessage.value" />

            <VTextField label=" Telefono" v-model="phone.value.value" :error-messages="phone.errorMessage.value" />

            <VTextField label=" Email" type="email" v-model="email.value.value"
                :error-messages="email.errorMessage.value" />

            <VTextField label=" Fecha Nacimiento" v-model="birthDate.value.value"
                :error-messages="birthDate.errorMessage.value" type="date" />

            <VCardActions class="justify-start flex-wrap">
                <VBtn class="ms-2" variant="outlined" size="small" @click=" dataStore.modificationData">
                    Volver
                </VBtn>
                <VBtn class="ms-2" variant="outlined" size="small" @click="submit">
                    Guardar
                </VBtn>
            </VCardActions>
        </VForm>
    </VCard>
</template>    

