<script setup>
import { NMessageProvider, NConfigProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
import { themeOverrides } from '@/assets/theme'
import Navbar from '@/components/Navbar.vue'
import OrderList from './components/OrderList.vue'
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <Navbar />
      <router-view />
      <OrderList />
    </n-message-provider>
  </n-config-provider>
</template>
