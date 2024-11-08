import { defineStore } from 'pinia'

export const useStore = defineStore('order', {
  state: () => ({
    orders: [],
  }),
  actions: {
    addOrder(menu) {
      const existingOrder = this.orders.find((order) => order.id === menu.id)
      if (existingOrder) {
        existingOrder.quantity += 1
      } else {
        this.orders.push({ ...menu, quantity: 1 })
      }
    },
    removeOrder(menuId) {
      this.orders = this.orders.filter((order) => order.id !== menuId)
    },
    clearOrders() {
      this.orders = []
    },
  },
  getters: {
    totalOrderPrice(state) {
      return state.orders.reduce((total, order) => total + order.price * order.quantity, 0)
    },
  },
})
