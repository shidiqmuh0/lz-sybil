<template>
  <div id="app">
    <h1>LZ Sybil</h1>
    <input v-model="query" @keyup.enter="search" placeholder="Enter EVM address">
    <button @click="search">Search</button>
    <p v-if="searchResult !== null" :style="{ color: searchResult ? 'red' : 'green' }">
      {{ searchResult ? 'Sybil' : 'Not Sybil' }}
    </p>
    <div id="credits">
      <p>Developed by Shidiq <a href="https://twitter.com/shdqm0" target="_blank">Twitter</a> and <a href="https://github.com/shidiqmuh0" target="_blank">GitHub</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      searchResult: null // null means no search has been made, true means found, false means not found
    };
  },
  methods: {
    async search() {
      if (this.query.length > 0) {
        try {
          const response = await axios.get(`http://localhost:3000/search?query=${this.query}`);
          if (response.data.length > 0) {
            this.searchResult = true;
          } else {
            this.searchResult = false;
          }
        } catch (error) {
          console.error("There was an error with the search request:", error);
          this.searchResult = false;
        }
      } else {
        this.searchResult = null;
      }
    }
  }
}
</script>

<style>
/* Tambahkan styling sesuai kebutuhan Anda */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  padding: 10px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 500px;
}
button {
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
}
p {
  font-size: 20px;
  font-weight: bold;
}
#credits {
  margin-top: 50px;
}
#credits a {
  color: #3498db;
  text-decoration: none;
}
#credits a:hover {
  text-decoration: underline;
}
</style>
