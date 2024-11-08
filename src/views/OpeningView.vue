<script setup>
import { NH1 } from 'naive-ui'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  // Menunggu hingga semua animasi selesai (10 detik), lalu buka /home
  setTimeout(() => {
    router.push('/home')
  }, 12000) // 10 detik dalam milidetik
})
</script>

<template>
  <main>
    <section id="title">
      <n-h1 class="title1"> Welcome To Ariesta </n-h1>
      <n-h1 class="title2"> Food </n-h1>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  background-color: #fa7878;
  height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation:
    mainIn 2s ease-in-out 1 forwards,
    mainOut 2s ease-in-out 1 forwards 8s;
  #title {
    text-align: center;

    .title1 {
      opacity: 0;
      transform: translateY(-100%);
      animation:
        fadeDownIn 2s ease-in-out 1 forwards 2s,
        fadeUpOut 2s ease-in-out 1 forwards 6s;
    }
    .title2 {
      opacity: 0;
      transform: translateY(100%);
      animation:
        fadeUpIn 2s ease-in-out 1 forwards 2s,
        fadeDownOut 2s ease-in-out 1 forwards 6s;
    }
    .n-h1 {
      color: white;
      margin: 0;
      font-weight: bold;
      font-size: 5vw;
    }
  }
}

@keyframes mainIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes mainOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeDownIn {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeDownOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}
@keyframes fadeUpIn {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeUpOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
