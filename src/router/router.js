import Vue from 'vue';
import Router from 'vue-router';
import Authentication from '@/components/Authentication';
import User from '@/components/User';
import {store} from '../store/store';

Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  // Без setTimeout переход на /users происходит лишь по второму клику на кнопку Sign In
  // поэтому поставил небольшую задержку
  setTimeout(() => {
    if(store.getters.isAuthenticated) {
      next();
    } else {
      next('/');
    }
  }, 700);
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Authentication
    },
    {
      path: '/user', 
      component: User, 
      beforeEnter: ifAuthenticated 
    }
  ]
})
