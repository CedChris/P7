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

const item = reactive({
  image: null,
  imageUrl: null,
});

const messagePost = reactive({
  userId: localStorage.getItem("id"),
  pseudo: localStorage.getItem("pseudo"),
  message: "",
  picture: "",
  comments: [],
});

const onFiles = async (e) => {
  const file = e.target.files[0];
  item.imageUrl = URL.createObjectURL(file);

  let imageForm = new FormData();
  imageForm.append("image", file);
  imageForm.append("message", messagePost.message);
  imageForm.append("userId", localStorage.getItem("id"));
  imageForm.append("pseudo", localStorage.getItem("pseudo"));
  item.image = imageForm;
};

console.log(messagePost);

const post = async () => {
  if (message) {
    await fetch("http://localhost:5000/message/post", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Access-Control-Allow-Origin": "*",
      },
      body: item.image,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.go("/public/home");
      })

      .catch((e) => console.log(e));
  } else {
    alert("vide");
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
  border: 1px solid #FD2D01;
  border-radius: 15px;
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
