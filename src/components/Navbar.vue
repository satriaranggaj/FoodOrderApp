<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navigate = (path) => {
  const routeExists = router.getRoutes().some((route) => route.path === path)
  if (routeExists) {
    router.push(path)
  } else {
    router.push('/404-not-found')
  }
}
</script>

<template>
  <nav v-if="(route.path !== '/404-not-found', route.path !== '/')" id="navbar" class="navbar">
    <div class="navbar-item" :class="{ active: route.path === '/home' }">
      <router-link to="/home" class="nav-link" @click.prevent="navigate('/home')">
        <div class="nav-link-content">
          <i class="fa-solid fa-house"></i>
        </div>
      </router-link>
    </div>

    <div class="navbar-item" :class="{ active: route.path === '/about' }">
      <router-link to="/about" class="nav-link" @click.prevent="navigate('/about')">
        <div class="nav-link-content">
          <i class="fa-solid fa-pizza-slice"></i>
        </div>
      </router-link>
    </div>

    <div class="navbar-item" :class="{ active: route.path === '/history' }">
      <router-link to="/history" class="nav-link" @click.prevent="navigate('/history')">
        <div class="nav-link-content">
          <i class="fa-solid fa-clipboard-list"></i>
        </div>
      </router-link>
    </div>

    <div class="navbar-item" :class="{ active: route.path === '/payment-management' }">
      <router-link
        to="/payment-management"
        class="nav-link"
        @click.prevent="navigate('/payment-management')"
      >
        <div class="nav-link-content">
          <i class="fa-regular fa-credit-card"></i>
        </div>
      </router-link>
    </div>

    <div class="navbar-item" :class="{ active: route.path === '/favorites' }">
      <router-link to="/favorites" class="nav-link" @click.prevent="navigate('/favorites')">
        <div class="nav-link-content">
          <i class="fa-solid fa-heart"></i>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  animation: animationNavDesktop 0.5s ease-in-out 1 forwards;

  .navbar-item {
    height: 35px;
    width: 35px;
    line-height: 35px;
    border-radius: 35px;
    margin: 7.5dvh auto;
    transition: all 0.3s;

    .nav-link {
      cursor: pointer;

      .nav-link-content {
        text-align: center;
        font-size: calc(0.8rem + 0.2vw);

        i {
          color: white;
          opacity: 0.5;
        }
      }
    }

    &:hover,
    &.active {
      background-color: rgba(255, 255, 255, 0.3);

      .nav-link {
        cursor: pointer;

        .nav-link-content {
          text-align: center;
          font-size: calc(0.8rem + 0.2vw);

          i {
            color: white;
            opacity: 1;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .navbar {
    animation: animationNavMobile 0.5s ease-in-out 1 forwards;

    .navbar-item {
      margin: 0 auto;

      &:hover,
      &.active {
        margin: 7.5dvh auto;
      }
    }
  }
}

@keyframes animationNavDesktop {
  0% {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fa7878;
    height: 60px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 0;
    z-index: 1000;
  }
  50% {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fa7878;
    height: 0;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 0;
    z-index: 1000;
    transform: translateY(100%);
  }
  75% {
    background-color: #fa7878;
    height: 0;
    width: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 25px;
    z-index: 1000;
    transform: translateY(100%);
  }
  100% {
    background-color: #fa7878;
    height: 100dvh;
    width: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 25px;
    z-index: 1000;
    transform: translateY(0);
  }
}

@keyframes animationNavMobile {
  0% {
    background-color: #fa7878;
    height: 100dvh;
    width: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 25px;
    z-index: 1000;
  }
  50% {
    background-color: #fa7878;
    height: 100dvh;
    width: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 25px;
    z-index: 1000;
    transform: translateX(-100%);
  }
  75% {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fa7878;
    height: 60px;
    width: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 0;
    z-index: 1000;
    transform: translateX(-100%);
  }
  100% {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fa7878;
    height: 60px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top: 0;
    z-index: 1000;
    transform: translateX(0);
  }
}
</style>
