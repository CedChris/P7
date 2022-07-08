<template>
    <div id="profile">
        <h1>Pseudo: </h1>
        <div>User : {{myProfile}}</div>
        <div>Nom :</div>
        <div>Prénom(s) :{{state.users.pseudo}}</div>
        <div>Age :</div>
        <div>Bio :</div>
    </div>
</template>
<script setup>

import  {reactive}  from 'vue'

const state = reactive({
    users: {}
});

const myProfile = localStorage.getItem('id')

fetch(`http://localhost:5000/user/${myProfile}`)
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        state.users = data
        console.log(state.users);
    })
    .catch((e) => {
        console.log(e);
    });



</script>
<style>
    #profile{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px solid salmon;
        border-radius: 10px;
        margin-top: 20px;
    }
    #profile div{
        margin: 5px;
    }
</style>