<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useStore } from '@/stores/order'
import { NP, NH2, NButton, NImage, useMessage, NBadge } from 'naive-ui'

const route = useRoute()

const orderStore = useStore()

import dataJson from '@/assets/data.json'
const user = dataJson.users[0]

const message = useMessage()

const showModal = ref(false)

const isOrderListActive = ref(false)

function toggleOrderList() {
  isOrderListActive.value = !isOrderListActive.value
}
function clearOrderList() {
  isOrderListActive.value = false
}

const calculateTotalCost = () => {
  return (
    orderStore.orders.reduce((total, order) => {
      if (typeof order.price === 'number' && typeof order.quantity === 'number') {
        return total + order.price * order.quantity
      }
      return total
    }, 0) + 10000
  )
}

const submitOrder = () => {
  if (orderStore.orders.length === 0) {
    message.warning('Pesanan Anda masih kosong!')
    return
  }
  showModal.value = true
}

const confirmSubmitOrder = () => {
  message.success('Pesanan berhasil dikirim!')
  console.log('Pesanan berhasil dikirim:', orderStore.orders)
  orderStore.orders = []
  showModal.value = false
}

const cancelSubmitOrder = () => {
  message.info('Pesanan dibatalkan.')
  showModal.value = false
}

const totalQuantity = computed(() => {
  return orderStore.orders.reduce((sum, order) => sum + order.quantity, 0)
})
</script>

<template>
  <section
    v-show="(route.path !== '/404-not-found', route.path !== '/')"
    :id="isOrderListActive ? 'active-order-list' : 'order-list'"
  >
    <div class="head">
      <div class="name">
        <i class="fa-solid fa-user"></i>
        <n-p>{{ user.name }}</n-p>
      </div>
      <div class="addres">
        <i class="fa-solid fa-location-dot"></i>
        <n-p>{{ user.addres }}</n-p>
      </div>
      <n-button round quaternary @click="clearOrderList">
        <i class="fa-solid fa-xmark"></i>
      </n-button>
    </div>
    <div class="content">
      <div class="title">
        <n-h2>My Order :</n-h2>
      </div>
      <n-scrollbar style="max-height: 250px">
        <div class="list">
          <div class="card-list" v-for="(order, index) in orderStore.orders" :key="index">
            <n-image
              width="50"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              preview-disabled
            />
            <div class="quantity">
              <n-p><i class="fa-solid fa-xmark"></i>{{ order.quantity }}</n-p>
            </div>
            <div class="food-name">
              <n-p>{{ order.name }}</n-p>
            </div>
            <div class="price">
              <n-p>Rp. {{ order.price }}</n-p>
            </div>
            <n-button round quaternary @click="orderStore.removeOrder(order.id)">
              <i class="fa-solid fa-xmark"></i>
            </n-button>
          </div>
        </div>
      </n-scrollbar>

      <div class="delivery-cost">
        <div class="label">
          <n-p>Delivery</n-p>
        </div>
        <div class="cost">
          <n-p>Rp. 10000</n-p>
        </div>
      </div>
      <div class="total-cost">
        <div class="label">
          <n-p>Total: </n-p>
        </div>
        <div class="cost">
          <n-p>Rp. {{ calculateTotalCost() }}</n-p>
        </div>
      </div>
      <div class="button">
        <n-button quaternary @click="submitOrder">Submit Order</n-button>
      </div>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="dialog"
      title="Konfirmasi Order"
      content="Apakah Anda yakin ingin mengirim pesanan ini?"
      positive-text="Submit"
      negative-text="Cancel"
      @positive-click="confirmSubmitOrder"
      @negative-click="cancelSubmitOrder"
    />
  </section>
  <n-badge
    v-show="(!isOrderListActive, route.path !== '/404-not-found', route.path !== '/')"
    :value="totalQuantity"
    :max="15"
  >
    <n-button @click="toggleOrderList" quaternary>
      <i class="fa-solid fa-basket-shopping"></i>
    </n-button>
  </n-badge>
</template>

<style scoped lang="scss">
#order-list {
  background-color: white;
  max-width: 400px;
  width: 100%;
  height: 100dvh;
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 0;
  transition: all 0.3s;
  overflow: hidden;

  .head {
    width: 100%;
    padding: 25px 15px 20px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: start;

    .name,
    .addres {
      max-width: 200px;
      display: flex;
      align-items: start;
      margin: 0 10px;

      .n-p {
        font-weight: 700;
        margin: 0;
      }

      i {
        margin-right: 10px;
        font-size: calc(1rem + 0.5vw);
        color: #fa7878;
      }
    }
    .n-button {
      font-size: 2rem;
      position: absolute;
      right: 25px;
      display: none;

      &:hover {
        background-color: transparent;
      }
    }
  }

  .content {
    margin-top: 25px;

    .title {
      padding: 0 25px;

      .n-h2 {
        font-weight: bold;
      }
    }

    .list {
      max-height: 200px;

      .card-list {
        display: flex;
        justify-content: end;
        align-items: center;
        padding: 25px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        .quantity,
        .food-name,
        .price {
          margin: 5px;
        }

        .quantity {
          .n-p {
            font-size: calc(1rem + 0.5vw);
            font-weight: 700;
            display: flex;
            align-items: center;

            i {
              margin: 5px 5px 0 0;
              font-size: 1rem;
            }
          }
        }

        .food-name {
          width: 150px;
          margin: auto;
          text-align: end;
          .n-p {
            font-size: calc(0.8rem + 0.2vw);
            font-weight: 600;
          }
        }

        .price .n-p {
          font-size: calc(0.8rem + 0.2vw);
          font-weight: bold;
        }

        .n-button {
          width: 1rem;
          height: 1rem;
          font-size: 1rem;
          padding: 5px;

          &:hover {
            background-color: transparent;
          }
        }
      }
    }

    .delivery-cost,
    .total-cost {
      display: flex;
      justify-content: space-between;
      padding: 25px 35px;
      border-bottom: 1px solid rgba(128, 128, 128, 0.3);

      .n-p {
        font-size: calc(0.8rem + 0.2vw);
        font-weight: bold;
      }
    }

    .total-cost {
      justify-content: end;
      padding-right: 35px;
      margin-top: 25px;

      .label {
        margin-right: 10px;
      }
    }

    .button {
      width: 80%;
      margin: 50px auto 0;

      .n-button {
        width: 100%;
        height: 50px;
        background-color: #fa7878;
        color: white;
        font-size: calc(0.8rem + 0.2vw);
        font-weight: bold;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 0 8px 0 rgba(250, 120, 120, 0.5);
        }
      }
    }
  }
}
#active-order-list {
  background-color: white;
  width: 100%;
  height: 100dvh;
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 0;
  transition: all 0.3s;
  overflow: hidden;
  animation: animationFadeLeft 0.3s ease-in-out 1 forwards;

  .head {
    width: 100%;
    padding: 25px 15px 20px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: start;

    .name,
    .addres {
      max-width: 200px;
      display: flex;
      align-items: start;
      margin: 0 10px;

      .n-p {
        font-weight: 700;
        margin: 0;
      }

      i {
        margin-right: 10px;
        font-size: calc(1rem + 0.5vw);
        color: #fa7878;
      }
    }

    .n-button {
      font-size: 2rem;
      position: absolute;
      right: 25px;

      &:hover {
        background-color: transparent;
      }
    }
  }

  .content {
    margin-top: 25px;

    .title {
      padding: 0 25px;

      .n-h2 {
        font-weight: bold;
      }
    }

    .list {
      max-height: 200px;

      .card-list {
        display: flex;
        justify-content: end;
        align-items: center;
        padding: 25px;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        .quantity,
        .food-name,
        .price {
          margin: 5px;
        }

        .quantity {
          .n-p {
            font-size: calc(1rem + 0.5vw);
            font-weight: 700;
            display: flex;
            align-items: center;

            i {
              margin: 5px 5px 0 0;
              font-size: 1rem;
            }
          }
        }

        .food-name {
          width: 150px;
          margin: auto;
          text-align: end;
          .n-p {
            font-size: calc(0.8rem + 0.2vw);
            font-weight: 600;
          }
        }

        .price .n-p {
          font-size: calc(0.8rem + 0.2vw);
          font-weight: bold;
        }

        .n-button {
          width: 1rem;
          height: 1rem;
          font-size: 1rem;
          padding: 5px;

          &:hover {
            background-color: transparent;
          }
        }
      }
    }

    .delivery-cost,
    .total-cost {
      display: flex;
      justify-content: space-between;
      padding: 25px 35px;
      border-bottom: 1px solid rgba(128, 128, 128, 0.3);

      .n-p {
        font-size: calc(0.8rem + 0.2vw);
        font-weight: bold;
      }
    }

    .total-cost {
      justify-content: end;
      padding-right: 35px;
      margin-top: 25px;

      .label {
        margin-right: 10px;
      }
    }

    .button {
      width: 80%;
      margin: 50px auto 0;

      .n-button {
        width: 100%;
        height: 50px;
        background-color: #fa7878;
        color: white;
        font-size: calc(0.8rem + 0.2vw);
        font-weight: bold;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 0 8px 0 rgba(250, 120, 120, 0.5);
        }
      }
    }
  }
}

.n-badge {
  display: none;
  position: fixed;
  z-index: 1000;
  right: 50px;
  bottom: 50px;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: #fa7878;
  transition: all 0.3s;

  .n-button {
    width: 100%;
    height: 100%;
    border-radius: 50px;

    &:hover {
      background-color: transparent;
    }

    i {
      font-size: large;
      color: white;
    }
  }
}

@media screen and (max-width: 900px) {
  #order-list {
    max-width: 300px;

    .head {
      padding: 10px;
      flex-direction: column;

      .name,
      .addres {
        margin: 10px;
      }
    }

    .content {
      margin-top: 15px;

      .list .card-list {
        position: relative;
        flex-direction: column;
        align-items: start;
        padding: 15px;

        .quantity,
        .food-name,
        .price {
          margin: 0;
        }

        .quantity {
          position: absolute;
          left: 75px;
          top: 40px;
        }
        .food-name {
          width: fit-content;
          margin: 0;
          text-align: start;
          .n-p {
            font-size: calc(0.8rem + 0.2vw);
            font-weight: 600;
          }
        }
        .price .n-p {
          font-size: calc(0.8rem + 0.2vw);
          font-weight: bold;
          position: absolute;
          right: 45px;
          top: 20px;
        }

        .n-button {
          position: absolute;
          right: 25px;
          top: 25px;
        }
      }
    }
  }
  #active-order-list {
    .head {
      padding: 10px;
      flex-direction: column;

      .name,
      .addres {
        margin: 10px;
      }
    }

    .content {
      margin-top: 15px;

      .list .card-list {
        position: relative;
        flex-direction: column;
        align-items: start;
        padding: 15px;

        .quantity,
        .food-name,
        .price {
          margin: 0;
        }

        .quantity {
          position: absolute;
          left: 75px;
          top: 40px;
        }
        .food-name {
          width: fit-content;
          margin: 0;
          text-align: start;
          .n-p {
            font-size: calc(0.8rem + 0.2vw);
            font-weight: 600;
          }
        }
        .price .n-p {
          font-size: calc(0.8rem + 0.2vw);
          font-weight: bold;
          position: absolute;
          right: 45px;
          top: 20px;
        }

        .n-button {
          position: absolute;
          right: 25px;
          top: 25px;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  #order-list {
    background-color: transparent;
    max-width: 100%;
    height: fit-content;
    position: absolute;
    top: 0;

    .head {
      padding: 10px;
      flex-direction: row;
      justify-content: center;
      border-bottom: 1px solid transparent;

      .name,
      .addres {
        font-size: calc(0.7rem + 0.2vw);
        display: flex;
        align-items: center;
        margin: 10px;

        .n-p {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
    .content {
      animation: animationFadeLeftOut 0.3s ease-in-out 1 forwards;
    }
  }
  .n-badge {
    display: block;
    position: fixed;
    z-index: 1000;
    right: 25px;
    bottom: 25px;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    background-color: #fa7878;

    .n-button {
      width: 100%;
      height: 100%;
      border-radius: 50px;

      &:hover {
        background-color: transparent;
      }

      i {
        font-size: large;
        color: white;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .n-badge {
    display: block;
    position: fixed;
    z-index: 1000;
    right: 25px;
    bottom: 85px;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    background-color: #fa7878;

    .n-button {
      width: 100%;
      height: 100%;
      border-radius: 50px;

      &:hover {
        background-color: transparent;
      }

      i {
        font-size: large;
        color: white;
      }
    }
  }
}

@keyframes animationFadeLeft {
  0% {
    display: none;
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
  }
  50% {
    display: block;
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes animationFadeLeftOut {
  0% {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    display: block;
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    display: none;
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
