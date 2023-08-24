<script setup>
import { ref, watch } from 'vue'
import useImage from '@/composable/useImage'
import useDataCustumer from '@/composable/useDataCustumer'
import CardForTimeline from '../components/CardForTimeline.vue';



const {
  uploadImage,
  image,
} = useImage()

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

const { apto } = dataCustumer.value;



const downloadPdf = async () => {
  try {
    const response = await fetch(apto);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'documento.pdf'; // Cambia el nombre del archivo según tu necesidad
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar el PDF:', error);
  }
};



</script>

<template>
  <v-card class="mx-auto w-100 d-flex bg-" full-height>
    <VRow>
      <VCol cols="3" md="3" sm="12">

        <v-row dense class="pa-3">

          <v-col cols="12" class="pr-0">
            <v-card color="#1F7087" theme="dark" class="d-flex flex-column flex-wrap">
              <div class="w-auto flex-column py-1">
                <v-avatar class="ma-3" size="125" rounded="5">
                  <v-img
                    src="https://scontent.fbog7-1.fna.fbcdn.net/v/t39.30808-6/346026297_796426321670879_215423688526711824_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEM30C-CN68UkDLBIDEkj1ynaTcYtdJPG2dpNxi10k8bQ_GsfKSSnvgNaWEsdjkNvU&_nc_ohc=UB98Wlx3s2IAX8HEBPH&_nc_ht=scontent.fbog7-1.fna&oh=00_AfCwD_8nVgi37rsUKHoAtvdEhMEXfpzg5DLq_KR8FXmHCg&oe=64E294A6" />
                </v-avatar>

                <div class="py-3">
                  <v-card-title class="text-h5">
                    {{ custumer?.name }}
                  </v-card-title>

                  <VCardSubtitle>
                    {{ custumer?.lastname }}
                  </VCardSubtitle>

                  <v-divider class="border-opacity-50 ma-2" />

                  <div class="mt-3 mb-2">
                    <VCardText class="py-1">{{ custumer?.dni }}</VCardText>
                    <VCardText class="py-1">{{ active }}</VCardText>
                    <VCardText class="py-1">{{ custumer?.phone }}</VCardText>
                    <VCardText class="py-1">{{ alta }}</VCardText>
                    <VCardText class="py-1">{{ custumer?.email }}</VCardText>
                    <VCardText class="py-1">{{ custumer?.birthdate }}</VCardText>
                  </div>
                </div>

              </div>
              <v-card-actions class="justify-start flex-wrap">
                <v-btn class="ms-2" variant="outlined" size="small" @click="updateApto">
                  Dar baja
                </v-btn>
                <v-btn class="ms-2" variant="outlined" size="small">
                  Invalidar acceso
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" class="pr-0">
            <v-card color="#952175" theme="dark">
              <div>
                <div>
                  <v-card-title class="text-h5">
                    Modificaciones
                  </v-card-title>
                  <v-card-subtitle>Ultima modificacion</v-card-subtitle>
                  <VDivider class="border-opacity-50 ma-2" />
                  <div id="modification-data" class="mt-3 mb-2">
                    <VCardText>informacion</VCardText>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" class="pr-0">
            <v-card color="#385F73" theme="dark">
              <div>
                <div>
                  <v-card-title class="text-h5">
                    Subcripcion
                  </v-card-title>
                  <v-card-subtitle>Ultimo Pago</v-card-subtitle>
                  <VDivider class="border-opacity-50 ma-2" />
                  <div id="modification-data" class="mb-2 ">
                    <VCardText class="text-h7 font-weight-bold d-flex justify-start py-1">
                      De: <p class="font-weight-medium mr-2 ml-1">12/08/23</p>
                      Hasta: <p class="font-weight-medium mr-2">12/08/23</p>
                    </VCardText>
                    <VCardText class="text-h7 font-weight-bold font-weight-bold d-flex justify-start py-1">
                      ID: <p class="font-weight-medium mr-2 ml-1">1252F46D</p>
                    </VCardText>
                    <VCardText class="text-h7 font-weight-bold font-weight-bold d-flex justify-start py-1">
                      Estado: <p class="font-weight-medium mr-2 ml-1">Activo</p>
                    </VCardText>
                  </div>

                </div>
              </div>
            </v-card>
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
            <v-card color="#1F7087" class="d-flex flex-column pa-3 h-10" theme="dark">
              <v-card-title class="text-h5">
                Apto Medico
              </v-card-title>

              <v-form>
                <v-file-input accept=".doc,.docx,.xml,.pdf" prepend-icon="mdi-file-document" @change="uploadImage" />

                <div class="w-100" id="document-view">
                  <iframe v-if="image" :src="image" frameborder="0" width="100%" height="500px"
                    style="border: none; border-radius: 10px;" />

                  <iframe v-else :src="dataCustumer?.apto" frameborder="0" width="100%" height="500px"
                    style="border: none; border-radius: 10px;" />
                </div>

                <v-card-actions class="justify-space-evenly flex-wrap">
                  <v-btn class="ms-2" variant="outlined" size="small" @click="modificationCustumer">
                    Subir Documento
                  </v-btn>
                  <v-btn class="ms-2" variant="outlined" size="small">
                    Aprobar
                  </v-btn>
                  <v-btn class="ms-2" variant="outlined" size="small" @click="downloadPdf">
                    Descargar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
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
