import Vue from 'vue'
import App from './App'
//引入并挂载vuex
import store from './store'  
Vue.prototype.$store = store  
//一次性注册 components文件夹中的 所有组件(uniapp不支持)
// const requireComponents = require.context('./components', true, /\.vue/);
// requireComponents.keys().forEach( fileName => {
//   const reqCom = requireComponents(fileName)
//   const reqComName = fileName.split('/')[1];
//   Vue.component(reqComName.substring(0 , reqComName.length - 4), reqCom.default || reqCom)
// })

// 自定义组件
	import yunBox from "./components/yunBox.vue"
	import yunSwiper from "./components/yunSwiper.vue"
	import yunHeader from "./components/yunHeader.vue"
	import yunThemes from "./components/yunThemes.vue"
	import yunSelect from "./components/yunSelect.vue"
	import yunTab from "./components/yunTab.vue"
	import yunInput from "./components/yunInput.vue"
	import yunMoveVerify from "./components/yunMoveVerify.vue"
	import yunModal from "./components/yunModal.vue"
	import betterSticky from "./components/betterSticky.vue"
	import yunImage from "./components/yunImage.vue"
	import yunRefresh from "./components/yunRefresh.vue"
	import yunDragBtn from "./components/yunDragBtn.vue"
	Vue.component('yunBox',yunBox);
	Vue.component('yunTab',yunTab);
	Vue.component('yunSwiper',yunSwiper);
	Vue.component('yunHeader',yunHeader);
	Vue.component('yunThemes',yunThemes);
	Vue.component('yunSelect',yunSelect);
	Vue.component('yunInput',yunInput);
	Vue.component('yunMoveVerify',yunMoveVerify);
	Vue.component('yunModal',yunModal);
	Vue.component('betterSticky',betterSticky);
	Vue.component('yunImage',yunImage);
	Vue.component('yunRefresh',yunRefresh);
	Vue.component('yunDragBtn',yunDragBtn);
// uniUI组件
	import uniRate from "./uniUI/components/uni-rate/uni-rate.vue"
	import uniList from "./uniUI/components/uni-list/uni-list.vue"
	import uniListItem from "./uniUI/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "./uniUI/components/uni-icons/uni-icons.vue"
	import uniCollapse from './uniUI/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from './uniUI/components/uni-collapse-item/uni-collapse-item.vue'
	import uniPopup from './uniUI/components/uni-popup/uni-popup.vue'
	import uniLoadMore from './uniUI/components/uni-load-more/uni-load-more.vue'
	import uniCountdown from './uniUI/components/uni-countdown/uni-countdown.vue'
	Vue.component('uniList',uniList);
	Vue.component('uniRate',uniRate);
	Vue.component('uniListItem',uniListItem);
	Vue.component('uniIcons',uniIcons);
	Vue.component('uniCollapse',uniCollapse);
	Vue.component('uniCollapseItem',uniCollapseItem);
	Vue.component('uniPopup',uniPopup);
	Vue.component('uniLoadMore',uniLoadMore);
	Vue.component('uniCountdown',uniCountdown);

Vue.config.productionTip = false;

//uni.request $request
import { request } from "./common/request/index.js"
Vue.prototype.$request = request;

//定义用户类
Vue.prototype.User = {};
import { signout } from "./common/signOut.js"
import { register } from "./common/register.js"
import { login } from "./common/login/index.js"
import { getSMScode } from "./common/getSMSCode.js"
Vue.prototype.User.$signout = signout;
Vue.prototype.User.$register = register;
Vue.prototype.User.$login = login;
Vue.prototype.User.$getSMScode = getSMScode;

//全局变量
import * as globalData from "./common/globalData/index.js"
Vue.prototype.GlobalData = globalData.default 

//从缓存中获取用户信息,存入store中
// store.commit('getUserInfo');

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()

