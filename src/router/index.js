import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CatalogoView from '../views/CatalogoView.vue'
import SucursalesView from '../views/SucursalesView.vue'
import ContactoView from '../views/ContactoView.vue'
import CarritoView from '../views/CarritoView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/catalogo', name: 'catalogo', component: CatalogoView },
  { path: '/sucursales', name: 'sucursales', component: SucursalesView },
  { path: '/contacto', name: 'contacto', component: ContactoView },
  { path: '/carrito', name: 'carrito', component: CarritoView }
]

const router = createRouter({
  history: createWebHistory(),
  routes, // <--- No te olvides de esta coma

  // AGREGAR ESTO AQUÍ:
  scrollBehavior(to, from, savedPosition) {
    // Si existe una posición guardada (botón atrás), vuelve ahí
    if (savedPosition) {
      return savedPosition
    }
    // Si no, sube arriba de todo
    return { top: 0 }
  }
})

export default router