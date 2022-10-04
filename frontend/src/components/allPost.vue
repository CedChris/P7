<template>
  <div id="read">
    <h1>Fil d'actualité</h1>
    <div id="container-post">
      <div id="post" v-for="(mess, index) in state.messages">
        <div @click="idpost(index)" id="pseudo">{{ mess.pseudo }}</div>
        <div id="container-message">
          <router-link :to="{ name: 'MessageView', params: { id: mess._id } }">
            <div id="message">
              <div>{{ mess.message }}</div>
              <img v-if="mess.picture" :src="mess.picture" />
            </div>
            <div id="data">
              Crée le :{{ mess.createdAt }} + Modifier le : {{ mess.updatedAt }}
            </div>
          </router-link>
          <div class="like">
            <div>Like : {{ mess.like }}</div>
            <fa
              class="icon"
              @click="idpost(index)"
              icon="fa-solid fa-thumbs-up"
            />
          </div>
        </div>
        <div id="comment" v-for="comment in mess.comments">
          {{ comment.commenterPseudo }} : {{ comment.text }}
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script setup>

import router from "@/router";
import { reactive } from "vue";

const tokenid = localStorage.getItem("token");
const id = localStorage.getItem("id");

let state = reactive({
  messages: "",
});

async function idpost(id) {
  const idmessage = this.state.messages[id]._id;
  const iduser = localStorage.getItem("id");
  const objId = {
    usersLiked: localStorage.getItem("id"),
  };
  await fetch(`http://localhost:5000/message/${idmessage}`)
    .then((res) => res.json())
    .catch((err) => alert(err))
    .then((data) => {
      if (!data.usersLiked.includes(iduser)) {
        fetch(`http://localhost:5000/message/add-like/${idmessage}`, {
          method: "PATCH",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(objId),
        })
          .then((res) => res.json)
          .catch((err) => alert("probleme serveur ajout like" + err))
          .then((data) => {
            alert('Like ajouté')
            router.go("/public/home");
          })
          .catch((err) => alert("problème ajout like" + err));
      } else {
        return fetch(`http://localhost:5000/message/remove-like/${idmessage}`, {
          method: "PATCH",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(objId),
        })
          .then((res) => res.json)
          .catch((err) => alert("problème serveur remove like" + err))
          .then((data) => {
            alert("Like retiré");
            router.go("/public/home");
          })
          .catch((err) => alert("problème remove like" + err));
      }
    });
}
const messageApi = async () => {
  await fetch("http://localhost:5000/message/messages")
    .then((res) => res.json())
    .then((data) => {
      state.messages = data;
    })
    .catch((err) => alert(err));
};
messageApi();

</script>

<style scoped>
.icon {
  color: v-bind(likeColor);
}
#read {
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  flex-direction: column;
}
#container-post {
  display: flex;
  flex-direction: column-reverse;
  width: 95%;
  height: auto;
  padding-bottom: 10px;
}
#post {
  box-shadow: 0px 0px 15px #FFD7D7;
  background-color: #FFD7D7;
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
}
#post:hover{
  transform: scale(1.01);
}
#post div {
  text-align: center;
}
#post a {
  text-align: center;
  margin: 15px;
  text-decoration: none;
  color: black;
}
#pseudo {
  font-weight: bold;
  margin-bottom: 15px;
}
#comment {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin: 2px;
}
#message {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}
img {
  max-width: 200px;
  border-bottom: 2px solid black;
  padding-bottom: 15px;
}
.like{
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

}
@media only screen and (max-width: 800px) {
  #read {
    border: none;
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    flex-direction: column;
  }
}
</style>
