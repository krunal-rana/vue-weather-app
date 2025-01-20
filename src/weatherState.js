import { reactive, onMounted } from 'vue';

export const weatherState = reactive({
  cities: [],
  error: null,


  async fetchWeather(city) {
    const weatherApiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
      );
      if (!response.ok) {
        throw new Error(`City "${city}" not found.`);
      }
      const data = await response.json();
      const existingCity = this.cities.find((c) => c.name === data.name);
      if (!existingCity) {
        this.cities.push(data);
        this.saveCitiesToLocalStorage();
      }
      this.error = null;
    } catch (err) {
      this.error = err.message;
    }
  },

  deleteCity(cityName) {
    this.cities = this.cities.filter((city) => city.name !== cityName);
    this.saveCitiesToLocalStorage();
  },

  async refreshWeatherForAllCities() {
    try {
      const weatherApiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;
      // Update all cities in parallel using Promise.all
      await Promise.all(
        this.cities.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${weatherApiKey}`
          );
          if (response.ok) {
            const updatedCity = await response.json();
            Object.assign(city, updatedCity);
          }
        })
      );
      this.saveCitiesToLocalStorage();
    } catch {
      // Handle errors silently during refresh
    }
  },

  async refreshWeatherForCity(cityName) {
    const weatherApiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;

    try {
      const city = this.cities.find((city) => city.name === cityName);
      if (!city) return; // Return if city is not found

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherApiKey}`
      );
      if (response.ok) {
        const updatedCity = await response.json();
        Object.assign(city, updatedCity);
        this.saveCitiesToLocalStorage();
      }
    } catch {
      // Handle errors silently during refresh
    }
  },

  saveCitiesToLocalStorage() {
    localStorage.setItem('weatherCities', JSON.stringify(this.cities));
  },

  loadCitiesFromLocalStorage() {
    const cities = localStorage.getItem('weatherCities');
    if (cities) {
      this.cities = JSON.parse(cities);
    }
  },
});

// Load cities from localStorage when app starts
onMounted(() => {
  weatherState.loadCitiesFromLocalStorage();
});
