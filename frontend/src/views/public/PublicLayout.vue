<template>
<header>
    <nav>
        <div id="logout"><fa icon="arrow-right-from-bracket" @click="logout"></fa></div>
        <router-link to="/public/home"><img :src="require('@/assets/icon.png')" alt="logo groupomania"></router-link>
        <router-link to="/public/profile"><fa class="icon" icon="bars"></fa></router-link>
    </nav>
</header>
    <router-view></router-view>
</template>
<script setup>
import router from '@/router';


const logout = () => {
    localStorage.clear()
    router.go('/login')
}
</script>
<style scoped>
header{
    background-color: white;
    display: flex;
    border-bottom: 1px solid salmon;
    box-shadow: 0px 5px 5px salmon;
    height: 60px;
}
.icon{
    color: black;
    margin: 5px;
}
img{
    width: 50px;
    height: 50px;
    margin:5px;
}
.svg-inline--fa {
    display: var(--fa-display, inline-block);
    height: 30px;
    overflow: visible;
    color: salmon;
}
nav{
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
a{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}
#logout{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}

</style>