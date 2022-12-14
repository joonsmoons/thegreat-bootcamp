import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import PageTitle from './components/fragment/PageTitle.vue'
import mixin from './mixins'
import i18nPlugin from './plugins/i18n'
import en from './i18n/en'
import ko from './i18n/ko'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import VueGoodTablePlugin from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import VueApexCharts from 'vue3-apexcharts'
library.add(faHatWizard)
library.add(faUserTie)
const i18nStrings = { en, ko }
console.log(i18nStrings)
const app = createApp(App)
app.use(store)
app.use(router)
app.mixin(mixin)
app.component('page-title', PageTitle)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(i18nPlugin, i18nStrings)
app.use(VueSweetalert2)
app.use(LoadingPlugin)
app.use(VueGoodTablePlugin)
app.use(VueApexCharts)

app.directive('focus', {
  mounted(el, binding) {
    el.focus()
  }
})

app.directive('lowercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.toLowerCase()
    })
  }
})

app.directive('uppercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.toUpperCase()
    })
  }
})

app.directive('number', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/[^0-9]/g, '')
    })
  }
})

app.directive('korean', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/[^???-??????-??????-???]/g, '')
    })
  }
})

app.mount('#app')
window.Kakao.init('d69de5d7ffc0e0d1478e67ac301f1917')
