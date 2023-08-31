<script setup>
import { watch, ref } from 'vue'
import { useDataCustumerStore } from '../../stores/dataCustumer';
import { useForm, useField } from 'vee-validate'
import { custumerDataSchema as validationSchema } from '@/validation/custumerDataSchema'
import useDataCustumer from '@/composable/useDataCustumer'
import useImage from '@/composable/useImage'
import { updateDoc } from 'firebase/firestore';

const {
    uploadImage,
    avatarImage,
    url
} = useImage()

//store
const dataStore = useDataCustumerStore()

const {
    custumer,
    uploadModificationsCustumer,
    docRef
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
const typePlans = ref([])
const lastFieldValues = ref({});



//Validaciones
const { handleSubmit } = useForm({ validationSchema })
const email = useField('email')
const photoPerfil = useField('photoPerfil')
const name = useField('name')
const lastname = useField('lastname')
const dni = useField('dni')
const planActive = useField('planActive')
const phone = useField('phone')
const birthdate = useField('birthdate')

watch(custumer, (custumer) => {
    typePlans.value = custumer.typePlan
    name.value.value = custumer.name,
        lastname.value.value = custumer.lastname.toUpperCase()
    planActive.value.value = custumer.planActive
    dni.value.value = custumer.dni,
        phone.value.value = custumer.phone,
        email.value.value = custumer.email,
        birthdate.value.value = custumer.birthdate
})

const handleFieldChange = (fieldName, newValue) => {
    lastFieldValues.value[fieldName] = newValue;
};

const submit = handleSubmit(async (values) => {
    const { photoPerfil, ...custumer } = values
    const data = {
        ...custumer,
        photoPerfil: url.value
    }

    photoPerfil ? await updateDoc(docRef, data) : await updateDoc(docRef, custumer)

    for (const fieldName in lastFieldValues.value) {
        const fieldValue = lastFieldValues.value[fieldName];
        uploadModificationsCustumer(fieldName, fieldValue);
    }
    dataStore.modificationData()
})
</script>
<template>
    <VCard color="#1F7087" theme="dark" class="d-flex flex-column flex-wrap">
        <VForm class="pa-2">
            <VAvatar class="ma-3" size="125" rounded="5">
                <v-img v-if="avatarImage" :src="avatarImage" class="h-100" />
                <v-img v-else :src="dataCustumer?.photoPerfil" class="h-100" />
            </VAvatar>
            <VTextField label="Foto Perfil" v-model="photoPerfil.value.value" type="file" accept=".jpg,.img"
                @change="uploadImage" />

            <VTextField label="Nombre" v-model="name.value.value" :error-messages="name.errorMessage.value"
                @blur="handleFieldChange('Nombre', name.value.value)" />

            <VTextField label="Apellido" v-model="lastname.value.value" :error-messages="lastname.errorMessage.value"
                uppercase @blur="handleFieldChange('Apellido', lastname.value.value)" />

            <VTextField label="DNI" v-model="dni.value.value" :error-messages="dni.errorMessage.value" />

            <VSelect label="Tipo de Plan" :items="typePlans" v-model="planActive.value.value" />

            <VTextField label="Telefono" v-model="phone.value.value" :error-messages="phone.errorMessage.value" />

            <VTextField label="Email" type="email" v-model="email.value.value" :error-messages="email.errorMessage.value" />

            <VTextField label="Fecha Nacimiento" v-model="birthdate.value.value"
                :error-messages="birthdate.errorMessage.value" type="date" />

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

