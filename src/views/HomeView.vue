<script setup>
import { ref, computed } from 'vue'
import { NInput, NCarousel, NH1, NButton, NSelect, NRate, NCard, NP, NScrollbar } from 'naive-ui'
import dataJson from '@/assets/data.json'
import { useStore } from '@/stores/order'

const store = useStore()

const headerImages = dataJson.slider.map((item) => item.image)
const categories = dataJson.categories
const restaurants = dataJson.restaurants
const menus = dataJson.menus
const reviews = dataJson.reviews
const users = dataJson.users

const isLoggedIn = ref(false)
const searchQuery = ref('')

const averageRating = (menuId) => {
  const menuReviews = reviews.filter((review) => review.menu_id === menuId)
  const totalRating = menuReviews.reduce((acc, review) => acc + review.rating, 0)
  return menuReviews.length ? totalRating / menuReviews.length : 0
}

const filteredMenus = computed(() => {
  return menus.filter((menu) => {
    const category = categories.find((category) => category.id === menu.category_id)
    const restaurant = restaurants.find((restaurant) => restaurant.id === menu.restaurant_id)

    const matchesMenuName = menu.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategoryName =
      category && category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRestaurantName =
      restaurant && restaurant.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory =
      activeCategoryId.value === null || category.id === activeCategoryId.value

    return (matchesMenuName || matchesCategoryName || matchesRestaurantName) && matchesCategory
  })
})

const selectedSort = ref('All')

const handleSelect = (value) => {
  selectedSort.value = value
}

const sortedMenus = computed(() => {
  const sortedArray = [...filteredMenus.value]

  const sortBy = {
    Restaurant: () => {
      sortedArray.sort((a, b) => {
        const restaurantA = restaurants.find((restaurant) => restaurant.id === a.restaurant_id)
        const restaurantB = restaurants.find((restaurant) => restaurant.id === b.restaurant_id)
        return restaurantA.name.localeCompare(restaurantB.name)
      })
    },
    Category: () => {
      sortedArray.sort((a, b) => {
        const categoryA = categories.find((category) => category.id === a.category_id)
        const categoryB = categories.find((category) => category.id === b.category_id)
        return categoryA.name.localeCompare(categoryB.name)
      })
    },
    RatingAsc: () => {
      sortedArray.sort((a, b) => averageRating(a.id) - averageRating(b.id))
    },
    RatingDesc: () => {
      sortedArray.sort((a, b) => averageRating(b.id) - averageRating(a.id))
    },
    DistanceAsc: () => {
      sortedArray.sort((a, b) => {
        const restaurantA = restaurants.find((restaurant) => restaurant.id === a.restaurant_id)
        const restaurantB = restaurants.find((restaurant) => restaurant.id === b.restaurant_id)
        return restaurantA.distance - restaurantB.distance
      })
    },
    DistanceDesc: () => {
      sortedArray.sort((a, b) => {
        const restaurantA = restaurants.find((restaurant) => restaurant.id === a.restaurant_id)
        const restaurantB = restaurants.find((restaurant) => restaurant.id === b.restaurant_id)
        return restaurantB.distance - restaurantA.distance
      })
    },
    DeliveryTimeAsc: () => {
      sortedArray.sort((a, b) => {
        const restaurantA = restaurants.find((restaurant) => restaurant.id === a.restaurant_id)
        const restaurantB = restaurants.find((restaurant) => restaurant.id === b.restaurant_id)
        return restaurantA.delivery_time - restaurantB.delivery_time
      })
    },
    DeliveryTimeDesc: () => {
      sortedArray.sort((a, b) => {
        const restaurantA = restaurants.find((restaurant) => restaurant.id === a.restaurant_id)
        const restaurantB = restaurants.find((restaurant) => restaurant.id === b.restaurant_id)
        return restaurantB.delivery_time - restaurantA.delivery_time
      })
    },
    PriceAsc: () => {
      sortedArray.sort((a, b) => a.price - b.price)
    },
    PriceDesc: () => {
      sortedArray.sort((a, b) => b.price - a.price)
    },
  }

  if (sortBy[selectedSort.value]) sortBy[selectedSort.value]()

  return sortedArray
})

const activeCategoryId = ref(null)

const handleCategoryClick = (categoryId) => {
  activeCategoryId.value = categoryId
}

const addToOrder = (menu) => {
  store.addOrder(menu)
}
</script>

<template>
  <main>
    <header>
      <div id="search-bar">
        <n-input size="medium" round placeholder="Search" clearable v-model:value="searchQuery">
          <template #prefix>
            <i class="fa-solid fa-magnifying-glass"></i>
          </template>
        </n-input>
      </div>
      <div id="slider">
        <n-carousel
          autoplay
          direction="vertical"
          dot-placement="right"
          style="aspect-ratio: 16/4; max-height: 345px; border-radius: 15px"
        >
          <img
            v-for="(imgSrc, index) in headerImages"
            :key="index"
            class="carousel-img"
            :src="imgSrc"
          />
        </n-carousel>
      </div>
    </header>

    <section id="content">
      <div class="title">
        <n-h1> Foods </n-h1>
        <n-p> Choose the food you want to order </n-p>
      </div>

      <n-scrollbar x-scrollable>
        <div class="categories">
          <n-button
            quaternary
            round
            :class="{ active: activeCategoryId === null }"
            @click="handleCategoryClick(null)"
          >
            <span><i class="fa-solid fa-list-check"></i></span>
            All Category
          </n-button>

          <n-button
            v-for="category in categories"
            :key="category.id"
            quaternary
            round
            :class="{ active: category.id === activeCategoryId }"
            @click="handleCategoryClick(category.id)"
          >
            <span v-html="category.icon_category"></span>
            {{ category.name }}
          </n-button>
        </div>
      </n-scrollbar>

      <div class="filter-all">
        <div class="filter-lable">
          <n-p>Sort By :</n-p>
        </div>
        <n-select
          v-model:value="selectedSort"
          filterable
          placeholder="Pilih opsi penyortiran"
          :options="[
            { label: 'Semua', value: 'All' },
            { label: 'Restoran', value: 'Restaurant' },
            { label: 'Kategori', value: 'Category' },
            { label: 'Rating Rendah - Tinggi', value: 'RatingAsc' },
            { label: 'Rating Tinggi - Rendah', value: 'RatingDesc' },
            { label: 'Jarak Terdekat', value: 'DistanceAsc' },
            { label: 'Jarak Terjauh', value: 'DistanceDesc' },
            { label: 'Waktu Pengiriman Tercepat', value: 'DeliveryTimeAsc' },
            { label: 'Waktu Pengiriman Terlama', value: 'DeliveryTimeDesc' },
            { label: 'Harga Rendah - Tinggi', value: 'PriceAsc' },
            { label: 'Harga Tinggi - Rendah', value: 'PriceDesc' },
          ]"
          @update:value="handleSelect"
        />
      </div>

      <div class="foods">
        <n-card size="small" v-for="menu in sortedMenus" :key="menu.id">
          <template #cover>
            <div class="head">
              <div class="distance">
                {{ restaurants.find((r) => r.id === menu.restaurant_id).distance }} Km away
              </div>
              <div class="time-delivery">
                {{ restaurants.find((r) => r.id === menu.restaurant_id).delivery_time }} min
              </div>
            </div>
            <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          </template>
          <div class="content-card">
            <div class="main">
              <div class="text">
                <n-h3>{{ menu.name }}</n-h3>
                <n-p>Rp. {{ menu.price }}</n-p>
                <n-p>{{ restaurants.find((r) => r.id === menu.restaurant_id).name }}</n-p>
              </div>
              <n-button quaternary round @click="addToOrder(menu)">
                <i class="fa-solid fa-plus"></i>
              </n-button>
            </div>

            <div class="foot">
              <n-p>{{ averageRating(menu.id).toFixed(1) }} / 5</n-p>
              <n-rate :value="averageRating(menu.id)" allow-half disabled />
            </div>
          </div>
        </n-card>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  width: calc(100% - 560px);
  position: relative;
  left: 60px;
  padding: 25px 50px;
  transition: all 0.3s;

  header {
    #search-bar {
      height: fit-content;
      max-width: 350px;
      margin: 25px 0;

      .n-input {
        background-color: rgba(211, 211, 211, 0.5);

        i {
          margin-right: 10px;
        }
      }
    }
    #slider {
      width: 100%;
      margin: 25px 0;

      .n-carousel {
        .carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }

  #content {
    margin-top: 25px;

    .title {
      .n-h1 {
        font-weight: 700;
        font-size: calc(1.2rem + 1.3vw);
        margin: 0;
      }
      .n-p {
        font-weight: 500;
        font-size: calc(0.4rem + 0.6vw);
        margin: 0;
      }
    }

    .categories {
      margin-top: 25px;
      display: flex;
      flex-wrap: nowrap;
      padding: 15px 0;

      .n-button {
        height: fit-content;
        width: fit-content;
        background-color: white;
        margin: 0 10px;
        font-size: calc(0.5rem + 0.6vw);
        padding: 10px 20px;

        span {
          font-size: calc(0.5rem + 1vw);
          margin-right: 10px;
        }

        &:hover,
        &.active {
          background-color: #fa7878;
          color: white;
        }
      }
    }

    .filter-all {
      display: flex;
      align-items: center;
      margin-top: 25px;

      .n-select {
        max-width: 250px;
        margin-left: 10px;
      }
    }

    .foods {
      margin-top: 25px;
      display: grid;
      gap: 25px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 2fr));

      .n-card {
        position: relative;
        background-color: transparent;
        border-radius: 15px 15px 0 0;
        overflow: hidden;

        .head {
          padding: 5px 15px;
          background-color: white;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }

        img {
          border-radius: 15px 15px 0 0;
          width: 100%;
          max-height: 150px;
          object-fit: cover;
          object-position: center;
        }

        .content-card {
          padding: 1rem;

          .n-h3 {
            margin: 0;
            margin-top: 1rem;
          }
          .n-p {
            margin: 0;
          }

          .main {
            display: flex;
            justify-content: space-between;
            align-items: end;

            .n-button {
              height: fit-content;
              width: fit-content;
              background-color: #fa7878;
              border: 1px solid #fa7878;
              color: white;
              font-size: calc(0.5rem + 0.6vw);
              padding: 10px;
              transition: all 0.3s;

              &:hover {
                background-color: transparent;
                box-shadow: 0 0 8px 0 rgba(250, 120, 120, 0.5);
                color: #fa7878;
              }
            }
          }

          .foot {
            display: flex;
            justify-content: space-between;
            align-items: end;
            margin-top: 10px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  main {
    width: calc(100% - 460px);
    padding: 25px 50px;

    #content .categories .n-button {
      font-size: calc(0.5rem + 0.6vw);
    }
  }
}
@media screen and (max-width: 750px) {
  main {
    width: auto;
    position: relative;
    left: 0;
    padding: 25px 25px 25px 95px;

    header {
      #search-bar {
        margin: 50px 0 25px 0;
      }
    }

    #content .categories .n-button {
      font-size: 1rem;
    }

    .foods {
      grid-template-columns: repeat(auto-fill, minmax(150px, 2fr));

      .n-card img {
        max-height: 100px;
      }

      .content-card .n-h3 {
        font-size: 0.8rem;
      }

      .content-card .n-p {
        font-size: 0.7rem;
      }

      .main .n-button {
        font-size: 1rem;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  main {
    width: auto;
    position: relative;
    left: 0;
    padding: 25px;
  }
}
</style>
