<template>
  <div class="home-container">

    <section class="hero-section">
      <div class="hero-backgrounds">

        <div class="hero-dots">
          <button v-for="(slide, index) in slides" :key="index" @click="activeIndex = index"
            :class="{ active: index === activeIndex }" class="dot">
          </button>
        </div>
        <transition-group name="zoom-fade">
          <div v-for="(slide, index) in slides" :key="slide" v-show="index === activeIndex" class="hero-slide"
            :style="{ backgroundImage: `url(${slide})` }"></div>
        </transition-group>
        <div class="hero-overlay"></div>
      </div>

      <div class="content-wrapper">
        <div class="hero-text-group">
          <h1 class="hero-title fade-in-up delay-2">
            Construí <br>
            <span class="text-gradient">El Futuro.</span>
          </h1>

          <p class="hero-subtitle fade-in-up delay-3">
            La ferretería industrial más completa de la región. Calidad profesional para proyectos que perduran.
          </p>

          <div class="hero-actions fade-in-up delay-4">
            <RouterLink class="btn-primary" to="/catalogo">
              Ver Catálogo
              <div class="icon-circle">
                <ArrowRight :size="20" />
              </div>
            </RouterLink>
            <RouterLink class="btn-primary" to="/contacto">
              Contacto
              <div class="icon-circle">
                <SendHorizonal :size="20" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="benefits-bar">
      <div class="content-wrapper">
        <div class="benefits-grid">
          <div class="benefit-item animate-on-scroll">
            <div class="benefit-icon">🚚</div>
            <div class="benefit-text">
              <h4>Envíos a todo el país</h4>
              <p>Despachamos en 24hs</p>
            </div>
          </div>
          <div class="benefit-item animate-on-scroll delay-100">
            <div class="benefit-icon">💳</div>
            <div class="benefit-text">
              <h4>Cuotas sin interés</h4>
              <p>Tarjetas bancarias</p>
            </div>
          </div>
          <div class="benefit-item animate-on-scroll delay-200">
            <div class="benefit-icon">🛡️</div>
            <div class="benefit-text">
              <h4>Garantía Oficial</h4>
              <p>En todos los productos</p>
            </div>
          </div>
          <div class="benefit-item animate-on-scroll delay-300">
            <div class="benefit-icon">🔧</div>
            <div class="benefit-text">
              <h4>Asesoramiento</h4>
              <p>Técnicos especializados</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section categories-section">
      <div class="content-wrapper">

        <div class="section-header animate-on-scroll">
          <div class="header-text">
            <span class="eyebrow">Rubros Destacados</span>
            <h2>Lo que tu proyecto necesita</h2>
          </div>
          <RouterLink to="/catalogo" class="view-all-btn">
            Ver todo el catálogo
            <ArrowRight :size="20" />
          </RouterLink>
        </div>

        <div class="visual-grid">
          <RouterLink v-for="(cat, index) in categories" :key="cat.name" to="/catalogo"
            class="grid-item animate-on-scroll" :class="cat.size" :style="{ transitionDelay: `${index * 100}ms` }">
            <div class="item-bg" :style="{ backgroundImage: `url(${cat.image})` }"></div>
            <div class="item-overlay"></div>

            <div class="item-content">
              <div class="item-top">
                <span class="cat-count">{{ cat.count }} productos</span>

              </div>

              <div class="item-bottom">
                <h3>{{ cat.name }}</h3>
                <div class="hover-reveal">
                  <span>Explorar</span>
                  <ArrowRight :size="18" />
                </div>
              </div>
            </div>
          </RouterLink>
        </div>

      </div>
    </section>

    <section class="section brands-section">
      <div class="content-wrapper">
        <p class="brands-label animate-on-scroll">Distribuidores Oficiales</p>

        <div class="marquee-wrapper animate-on-scroll delay-200">
          <div class="marquee-track">
            <div v-for="(img, i) in brandsLoop" :key="i" class="brand-item">
              <img draggable="false" :src="img" alt="Marca Partner" class="brand-img" />
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue"
import { ArrowRight, SendHorizonal } from "lucide-vue-next"

// Assets
import hero1 from "../assets/Ferreteria-argentina.webp"
import hero2 from "../assets/Ferreteria-argentina.jpg"
import herramientasImg from "../assets/herramientas-home.webp"
import construccionImg from "../assets/construccion-home.jpg"
import electricidadImg from "../assets/electricidad-home.webp"
// Logos Marcas
import albaImg from "../assets/alba-home.jpg"
import boschImg from "../assets/bosch-home.jpg"
import detwaltImg from "../assets/dewalt-home.png"
import libusImg from "../assets/libus-home.png"
import makitaImg from "../assets/makita-home.png"
import sikaImg from "../assets/sika-home.png"
import stanleyImg from "../assets/stanley-home.png"
import stihlImg from "../assets/stihl-home.png"
import totalImg from "../assets/total-home.png"

// --- SLIDER LOGIC ---
const slides = [hero1, hero2]
const activeIndex = ref(0)
let intervalId = null
const next = () => activeIndex.value = (activeIndex.value + 1) % slides.length

onMounted(() => {
  intervalId = setInterval(next, 6000)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" 
  }
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
})

onBeforeUnmount(() => { if (intervalId) clearInterval(intervalId) })

// --- MARCAS LOGIC ---
const brands = [
  stihlImg, boschImg, libusImg, albaImg, sikaImg,
  totalImg, makitaImg, detwaltImg, stanleyImg
]

const brandsLoop = computed(() => [...brands, ...brands, ...brands, ...brands])

// --- CATEGORIAS ---
const categories = [
  { name: "Herramientas", count: "+150", size: "span-2", image: herramientasImg },
  { name: "Construcción", count: "+80", size: "normal", image: construccionImg },
  { name: "Pinturería", count: "+200", size: "normal", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop" },
  { name: "Electricidad", count: "+120", size: "span-2", image: electricidadImg }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;700;800&display=swap');

/* === VARIABLES & GLOBAL === */
.home-container {
  --primary: #0EA5E9;
  --primary-dark: #0284C7;
  --dark: #0F172A;
  --light: #F8FAFC;
  --glass: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--dark);
  background-color: var(--light);
  overflow-x: hidden;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* === HERO SECTION === */
.hero-section {
  position: relative;
  height: 95vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-backgrounds,
.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-slide {
  background-size: cover;
  background-position: center;
  will-change: transform;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.2) 100%);
  z-index: 1;
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 1.5s ease, transform 8s linear;
}

.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(1.1);
}

.zoom-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.zoom-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(1);
}

.hero-text-group {
  position: relative;
  z-index: 10;
  max-width: 650px;
  color: white;
}

.hero-title {
  font-size: clamp(3.5rem, 6vw, 5.5rem);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.text-gradient {
  background: linear-gradient(135deg, #7DD3FC 0%, #ffffff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #CBD5E1;
  margin-bottom: 48px;
  max-width: 500px;
  font-weight: 300;
}

.hero-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px 16px 32px;
  background: white;
  color: var(--dark);
  font-weight: 700;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--dark);
  color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(255, 255, 255, 0.5);
}

.btn-primary:hover .icon-circle {
  transform: rotate(45deg);
  background: var(--primary);
}

.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

.delay-3 {
  animation-delay: 0.6s;
}

.delay-4 {
  animation-delay: 0.8s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === CATEGORIES SECTION === */
.categories-section {
  padding: 100px 0;
  background-color: #F8FAFC;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
}

.eyebrow {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #0EA5E9;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.section-header h2 {
  font-size: 42px;
  font-weight: 800;
  color: #0F172A;
  line-height: 1;
}

.view-all-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #64748B;
  text-decoration: none;
  transition: color 0.3s;
}

.view-all-btn:hover {
  color: #0EA5E9;
}

.visual-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 320px;
  gap: 24px;
}

.grid-item {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.grid-item.span-2 {
  grid-column: span 2;
}

.grid-item.normal {
  grid-column: span 1;
}

.item-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0.1) 100%);
  z-index: 2;
  transition: opacity 0.3s;
}

.item-content {
  position: relative;
  z-index: 3;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cat-count {
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  padding: 6px 12px;
  border-radius: 99px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.icon-glass {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
}

.item-bottom h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hover-reveal {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
  opacity: 0.8;
  transform: translateX(-10px);
  opacity: 0;
  transition: all 0.3s ease;
  color: #38BDF8;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.grid-item:hover .item-bg {
  transform: scale(1.1);
}

.grid-item:hover .item-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(14, 165, 233, 0.2) 100%);
}

.grid-item:hover .cat-count {
  opacity: 1;
  transform: translateY(0);
}

.grid-item:hover .hover-reveal {
  opacity: 1;
  transform: translateX(0);
}

.grid-item:hover .icon-glass {
  background: #0EA5E9;
  border-color: #0EA5E9;
  transform: rotate(5deg);
}

/* === BRAND MARQUEE (Mejorado) === */
.brands-section {
  padding-top: 0;
  padding-bottom: 80px;
  background: var(--light);
}

.brands-label {
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--primary);
  margin-bottom: 48px;
  opacity: 1;
}

.marquee-wrapper {
  position: relative;
  overflow: hidden;
  animation-play-state: paused;
  background: transparent;
  border: none;
  padding: 20px 0;
  width: 100%;


  -webkit-mask-image: linear-gradient(to right,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%);
  mask-image: linear-gradient(to right,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%);
}

.marquee-track {
  display: flex;
  gap: 80px;
  width: max-content;
  animation: scroll 40s linear infinite;
  align-items: center;
}

.brand-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease; 
  cursor: pointer;
  position: relative; 
  z-index: 1;
}

.brand-img {
  height: 45px;
  width: auto;
  object-fit: contain;
  mix-blend-mode: multiply; 

  transition: all 0.3s ease;
}


.brand-item:hover {
  opacity: 1;
  transform: scale(1.15);
  z-index: 10;
}

.brand-item:hover .brand-img {
  filter: grayscale(0%) opacity(1);
  mix-blend-mode: normal; 
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-50% - 40px));
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .marquee-track {
    gap: 40px;
    animation-duration: 25s;
  }

  .brand-img {
    height: 35px;
  }

  .marquee-wrapper {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-50% - 20px));
    }
  }
}

@media (max-width: 768px) {
  .visual-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px; 
    gap: 12px;
  }

  .grid-item,
  .grid-item.span-2, 
  .grid-item.normal {
    grid-column: span 1 !important; 
  }

  .item-content {
    padding: 16px; 
  }

  .item-bottom h3 {
    font-size: 18px; 
    margin-bottom: 4px;
  }
  
  .cat-count {
      font-size: 11px;
      padding: 4px 8px;
  }

  .hover-reveal {
      display: none;
  }
}


.benefits-bar {
  background: var(--dark);
  color: white;
  padding: 32px 0;
  margin-top: -2px;
  position: relative;
  z-index: 20;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.benefit-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.benefit-text h4 {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
}

.benefit-text p {
  font-size: 12px;
  color: #94A3B8;
  margin: 2px 0 0 0;
}

.hero-dots {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center; 
  gap: 16px;
  z-index: 20;
  padding: 10px;
}

.dot {
  appearance: none; 
  padding: 0;
  margin: 0;
  outline: none;
  cursor: pointer;
  width: 12px;
  height: 12px;
  border-radius: 50%; 

  background-color: #ffffff;
  border: 2px solid #0EA5E9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.dot:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 8px rgba(14, 165, 233, 0.4);
  border-color: #0284C7;
}

/* Estado Activo (el slide actual) */
.dot.active {
  background-color: #0EA5E9;
  border-color: #0EA5E9;
  transform: scale(1.3);
}

/* === SCROLL ANIMATIONS === */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  /* Empieza 30px más abajo */
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  will-change: opacity, transform;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Retrasos escalonados para grupos de elementos */
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