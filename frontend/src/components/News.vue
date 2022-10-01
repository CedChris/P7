<template>
  <div id="post">
    <h1>Ajouter un message</h1>
    <div class="formgroup">
      <label for="message"> Message : </label>
      <textarea
        placeholder="Votre message"
        name="message"
        id="message"
        v-model="messagePost.message"
        maxlength="256"
      ></textarea>
      <input
        ref="file"
        type="file"
        name="file"
        id="file"
        accept="image/*"
        v-on:change="onFiles"
      />
      <img v-if="item.imageUrl" :src="item.imageUrl" />
      <button type="submit" @click="post">Postez votre message</button>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import { reactive } from "vue";

/** Variable de stockage */

const item = reactive({
  postWithImage: null,
  imageUrl: null,
});

const messagePost = reactive({
  userId: localStorage.getItem("id"),
  pseudo: localStorage.getItem("pseudo"),
  message: "",
  picture: null,
  formPost: null,
});

 /** Fonction de prévisualisation et d'ajout de l'image dans le message*/

const onFiles = async (e) => {
  const file = e.target.files[0];
  item.imageUrl = URL.createObjectURL(file);

  let imageForm = new FormData();
  imageForm.append("image", file);
  imageForm.append("message", messagePost.message);
  imageForm.append("userId", localStorage.getItem("id"));
  imageForm.append("pseudo", localStorage.getItem("pseudo"));
  item.postWithImage = imageForm;
};

/** Fonction de publication de message */

const post = async (e) => {
  let postWithoutImage = new FormData()
    postWithoutImage.append("message", messagePost.message);
    postWithoutImage.append("userId", localStorage.getItem("id"));
    postWithoutImage.append("pseudo", localStorage.getItem("pseudo"))
    postWithoutImage.append("picture", messagePost.picture);
    messagePost.formPost = postWithoutImage;

  if (item.postWithImage !== null) {
    await fetch("http://localhost:5000/message/post", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Access-Control-Allow-Origin": "*",
      },
      body: item.postWithImage,
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Message publié')
        router.go("/public/home");
      })

      .catch((e) => alert(e));
  } else {
    fetch("http://localhost:5000/message/post", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Access-Control-Allow-Origin": "*",
      },
      body: messagePost.formPost,
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Message publié')
        router.go("/public/home");
      })

      .catch((e) => alert(e));
  }
};
</script>
<style scoped>
#post {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 81%;
  height: auto;
  border-radius: 15px;
  background-color: #FFD7D7;
  box-shadow: 0 0 15px #4E5166;
}
h1{
  font-size: 24px;
}
input {
  margin-bottom: 10px;
}
.formgroup {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 85%;
}
#message {
  height: 50px;
  resize: none;
  margin-bottom: 25px;
}
button {
  margin-bottom: 10px;
}
img {
  width: 150px;
}
@media only screen and (max-width: 800px) {
  #post {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 95%;
    height: 300px;
    border: none;
    border-radius: 15px;
  }
}
</style>
