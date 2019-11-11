import Vue from 'vue'
import App from './App'
import { request } from "./request/request.js"

import uniList from "./uniUI//components/uni-list/uni-list.vue"
import uniListItem from "./uniUI//components/uni-list-item/uni-list-item.vue"

Vue.config.productionTip = false;

Vue.component('uniList',uniList);
Vue.component('uniListItem',uniListItem);

Vue.prototype.$request = request;
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()

//一次性注册 components文件夹中的 所有组件
const requireComponents = require.context('./components', true, /\.vue/)
requireComponents.keys().forEach( fileName => {
  const reqCom = requireComponents(fileName)
  const reqComName = fileName.split('/')[1];
  // console.log(reqComName.substring(0,reqComName.length-4))
  Vue.component(reqComName.substring(0 , reqComName.length - 4), reqCom.default || reqCom)
})