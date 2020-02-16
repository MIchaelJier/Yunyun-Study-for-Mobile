# V5行为验证 uniapp组件使用说明

## 验证流程
下图是简单验证流程：
![验证流程](https://www.verify5.com/assets/images/pic-quickstart-1.png)

V5采取二次验证机制，通过前端采集终端特征和用户行为，提交到后台智能引擎动态进行行为验证(首次验证)，当验证通过时生成一次性票据(verifyId)并返回给前端，前端提交verifyId至业务后台，后台再将verifyId提交给验证服务器进行核销（二次验证）。业务后台通过对verifyId的有效性判断实现防刷保护。

实际开发时，应该在应用服务端通过API获得token，具体参考:
[官网文档-详细对接](https://www.verify5.com/doc/reference#notebook-1)

下图是更详细的验证流程：
![更详细的验证流程](https://www.verify5.com/assets/images/pic-notebook-1.jpg)

## 准备工作
V5验证运行最少需要两个参数：host和token,这两个参数均和应用有关。可以到官网注册并创建应用(基础套餐免费，500次防护/天)。


### 注册

注册入口：[https://www.verify5.com/register](https://www.verify5.com/register)

![用户注册](https://www.verify5.com/assets/images/pic-quickstart-2.jpg)

### 创建应用
注册成功后，进入Verify5控制台后台，点击“应用管理”菜单，点“创建”按钮根据指引新增应用。
![创建应用](https://www.verify5.com/assets/images/pic-quickstart-3.jpg)
![应用信息](https://www.verify5.com/assets/images/pic-quickstart-4.jpg)


## 安装
直接下载组件解压到工程根目录即完成安装，控件最终的存放位置应该在：/components/verify5


### 导入组件
```
<script>
	import V5Dialog from 'components/verify5-ui/V5Dialog'
	import V5Button from 'components/verify5-ui/V5Button'
	export default {
		...
		components:{
			V5Dialog,
			V5Button
		}
		...
	}
</script>
```

## 使用方法
V5提供两个uniapp组件，分别是V5Dialog和V5Button.V5Dialog提供编程式的验证能力，而V5Button提供一个默认的验证按钮实现。

### V5Dialog
V5Dialog是一个模态窗口组件，需先在Vue页面声明引用，并在需要时通过verify方法唤出验证。
![验证演示](https://www.verify5.com/tas/screen.png)

```
<template>
...
    <V5Dialog ref="v5dialog" host="应用的host" token="应用的token"/>
...
</template>
```
需要验证时，在&lt;script&gt;标签中请求verify：

···
<script>
import {V5Dialog} from 'components/verify5';

export default {	
	methods:{
		dosomething(){//某个后台业务方法
			this.$refs.v5dialog.verify(function(result){//注意&lt;V5Dialog&gt;标签中定义了ref="v5dialog"，这里通过this.$refs.v5dialog可以取到组件的引用
				if(result.success){
					var verifyId=result.verifyId;
					//TODO 将verifyId随业务参数一起提交至后台进行验证
				}
			});

		}
	}
}
</script>
···

可以通过回调方式对现有代码进行包装验证，例如：
```
function foo(){
	bar();
}
```
可以这样封装：
```
function foo(){
	this.$refs.v5dialog.verify(function(result){
		if(result.success){
			var verifyId=result.verifyId;
			bar(verifyId);
		}
	});
}
```


### V5Button
V5Button可用于既有表单的快速植入，并内置一个<input>组件存放verifyId，V5Button的效果如下：
![V5Button](https://www.verify5.com/assets/images/pic-notebook-2.jpg)

只需少数几行代码即可植入V5Button：
```
<template>
...
	<V5Button name="v5" host="应用的host" token="应用的token"/> <!-- name代表了组件的表单域名称，必填 -->
...
</template>
<script>
import {V5Button} from 'components/verify5';
export default {

	components:{
		V5Button
	}
}
</script>
```


# 更多资料

 - V5验证官网 (https://www.verify5.com).
 - GitHub (https://github.com/verify5)
 - CSDN文章 (https://blog.csdn.net/jarez)
 - npm(https://www.npmjs.com/~zimsoft)