<template>
  <div class="signup">
    <h1>Créez un compte :</h1>
    <label for="pseudo">Pseudo*:</label>
    <input type="pseudo" required="true" id="pseudo" v-model="user.pseudo" @change="pseudoValidator()" maxlength="20">
    <label for="Email">E-Mail*:</label>
    <input type="email" required="true" id="email" v-model="user.email">
    <label for="password"> Mot de passe*: </label>
    <input type="password" required="true" id="password" v-model="user.password" minlength="8" maxlength="25">
    <div>Tout les champs sont nécessaires</div>
    <input v-if="pseudoValidator() && user.email && user.password" type="button" value="S'inscrire" @click="signup">
  </div>
</template>
<script setup>

import {reactive} from 'vue'

function pseudoValidator(){
  const re = /[a-z]{3,20}/g
  const validate = re.test(user.pseudo)
  if(validate){
    return true
  }else {
    return false
  }
}
const user = reactive({
  pseudo: '',
  email: '',
  password: ''
});

const signup = async () => {
  if(pseudoValidator() && user.email && user.password){
  await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .catch((err) => alert({ message: 'Problème réponse serveur :' + err }))
    .then(data => {
      console.log(data);
    })
    .catch(err => alert({ message: 'Problème donnée de la réponse :' + err }))
}else{
  alert('')
}
}
</script>
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
input:invalid{
  border: 2px solid red;
}
</style>
