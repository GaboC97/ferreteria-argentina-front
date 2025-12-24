<template>
  <div class="app">
    <SiteNavbar />
    <main class="main">
      <router-view />
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </div>
</template>

<script setup>
import SiteNavbar from '../components/layout/SiteNavbar.vue'
import SiteFooter from '../components/layout/SiteFooter.vue'
import WhatsAppFloat from '../components/layout/WhatsAppFloat.vue'
</script>

<style scoped>
.main {
  min-height: calc(100vh - 140px);
  padding: 24px 0 60px;
}
</style>
