import {computed, defineComponent, ref, watch} from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    max:{
      type: Number,
      default: Infinity
    },
    min:{
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    const currentCount = ref(props.count)

    watch(() => props.count, (newVal) => {
      currentCount.value = newVal
    })

    watch(currentCount, (newVal) => {
      emit('update:count', newVal)
    })

    const increment = () => {
      if (currentCount.value < props.max) {
        currentCount.value++
      }
    }

    const decrement = () => {
      if (currentCount.value > props.min) {
        currentCount.value--
      }
    }

    return {
      currentCount,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton
        aria-label="Decrement"
        @click="decrement"
        :disabled="currentCount <= min"
        >
        ➖
      </UiButton>
      <span class="count" data-testid="count">{{ currentCount }}</span>
      <UiButton aria-label="Increment"
                @click="increment"
                :disabled="currentCount >= max"
      >➕</UiButton>
    </div>
  `,
})
