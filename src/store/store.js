// store.js
import { reactive, watch } from 'vue'

// 1. Cargar carrito guardado del navegador (si existe)
const savedCart = JSON.parse(localStorage.getItem('myFerreteriaCart')) || []

// 2. Estado reactivo global
export const store = reactive({
  cart: savedCart,

  // Agregar producto
  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.qty++
    } else {
      // Aseguramos que tenga precio (si no viene, ponemos 0 para evitar errores)
      this.cart.push({ 
        ...product, 
        qty: 1,
        price: product.price || 0 
      })
    }
  },

  // Eliminar producto
  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id)
  },

  // Sumar cantidad
  increment(item) {
    item.qty++
  },

  // Restar cantidad
  decrement(item) {
    if (item.qty > 1) item.qty--
  },
  
  // Limpiar todo (opcional, para después de comprar)
  clearCart() {
    this.cart = []
  }
})

// 3. Guardar automáticamente cualquier cambio en localStorage
watch(
  () => store.cart, 
  (val) => {
    localStorage.setItem('myFerreteriaCart', JSON.stringify(val))
  },
  { deep: true }
)