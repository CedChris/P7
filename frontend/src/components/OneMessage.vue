<template>
    <main>
        <div id="container-post" >
                <div id="post">
                    <div>Message: {{state.messageInfo.message}} {{state.message}}</div>
                    <div id="group-btn">
                        <input type="text" id="message" v-model="post.message">
                        <button @click="deleteMessage" id="delete"> Delete </button>
                        <button @click="updateMessage" id="update"> Update </button>
                    </div>
                </div>  
            </div>
        <!-- <div id="post">{{state.messageInfo.message}}</div> -->
    </main>
</template>
<script setup>

import router from "@/router";

import { reactive } from "vue";

const state = reactive({
    messageInfo: {},
})

console.log(state);
let params = (new URL(document.location)).searchParams;
let id = params.get('id')
console.log(id);

const displayMessage = async () => {
    await fetch(`http://localhost:5000/message/${id}`)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data);
                state.messageInfo = data
            })
            .catch((e) => {
                console.log(e);
            });
}
displayMessage();
const deleteMessage = async () => {

    await fetch(`http://localhost:5000/message/${id}`, {method: 'DELETE'})
        .then((res) =>  res.json())
        .then((data) => {
            if (confirm('Voulez-vous supprimer votre message?')){
                router.go('/public/home')
            }
        })
        .catch((e) => console.log(e))
}

const post = {
    message: ''
}
const updateMessage = async () => {

    await fetch(`http://localhost:5000/message/${id}`, {method: 'PUT',headers: {'Content-Type': 'application/json'},body: JSON.stringify(post)})
        .then((res) =>  res.json())
        .then((data) => {
            if (data) {
                alert('Message modifié')
            }
        })
        .catch((e) => console.log(e))
}


</script>
<style scoped>
#container-post{
        display: flex;
        flex-direction: column-reverse;
        width: 50%;
        height : auto;
        margin-top: 20px;
}
#post{
    box-shadow: 0px 0px 5px salmon;
    width: 100%;
    height: 65px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
}
#post div{
    text-align: center;
}
#post button{
    width: 100px;
    height: 20px;
}
main{
    width: 100%;
}

</style>