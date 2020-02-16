<template>
	<view>
    <div v-if="show" @select="disableselect">
    <div class="v5-mask"></div>
    <div class="v5-pop v5-pop-active">
        <div class="v5-wrapper">

            <div class="v5-canvas-img">
                <image mode="aspectFit" class="v5-canvas-bg" width="260" height="160" v-bind:src="imgsrc" />
				<!-- #ifdef H5 || MP -->
                <cover-image mode="aspectFit" class="v5-canvas-slice" ref="sliceCanvas" id="sliceCanvas" v-bind:src="slicesrc" v-bind:style="sliceStyle"/>
				<!-- #endif -->
				<!-- #ifndef H5 || MP -->
                <image width="52" height="60" mode="aspectFit" class="v5-canvas-slice" ref="sliceCanvas" id="sliceCanvas" v-bind:src="slicesrc" :style="{left:sliceLeft+'px',top:sliceTop+'px'}"/>
				<!-- #endif -->
                <div class="v5-img-loading" v-if="showloading">
                    <div class="v5-loading-icon"></div>
                    <div class="v5-loading-tip">{{messages["v5dialog.status.loading"]}}</div>
                </div>
                <div v-show="showTip" v-bind:class="tipClass">{{ tipText }}</div>
            </div>

            <div class="v5-slider-bar">
                <div class="v5-slider-track" ref="trackArea" id="trackArea">
                    <div class="v5-slider-track-tip v5-tips-fade">{{ trackText }}</div>
                </div>
				<!-- #ifdef H5 || MP -->
                <div ref="moveBlock" id="moveBlock" class="v5-slider-button" v-bind:style="moveBlockStyle" @touchstart.stop.prevent="start" @touchmove.stop.prevent="move" @touchend.stop.prevent="end" @mousedown.stop.prevent="start" @mousemove.stop.prevent="move" @mouseup.stop.prevent="end">
                    <span :class="buttonClass"></span>
                </div>
				<!-- #endif -->
				<!-- #ifndef H5 || MP -->
                <div ref="moveBlock" id="moveBlock" class="v5-slider-button" :style="{left:buttonLeft+'px'}" @touchstart.stop.prevent="start" @touchmove.stop.prevent="move" @touchend.stop.prevent="end">
                    <span :class="buttonClass"></span>
                </div>
				<!-- #endif -->


            </div>

            <div class="v5-panel-footer">
                <a class="v5-copyright" target="_blank" href="https://www.verify5.com">
                    <div class="v5-copyright-tip">{{messages["v5dialog.label.brand"]}}(TM)</div>
                </a>
                <div class="v5-footer-item">
                    <a class="v5-feedback" target="_blank" href="https://www.verify5.com/privacy">
                        <span class="v5-icon-footer v5-icon-feedback"></span>
                        <span class="v5-icon-tip"><span></span>{{messages["v5dialog.label.privacy"]}}</span>
                    </a>
                    <a class="v5-refresh" @click="refresh">
                        <span class="v5-icon-footer v5-icon-refresh"></span>
                        <span class="v5-icon-tip"><span></span>{{messages["v5dialog.label.refresh"]}}</span>
                    </a>
                    <a class="v5-close" @click="close">
                        <span class="v5-icon-footer v5-icon-close"></span>
                        <span class="v5-icon-tip"><span></span>{{messages["v5dialog.label.close"]}}</span>
                    </a>
                </div>
                <div class="v5-clear"></div>
            </div>

        </div>

    </div>
    </div>
	<canvas id="g4N8cB" canvas-id="g4N8cB" v-show="cvpShow" style="position:absolute;z-index:-9999;width:200px;height:200px;left:99999px;top:99999px"></canvas>
	</view>
</template>

<script>

//#ifdef H5
import Verify5 from './js/verify5.unih5.min'
//#endif

//#ifndef H5
import Verify5 from './js/verify5.uniapp.min'
//#endif


var exported=null;
//#ifdef H5 || MP
exported=Verify5.LPIWOANJNYUU84HI(0)
//#endif
//#ifndef H5 || MP
exported=Verify5.LPIWOANJNYUU84HI(1)
//#endif

export default exported
</script>

<style scoped>
	@import "./css/v5.css";
* {  
	  -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
	  -webkit-user-select:none; /*webkit浏览器*/   
	  -khtml-user-select:none; /*早期浏览器*/   
	  -moz-user-select:none;/*火狐*/   
	  -ms-user-select:none; /*IE10*/   
	  user-select:none;   
} 
</style>