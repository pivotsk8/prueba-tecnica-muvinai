<script setup>
import { ref, watch } from 'vue'
import useDataCustumer from '@/composable/useDataCustumer'

const { custumer } = useDataCustumer()
const modifications = ref([])
watch(custumer, (newCustumer) => {
    modifications.value = newCustumer.modification
})

</script>


<template>
    <v-card color="#952175" theme="dark">
        <div>
            <div>
                <v-card-title class="text-h5">
                    Modificaciones
                </v-card-title>
                <v-card-subtitle>Ultima modificacion</v-card-subtitle>
                <VDivider class="border-opacity-50 ma-2" />
                <div id="modification-data" class="mt-3 mb-2">
                    <VCardText v-for="modification in modifications">
                        {{ modification.person }}
                        <VCardText>{{ modification?.modification }}</VCardText>
                        <VDivider class="border-opacity-50 ma-2" />
                    </VCardText>
                </div>
            </div>
        </div>
    </v-card>
</template>

