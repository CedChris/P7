<template>
    <div id="read">
        <h1>All post</h1>
            <div id="container-post" >
                <div id="post" v-for="mess in messages[0]">
                <div>{{mess.message}}</div>
                <router-link :to="{ name: 'MessageView', params: { id: mess._id }}">{{mess._id}}</router-link>
                </div>  
            </div>
        <div></div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';

let messages = reactive([])

console.log(messages);
fetch('http://localhost:5000/message/messages')
    .then((res) => res.json())
    .then((data) =>{
           messages.push(data)
    })
    .catch((e) => console.log(e))
</script>
<style scoped>

    #read{
        border: 1px solid salmon;
        width: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        flex-direction: column;
    }
    #container-post{
        display: flex;
        flex-direction: column-reverse;
        width: 95%;
        height : auto;
        padding-bottom: 10px;
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
@media only screen and (max-width: 800px){
  #read{
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