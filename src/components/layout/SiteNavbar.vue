<template>
  <div class="top-bar">
    <div class="container top-bar-content">
      <span class="info-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        Rawson • Playa Unión
      </span>
      <span class="info-item desktop-only">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Lun a Sáb: 8:00 - 20:00hs
      </span>
    </div>
  </div>

  <header class="header" :class="{ 'scrolled': isScrolled, 'menu-active': isMenuOpen }">
    <div class="container nav-container">
      
<RouterLink to="/" class="brand-text-only" @click="closeMenu">
  <div class="brand-stack">
    <span class="word-small">FERRETERÍA</span>
    <span class="word-big">ARGENTINA</span>
  </div>
</RouterLink>

      <nav class="desktop-nav">
        <RouterLink to="/" class="nav-link">Inicio</RouterLink>
        <RouterLink to="/catalogo" class="nav-link">Catálogo</RouterLink>
        <RouterLink to="/sucursales" class="nav-link">Sucursales</RouterLink>
        <RouterLink to="/contacto" class="nav-link">Contacto</RouterLink>
        <RouterLink to="/carrito" class="nav-link">Carrito</RouterLink>
      </nav>

      <button class="menu-btn" @click="toggleMenu" aria-label="Menú">
        <div class="hamburger" :class="{ 'open': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

    </div>

    <transition name="menu-fade">
      <div v-if="isMenuOpen" class="mobile-menu-overlay">
        <nav class="mobile-links-wrapper">
          <RouterLink to="/" class="mobile-link" @click="closeMenu">Inicio</RouterLink>
          <RouterLink to="/catalogo" class="mobile-link" @click="closeMenu">Catálogo</RouterLink>
           <RouterLink to="/sucursales" class="mobile-link" @click="closeMenu">Sucursales</RouterLink>
           <RouterLink to="/contacto" class="mobile-link" @click="closeMenu">Contacto</RouterLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  // Cambia el estado si bajamos más de 50px
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* === CONFIGURACIÓN DE COLORES === */
.header, .top-bar, .mobile-menu-overlay {
  --primary: #0EA5E9;       /* Celeste Principal (Sky 500) */
  --primary-gradient: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%); /* Degradado Celeste a Azul */
  --primary-dark: #0284C7;  /* Azul más oscuro para hover y topbar */
  --deep-blue: #0c4a6e;     /* Azul muy oscuro para la TopBar */
  
  --text-white: #FFFFFF;
  --text-dark: #1E293B;
  
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* === TOP BAR (Utilitaria) === */
.top-bar {
  background-color: var(--deep-blue); /* Fondo oscuro fijo */
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  padding: 8px 0;
  position: relative;
  z-index: 101;
}

.top-bar-content {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

/* === HEADER PRINCIPAL === */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  /* AQUÍ ESTÁ LA SOLUCIÓN: Fondo Celeste Sólido (con degradado) por defecto */
  background: var(--primary-gradient); 
  color: var(--text-white);
  box-shadow: 0 4px 15px rgba(2, 132, 199, 0.2); /* Sombra azul suave */
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


/* === LOGO === */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit; 
}

.logo-icon {
  width: 38px;
  height: 38px;
  background: white; /* Fondo blanco para el icono */
  color: var(--primary-dark); /* Icono azul */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.logo-icon svg { width: 22px; height: 22px; }

.brand-name {
  font-weight: 800;
  font-size: 19px;
  letter-spacing: -0.02em;
}

/* === DESKTOP NAVIGATION === */
.desktop-nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  color: rgba(255,255,255,0.95); /* Blanco muy visible */
  position: relative;
  transition: color 0.3s ease;
  padding: 5px 0;
}

.nav-link:hover {
  color: white;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
}

/* Subrayado animado */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover::after, .nav-link.router-link-active::after {
  width: 100%;
}

/* === MOBILE BUTTON === */
.menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 102;
}

.hamburger {
  width: 24px;
  height: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: white; /* Siempre blanco por defecto */
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* Animación Hamburger */
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* === MOBILE OVERLAY === */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: var(--primary-gradient); /* Fondo Celeste en Móvil también */
  padding-top: 100px;
  display: flex;
  justify-content: center;
  z-index: 101;
}

.mobile-links-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.mobile-link {
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-decoration: none;
}


/* Estilos de Solo Texto Editorial */
.brand-text-only {
  text-decoration: none;
  color: white;
}

.brand-stack {
  display: flex;
  flex-direction: column; /* Una palabra arriba de la otra */
  line-height: 0.9; /* Bien pegaditas verticalmente */
  align-items: flex-start;
}

.word-small {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3em; /* Espaciado muy amplio estilo premium */
  opacity: 0.9;
  font-weight: 500;
  margin-left: 2px; /* Pequeño ajuste óptico */
}

.word-big {
  font-size: 24px;
  font-weight: 900; /* Black / Extra Bold */
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
/* === RESPONSIVE === */
@media (max-width: 968px) {
  .desktop-nav { display: none; }
  .menu-btn { display: block; }
  .desktop-only { display: none; }
  .top-bar-content { justify-content: center; }
}
</style>