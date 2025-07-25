import {defineComponent, onMounted, onUnmounted, ref} from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {

    const time = ref('')


    let timeId


    onMounted(() => {
      updateTime()
      timeId = setInterval(() => {
        updateTime()
      }, 1000)
    })

    onUnmounted(() => {
      if (timeId) {
        clearInterval(timeId)
      }
    })

    function updateTime() {
      time.value = new Date().toLocaleTimeString(undefined, {
        timeStyle: 'medium',
      })
    }



    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
