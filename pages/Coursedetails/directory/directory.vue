<template>
	<view>
		<block v-for="(item,index) in chapterList" :key="index">
			<view class="listTitile">{{ item.title }}</view>
			<view class="dirList" v-for="inner in item.body" :key="inner.id">
				<view class="dirList-content" :style="{color:inner.src === ''?'#ccc':'#333'}" @click="changeSrc(inner.src)">
					<view class="dirList-content-icon" :style="{'border-color':inner.src === ''?'#ccc':'#333'}">
						{{ inner.type === 0 ? '视频' : '' }}
						{{ inner.type === 1 ? '音频' : '' }}
						{{ inner.type === 2 ? '图文' : '' }}
					</view>
					<text class="dirList-content-title">{{ inner.name }}</text>
					<text class="dirList-content-add" v-if="inner.tip&&inner.tip!==''">{{ inner.tip }}</text>
				</view> 
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "directory",
		data() {
			return {
				
			};
		},
		props: {
			chapterList: {
				type: Array,
				default:()=>{}
			}
		},
		methods:{
			'changeSrc'(src){
				this.$emit('changeVedio',src)
			}
		}
	}
</script>

<style>
	@import url("directory.css");
</style>