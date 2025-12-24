// store.js
import { reactive, watch } from 'vue'
const savedCart = JSON.parse(localStorage.getItem('myFerreteriaCart')) || []

export const store = reactive({
  cart: savedCart,

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.qty++
    } else {
      this.cart.push({ 
        ...product, 
        qty: 1,
        price: product.price || 0 
      })
    }
  },


  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id)
  },

  increment(item) {
    item.qty++
  },

  decrement(item) {
    if (item.qty > 1) item.qty--
  },
  
  clearCart() {
    this.cart = []
  }
})

watch(
  () => store.cart, 
  (val) => {
    localStorage.setItem('myFerreteriaCart', JSON.stringify(val))
  },
  { deep: true }
)