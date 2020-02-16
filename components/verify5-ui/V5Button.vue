<template>
    <div>
        <div class="v5-validation-btn" v-if="status === 'READY'" @click="verify">
            <span class="v5-logo-icon">
                <span class="v5-logo-small"></span>
            </span>
            <span class="v5-text-normal">{{messages["v5button.status.ready"]}}</span>
        </div>

        <div class="v5-validation-btn-ing" v-if="status === 'INPROCESS'">
            <span class="v5-logo-icon">
                <span class="v5-logo-small"></span>
                <span class="v5-ball-scale-multiple">
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
            </span>
            <span class="v5-text-ing">{{messages["v5button.status.inprogress"]}}</span>
        </div>

        <!-- 验证成功 按钮 -->
        <div class="v5-validation-btn-success" v-if="status === 'SUCCESS'">
            <div class="v5-flash"></div>
            <div class="v5-icon-success">
                <div class="v5-ball-clip-rotate"><div></div></div>
                <span class="v5-icon-ok"></span>
                <span class="v5-ok-move"></span>
            </div>
            <span class="v5-success-text">{{messages["v5button.status.success"]}}</span>
        </div>
        <V5Dialog @success="onSuccess" v-bind:lang="lang" ref="dialog" v-bind:host="host" v-bind:token="token" v-bind:ssl="ssl" :trustLevel="trustLevel"></V5Dialog>
        <input ref="input" v-model="value" v-show="false" type="text"/>
    </div>
</template>


<script>

import V5Dialog from './V5Dialog';

//#ifdef H5
import Verify5 from './js/verify5.unih5.min'
//#endif

//#ifndef H5
import Verify5 from './js/verify5.uniapp.min'
//#endif

export default {
    props:{
        lang:{
            type:String,
            required: false
        },
        name:{
            type:String,
            required: true
        },
        host:{
            type:String,
            required: true
        },
        token:{
            type:String,
            required: true
        },
        ssl:{
            type:Boolean,
            default:true
        },
        trustLevel:{
            type:Number,
            default:0
        }
    },
    data(){
		var lang=this.lang;
		var messages=Verify5.getMessages(lang);
        return {
            status:"READY",
            value:"",
			messages:messages
        }
    },
    mounted(){
        var self=this;
        var dialog=this.$refs.dialog;
        self.status="READY";
        dialog.$on("CANCEL",function(){
            self.status="READY";
        });

		var lang=this.lang;
		var messages=Verify5.getMessages(lang);
		this.messages=messages;
    },
    methods:{
		onSuccess:function(verifyId){
			this.value=verifyId;
			this.$emit("success",verifyId);
		},
        verify(){
            var self=this;
            this.status="INPROCESS";
            this.$refs.dialog.verify(function(result){
				if(result.success){
					self.status="SUCCESS";	
				}
            });
        }
    },
    components:{
        V5Dialog
    }
}


</script>

<style scoped>
	@import "./css/v5.css";
</style>