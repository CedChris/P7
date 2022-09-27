<template>
  <!-- <img :src="require('@/assets/icon-left-font-monochrome-black.png')" alt=""> -->
  <nav>
    <router-link tag="a" to="/">Login</router-link> |
    <router-link tag="a" to="/signup">Créer un compte</router-link>
  </nav>
  <router-view></router-view>
</template>
<script></script>
<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
nav a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
}
</style>
