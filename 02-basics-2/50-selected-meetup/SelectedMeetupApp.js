import {defineComponent, ref, watch} from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {

    const chosenId = ref(1)
    const meetups = ref(null)

    const getMeetups = async (id) => {
      const result = await getMeetup(id)
      meetups.value = result
      console.log('meetups', meetups.value)
    }

    watch(chosenId, getMeetups, { immediate: true })

    const nextClick = () => {
      chosenId.value++
      console.log("chosenId", chosenId.value)
    }

    const prevClick = () => {
      chosenId.value--
    }


    return {
      nextClick,
      prevClick,
      meetups,
      chosenId,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button @click="prevClick" class="button button--secondary" type="button"  :disabled="chosenId === 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="id in 5" :key="id" class="radio-group__button">
            <input
              :id="'meetup-id-' + id"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="id"
              v-model="chosenId"
            />
            <label :for="'meetup-id-' + id" class="radio-group__label">{{ id }}</label>
          </div>

        </div>

        <button @click="nextClick" class="button button--secondary" type="button" :disabled="chosenId === 5">Следующий</button>
      </div>

      <div class="meetup-selector__cover" v-if="meetups">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetups.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
