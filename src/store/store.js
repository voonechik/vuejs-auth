import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: '',
    usersList: null,
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
  mutations: {
    AUTH_SUCCESS(state, payload) {
      state.token = payload;
    },
    AUTH_LOGOUT(state) {
      state.token = '';
    },
    SET_USERS_LIST(state, payload) {
      state.usersList = payload;
    }
  },
  actions: {
    AUTH_REQUEST: ({commit}, user) => {
      return new Promise((resolve, reject) => { 
        axios({url: 'https://sandbox.sdk.finance/api/v1/authorization', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.authorizationToken.token;
            commit('AUTH_SUCCESS', token);
            return token;
          })
          .then((token) => {
            return axios({
              url: 'https://sandbox.sdk.finance/api/v1/users/view',
              headers: {Authorization: 'TOKEN ' + token},
              data: {
                pageNumber: 0,
                pageSize: 20
              },
              method: 'POST'
            });
          })
          .then(resp => {
            commit('SET_USERS_LIST', resp.data.records);
          })

          resolve();
      });
    },
    AUTH_LOGOUT({commit}) {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT');
        resolve();
      });
    }
  },
  plugins: [createPersistedState()]
});