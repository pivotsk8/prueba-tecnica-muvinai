<script setup>
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

<template>
    <v-card color="#1F7087" theme="dark" class="d-flex flex-column flex-wrap">
        <div class="w-auto flex-column py-1">
            <v-avatar class="ma-3" size="125" rounded="5">
                <v-img :src="dataCustumer.photoPerfil" class="h-100" />
            </v-avatar>

            <div class="py-3">
                <v-card-title class="text-h5">
                    {{ dataCustumer?.name }}
                </v-card-title>

                <VCardSubtitle>
                    {{ dataCustumer?.lastname }}
                </VCardSubtitle>

                <v-divider class="border-opacity-50 ma-2" />

                <div class="mt-3 mb-2">
                    <VCardText class="py-1">{{ dataCustumer?.dni }}</VCardText>
                    <VCardText class="py-1">{{ active }}</VCardText>
                    <VCardText class="py-1">{{ dataCustumer?.phone }}</VCardText>
                    <VCardText class="py-1">{{ alta }}</VCardText>
                    <VCardText class="py-1">{{ dataCustumer?.email }}</VCardText>
                    <VCardText class="py-1">{{ dataCustumer?.birthdate }}</VCardText>
                </div>
            </div>
        </div>

        <v-card-actions class="justify-start flex-wrap">
            <v-btn class="ms-2" variant="outlined" size="small">
                Dar baja
            </v-btn>
            <v-btn class="ms-2" variant="outlined" size="small">
                Invalidar acceso
            </v-btn>
            <v-btn class="ms-2" variant="outlined" size="small">
                Modificar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

