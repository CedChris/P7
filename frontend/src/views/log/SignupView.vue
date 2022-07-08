<template>
  <div class="signup">
    <h1>Créez un compte :</h1>
    <label for="pseudo">Pseudo:</label>
    <input type="pseudo" required="true" id="pseudo" v-model="user.pseudo">
    <label for="Email">E-Mail:</label>
    <input type="email" required="true" id="email" v-model="user.email">
    <label for="password"> Mot de passe : </label>
    <input type="password" required="true" id="password" v-model="user.password">
    <input type="button" value="Sign up" @click="signup">
  </div>
</template>
<style scoped>
.signup{
  display:flex;
  flex-direction: column;
  align-items: center;
}
input{
  margin: 5px;
  width: 150px;
}
</style>
<script setup>


  const user = {
    pseudo : '',
    email:'',
    password: ''
  };

  const method = {
    method : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(user)
  };
console.log(user);
  const signup = async () =>{
    await fetch('http://localhost:5000/user/signup', {
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
        console.log(data.userId);
      })
      .catch(err => console.log({message : 'Problème donnée de la réponse :' + err}))
  }
</script>

