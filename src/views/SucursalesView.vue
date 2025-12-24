<template>
  <div class="branches-page">
    
    <header class="page-header">
      <div class="container">
        <h1 class="title animate-up">Nuestras Sucursales</h1>
        <p class="subtitle animate-up delay-1">Encontranos en el corazón de Rawson y Playa Unión. Calidad y asesoramiento cerca tuyo.</p>
        
        <button @click="isModalOpen = true" class="btn-schedules animate-up delay-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Ver Horarios de Atención
        </button>
      </div>
    </header>

    <div class="container main-content">
      <div class="branches-wrapper">
        
        <article v-for="(branch, index) in branches" :key="index" 
                 class="branch-card animate-up" 
                 :style="{ animationDelay: `${(index + 2) * 100}ms` }">
          
          <div class="card-map">
            <iframe 
              width="100%" 
              height="100%" 
              style="border:0;" 
              loading="lazy" 
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              :src="getMapUrl(branch.coords)">
            </iframe>
            <div class="map-overlay"></div>
          </div>

          <div class="card-content">
            <div class="branch-header">
              <div class="branch-badge" :class="branch.badgeColor">{{ branch.badge }}</div>
              <h2 class="branch-name">{{ branch.name }}</h2>
            </div>
            
            <div class="info-group">
              <div class="info-row">
                <div class="icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <span class="label">Dirección</span>
                  <p class="value">{{ branch.address }}</p>
                  <p class="value-sm">{{ branch.city }}</p>
                </div>
              </div>

              <div class="info-row">
<div class="icon-box">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
</div>
                <div>
                  <span class="label">Contacto</span>
                  <p class="value">{{ branch.phone }}</p>
                </div>
              </div>
            </div>

            <div class="actions">
              <a :href="`https://www.google.com/maps/search/?api=1&query=${branch.coords}`" target="_blank" class="btn-primary">Cómo llegar</a>
              <a href="#" class="btn-outline">Llamar</a>
            </div>
          </div>
        </article>

      </div>
    </div>

    <transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
        <div class="modal-container">
          <button class="btn-close" @click="isModalOpen = false">✕</button>
          
          <div class="modal-header">
            <h3>Horarios de Atención</h3>
            <p>Nuestros horarios comerciales habituales</p>
          </div>

          <div class="schedules-list">
            <div class="schedule-item">
              <div class="schedule-icon rawson">R</div>
              <div class="schedule-info">
                <h4>Sucursales Rawson</h4>
                <p>Luis Costa y Julián Murga</p>
                <div class="time-row">
                  <span>Lunes a Viernes:</span>
                  <strong>08:00 - 18:00 hs</strong>
                </div>
                <div class="time-row">
                  <span>Sábados:</span>
                  <strong>09:00 - 13:00 hs</strong>
                </div>
              </div>
            </div>

            <div class="schedule-item">
              <div class="schedule-icon playa">P</div>
              <div class="schedule-info">
                <h4>Sucursal Playa Unión</h4>
                <p>Jose Coronel 379</p>
                <div class="time-row">
                  <span>Lunes a Sábado:</span>
                  <strong>09:00 - 20:00 hs</strong>
                </div>
                <span class="tag-green">Horario Corrido</span>
              </div>
            </div>
          </div>
          
          <button class="btn-modal-close" @click="isModalOpen = false">Entendido</button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)

const branches = [
  {
    name: 'Rawson Centro',
    address: 'Luis Costa 112',
    city: 'Rawson',
    phone: '0280 448-1442',
    coords: '-43.301987918471944, -65.10528319009703',
    badge: 'Casa Central',
    badgeColor: 'blue'
  },
  {
    name: 'Rawson Norte',
    address: 'Julián Murga 186',
    city: 'Rawson',
    phone: '0280 4XXXXXX',
    coords: '-43.295294488457074, -65.09214596107863',
    badge: 'Sucursal',
    badgeColor: 'blue'
  },
  {
    name: 'Playa Unión',
    address: 'Jose Coronel 379',
    city: 'Playa Unión',
    phone: '0280 4XXXXXX',
    coords: '-43.310019915285125, -65.04860397751011',
    badge: 'Nueva Sucursal',
    badgeColor: 'orange'
  }
]

const getMapUrl = (coords) => {
  return `https://maps.google.com/maps?q=${coords}&t=&z=15&ie=UTF8&iwloc=&output=embed`
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.branches-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #F8FAFC;
  min-height: 100vh;
  padding-bottom: 80px;
}

.container {
  max-width: 1360px; 
  margin: 0 auto;
  padding: 0 24px;
}

/* === HEADER === */
.page-header {
  background: white;
  padding: 80px 0 60px;
  text-align: center;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 60px;
}

.title {
  font-size: 42px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.subtitle {
  color: #64748B;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.btn-schedules {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  color: #0F172A;
  border: 1px solid #E2E8F0;
  padding: 10px 20px;
  border-radius: 99px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.btn-schedules:hover {
  border-color: #0EA5E9;
  color: #0EA5E9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(14, 165, 233, 0.15);
}

.branches-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 24px;
  align-items: start;
}

/* === BRANCH CARD === */
.branch-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  height: 100%;
}

.branch-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
}

.card-map {
  height: 220px;
  width: 100%;
  position: relative;
  background: #E2E8F0;
}

iframe {
  filter: grayscale(0.2);
  transition: filter 0.3s ease;
}

.branch-card:hover iframe {
  filter: grayscale(0);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.branch-header { margin-bottom: 20px; }

.branch-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 99px;
  margin-bottom: 10px;
}
.branch-badge.blue { background: #E0F2FE; color: #0284C7; }
.branch-badge.orange { background: #FEF3C7; color: #D97706; }

.branch-name {
  font-size: 20px;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.2;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  flex-grow: 1;
}

.info-row { display: flex; gap: 12px; align-items: flex-start; }

.icon-box {
  width: 32px; height: 32px;
  background: #F8FAFC;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #64748B; flex-shrink: 0;
}
.icon-box svg { width: 18px; height: 18px; }

.label {
  display: block; font-size: 10px; text-transform: uppercase;
  color: #94A3B8; font-weight: 700; margin-bottom: 2px;
}

.value { font-size: 14px; font-weight: 600; color: #334155; }
.value-sm { font-size: 12px; color: #64748B; }

.actions { display: flex; gap: 10px; flex-wrap: wrap; }

.btn-primary, .btn-outline {
  flex: 1; padding: 10px; border-radius: 8px;
  font-weight: 600; text-decoration: none;
  text-align: center; font-size: 13px; transition: all 0.2s;
  white-space: nowrap;
}

.btn-primary { background: #0F172A; color: white; }
.btn-primary:hover { background: #0EA5E9; }

.btn-outline { border: 1px solid #E2E8F0; color: #0F172A; }
.btn-outline:hover { background: #F8FAFC; border-color: #CBD5E1; }

/* === MODAL === */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

.modal-container {
  background: white;
  width: 100%; max-width: 500px;
  border-radius: 24px;
  padding: 32px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.btn-close {
  position: absolute; top: 20px; right: 20px;
  background: none; border: none; font-size: 20px;
  cursor: pointer; color: #94A3B8;
  transition: color 0.2s;
}
.btn-close:hover { color: #0F172A; }

.modal-header { text-align: center; margin-bottom: 32px; }
.modal-header h3 { font-size: 24px; font-weight: 800; color: #0F172A; margin-bottom: 8px; }
.modal-header p { color: #64748B; }

.schedules-list { display: flex; flex-direction: column; gap: 20px; }

.schedule-item {
  display: flex; gap: 16px; align-items: flex-start;
  padding: 16px; background: #F8FAFC; border-radius: 16px;
}

.schedule-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 18px;
}
.schedule-icon.rawson { background: #E0F2FE; color: #0284C7; }
.schedule-icon.playa { background: #FEF3C7; color: #D97706; }

.schedule-info h4 { font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 4px; }
.schedule-info p { font-size: 13px; color: #64748B; margin-bottom: 12px; }

.time-row {
  display: flex; justify-content: space-between;
  font-size: 14px; margin-bottom: 4px; color: #334155; width: 100%; gap: 12px;
}

.tag-green {
  display: inline-block; font-size: 12px; font-weight: 700;
  color: #16A34A; background: #DCFCE7;
  padding: 4px 8px; border-radius: 6px; margin-top: 8px;
}

.btn-modal-close {
  width: 100%; margin-top: 32px; padding: 14px;
  background: #0F172A; color: white; border: none;
  border-radius: 12px; font-weight: 700; cursor: pointer;
  transition: background 0.2s;
}
.btn-modal-close:hover { background: #0EA5E9; }

/* === ANIMACIONES === */
.animate-up { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.3s; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* === RESPONSIVE === */

/* Tablets (Entre 768px y 1100px) */
@media (max-width: 1100px) {
  .branches-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Celulares (Menos de 768px) */
@media (max-width: 768px) {
  .branches-wrapper {
    grid-template-columns: 1fr;
  }
  
  .title { font-size: 32px; }
}
</style>