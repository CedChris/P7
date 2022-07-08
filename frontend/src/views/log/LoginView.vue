<template>
  <div class="login">
    <h1>Connexion :</h1>
    <label for="email">E-Mail :</label>
    <input type="email" required="true" id="email" v-model="user.email">
    <label for="password"> Mot de passe : </label>
    <input type="password" required="true" id="password" v-model="user.password">
    <button type="submit" @click="login">Log in</button>
  </div>
  <router-view/>
</template>
<style scoped>
.login{
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  margin: 5px;
  width: 150px;

  
}
</style>
<script setup>
import router from '@/router'

  const user = {
    email:'',
    password: ''
  };

  const login = async () =>{
    await fetch('http://localhost:5000/user/login', {
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .catch(err => console.log({message : 'Problème réponse serveur :' + err}))
      .then (data =>{
        const token = localStorage.setItem('token', data.token)
        const id = localStorage.setItem('id', data.userId)
        console.log(data);
        if (localStorage.getItem(`token`)){
          localStorage.setItem(`token`, data.token)
          router.push('/public/home');
        }

      })
      .catch(err => console.log({message : 'Problème donnée de la réponse :' + err}))
  }
</script>
