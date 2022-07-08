<template>
  <main>
    <div class="layout">
      <AllPost/>
      <News/>
    </div>
  </main>
</template>
<script setup>
import News from "../../components/News.vue";
import AllPost from "@/components/allPost.vue";

</script>
<style>
main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 

}
.layout{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  border: 1px solid salmon;
}
@media only screen and (max-width: 800px){
  .layout{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    border: none;
}
}
</style>