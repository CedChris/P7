<template>
  <main>
    <div id="container-post">
      <div id="post">
        <div class="message">
          Message: {{ state.messageInfo.message }} {{ state.message }}
        </div>
        <div
          id="com"
          @click="event"
          v-for="(comment, index) in state.messageInfo.comments"
        >
          <div>{{ comment.text }}</div>
          <button @click="deleteComment(index)">Supprimer</button>
        </div>
        <div id="group-btn">
          <div class="btn-update"></div>
          <label for="update">Modifier le message: </label>
          <textarea
            type="text"
            id="message"
            v-model="post.message"
            placeholder="Modifier votre message ici!"
          ></textarea>
          <button id="update" @click="updateMessage">Update</button>
        </div>
        <div class="comment">
          <label for="comment"> Commentaire: </label>
          <textarea
            v-model="messagePost.comments.text"
            maxlength="256"
            placeholder="Ajouter un commentaire ici!"
          ></textarea>
          <button @click="postComments">Envoyez</button>
        </div>
        <button @click="deleteMessage" id="delete">Supprimer</button>
      </div>
    </div>
  </main>
</template>
<script setup>
import router from "@/router";
import { reactive } from "vue";

/** Recherche des paramètres dans l'URL */

let params = new URL(document.location).searchParams;
let id = params.get("id");

const userId = localStorage.getItem("id");

/** Variables de stockage des données "message" */
const post = {
  message: "",
};

const state = reactive({
  messageInfo: {},
});

const messagePost = reactive({
  comments: {
    idPosterComment: localStorage.getItem("id"),
    commenterPseudo: localStorage.getItem("pseudo"),
    text: "",
  },
});

/**Fonction d'affichage du message */

const displayMessage = async () => {
  await fetch(`http://localhost:5000/message/${id}`)
    .then((res) => res.json())
    .then((data) => {
      state.messageInfo = data;
    })
    .catch((e) => {
      alert(e);
    });
};
displayMessage();

/** Fonction permetant la suppression du message ciblé */

const deleteMessage = async () => {
  await fetch(`http://localhost:5000/message/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data)
        if (confirm("Voulez-vous suprrimer ce message?")) {
          alert("Message supprimé");
          router.push("/public/home");
        } else {
          alert("Problème API");
        }
    })
    .catch((e) => alert(e));
};

/** Fonction mermettant la modification du message ciblé */

const updateMessage = async () => {
  await fetch(`http://localhost:5000/message/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      if (confirm("Voulez-vous modifier votre message?")) {
        alert("Message modifié");
        router.push("/public/home");
      }
    })
    .catch((e) => alert(e));
};

const postComments = async () => {
  if (message) {
    await fetch(`http://localhost:5000/message/comment/${id}`, {
      method: "PATCH",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(messagePost.comments),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Commentaire publié");
        router.push("/public/home");
      })

      .catch((e) => alert(e));
  } else {
    alert("vide");
  }
};
/** Fonction de suppression du commentaire */
/** Proof of concept : Commentaire */

async function deleteComment(idcom) {
  const objComment = {
    idcomment: this.state.messageInfo.comments[idcom]._id,
  };
  await fetch(`http://localhost:5000/message/delete-comment/${id}`, {
    method: "PATCH",
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(objComment),
  })
    .then((res) => res.json())
    .catch((err) => {
      alert(err);
    })
    .then((data) => {
      alert("Commmentaire supprimé");
      router.push("/public/home")
    })
    .catch((err) => {
      alert(err);
    });
}
</script>
<style scoped>
#container-post {
  display: flex;
  flex-direction: column-reverse;
  width: 35%;
  height: auto;
  margin-top: 20px;
}
#post {
  box-shadow: 0px 0px 5px salmon;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 15px;
}
#post div {
  text-align: center;
}
#post button {
  width: 100px;
  height: 20px;
}
main {
  width: 100%;
}
#delete {
  border: 1px solid red;
  background-color: brown;
  font-weight: bold;
  color: white;
}
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 80px;
}
#group-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.comment {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
textarea {
  width: 70%;
  height: 80px;
  resize: none;
}
</style>
