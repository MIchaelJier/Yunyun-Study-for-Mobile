import Vue from 'vue'
import App from './App'
import { request } from "./request/request.js"

import yunBox from "./components/yunBox.vue"
import yunHeader from "./components/yunHeader.vue"
import yunThemes from "./components/yunThemes.vue"
import yunSelect from "./components/yunSelect.vue"
import betterSticky from "./components/betterSticky.vue"
import uniList from "./uniUI//components/uni-list/uni-list.vue"
import uniListItem from "./uniUI//components/uni-list-item/uni-list-item.vue"
Vue.component('yunBox',yunBox);
Vue.component('yunHeader',yunHeader);
Vue.component('yunThemes',yunThemes);
Vue.component('yunSelect',yunSelect);
Vue.component('betterSticky',betterSticky);
Vue.component('uniList',uniList);
Vue.component('uniListItem',uniListItem);

Vue.config.productionTip = false;

Vue.prototype.$request = request;
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()

//一次性注册 components文件夹中的 所有组件(uniapp不支持)
// const requireComponents = require.context('./components', true, /\.vue/);
// requireComponents.keys().forEach( fileName => {
//   const reqCom = requireComponents(fileName)
//   const reqComName = fileName.split('/')[1];
//   Vue.component(reqComName.substring(0 , reqComName.length - 4), reqCom.default || reqCom)
// })