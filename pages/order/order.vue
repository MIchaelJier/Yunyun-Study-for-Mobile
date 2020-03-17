<template>
	<view class="page xBottom">
		<yun-tab :tabs="tabs" :scrollTop="scrollTop" ref="tabs">
			<template v-slot:0>
				<!-- 全部订单 -->
				<order-item :orderList="orderList" :name="tabs[0]" @modalShow="modalShow"></order-item>
			</template>
			<template v-slot:1>
				<!-- 待支付 -->
				<order-item :orderList="type0list" :name="tabs[1]"></order-item>
			</template>
			<template v-slot:2>
				<!-- 交易成功 -->
				<order-item :orderList="type1list" :name="tabs[2]"></order-item>
			</template>
			<template v-slot:3>
				<!-- 交易关闭 -->
				<order-item :orderList="type2list" :name="tabs[3]"></order-item>
			</template>
		</yun-tab>
		<!-- 拟态框 -->
		<yun-modal v-model="value" :mData="modelData" type="default" @onConfirm="onConfirm" @cancel="cancel" ref="myModel"></yun-modal>
	</view>
</template>

<script>
	import orderItem from './orderItem.vue';
	export default {
		data() {
			return {
				orderList:[],
				tabs:['全部订单','待支付','交易成功','交易关闭'],
				scrollTop:0,
				
				// 弹出框参数
				value:false,
				modelData:{title:'提示',content:'确认删除该课程？',cancelText:'取消'},
			}
		},
		computed:{
			 type0list(){return this.orderList.filter((item) => item.orderType === 0 )},
			 type1list(){return this.orderList.filter((item) => item.orderType === 1 )},
			 type2list(){return this.orderList.filter((item) => item.orderType === 2 || item.orderType === 3 )},
		},
		components: {
			orderItem
		},
		methods: {
			modalShow(orderData){
				let  modelData = {title:'提示',content:'',cancelText:'取消'},
					 modalFunc = () => {};
				if(['2', '3',2,3].includes(orderData.type)){
					modelData.content = '确认删除该订单？'
					modalFunc = () => {
						this.firstRequest('/last/assets/removeOrder',orderData.id).then( () => {
							this.orderList = this.orderList.filter( item => item.orderId !== orderData.id);
							this.$refs.tabs.swiperHeight();
						})
					}
				}else if(orderData.type === '0' || orderData.type === 0){
					modelData.content = '确认取消该订单？'
					modalFunc = () => { 
						this.firstRequest('/last/assets/cancelOrder',orderData.id).then( () => {
							this.orderList.forEach( item => { item.orderId === orderData.id ? item.orderType = 3 : ''})
							this.$refs.tabs.swiperHeight();
						})
					}
				}
				this.modelData = modelData;
				this.onConfirm = modalFunc;
				this.cancel = () => {console.log('用户点击取消')}
				this.value = !this.value;
			},
			// 二次封装请求
			firstRequest(u,id){
				let that = this;
				return new Promise((resolve, reject) => {
					that.$request({
						   url: `${u}?orderNo=${id}`,
						   method: 'POST',
						   showLoading: true
						  }).then( res => {
							  let title = '';
							  if(res.data.status){
								  title = '操作成功'
								  resolve()
							  }else{
								  title = '操作失败'
							  }
							  uni.showToast({
							  	title,
							  	icon:'none',
							  	duration:500
							  })
						  })
					})
			}
		},
		onLoad() {
			let that = this;
			that.$request({
			   url: '/last/assets/getOrder',
			   method: 'GET',
			   showLoading: true
			  }).then(res => {
					if(res.data.status){
						that.orderList = res.data.data;
						this.$refs.tabs.swiperHeight();
					}
			});
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
	}
</script>

<style>
	.page {
		background: #F6F6F6;
	}
</style>
