<template>
  <main>
    <div class="login">
    <h1>Connexion :</h1>
    <label for="email">E-Mail :</label>
    <input type="email" required="true" id="email" v-model="user.email" />
    <label for="password"> Mot de passe : </label>
    <input
      type="password"
      required="true"
      id="password"
      v-model="user.password"
    />
    <button type="submit" @click="login">Log in</button><img
      :src="require('@/assets/icon-left-font-monochrome-black.png')"
      alt="logo groupomania"
    /></div>
  </main>
  <router-view />
</template>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  margin: 5px;
  width: 150px;
}
img{
  width: 200px;
}
.login{
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 0px 10px 0px ;
  box-shadow: 0px 0px 15px #FFD7D7;
  background-color: #FFD7D7;
  width: 25%;
}
@media only screen and (max-width: 800px) {
  .login{
    width: 80%;
  }
}
</style>
<script setup>
import router from "@/router";

const user = {
  email: "",
  password: "",
  pseudo: "",
};

const login = async () => {
  await fetch("http://localhost:5000/user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) alert("Login impossible");
      else {
        return res.json();
      }
    })
    .catch((err) =>
      alert({ message: "Problème réponse serveur :" + err })
    )
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.userId);
      localStorage.setItem("pseudo", data.pseudo);
      router.push("/public/home");
    })
    .catch((err) =>
      alert({ message: "Problème donnée de la réponse :" + err })
    );
};
</script>
