<template>
  <div id="profile">
    <h1>Pseudo: {{ state.users.pseudo }}</h1>
  </div>
</template>
<script setup>
import { reactive } from "vue";

/** PAGE USER */
/** Possibilité d'ajouter d'autres fonctionnalité */

const state = reactive({
  users: {},
});

const myProfile = localStorage.getItem("id");

fetch(`http://localhost:5000/user/${myProfile}`)
  .then((res) => res.json())
  .then((data) => {
    state.users = data;
  })
  .catch((e) => {
    alert(e);
  });
</script>
<style>
#profile {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid salmon;
  border-radius: 10px;
  margin-top: 20px;
}
#profile div {
  margin: 5px;
}
</style>
