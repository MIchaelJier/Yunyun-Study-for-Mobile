import Vue from 'vue'
import App from './App'
import yunHeader from './components/yunHeader.vue'
import uniList from "./uniUI//components/uni-list/uni-list.vue"
import uniListItem from "./uniUI//components/uni-list-item/uni-list-item.vue"

Vue.config.productionTip = false;

Vue.component('yunHeader',yunHeader);
Vue.component('uniList',uniList);
Vue.component('uniListItem',uniListItem);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
