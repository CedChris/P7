<template>
  <main>
    <div class="signup">
      <h1>Créez un compte :</h1>
      <label for="pseudo">Pseudo*:</label>
      <input
        type="pseudo"
        required="true"
        id="pseudo"
        v-model="user.pseudo"
        @change="pseudoValidator()"
        maxlength="20"
      />
      <label for="Email">E-Mail*:</label>
      <input
        type="email"
        required="true"
        id="email"
        @change="emailValidator()"
        v-model="user.email"
      />
      <label for="password"> Mot de passe*: </label>
      <input
        type="password"
        required="true"
        id="password"
        v-model="user.password"
        @change="passwordValidator()"
        minlength="8"
        maxlength="25"
      />
      <p>
        Tout les champs sont nécessaires<br />
        <span>
          Le mot de passe doit contenir au minimum 6 caractères avec au moins
          une majuscule, une minuscule et un chiffre.</span
        >
      </p>
      <input
        v-if="pseudoValidator() && emailValidator() && passwordValidator()"
        type="button"
        value="S'inscrire"
        @click="signup"
      />
      <img
        :src="require('@/assets/icon-left-font-monochrome-black.png')"
        alt="logo groupomania"
      />
    </div>
  </main>
</template>
<script setup>
import router from "@/router";
import { reactive } from "vue";

function pseudoValidator() {
  const re = /[a-z]{3,20}/g;
  const validate = re.test(user.pseudo);
  if (validate) {
    return true;
  } else {
    return false;
  }
}
function emailValidator() {
  const re = /.+\@.+\..+/;
  const validate = re.test(user.email);
  if (validate) {
    return true;
  } else {
    return false;
  }
}
function passwordValidator() {
  const re = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
  const validate = re.test(user.password);
  if (validate) {
    return true;
  } else {
    return false;
  }
}
const user = reactive({
  pseudo: "",
  email: "",
  password: "",
});

const signup = async () => {
  if (pseudoValidator() && user.email && user.password) {
    await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) res.json();
        else return alert(res.status);
      })
      .catch((err) =>
        res.status(400).send({ message: "Problème réponse serveur :" + err })
      )
      .then((data) => {
        alert("Utilisateur crée!");
        router.push("/");
      })
      .catch((err) =>
        res
          .status(500)
          .send({ message: "Problème donnée de la réponse :" + err })
      );
  } else {
    alert("");
  }
};
</script>
<style scoped>
h1 {
  font-size: 26px;
}
p {
  text-align: center;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  margin: 5px;
  width: 150px;
}
input:invalid {
  border: 2px solid red;
}
img {
  width: 200px;
}
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px 0px 10px 0px;
  box-shadow: 0px 0px 15px #ffd7d7;
  background-color: #ffd7d7;
  width: 25%;
}
span {
  font-weight: bold;
}
@media only screen and (max-width: 1024px) {
  .signup {
    width: 85%;
  }
  h1 {
    font-size: 26px;
  }
}
</style>
