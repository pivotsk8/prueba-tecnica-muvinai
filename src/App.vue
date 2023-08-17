<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <VLayout>
    <VAppBar color="teal-darken-4" image="https://picsum.photos/1920/1080?random" :width="1000" :height="100">

      <template v-slot:image>
        <VImg gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></VImg>
      </template>

      <VAppBarTitle class="d-flex justify-flex-start ml-15  font-weight-bold text-h4 ">Custom User
      </VAppBarTitle>

      <VSpacer></VSpacer>

      <template v-slot:append>
        <div class="v-app-bar__append">
          <VAvatar
            image="https://scontent.fbog7-1.fna.fbcdn.net/v/t39.30808-6/346026297_796426321670879_215423688526711824_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEM30C-CN68UkDLBIDEkj1ynaTcYtdJPG2dpNxi10k8bQ_GsfKSSnvgNaWEsdjkNvU&_nc_ohc=UB98Wlx3s2IAX8HEBPH&_nc_ht=scontent.fbog7-1.fna&oh=00_AfCwD_8nVgi37rsUKHoAtvdEhMEXfpzg5DLq_KR8FXmHCg&oe=64E294A6"
            size="90">
          </VAvatar>
        </div>
      </template>
    </VAppBar>

    <VMain>
      <VContainer>
        <RouterView />
      </VContainer>
    </VMain>
  </VLayout>
</template>

<style  scoped>
.v-app-bar__append {
  margin-inline-start: auto;
  margin-inline-end: 30px;
}

.app-bar-title {
  color: red !important;
}
</style>


