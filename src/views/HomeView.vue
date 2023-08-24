<script setup>
import { ref, watch } from 'vue'
import useDataCustumer from '@/composable/useDataCustumer'
import CardForTimeline from '../components/CardForTimeline.vue';
import CardUserData from '../components/CardUserData.vue';
import CardModificationData from '../components/CardModificationData.vue';
import CardInformationInscription from '../components/CardInformationInscription.vue';
import CardAptoMedical from '../components/CardAptoMedical.vue';

const {
  formatingPrice,
  totalPayments,
  custumer,
  modificationCustumer
} = useDataCustumer()


const dataCustumer = ref({})
const active = ref("")
const alta = ref("")
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
const payments = ref([])

watch(custumer, (custumer) => {
  dataCustumer.value = custumer
  custumer.active ? active.value = "ACTIVO" : "INACTIVO"
  custumer.alta ? alta.value = "ALTA" : "INACTIVO"
  timeLine.value = timeLine.value
  payments.value = custumer.payments
})





</script>

<template>
  <v-card class="mx-auto w-100 d-flex bg-" full-height>
    <VRow>
      <VCol cols="3" md="3" sm="12">

        <v-row dense class="pa-3">

          <v-col cols="12" class="pr-0">
            <CardUserData :dataCustumer="dataCustumer" :alta="alta" :active="active" />
          </v-col>

          <v-col cols="12" class="pr-0">
            <CardModificationData />
          </v-col>

          <v-col cols="12" class="pr-0">
            <CardInformationInscription />
          </v-col>

        </v-row>

      </VCol>

      <VCol cols="9" md="9" sm="12">

        <v-row dense class="pa-3">
          <v-col cols="12">
            <v-card color="#385F73" theme="dark" class="d-flex flex-column pa-3 h-10">
              <VCardTitle class="text-h5">Pagos</VCardTitle>
              <v-timeline class="py-4" direction="horizontal">
                <v-timeline-item v-for="(item, i) in timeLine " :key="i" :dot-color="item.color" fill-dot
                  :size="item.size">
                </v-timeline-item>
                <CardForTimeline :payments="payments" :timeLine="timeLine" :formatingPrice="formatingPrice" />
              </v-timeline>
              <VDivider />
              <VCardText class="d-flex align-end flex-column">Total : {{ formatingPrice(totalPayments(payments)) }}
              </VCardText>
            </v-card>

          </v-col>

          <v-col cols="6">
            <CardAptoMedical :data-custumer="dataCustumer" :download-pdf="downloadPdf"
              :modification-custumer="modificationCustumer" />
          </v-col>

          <v-col cols="6" class="pa-1 d-flex flex-column">

            <v-card color="#952175" theme="dark" class="mb-2">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    Asociaciones
                  </v-card-title>

                  <v-card-subtitle>Ellie Goulding</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ms-2" icon="mdi-play" variant="text"></v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>

            <v-card color="#952175" theme="dark" class="mb-2">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    Cupones
                  </v-card-title>

                  <v-card-subtitle>Ellie Goulding</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ms-2" icon="mdi-play" variant="text"></v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
                </v-avatar>
              </div>
            </v-card>

            <v-card color="#952175" theme="dark">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    Accesos a Cedes
                  </v-card-title>

                  <v-card-subtitle>Ellie Goulding</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ms-2" icon="mdi-play" variant="text"></v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
                </v-avatar>
              </div>
            </v-card>

          </v-col>


        </v-row>
      </VCol>
    </VRow>
  </v-card>
</template>
