import { defineComponent, createApp } from 'vue/dist/vue.esm-browser.js'

const App = defineComponent({
  name: 'AppDate',

  setup() {

    function formatAsIsoDate(timestamp) {
      return new Date(timestamp).toISOString()
    }

    function formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, { dateStyle: 'long' })
    }

    return {
      formatAsIsoDate,
      formatAsLocalDate,
    }
  },

  template: `
    <time :datetime="formatAsIsoDate(new Date)"> Сегодня test {{ formatAsLocalDate(new Date) }} </time>
  `,
})

const app = createApp(App)
const vm = app.mount('#app')

window.vm = vm
