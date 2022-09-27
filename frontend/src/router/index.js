import { createRouter, createWebHistory } from 'vue-router';

import LogLayout from '../views/log/LogLayout.vue';
import LoginView from '../views/log/LoginView.vue';
import SignupView from '../views/log/SignupView.vue';

import PublicLayout from '../views/public/PublicLayout.vue';
import ProfileView from '../views/public/ProfileView.vue';
import HomeView from '../views/public/HomeView.vue';

import NewsVue from '@/components/News.vue';
import allPostVue from '@/components/allPost.vue';
import OneUserVue from '@/components/OneUser.vue';
import OneMessageVue from '@/components/OneMessage.vue';

import { authGuard } from '../utils/auth';


const routes = [
  {
    path: '/',
    name: 'LogLayout',
    component : LogLayout,
    children : [
      {path: '/',name: 'login',component: LoginView,},
      {path: '/signup',name: 'signup',component : SignupView},
    ]
  },
  {
    path: '/public/home',
    name: 'PublicLayout',
    component : PublicLayout,
    beforeEnter: authGuard,
    children : [
      {path:'/public/home',name:'HomeView',component: HomeView, NewsVue, allPostVue},
      {path:'/public/profile',name:'ProfileView',component: ProfileView, OneUserVue},
      {path: '/public/home/message/?id=:id', name: 'MessageView' ,component: OneMessageVue}
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
