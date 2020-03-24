import Vue from "vue";
import Vuex from "vuex";
import products from "../models/products";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: products
  },
  mutations: {
    remove_product(state, index) {
      if (index > -1) {
        state.products.splice(index, 1);
      }
    },
    add_product(state, payload) {
      state.products.push(payload);
    },
    edit_product(state, payload) {
      state.products = state.products.map(i => {
        if (i.id == payload.id) {
          return payload;
        }
        return i;
      });
    }
  },
  actions: {
    removeProduct({ state, commit }, id) {
      try {
        var index = state.products
          .map(i => {
            if (id == i.id) return true;
            return false;
          })
          .indexOf(true);

        if (index != -1) {
          commit("remove_product", index);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    addProduct({ commit }, payload) {
      commit("add_product", payload);
    },
    editProduct({ commit }, payload) {
      commit("edit_product", {
        id: payload.id,
        Nome_do_livro: payload.Nome_do_livro,
        Autor: payload.Autor,
        data_inclusao: payload.data_inclusao,
        genero: payload.genero
      });
    }
  }
});

export default store;
