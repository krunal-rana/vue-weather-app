<template>
  <div class="container mt-4">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-md-4">
        <div class="input-group mb-4">
          <input
            v-model="newCity"
            type="text"
            class="form-control"
            placeholder="Enter city name"
            @keyup.enter="addCity"
          />
          <button class="btn btn-primary" @click="addCity">Add City</button>

          <button class="btn btn-success" @click="refreshWeatherForAllCity()">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="state.error" class="alert alert-danger">{{ state.error }}</div>
    <hr class="my-4 border-dark" />

    <div class="row">
      <div
        v-for="city in state.cities"
        :key="city.id"
        class="col-12 col-xl-3 col-md-4 mb-4"
      >
        <div class="card">
          <div class="card-header">
            <div class="row p-1">
              <div class="col-md-8 text-start">
                <h5 class="card-title">
                  {{ city.name }}, {{ city.sys.country }}
                </h5>
              </div>
              <div class="col-md-4 text-end">
                <div class="btn-group">
                  <button
                    class="btn btn-sm btn-danger"
                    @click="removeCity(city.name)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-success"
                    @click="refreshCityWeather(city.name)"
                  >
                    <i class="fas fa-sync-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="card-body">
            <img
              :src="
                'https://openweathermap.org/img/wn/' +
                city.weather[0].icon +
                '@2x.png'
              "
              :alt="city.weather[0].description"
              class="card-img-top m3"
              style="width: 30%; height: auto; margin: 0 auto; display: block"
            />

            <p class="card-text">
              <strong>Temperature:</strong> {{ city.main.temp }} °C
            </p>
            <p class="card-text">
              <strong>Feels Like:</strong> {{ city.main.feels_like }} °C
            </p>
            <p class="card-text">
              <strong>Weather:</strong> {{ city.weather[0].description }}
            </p>
            <p class="card-text">
              <strong>Humidity:</strong> {{ city.main.humidity }}%
            </p>
            <p class="card-text">
              <strong>Wind Speed:</strong> {{ city.wind.speed }} m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { weatherState } from "../weatherState";

export default {
  setup() {
    const state = weatherState;
    const newCity = ref("");

    const addCity = () => {
      if (newCity.value.trim()) {
        state.fetchWeather(newCity.value.trim());
        newCity.value = "";
      }
    };

    const removeCity = (cityName) => {
      state.deleteCity(cityName);
    };

    const refreshWeatherForAllCity = () => {
      state.refreshWeatherForAllCities();
    };
    const refreshCityWeather = (cityName) => {
      state.refreshWeatherForCity(cityName);
    };

    onMounted(() => {
      state.loadCitiesFromLocalStorage();
      setInterval(() => {
        state.refreshWeatherForAllCities();
      }, 900000); // 15 minutes
    });

    return {
      state,
      newCity,
      addCity,
      refreshCityWeather,
      removeCity,
      refreshWeatherForAllCity,
    };
  },
};
</script>
  
 