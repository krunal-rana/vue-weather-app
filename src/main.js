import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'  // Import Pinia

import App from './App.vue'
import HomeView from './components/HomeView.vue'
import WeatherSearch from './components/WeatherSearch.vue'

// Define routes
const routes = [
    { path: '/', component: HomeView },
    { path: '/weather', component: WeatherSearch },
]

// Set up the router
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

// Create Pinia store
const pinia = createPinia()

// Create the Vue app
const app = createApp(App)

// Use the router and pinia store
app.use(router)
app.use(pinia)

// Mount the app
app.mount('#app')
