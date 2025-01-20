<template>
  <TopBar />
  <main>
    <RouterView />
  </main>
</template>

<script>
import TopBar from "./components/layouts/TopBar.vue";
// import HomeView from "./components/HomeView.vue";
// import WeatherSearch from "./components/WeatherSearch.vue";

export default {
  name: "App",
  components: {
    TopBar,
    // HomeView,
    // WeatherSearch,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

/* body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #74ebd5, #9face6);
  color: #333;
  text-align: center;
} */
/* 
h1 {
  margin-top: 20px;
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 2px 2px #000000;
} */
</style>
