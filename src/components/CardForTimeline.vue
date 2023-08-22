<script setup>
import { watch } from "vue";

const props = defineProps({
    payments: Array,
    timeLine: Array,
    formatingPrice: Function,


})

let unifiedData = [];
watch(props, (newProps) => {
    unifiedData = newProps.payments.map((payment, index) => ({
        payment,
        timeLine: props.timeLine[index]
    }));
});
</script>

<template>
    <v-card v-for="(data, i) in unifiedData" :key="i" :color="data?.timeLine.color">
        <VCardSubtitle>{{ data.payment.date }}</VCardSubtitle>
        <v-card-text class="py-0">{{ formatingPrice(data.payment.mount) }}</v-card-text>
    </v-card>
</template>

