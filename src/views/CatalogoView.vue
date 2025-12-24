<template>
  <div class="catalog-page">

    <header class="catalog-header">
      <div class="container header-content">
        <h1 class="page-title animate-on-scroll">Nuestro Catálogo</h1>
        <p class="page-subtitle animate-on-scroll delay-100">Explorá nuestras herramientas y materiales de primera
          calidad.</p>

        <div class="search-wrapper animate-on-scroll delay-200">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" v-model="searchQuery" placeholder="¿Qué estás buscando hoy?" class="search-input">
        </div>
      </div>
    </header>

    <div class="container main-content">

      <div class="filters-container animate-on-scroll delay-300">

        <div class="tabs-wrapper">
          <button v-for="cat in categories" :key="cat" class="tab-btn" :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat">
            {{ cat }}
          </button>
        </div>

        <div class="separator"></div>

        <div class="brands-filter-wrapper">
          <div class="filter-header">
            <div class="filter-title-group">
              <span class="filter-title">Marcas</span>
              <span class="brand-count-badge">{{ availableBrandsList.length }}</span>
            </div>

            <transition name="fade">
              <button v-if="selectedBrand !== 'Todas'" class="clear-brand-btn" @click="selectedBrand = 'Todas'">
                <span class="icon-close">×</span> Limpiar
              </button>
            </transition>
          </div>

          <div class="brands-rail-container">
            <div class="brands-rail">
              <button class="brand-chip" :class="{ active: selectedBrand === 'Todas' }"
                @click="selectedBrand = 'Todas'">
                <span class="chip-text">Todas</span>
              </button>

              <button v-for="brand in availableBrandsList" :key="brand" class="brand-chip"
                :class="{ active: selectedBrand === brand }" @click="toggleBrand(brand)">
                <span class="chip-text">{{ brand }}</span>

                <span class="chip-count">{{ getProductCountByBrand(brand) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="products-grid">
        <div v-for="(product, index) in filteredProducts" :key="product.id" class="product-card fade-in-card"
          :style="{ animationDelay: `${index * 100 + (isInitialLoad ? 800 : 0)}ms` }">
          <div class="card-brand-badge">{{ product.brand }}</div>

          <div class="card-image cursor-pointer" @click="openModal(product)">
            <img :src="product.image" :alt="product.name" class="product-img" loading="lazy">
          </div>

          <div class="card-details">
            <span class="card-category">{{ product.category }}</span>
            <h3 class="card-title">{{ product.name }}</h3>
            <p class="card-price">{{ formatPrice(product.price) }}</p>
            <div class="card-actions-stack">
              <button class="btn-add-cart" @click="handleAddToCart(product)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Agregar al carrito
              </button>

              <button class="btn-details" @click="openModal(product)">
                Ver detalles
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="empty-state animate-on-scroll">
      <div class="empty-icon">🔍</div>
      <h3>No encontramos resultados</h3>
      <p>Intentá cambiando los filtros o la búsqueda.</p>
      <button class="btn-reset" @click="resetFilters">Limpiar Filtros</button>
    </div>

  </div>

  <transition name="toast">
    <div v-if="showToast" class="toast-notification">
      <div class="toast-icon">✓</div>
      <span>¡Agregado al carrito!</span>
    </div>
  </transition>

  <transition name="modal-fade">
    <div v-if="selectedProduct" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>

        <div class="modal-grid">
          <div class="modal-image-col">
            <div class="modal-img-wrapper">
              <img :src="selectedProduct.image" :alt="selectedProduct.name">
            </div>
          </div>

          <div class="modal-info-col">
            <span class="modal-brand">{{ selectedProduct.brand }}</span>
            <h2 class="modal-title">{{ selectedProduct.name }}</h2>
            <h3 class="modal-price">{{ formatPrice(selectedProduct.price) }}</h3>
            <p class="modal-desc">{{ selectedProduct.desc }}</p>

            <div class="modal-specs">
              <h4>Especificaciones</h4>
              <ul>
                <li v-for="(value, key) in selectedProduct.specs" :key="key">
                  <span class="spec-name">{{ key }}:</span>
                  <span class="spec-value">{{ value }}</span>
                </li>
              </ul>
            </div>

            <div class="modal-actions-col">
              <button class="btn-add-cart large" @click="handleAddToCart(selectedProduct)">
                Agregar al Pedido
              </button>
              <a :href="getWhatsappLink(selectedProduct.name)" target="_blank" class="btn-consult full-width">
                Consultar duda por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { store } from '../store/store.js'

// --- IMPORTACIÓN DE IMÁGENES ---
import imgTaladro from '../assets/Taladro-percutor.webp'
import imgAmoladora from '../assets/amoladora-makita.jpg'
import imgDestornilladores from '../assets/destornilladores-stanley.jpeg'
import imgMotosierra from '../assets/motosierra.stihl.webp'
import imgCemento from '../assets/cemento-portland.webp'
import imgMembrana from '../assets/membrana-sika.png'
import imgKlaukol from '../assets/klaukol.jpg'
import imgAlba from '../assets/alba-late.webp'
import imgSherwin from '../assets/esmalte-sherwin.webp'
import imgRodillo from '../assets/rodillo-el-galgo.webp'
import imgCable from '../assets/cable-prysmian.webp'
import imgTermica from '../assets/termica-bipolar-schneider.jpg'

// --- DATA ---
const categories = ['Todas', 'Herramientas', 'Construcción', 'Pinturería', 'Electricidad']

const products = ref([
  {
    id: 1, name: 'Taladro Percutor 850W', category: 'Herramientas', brand: 'Bosch', image: imgTaladro,
    price: 185000,
    desc: 'Potencia industrial para hormigón y mampostería.',
    specs: { 'Potencia': '850W', 'Mandril': '13mm', 'Velocidad': '0-3000 rpm', 'Garantía': '12 meses' }
  },
  {
    id: 2, name: 'Amoladora Angular 4-1/2"', category: 'Herramientas', brand: 'Makita', image: imgAmoladora,
    price: 95000,
    desc: 'Compacta y potente, ideal para cortes precisos.',
    specs: { 'Disco': '115mm', 'Potencia': '720W', 'Peso': '1.8kg', 'Uso': 'Profesional' }
  },
  {
    id: 3, name: 'Juego de Destornilladores', category: 'Herramientas', brand: 'Stanley', image: imgDestornilladores,
    price: 42000,
    desc: 'Kit de 10 piezas aisladas 1000V.',
    specs: { 'Piezas': '10 unidades', 'Aislamiento': '1000V', 'Material': 'Cromo Vanadio', 'Tipo': 'Phillips y Plano' }
  },
  {
    id: 4, name: 'Motosierra MS 170', category: 'Herramientas', brand: 'Stihl', image: imgMotosierra,
    price: 350000,
    desc: 'La más elegida para tareas domésticas.',
    specs: { 'Cilindrada': '30.1 cm³', 'Potencia': '1.3 kW', 'Espada': '35 cm', 'Peso': '4.1 kg' }
  },
  {
    id: 5, name: 'Cemento Portland 50kg', category: 'Construcción', brand: 'Loma Negra', image: imgCemento,
    price: 12500,
    desc: 'Alta resistencia inicial para estructuras.',
    specs: { 'Presentación': 'Bolsa 50kg', 'Tipo': 'CPF40', 'Uso': 'Hormigón estructural', 'Fraguado': 'Rápido' }
  },
  {
    id: 6, name: 'Membrana Líquida 20L', category: 'Construcción', brand: 'Sika', image: imgMembrana,
    price: 85000,
    desc: 'Impermeabilizante acrílico fibrado.',
    specs: { 'Color': 'Blanco', 'Rendimiento': '1.2 kg/m²', 'Secado': '4-6 horas', 'Elasticidad': 'Alta' }
  },
  {
    id: 7, name: 'Adhesivo para Cerámicos', category: 'Construcción', brand: 'Klaukol', image: imgKlaukol,
    price: 18000,
    desc: 'Impermeable, ideal baños y cocinas.',
    specs: { 'Peso': '30kg', 'Impermeable': 'Sí', 'Uso': 'Interior/Exterior', 'Rendimiento': '3-5 kg/m²' }
  },
  {
    id: 8, name: 'Látex Interior Mate 20L', category: 'Pinturería', brand: 'Alba', image: imgAlba,
    price: 98000,
    desc: 'Super lavable y anti-hongo.',
    specs: { 'Acabado': 'Mate', 'Lavable': 'Sí', 'Rendimiento': '12 m²/L', 'Secado': '1 hora' }
  },
  {
    id: 9, name: 'Esmalte Sintético 4L', category: 'Pinturería', brand: 'Sherwin', image: imgSherwin,
    price: 45000,
    desc: 'Acabado brillante secado rápido.',
    specs: { 'Color': 'Blanco', 'Acabado': 'Brillante', 'Base': 'Solvente', 'Uso': 'Madera y Metal' }
  },
  {
    id: 10, name: 'Rodillo Pelo Corto 22cm', category: 'Pinturería', brand: 'El Galgo', image: imgRodillo,
    price: 8500,
    desc: 'Terminación profesional sin marcas.',
    specs: { 'Medida': '22 cm', 'Material': 'Lana natural', 'Uso': 'Látex y Sintéticos', 'Mango': 'Plástico ergonómico' }
  },
  {
    id: 11, name: 'Cable Unipolar 2.5mm', category: 'Electricidad', brand: 'Prysmian', image: imgCable,
    price: 65000,
    desc: 'Rollo x 100mts, norma IRAM.',
    specs: { 'Sección': '2.5 mm²', 'Largo': '100 mts', 'Norma': 'IRAM NM 247-3', 'Material': 'Cobre' }
  },
  {
    id: 12, name: 'Térmica Bipolar 25A', category: 'Electricidad', brand: 'Schneider', image: imgTermica,
    price: 15500,
    desc: 'Protección segura para tu instalación.',
    specs: { 'Polos': '2 (Bipolar)', 'Amperaje': '25A', 'Curva': 'C', 'Capacidad': '4.5 kA' }
  },
])

// --- STATE ---
const searchQuery = ref('')
const selectedCategory = ref('Todas')
const selectedBrand = ref('Todas')
const selectedProduct = ref(null)
const isInitialLoad = ref(true)
const showToast = ref(false)

// MODIFICADO: Eliminado brandsRailRef ya no es necesario

// --- COMPUTED ---
const availableBrandsList = computed(() => {
  const brands = new Set(products.value.map(p => p.brand))
  return Array.from(brands).sort()
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchCategory = selectedCategory.value === 'Todas' || product.category === selectedCategory.value
    const matchBrand = selectedBrand.value === 'Todas' || product.brand === selectedBrand.value
    const matchSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchBrand && matchSearch
  })
})

onMounted(() => {
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach((el) => observer.observe(el))

  setTimeout(() => { isInitialLoad.value = false }, 1500)
})

// --- METHODS ---
// MODIFICADO: Eliminada la función onRailWheel (el scroll es CSS ahora)

const toggleBrand = (brand) => {
  selectedBrand.value = (selectedBrand.value === brand) ? 'Todas' : brand
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Todas'
  selectedBrand.value = 'Todas'
}

const getProductCountByBrand = (brandName) => {
  return products.value.filter(p => {
    const matchCategory = selectedCategory.value === 'Todas' || p.category === selectedCategory.value
    return p.brand === brandName
  }).length
}

const getWhatsappLink = (productName) => {
  const phone = '5492804728518'
  const text = `Hola! Estoy viendo el catálogo web y me interesa consultar por: ${productName}`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)
}

const handleAddToCart = (product) => {
  store.addToCart(product)
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2500)
}

const openModal = (product) => {
  selectedProduct.value = product
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProduct.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.catalog-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #F8FAFC;
  min-height: 100vh;
  padding-bottom: 80px;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* === HEADER & SEARCH === */
.catalog-header {
  background: white;
  padding: 60px 0 40px;
  text-align: center;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 40px;
}

.page-title {
  font-size: 42px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: #64748B;
  font-size: 18px;
  margin-bottom: 32px;
}

.search-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 50px;
  border-radius: 99px;
  border: 2px solid #E2E8F0;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  border-color: #0EA5E9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #94A3B8;
}

/* === FILTROS ESTILO APP === */
.filters-container {
  background: white;
  padding: 20px 0;
  border-radius: 24px;
  box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  border: 1px solid #F1F5F9;
  overflow: hidden;
}

.separator {
  height: 1px;
  background: #F1F5F9;
  margin: 0 24px 20px 24px;
}

/* Tabs Superiores */
.tabs-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 24px 20px 24px;
}

.tab-btn {
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: #F8FAFC;
  color: #64748B;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.tab-btn.active {
  background: #0F172A;
  color: white;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
}

/* BRAND CLOUD (Marcas) */
.brands-filter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Header de la sección de marcas */
.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 12px 24px;
}

.filter-title {
  font-size: 14px;
  font-weight: 800;
  color: #0F172A;
}

.filter-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.clear-brand {
  font-size: 12px;
  color: #EF4444;
  cursor: pointer;
  font-weight: 600;
}

.brand-count-badge {
  background: #F1F5F9;
  color: #64748B;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 6px;
  font-weight: 700;
}

.clear-brand-btn {
  background: transparent;
  border: none;
  color: #EF4444;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.clear-brand-btn:hover {
  background: #FEF2F2;
}

.icon-close {
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
  display: inline-block;
  margin-top: -1px;
}


/* === RAIL DE MARCAS (MODIFICADO: Mobile Scroll / Desktop Wrap) === */
.brands-rail-container {
  position: relative;
  width: 100%;
}

/* Sombra degradada: Visible SOLO en Mobile (por defecto) */
.brands-rail-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 40px;
  background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  pointer-events: none;
  display: block;
}

.brands-rail {
  display: flex;
  gap: 12px;
  
  /* Comportamiento Mobile (Scroll) */
  overflow-x: auto;
  padding: 4px 24px 12px 24px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
}

.brands-rail::-webkit-scrollbar {
  display: none;
}

/* COMPORTAMIENTO PC (Tablets y Desktop > 768px) */
@media (min-width: 768px) {
  
  /* Ocultamos la sombra degradada */
  .brands-rail-container::after {
    display: none;
  }

  /* Cambiamos el carril a Wrap (Multi-línea) */
  .brands-rail {
    flex-wrap: wrap;
    overflow-x: visible;
    justify-content: center; /* Centrado estético */
    padding: 4px 24px 20px 24px; /* Un poco más de aire abajo */
  }
}

/* Estilo del CHIP (Píldora) */
.brand-chip {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  border: 1px solid #E2E8F0;
  background: white;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  user-select: none;
}

.brand-chip:hover {
  border-color: #94A3B8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.brand-chip.active {
  background: #0F172A;
  border-color: #0F172A;
  color: white;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
  transform: scale(1.05);
}

.chip-count {
  font-size: 11px;
  background: #F1F5F9;
  color: #64748B;
  padding: 1px 6px;
  border-radius: 99px;
  font-weight: 700;
  transition: all 0.2s;
}

.brand-chip.active .chip-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Animación simple */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* === GRID PRODUCTOS === */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #F1F5F9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
  border-color: #E2E8F0;
}

.card-brand-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 6px;
  z-index: 2;
}

.card-image {
  height: 220px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #F1F5F9;
  padding: 20px;
  cursor: pointer;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.08);
}

.card-details {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-category {
  font-size: 12px;
  color: #0EA5E9;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 4px;
  line-height: 1.3;
}

.card-desc {
  font-size: 14px;
  color: #64748B;
  line-height: 1.5;
  margin-bottom: 16px;
}

.card-price {
  font-size: 18px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 16px;
  margin-top: auto;
}

/* === ACCIONES DE LA CARD (Layout Vertical) === */
.card-actions-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.btn-add-cart,
.btn-details {
  width: 100%;
  background: #0EA5E9;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.2);
}

.btn-add-cart {
  padding: 14px;
  gap: 8px;
}

.btn-add-cart:hover {
  background: #0284C7;
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.4);
}

.btn-add-cart:active {
  transform: translateY(-1px);
}

.btn-details {
  padding: 12px;
  background: #38BDF8;
}

.btn-details:hover {
  background: #0284C7;
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -3px rgba(14, 165, 233, 0.3);
}

.btn-details:active {
  transform: translateY(0);
}

/* === TOAST NOTIFICATION === */
.toast-notification {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #0F172A;
  color: white;
  padding: 12px 24px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  font-weight: 600;
  font-size: 14px;
}

.toast-icon {
  background: #22c55e;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

/* === EMPTY STATE === */
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #64748B;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.btn-reset {
  margin-top: 16px;
  padding: 10px 24px;
  background: white;
  border: 1px solid #CBD5E1;
  border-radius: 99px;
  cursor: pointer;
  font-weight: 600;
  color: #475569;
}

/* === MODAL === */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  display: grid;
  place-items: center;
  color: #64748B;
  transition: all 0.2s;
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal-image-col {
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-right: 1px solid #F1F5F9;
}

.modal-img-wrapper img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.modal-info-col {
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.modal-brand {
  font-size: 13px;
  font-weight: 700;
  color: #0EA5E9;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.modal-title {
  font-size: 32px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 8px;
  line-height: 1.1;
}

.modal-price {
  font-size: 24px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 16px;
}

.modal-desc {
  color: #64748B;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.modal-specs {
  background: #F8FAFC;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
}

.modal-specs h4 {
  font-size: 14px;
  text-transform: uppercase;
  color: #94A3B8;
  margin-bottom: 16px;
  font-weight: 700;
}

.modal-specs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-specs li {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #E2E8F0;
  font-size: 14px;
}

.modal-specs li:last-child {
  border-bottom: none;
}

.spec-name {
  font-weight: 600;
  color: #475569;
}

.spec-value {
  color: #0F172A;
  font-weight: 500;
}

.modal-actions-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-add-cart.large {
  width: 100%;
  padding: 14px;
  font-size: 16px;
}

.full-width {
  width: 100%;
  text-align: center;
  padding: 14px;
  font-size: 15px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  text-decoration: none;
  color: #0F172A;
  font-weight: 600;
  display: block;
  transition: all 0.2s;
}

.full-width:hover {
  background: #F8FAFC;
  border-color: #94A3B8;
}

/* Animaciones */
.fade-in-card {
  opacity: 0;
  animation: fadeUpCard 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes fadeUpCard {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content {
  animation: modalUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-leave-active .modal-content {
  animation: modalUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse;
}

@keyframes modalUp {
  from {
    transform: translateY(40px) scale(0.95);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }

  .modal-image-col {
    padding: 30px;
    border-right: none;
    border-bottom: 1px solid #F1F5F9;
  }

  .modal-info-col {
    padding: 24px;
  }

  .modal-title {
    font-size: 24px;
  }
}

/* Scroll Anim */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s, transform 0.8s;
  will-change: opacity, transform;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 {
  transition-delay: 0.1s;
}

.delay-200 {
  transition-delay: 0.2s;
}

.delay-300 {
  transition-delay: 0.3s;
}
</style>