import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import common from './commonStore/common.js'
import cart from './cartStore/cart.js'

const store = new Vuex.Store({  
    modules:{ 
		common,
        cart
    }
})  

export default store;