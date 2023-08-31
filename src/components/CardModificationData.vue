<script setup>
import { ref, watch } from 'vue'
import useDataCustumer from '@/composable/useDataCustumer'

const { custumer } = useDataCustumer()
const modifications = ref([])
watch(custumer, (newCustumer) => {
    modifications.value = newCustumer.modification
})

const formatDate = (timestampObj) => {
    const seconds = timestampObj.seconds;
    const nanoseconds = timestampObj.nanoseconds;

    const epoch = new Date(0);
    const targetDate = new Date(epoch.getTime() + seconds * 1000 + nanoseconds / 1000000);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return targetDate.toLocaleDateString(undefined, options);
}

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
                        {{ modification?.person }}
                        <VCardText>
                            <div class="d-flex align-center my-0">
                                Cambio el
                                <p class="mx-1 font-weight-bold">
                                    {{ modification?.fieldName }}
                                </p>
                                por
                                <p class="mx-1 font-weight-bold ">
                                    {{ modification?.modification }}
                                </p>
                                el
                                <p class="mx-1 font-weight-bold ">
                                    {{ formatDate(modification?.modificationDate) }}
                                </p>
                            </div>
                        </VCardText>
                        <VDivider class="border-opacity-50 ma-2" />
                    </VCardText>
                </div>
            </div>
        </div>
    </v-card>
</template>

