/**
 * 全局状态管理，此处定义的数据可在任一个组件中获取
 * 详见 “vuex” 文档
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules : {
    user,
  }
});
export default store;
