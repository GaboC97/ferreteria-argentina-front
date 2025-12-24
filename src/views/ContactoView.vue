<template>
  <div class="contact-page">
    
    <header class="contact-header">
      <div class="container">
        <h1 class="title animate-on-scroll">Estamos para asesorarte</h1>
        <p class="subtitle animate-on-scroll delay-100">Tenés un proyecto en mente? Escribinos y nuestro equipo técnico te responderá a la brevedad.</p>
      </div>
    </header>

    <div class="container main-content">
      <div class="contact-grid">
        
        <aside class="info-col">
          
          <div class="info-card animate-on-scroll delay-200">
            <h3 class="card-title">Canales Directos</h3>
            
            <div class="contact-item">
              <div class="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div class="item-text">
                <span class="label">Teléfono</span>
                <a href="tel:02804481442" class="value-link">0280 4481-442</a>
              </div>
            </div>

            <div class="contact-item">
              <div class="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div class="item-text">
                <span class="label">Email Ventas</span>
                <a href="mailto:ferrear.rw@ferrear.com.ar" class="value-link">ferrear.rw@ferrear.com.ar</a>
              </div>
            </div>

            <div class="contact-item">
              <div class="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <div class="item-text">
                <span class="label">WhatsApp</span>
                <a href="https://wa.me/5492804728518" target="_blank" class="value-link">+54 9 280 472-8518</a>
              </div>
            </div>
          </div>

          <div class="info-card animate-on-scroll delay-300">
            <h3 class="card-title">Nuestras Sucursales</h3>
            
            <div class="location-item">
              <span class="loc-badge">Rawson</span>
              <p>Luis Costa 112</p>
            </div>
            
            <div class="location-item">
              <span class="loc-badge playa">Playa Unión</span>
              <p>José Coronel 379</p>
            </div>
          </div>

        </aside>

        <main class="form-col">
          <form class="contact-form animate-on-scroll delay-300" @submit.prevent="submitForm">
            <h2 class="form-title">Envianos tu mensaje</h2>
            
            <div class="form-row">
              <div class="input-group">
                <label for="name">Nombre Completo</label>
                <input type="text" id="name" v-model="form.name" placeholder="Ej: Juan Pérez" required>
              </div>
              <div class="input-group">
                <label for="phone">Teléfono</label>
                <input type="tel" id="phone" v-model="form.phone" placeholder="Ej: 280 4..." required>
              </div>
            </div>

            <div class="input-group">
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" v-model="form.email" placeholder="nombre@email.com" required>
            </div>

            <div class="input-group">
              <label for="subject">Asunto</label>
              <select id="subject" v-model="form.subject">
                <option>Consulta General</option>
                <option>Presupuesto / Cotización</option>
                <option>Cuentas Corrientes</option>
                <option>Recursos Humanos</option>
              </select>
            </div>

            <div class="input-group">
              <label for="message">Mensaje</label>
              <textarea id="message" v-model="form.message" rows="5" placeholder="¿En qué podemos ayudarte hoy?" required></textarea>
            </div>

            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Enviar Mensaje</span>
              <span v-else>Enviando...</span>
              <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>

            <transition name="fade">
              <div v-if="successMessage" class="success-alert">
                ¡Gracias! Recibimos tu mensaje. Te contactaremos pronto.
              </div>
            </transition>
          </form>
        </main>

      </div>

      <section class="faq-section">
        <h2 class="faq-title animate-on-scroll">Preguntas Frecuentes</h2>
        <div class="faq-grid">
          <div 
            class="faq-item animate-on-scroll" 
            v-for="(faq, index) in faqs" 
            :key="index"
            :class="{ open: openFaq === index }"
            @click="toggleFaq(index)"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="faq-header">
              <h4>{{ faq.question }}</h4>
              <span class="faq-icon">+</span>
            </div>
            <div class="faq-body">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// --- FORM LOGIC ---
const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: 'Consulta General',
  message: ''
})


onMounted(() => {
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

  // Seleccionamos todos los elementos a animar
  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach((el) => observer.observe(el))
})

const isSubmitting = ref(false)
const successMessage = ref(false)

const submitForm = () => {
  isSubmitting.value = true
  // Simulación de envío a API
  setTimeout(() => {
    isSubmitting.value = false
    successMessage.value = true
    // Reset form
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    
    setTimeout(() => successMessage.value = false, 5000)
  }, 1500)
}

// --- FAQ LOGIC ---
const openFaq = ref(0) // El primero abierto por defecto
const faqs = [
  {
    question: "¿Hacen envíos a domicilio?",
    answer: "Sí, realizamos envíos en Rawson y Playa Unión. Para compras mayores a cierto monto el envío puede ser bonificado. Consultanos por WhatsApp para coordinar."
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer: "Aceptamos efectivo, tarjetas de débito y crédito (Visa, Master, Cabal), Mercado Pago y transferencias bancarias. También ofrecemos cuentas corrientes para empresas."
  },
  {
    question: "¿Realizan facturas A?",
    answer: "Sí, emitimos Factura A y B. Recordá traer tu constancia de CUIT o avisarnos al momento de solicitar el presupuesto."
  },
  {
    question: "¿Tienen garantía los productos eléctricos?",
    answer: "Absolutamente. Todas nuestras herramientas eléctricas cuentan con la garantía oficial del fabricante (Bosch, Makita, Stanley, etc.). Nosotros te asesoramos con el servicio técnico."
  }
]

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? -1 : index
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.contact-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #F8FAFC;
  min-height: 100vh;
  padding-bottom: 80px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* === HEADER === */
.contact-header {
  background: white;
  padding: 80px 0 60px;
  text-align: center;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 60px;
}

.title { font-size: 42px; font-weight: 800; color: #0F172A; margin-bottom: 16px; letter-spacing: -0.02em; }
.subtitle { color: #64748B; font-size: 18px; max-width: 600px; margin: 0 auto; line-height: 1.6; }

/* === GRID LAYOUT === */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr; /* Info (izq) más angosta, Form (der) más ancho */
  gap: 48px;
  margin-bottom: 80px;
}

/* === INFO COLUMN (ASIDE) === */
.info-col {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-card {
  background: white;
  padding: 32px;
  border-radius: 24px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 24px;
  border-bottom: 2px solid #F1F5F9;
  padding-bottom: 12px;
}

/* Contact Items */
.contact-item {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}
.contact-item:last-child { margin-bottom: 0; }

.icon-box {
  width: 40px; height: 40px; background: #E0F2FE; color: #0284C7;
  border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.item-text { display: flex; flex-direction: column; }
.label { font-size: 12px; text-transform: uppercase; color: #94A3B8; font-weight: 700; margin-bottom: 4px; }
.value-link { font-size: 15px; font-weight: 600; color: #334155; text-decoration: none; transition: color 0.2s; }
.value-link:hover { color: #0EA5E9; }

/* Location Items */
.location-item { margin-bottom: 20px; }
.location-item:last-child { margin-bottom: 0; }
.loc-badge {
  display: inline-block; background: #0F172A; color: white;
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  padding: 4px 10px; border-radius: 6px; margin-bottom: 6px;
}
.loc-badge.playa { background: #D97706; } /* Amarillo para Playa */
.location-item p { font-size: 15px; font-weight: 500; color: #475569; }


/* === FORM COLUMN === */
.contact-form {
  background: white;
  padding: 48px;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05);
  border: 1px solid #E2E8F0;
}

.form-title { font-size: 28px; font-weight: 700; color: #0F172A; margin-bottom: 32px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.input-group { margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px; }
.input-group label { font-size: 14px; font-weight: 600; color: #475569; }

input, select, textarea {
  padding: 14px 16px; border-radius: 12px; border: 2px solid #E2E8F0;
  font-size: 15px; background: #F8FAFC; transition: all 0.3s;
  font-family: inherit; outline: none; width: 100%;
}

input:focus, select:focus, textarea:focus {
  border-color: #0EA5E9; background: white; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}

.btn-submit {
  width: 100%; padding: 16px; background: #0F172A; color: white;
  border: none; border-radius: 12px; font-weight: 700; font-size: 16px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: all 0.2s;
}
.btn-submit:hover { background: #0EA5E9; transform: translateY(-2px); }
.btn-submit:disabled { background: #94A3B8; cursor: not-allowed; }

.success-alert {
  margin-top: 20px; padding: 16px; background: #DCFCE7; color: #166534;
  border-radius: 12px; font-weight: 600; text-align: center; border: 1px solid #BBF7D0;
}

/* === FAQ SECTION === */
.faq-section { max-width: 800px; margin: 0 auto; }
.faq-title { text-align: center; font-size: 28px; font-weight: 700; color: #0F172A; margin-bottom: 40px; }

.faq-item {
  background: white; border: 1px solid #E2E8F0; border-radius: 16px;
  margin-bottom: 16px; overflow: hidden; transition: all 0.3s ease; cursor: pointer;
}
.faq-item.open { border-color: #0EA5E9; box-shadow: 0 10px 20px -5px rgba(14, 165, 233, 0.1); }

.faq-header {
  padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;
}
.faq-header h4 { font-size: 16px; font-weight: 700; color: #334155; margin: 0; }
.faq-icon { font-size: 24px; font-weight: 300; color: #94A3B8; transition: transform 0.3s; }
.faq-item.open .faq-icon { transform: rotate(45deg); color: #0EA5E9; }

.faq-body {
  max-height: 0; overflow: hidden; transition: max-height 0.3s ease;
  padding: 0 24px; color: #64748B; line-height: 1.6;
}
.faq-item.open .faq-body { max-height: 200px; padding-bottom: 24px; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .info-col { flex-direction: row; flex-wrap: wrap; }
  .info-card { flex: 1; min-width: 280px; }
}

@media (max-width: 600px) {
  .info-col { flex-direction: column; }
  .contact-header { padding: 60px 0 40px; }
  .title { font-size: 32px; }
}

/* === SCROLL ANIMATIONS === */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: opacity, transform;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Delays para efecto cascada */
.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }
.delay-400 { transition-delay: 0.4s; }
</style>