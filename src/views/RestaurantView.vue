<script setup>
import router from '@/router'
import { NH1, NCard, NButton } from 'naive-ui'

const greeting = 'About Page'

const openApp = () => router.push('/login')
</script>

<template>
  <main>
    <n-card hoverable>
      <n-h1>{{ greeting }}</n-h1>
    </n-card>
  </main>
</template>

<style scoped lang="scss">
main {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .n-card {
    width: fit-content;
    height: fit-content;
    padding: 25px 50px;
    text-align: center;
    background-color: #fa7878;
    border-radius: 25px;
    position: relative;

    .n-h1 {
      color: white;
    }

    .n-button {
      width: fit-content;
      height: fit-content;
      padding: 10px 15px;
      background-color: white;
      border: 1px solid white;
      color: #fa7878;

      &:hover {
        background-color: transparent;
        color: white;
      }
      &:focus {
        color: white;
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
