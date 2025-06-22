import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup (){
    const weatherData = getWeatherData();
    function toCelsiusConverter(temp) {
      return (temp - 273.15).toFixed(1)
    }
    function getWeatherIcon(weatherId) {
      return WeatherConditionIcons[weatherId]
    }

    function toMmHg(pressure){
      return ( pressure * 0.75).toFixed(0)
    }

    function isNight(currentTime, sunrise, sunset){
      const toMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const current = toMinutes(currentTime);
      const rise = toMinutes(sunrise);
      const set = toMinutes(sunset);

      return current < rise || current > set;
    }

    return {
      weatherData,
      toCelsiusConverter,
      getWeatherIcon,
      toMmHg,
      isNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul  class="weather-list unstyled-list">
        <li v-for="weather in weatherData" :key="weather.geographic_name" class="weather-card" :class="isNight(weather.current.dt, weather.current.sunrise, weather.current.sunset) ? 'weather-card--night' : '' ">
          <div v-if="weather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}: {{ weather.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.current.weather.description">{{ getWeatherIcon(weather.current.weather.id) }}</div>
            <div class="weather-conditions__temp"> {{ toCelsiusConverter(weather.current.temp)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ toMmHg(weather.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.current.wind_speed }}</div>

            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
