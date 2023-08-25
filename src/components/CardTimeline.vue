<script setup>
defineProps({
    payments: {
        type: Array,
    }
})

const timeLine = ref([
    {
        color: "purple-lighten-2",
        size: "default"
    },
    {
        color: "amber-lighten-1",
        size: "x-small"
    },
    {
        color: "cyan-lighten-1",
        size: "default"
    },

    {
        color: "red-lighten-1",
        size: "x-small"
    },

])
</script>

<template>
    <v-card color="#385F73" theme="dark" class="d-flex flex-column pa-3 h-10">
        <VCardTitle class="text-h5">Pagos</VCardTitle>
        <v-timeline class="py-4" direction="horizontal">
            <v-timeline-item v-for="(item, i) in timeLine " :key="i" :dot-color="item.color" fill-dot :size="item.size">
            </v-timeline-item>
            <CardForTimeline :payments="payments" :timeLine="timeLine" :formatingPrice="formatingPrice" />
        </v-timeline>
        <VDivider />
        <VCardText class="d-flex align-end flex-column">Total : {{ formatingPrice(totalPayments(payments)) }}
        </VCardText>
    </v-card>
</template>    

