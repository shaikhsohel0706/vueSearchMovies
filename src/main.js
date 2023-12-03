 // import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.component('your-component', {
    methods: {
      changeRoute(route) {
        router.push(route);
      }
    },
  });

app.mount('#app')
