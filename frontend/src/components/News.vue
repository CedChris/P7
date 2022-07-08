<template>
    <div id="post">
        <h1>Ajouter un message</h1>
            <div class="formgroup">
                <label for="message"> Message : </label>
                <input type="text" name="message" id="message" v-model="messagePost.message" maxlength="256">
                <input type="file" name="filename" id="filename" v-on:change="onFiles">
                <button type="submit" @click="post">Postez votre message</button>
            </div>
        </div>
</template>
<script setup>
import router from '@/router';

const messagePost = {
    idPoster : localStorage.getItem('id'),
    message : '',
    picture : null,
    comments : [],
  };
console.log(messagePost);
const post = async () =>{
    if(message){
    await fetch('http://localhost:5000/message/post', {
      method:'POST',
      headers:{
        'authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(messagePost)
    })
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        router.go('/public/home')
    })
    
    .catch((e) => console.log(e))
    }
    else{
        alert('vide')
    }
}
</script>
<style scoped>
#post{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 85%;
    height: 300px;
    border: 1px solid salmon;
    border-radius: 15px;
}
input{
    margin-bottom: 10px;
}
.formgroup{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 85%;
}
#message{
    height: 50px;
}
button{
    margin-bottom: 10px;
}
@media only screen and (max-width: 800px){
    #post{
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