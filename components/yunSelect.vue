<template>
	<view>
		<block v-for="item in items" :key="item.id">
			<view class="select-item" 
				  @click="selectIt(item)"
				  :class="nowSelect === item.id ? 'item-active':''">
				  
			{{ item.name }}
		
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nowSelect:0
			};
		},
		props: ['items'],
		methods: {
			selectIt:function(item) {
				this.nowSelect = item.id
			}
		},
		watch: {
			'nowSelect':function() {
				this.$emit('func')
			}
		}
	}
</script>

<style>
		.select-item {
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			background: #fff;
			font-size: 15px;
			color: #3c4a55;
		}
		.item-active {
			background: #f6f6f6;
			color: #36B378;
		}
</style>
