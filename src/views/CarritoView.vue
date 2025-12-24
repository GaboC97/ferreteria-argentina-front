<template>
    <div class="cart-page">

        <header class="cart-header animate-fade-down" v-if="store.cart.length > 0">
            <div class="container">
                <h1 class="page-title">Tu Pedido</h1>
                <p class="page-subtitle">Revisá tus herramientas y materiales antes de confirmar.</p>
            </div>
        </header>

        <div class="container main-content">

            <div v-if="store.cart.length > 0" class="cart-layout">

                <div class="cart-items">
                    <div class="list-wrapper">
                        <div v-for="(item, index) in store.cart" :key="item.id" class="cart-item stagger-anim"
                            :style="{ animationDelay: `${index * 100}ms` }">

                            <div class="item-img">
                                <img :src="item.image" :alt="item.name">
                            </div>

                            <div class="item-details">
                                <span class="item-category">{{ item.category }}</span>
                                <h3 class="item-title">{{ item.name }}</h3>
                                <p class="item-price">{{ formatPrice(item.price) }}</p>
                            </div>

                            <div class="item-actions">
                                <div class="quantity-selector">
                                    <button @click="decrement(item)" class="qty-btn"
                                        :disabled="item.qty <= 1">-</button>
                                    <span class="qty-number">{{ item.qty }}</span>
                                    <button @click="increment(item)" class="qty-btn">+</button>
                                </div>

                                <button @click="removeItem(item.id)" class="btn-remove" aria-label="Eliminar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-1 1-1h6c1 0 1 1 1 1v2" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="cart-summary animate-fade-up-delayed">
                    <div class="summary-card">
                        <h3 class="summary-title">Resumen</h3>
                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>{{ formatPrice(cartTotal) }}</span>
                        </div>
                        <div class="summary-row">
                            <span>Envío</span>
                            <span class="text-blue">A coordinar</span>
                        </div>
                        <div class="divider"></div>
                        <div class="summary-row total">
                            <span>Total Estimado</span>
                            <span>{{ formatPrice(cartTotal) }}</span>
                        </div>
                        <p class="summary-note">El precio final y el envío se confirmarán por WhatsApp.</p>
                        <a :href="whatsappCheckoutLink" target="_blank" class="btn-checkout">
                            <span>Confirmar Pedido por WhatsApp</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            <div v-else class="empty-state animate-pop-in">
                <div class="empty-icon-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                </div>
                <h2>Tu carrito está vacío</h2>
                <p>Parece que todavía no agregaste herramientas o materiales.</p>
                <RouterLink to="/catalogo" class="btn-back">
                    Ir al Catálogo
                </RouterLink>
            </div>

        </div>
    </div>
</template>

<script setup>
// ... (Tu script queda exactamente igual, no hace falta tocarlo)
import { computed } from 'vue'
import { store } from '../store/store.js'

const increment = (item) => store.increment(item)
const decrement = (item) => store.decrement(item)
const removeItem = (id) => store.removeFromCart(id)

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price || 0)
}

const cartTotal = computed(() => {
    return store.cart.reduce((acc, item) => acc + (Number(item.price || 0) * item.qty), 0)
})

const whatsappCheckoutLink = computed(() => {
    const phone = '5492804728518'
    let text = 'Hola Ferretería Argentina! 👋 Quiero confirmar el siguiente pedido:\n\n'
    store.cart.forEach(item => {
        text += `▪ ${item.qty}x ${item.name} (${formatPrice(item.price)})\n`
    })
    text += `\n*Total Estimado: ${formatPrice(cartTotal.value)}*`
    text += '\n\n¿Me podrían confirmar stock y envío?'
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
})
</script>

<style scoped>
/* ... (Mantén tus estilos base de fuentes y layout) ... */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.cart-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #F8FAFC;
    min-height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
}

/* ... Copia aquí el resto de tus estilos estructurales (container, cart-header, etc.) ... */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.cart-header {
    flex-shrink: 0;
    background: white;
    padding: 60px 0 40px;
    border-bottom: 1px solid #E2E8F0;
    margin-bottom: 40px;
}

.main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
}

.page-title {
    font-size: 36px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 8px;
}

.page-subtitle {
    color: #64748B;
    font-size: 16px;
}

.cart-layout {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 40px;
    align-items: start;
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* ESTILOS DEL ITEM (Sin cambios estructurales, solo visuales) */
.cart-item {
    background: white;
    padding: 24px;
    border-radius: 20px;
    border: 1px solid #E2E8F0;
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 24px;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    /* Solo hover */
}

.cart-item:hover {
    border-color: #CBD5E1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
}

/* ... (Resto de estilos de botones, imagen, etc. igual que antes) ... */
.item-img {
    width: 100px;
    height: 100px;
    background: #F8FAFC;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-img img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
}

.item-details {
    display: flex;
    flex-direction: column;
}

.item-category {
    font-size: 11px;
    text-transform: uppercase;
    color: #0EA5E9;
    font-weight: 700;
    margin-bottom: 4px;
}

.item-title {
    font-size: 18px;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 8px;
}

.item-price {
    font-size: 16px;
    font-weight: 600;
    color: #64748B;
}

.item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
}

.quantity-selector {
    display: flex;
    align-items: center;
    background: #F1F5F9;
    border-radius: 99px;
    padding: 4px;
}

.qty-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: white;
    color: #0F172A;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.qty-btn:hover:not(:disabled) {
    background: #0EA5E9;
    color: white;
}

.qty-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.qty-number {
    width: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
}

.btn-remove {
    background: transparent;
    border: none;
    color: #94A3B8;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s;
}

.btn-remove:hover {
    background: #FEF2F2;
    color: #EF4444;
}

.cart-summary {
    position: sticky;
    top: 100px;
}

.summary-card {
    background: white;
    padding: 32px;
    border-radius: 24px;
    border: 1px solid #E2E8F0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.summary-title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 24px;
    color: #0F172A;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    color: #64748B;
    font-size: 15px;
}

.text-blue {
    color: #0EA5E9;
    font-weight: 600;
}

.divider {
    height: 1px;
    background: #E2E8F0;
    margin: 20px 0;
}

.summary-row.total {
    color: #0F172A;
    font-weight: 800;
    font-size: 20px;
    margin-bottom: 8px;
}

.summary-note {
    font-size: 12px;
    color: #94A3B8;
    margin-bottom: 24px;
    line-height: 1.5;
}

.btn-checkout {
    width: 100%;
    background: #0F172A;
    color: white;
    padding: 16px;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.2s;
}

.btn-checkout:hover {
    background: #0EA5E9;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(14, 165, 233, 0.3);
}

.empty-state {
    text-align: center;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin: auto 0;
}

.empty-icon-bg {
    width: 120px;
    height: 120px;
    background: #F1F5F9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94A3B8;
    margin-bottom: 24px;
}

.empty-state h2 {
    font-size: 24px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 12px;
}

.empty-state p {
    color: #64748B;
    margin-bottom: 32px;
}

.btn-back {
    background: #0F172A;
    color: white;
    padding: 12px 32px;
    border-radius: 99px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
}

.btn-back:hover {
    background: #0EA5E9;
}

@media (max-width: 900px) {
    .cart-layout {
        grid-template-columns: 1fr;
    }

    .cart-summary {
        position: static;
        order: 2;
    }
}

@media (max-width: 600px) {
    .cart-item {
        grid-template-columns: 80px 1fr;
        grid-template-rows: auto auto;
        gap: 16px;
    }

    .item-actions {
        grid-column: span 2;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        border-top: 1px solid #F1F5F9;
        padding-top: 16px;
        margin-top: 8px;
    }
}

/* =========================================
   NUEVAS ANIMACIONES MANUALES (KEYFRAMES)
   ========================================= */

/* 1. Header que baja suave */
.animate-fade-down {
    animation: fadeDown 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

/* 2. Items del carrito (Cascada) */
.stagger-anim {
    /* "both" mantiene el estado inicial (opacity 0) hasta que corre la animación */
    animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* 3. Resumen (Sube un poco más tarde) */
.animate-fade-up-delayed {
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both;
}

/* 4. Empty State (El que te daba problemas) */
/* Ahora tiene su propia animación "Pop" que se activa apenas aparece */
.animate-pop-in {
    animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.animate-pop-in .empty-icon-bg {
    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
}

/* === DEFINICIÓN DE KEYFRAMES === */

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes fadeDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes popIn {
    0% {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }

    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes scaleIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>